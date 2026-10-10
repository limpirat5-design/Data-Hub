/**
 * Branch Smart Document Hub — AI Assistant Module
 * เชื่อมต่อ Gemini API สำหรับ:
 *   1. Semantic Search — ค้นหาเอกสารด้วยภาษาธรรมชาติ
 *   2. Changelog Summarization — สรุปการเปลี่ยนแปลงระหว่างเวอร์ชัน
 *   3. Version Check — ตรวจสอบเวอร์ชันอัจฉริยะ
 *   4. Chat Assistant — ตอบคำถามเกี่ยวกับเอกสาร
 */

// ========================
// AI State
// ========================
const aiState = {
  isConnected: false,
  chatHistory: [],
  isProcessing: false,
};

// ========================
// ========================
// Gemini API Core
// ========================

function getGeminiApiKey() {
  if (typeof APP_CONFIG !== "undefined" && APP_CONFIG.GEMINI_API_KEY && APP_CONFIG.GEMINI_API_KEY.trim().length > 0) {
    return APP_CONFIG.GEMINI_API_KEY.trim();
  }
  try {
    return localStorage.getItem("branch_hub_gemini_key") || "";
  } catch (e) {
    return "";
  }
}

function isGeminiConfigured() {
  return getGeminiApiKey().length > 0;
}

async function callGemini(prompt, options = {}) {
  if (!isGeminiConfigured()) {
    return { success: false, error: "ยังไม่ได้ตั้งค่า Gemini API Key" };
  }

  const apiKey = getGeminiApiKey();
  const model = options.model || (typeof APP_CONFIG !== "undefined" ? APP_CONFIG.GEMINI_MODEL : "gemini-3.8-flash");
  const url = `${APP_CONFIG.GEMINI_API_URL}/${model}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: options.temperature ?? 0.3,
      maxOutputTokens: options.maxTokens ?? 1024,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData?.error?.message || `HTTP ${response.status}`;
      return { success: false, error: errMsg };
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return { success: true, text };

  } catch (err) {
    return { success: false, error: err.message || "เชื่อมต่อ API ไม่ได้" };
  }
}

// ========================
// 1. Semantic Search
// ========================

async function semanticSearch(userQuery) {
  // Build document context for Gemini
  const activeDocsList = DOCUMENTS
    .filter(d => d.status === "active")
    .map(d => `[${d.doc_id}] ${d.title} | หมวด: ${d.subcategory} | เวอร์ชัน: ${d.version}`)
    .join("\n");

  const prompt = `คุณคือผู้ช่วยค้นหาเอกสารของบริษัทสินเชื่อ
ผู้ใช้ถาม: "${userQuery}"

รายการเอกสารที่มีในระบบ (เฉพาะ Active):
${activeDocsList}

ให้ตอบเป็น JSON array ของ doc_id ที่เกี่ยวข้อง เรียงตามความเกี่ยวข้องมากที่สุดก่อน
และเพิ่ม field "explanation" อธิบายสั้นๆ เป็นภาษาไทยว่าทำไมถึงแนะนำ

ตอบเฉพาะ JSON เท่านั้น ไม่ต้องมี markdown ตัวอย่างรูปแบบ:
[{"doc_id":"DOC-001","explanation":"เอกสารนี้เกี่ยวข้องกับ..."}]

ถ้าไม่พบเอกสารที่เกี่ยวข้อง ให้ตอบ []`;

  const result = await callGemini(prompt, { temperature: 0.2 });

  if (!result.success) {
    return { success: false, error: result.error, docs: [] };
  }

  try {
    // Clean the response — remove markdown code fences if present
    let cleaned = result.text.trim();
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed = JSON.parse(cleaned);

    const docs = parsed
      .map(item => {
        const doc = DOCUMENTS.find(d => d.doc_id === item.doc_id);
        return doc ? { ...doc, ai_explanation: item.explanation } : null;
      })
      .filter(Boolean);

    return { success: true, docs, rawResponse: result.text };
  } catch (e) {
    return { success: false, error: "ไม่สามารถแปลผลลัพธ์ได้", docs: [] };
  }
}

// ========================
// 2. Changelog Summarization
// ========================

async function summarizeChangelog(docTitle, oldVersion, newVersion, changeDetails) {
  const prompt = `คุณคือผู้เชี่ยวชาญเอกสารสินเชื่อ
สรุปการเปลี่ยนแปลงสำคัญของเอกสาร "${docTitle}"
จากเวอร์ชัน ${oldVersion} เป็น ${newVersion}

รายละเอียดการเปลี่ยนแปลง:
${changeDetails}

ให้สรุปเป็น 2-3 หัวข้อสั้นๆ ภาษาไทย แบบ bullet point
ใช้ภาษาเข้าใจง่าย เน้นสิ่งที่พนักงานสาขาต้องรู้
ตอบเป็นข้อความธรรมดา ไม่ต้องใช้ markdown`;

  return await callGemini(prompt, { temperature: 0.3, maxTokens: 512 });
}

// ========================
// 3. Chat Assistant
// ========================

async function chatWithAssistant(userMessage) {
  if (aiState.isProcessing) return { success: false, error: "กำลังประมวลผล..." };
  aiState.isProcessing = true;

  // Build document context
  const docContext = DOCUMENTS
    .filter(d => d.status === "active")
    .map(d => `• ${d.title} (${d.version}) — หมวด: ${d.subcategory} — มีผล: ${d.effective_date}`)
    .join("\n");

  const categoryContext = CATEGORIES
    .map(c => `${c.name}: ${c.subcategories.join(", ")}`)
    .join("\n");

  // Build conversation history (last 6 messages)
  const historyText = aiState.chatHistory.slice(-6).map(h =>
    `${h.role === "user" ? "ผู้ใช้" : "AI"}: ${h.text}`
  ).join("\n");

  const prompt = `คุณคือ "SmartDoc AI" ผู้ช่วยอัจฉริยะของศูนย์รวมเอกสารสาขาบริษัทสินเชื่อ
คุณช่วยพนักงานสาขาค้นหาเอกสาร ตอบคำถามเกี่ยวกับแบบฟอร์ม และแนะนำเอกสารที่ต้องใช้ในแต่ละกรณี

หมวดหมู่เอกสาร:
${categoryContext}

เอกสารที่ใช้งานอยู่:
${docContext}

${historyText ? `ประวัติสนทนา:\n${historyText}\n` : ""}
ผู้ใช้: ${userMessage}

กฎ:
- ตอบเป็นภาษาไทย กระชับ เข้าใจง่าย
- ถ้าแนะนำเอกสาร ให้ระบุชื่อเอกสาร เวอร์ชัน และหมวดหมู่
- ถ้าผู้ใช้ถามเรื่องที่ไม่เกี่ยวกับเอกสาร ให้บอกว่าช่วยได้เฉพาะเรื่องเอกสาร
- ไม่ต้องใช้ markdown ตอบเป็นข้อความธรรมดา`;

  const result = await callGemini(prompt, { temperature: 0.5, maxTokens: 800 });
  aiState.isProcessing = false;

  if (result.success) {
    aiState.chatHistory.push({ role: "user", text: userMessage });
    aiState.chatHistory.push({ role: "ai", text: result.text });
  }

  return result;
}

// ========================
// AI-Enhanced Search (integrates with existing search)
// ========================

async function aiEnhancedSearch(query) {
  // If query looks like natural language (has Thai particles, question marks, etc.)
  const isNaturalLanguage = /[ไหม|อะไร|ยังไง|ต้อง|ควร|ช่วย|แนะนำ|?]/.test(query) && query.length > 10;

  if (isNaturalLanguage && isGeminiConfigured()) {
    return await semanticSearch(query);
  }

  // Fallback: local keyword search
  return { success: true, docs: getFilteredDocuments(), isLocal: true };
}

// ========================
// Connection Test
// ========================

async function testGeminiConnection() {
  if (!isGeminiConfigured()) {
    return { success: false, error: "ยังไม่ได้ใส่ API Key" };
  }

  const result = await callGemini("ตอบคำว่า 'เชื่อมต่อสำเร็จ' เท่านั้น", {
    temperature: 0,
    maxTokens: 50
  });

  if (result.success) {
    aiState.isConnected = true;
  }

  return result;
}
