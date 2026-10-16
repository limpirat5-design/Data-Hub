/**
 * Email Template Hub — Standalone Module
 * Handles Realistic Email Rendering, Dynamic Auto-Categorization,
 * CRUD Operations via LocalStorage, Presentation Mode, and JSON Backup.
 */

// ==========================================================================
// 1. Initial Seed Templates (Matching User's Provided Images)
// ==========================================================================

const INITIAL_TEMPLATES = [
  {
    id: "tpl-001",
    title: "ขออนุมัติเบิกเล่มทะเบียนลูกค้าปิดบัญชี",
    category: "ปิดบัญชี & เบิกเล่ม",
    senderName: "Anusat Limpirat",
    senderAvatar: "AL",
    recipientName: "Nattawut Boonprakopporn (Arm)",
    timestamp: "ศ. 2026-10-09 15:13",
    rawBody: `เรียน ผู้อำนวยการเขต

สาขาเขาช่องพราน ขออนุมัติเบิกเล่มทะเบียนลูกค้าปิดบัญชี
• ลูกค้าชื่อ นาย จิรครินทร์ ลิ้มพิรัตน์
• เลขที่สัญญา 700003897045
• เลขทะเบียน บท 3493 ราชบุรี
• ลูกค้าปิดบัญชีวันที่ 08-10-2569
• ยอดปิด 135,650.25 บาท

สถานะ ในระบบ ปิดบัญชีเรียบร้อยครับ
เอกสารแนบเมล ใบเสร็จปิดบัญชี หน้าMobiusสถานะปิดบัญชี ใบรับสมุดปิดบัญชี สัญญากู้เงิน สาขาแนบเอกสารในระบบเรียบร้อยครับ`,
    attachmentType: "file",
    attachmentData: {
      fileName: "เอกสารปิดบัญชี จิรครินทร์ ลิ้มพิรัตน์.pdf",
      fileSize: "4 เมกะไบต์"
    },
    salutation: "เรียน ผู้อำนวยการเขต",
    subjectIntro: "สาขาเขาช่องพราน ขออนุมัติเบิกเล่มทะเบียนลูกค้าปิดบัญชี",
    bulletItems: [
      "ลูกค้าชื่อ นาย จิรครินทร์ ลิ้มพิรัตน์",
      "เลขที่สัญญา 700003897045",
      "เลขทะเบียน บท 3493 ราชบุรี",
      "ลูกค้าปิดบัญชีวันที่ 08-10-2569",
      "ยอดปิด 135,650.25 บาท"
    ],
    statusPrefix: "สถานะ ในระบบ",
    statusHighlight: "ปิดบัญชีเรียบร้อยครับ",
    footerNotes: "เอกสารแนบเมล ใบเสร็จปิดบัญชี หน้าMobiusสถานะปิดบัญชี ใบรับสมุดปิดบัญชี สัญญากู้เงิน สาขาแนบเอกสารในระบบเรียบร้อยครับ",
    createdAt: "2026-10-09T15:13:00"
  },
  {
    id: "tpl-002",
    title: "ขออนุมัติเปิดบัตรกดเงินไชโย (บัตรหาย)",
    category: "บัตรกดเงินไชโย",
    senderName: "Anusat Limpirat",
    senderAvatar: "AL",
    recipientName: "Nattawut Boonprakopporn (Arm)",
    timestamp: "ศ. 2026-10-09 11:41",
    rawBody: `เรียน ผู้อำนวยการเขต

สาขาเขาช่องพราน ขออนุมัติเปิดบัตรกดเงินไชโยให้ลูกค้า เนื่องจากบัตรหาย
• ลูกค้าชื่อ : น.ส พรรณิภา ทองมี
• เลขที่สัญญา 700004031823
• ยี่ห้อรถ Honda รุ่น Wave 110i
• สี เทา ปี 2021

สถานะ ในระบบ สาขาแนบเอกสารในระบบเรียบร้อยครับ
ลูกค้าประสงค์ขอออกบัตรกดเงินไชโยใบใหม่ สาขาได้ตรวจสอบบัตรประชาชนตัวจริงและข้อมูลในระบบเรียบร้อยแล้วครับ`,
    attachmentType: "gallery",
    attachmentData: {
      itemCount: 3,
      totalSize: "907 กิโลไบต์",
      cloudTarget: "OneDrive - Auto X Co.,Ltd.",
      images: [
        {
          label: "รูปถ่ายลูกค้าหน้าร้าน",
          url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
        },
        {
          label: "รูปบัตรกดเงินไชโย",
          url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80"
        },
        {
          label: "ใบคำขอเปิดบัตรใหม่",
          url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80"
        }
      ]
    },
    salutation: "เรียน ผู้อำนวยการเขต",
    subjectIntro: "สาขาเขาช่องพราน ขออนุมัติเปิดบัตรกดเงินไชโยให้ลูกค้า เนื่องจากบัตรหาย",
    bulletItems: [
      "ลูกค้าชื่อ : น.ส พรรณิภา ทองมี",
      "เลขที่สัญญา 700004031823",
      "ยี่ห้อรถ Honda รุ่น Wave 110i",
      "สี เทา ปี 2021"
    ],
    statusPrefix: "สถานะ ในระบบ",
    statusHighlight: "สาขาแนบเอกสารในระบบเรียบร้อยครับ",
    footerNotes: "ลูกค้าประสงค์ขอออกบัตรกดเงินไชโยใบใหม่ สาขาได้ตรวจสอบบัตรประชาชนตัวจริงและข้อมูลในระบบเรียบร้อยแล้วครับ",
    createdAt: "2026-10-09T11:41:00"
  },
  {
    id: "tpl-003",
    title: "ขออนุมัติปรับปรุงโครงสร้างหนี้ / ผ่อนผันค่างวด",
    category: "ปรับโครงสร้างหนี้ & ผ่อนผัน",
    senderName: "Anusat Limpirat",
    senderAvatar: "AL",
    recipientName: "Nattawut Boonprakopporn (Arm)",
    timestamp: "ศ. 2026-10-10 10:20",
    attachmentType: "file",
    attachmentData: {
      fileName: "แบบขอปรับปรุงโครงสร้างหนี้_สาขาเขาช่องพราน.pdf",
      fileSize: "2.8 เมกะไบต์"
    },
    salutation: "เรียน ผู้อำนวยการเขต",
    subjectIntro: "สาขาเขาช่องพราน ขออนุมัติปรับปรุงโครงสร้างหนี้และผ่อนผันค่างวดให้แก่ลูกค้า",
    bulletItems: [
      "ลูกค้าชื่อ นาย สมชาย มีสุข",
      "เลขที่สัญญา 700002948110",
      "ยอดหนี้คงเหลือ 85,400.00 บาท",
      "เงื่อนไขเดิม ค่างวด 4,200 บาท/เดือน",
      "ขอปรับเงื่อนไขใหม่ ขยายเวลา 12 งวด คงเหลือ 2,450 บาท/เดือน"
    ],
    statusPrefix: "สถานะ",
    statusHighlight: "รอผู้อำนวยการเขตพิจารณาอนุมัติครับ",
    footerNotes: "ลูกค้าได้รับผลกระทบจากภัยธรรมชาติ พืชผลทางการเกษตรเสียหาย จึงขอปรับลดค่างวดเพื่อคงสถานะปกติ",
    createdAt: "2026-10-10T10:20:00"
  },
  {
    id: "tpl-004",
    title: "ขออนุมัติเปลี่ยนแปลงเบอร์โทรศัพท์และที่อยู่ลูกค้า",
    category: "งานบริการ & เปลี่ยนแปลงข้อมูล",
    senderName: "Anusat Limpirat",
    senderAvatar: "AL",
    recipientName: "Nattawut Boonprakopporn (Arm)",
    timestamp: "ศ. 2026-10-12 14:05",
    attachmentType: "file",
    attachmentData: {
      fileName: "คำขอเปลี่ยนแปลงข้อมูลลูกค้า_แบบฟอร์มสาขา.pdf",
      fileSize: "1.5 เมกะไบต์"
    },
    salutation: "เรียน ผู้อำนวยการเขต",
    subjectIntro: "สาขาเขาช่องพราน ขออนุมัติเปลี่ยนแปลงข้อมูลการติดต่อในระบบให้แก่ลูกค้า",
    bulletItems: [
      "ลูกค้าชื่อ นาง อารีย์ รักสงบ",
      "เลขที่สัญญา 700005119283",
      "เบอร์โทรเดิม 081-xxx-4521 (ยกเลิกเบอร์แล้ว)",
      "ขอเปลี่ยนเป็นเบอร์ใหม่ 095-xxx-8874",
      "ตรวจสอบยืนยันตัวตนผ่าน OTP เรียบร้อย"
    ],
    statusPrefix: "สถานะ ในระบบ",
    statusHighlight: "บันทึกข้อมูลและแนบสำเนาบัตรประชาชนเรียบร้อยครับ",
    footerNotes: "สาขาได้ตรวจสอบลายมือชื่อตรงตามสัญญาเดิมทุกประการ",
    createdAt: "2026-10-12T14:05:00"
  }
];

// ==========================================================================
// 2. Auto-Categorization Engine (แยกหมวดหมู่อัตโนมัติจากคำสำคัญ)
// ==========================================================================

const CATEGORY_RULES = [
  {
    category: "ปิดบัญชี & เบิกเล่ม",
    keywords: ["ปิดบัญชี", "เบิกเล่ม", "เล่มทะเบียน", "ยอดปิด", "คืนเล่ม", "โอนเล่ม", "ถอนสลัก"]
  },
  {
    category: "บัตรกดเงินไชโย",
    keywords: ["บัตร", "บัตรกดเงิน", "บัตรหาย", "เปิดบัตร", "บัตรชำรุด", "รหัสบัตร", "atm", "card"]
  },
  {
    category: "ปรับโครงสร้างหนี้ & ผ่อนผัน",
    keywords: ["ปรับโครงสร้าง", "ผ่อนผัน", "ค่างวด", "พักชำระ", "ลดหนี้", "เบี้ยปรับ", "ประนอมหนี้", "ยืดงวด"]
  },
  {
    category: "งานบริการ & เปลี่ยนแปลงข้อมูล",
    keywords: ["เปลี่ยนเบอร์", "เปลี่ยนชื่อ", "เปลี่ยนที่อยู่", "ผู้ค้ำ", "แก้ไขข้อมูล", "เปลี่ยนแปลง", "ขอสเตทเม้นท์", "หนังสือรับรอง"]
  },
  {
    category: "สินเชื่อใหม่ & ทำสัญญา",
    keywords: ["สินเชื่อ", "ขยายวงเงิน", "ทำสัญญา", "จำนำทะเบียน", "กู้เพิ่ม", "สัญญาใหม่", "อนุมัติวงเงิน"]
  }
];

function detectCategoryAutomatically(text) {
  if (!text) return "ทั่วไป & เอกสารสาขา";
  const lower = text.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return rule.category;
      }
    }
  }
  return "ทั่วไป & เอกสารสาขา";
}

// ==========================================================================
// 3. Application State & Storage
// ==========================================================================

const STORAGE_KEY = "smart_doc_email_templates_v1";

let templates = [];
let activeTemplateId = null;
let currentFilterCategory = "all";
let currentSearchQuery = "";
let isSyncingFromCloud = false;

function loadTemplates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      templates = JSON.parse(raw);
    } else {
      templates = [...INITIAL_TEMPLATES];
      saveTemplates(false);
    }
  } catch (e) {
    console.error("Error reading localStorage", e);
    templates = [...INITIAL_TEMPLATES];
  }

  // Trigger Automatic Cloud Sync in background
  initCloudSync();
}

async function initCloudSync() {
  if (typeof isCloudConfigured !== "function" || !isCloudConfigured() || typeof fetchCloudEmailTemplates !== "function") {
    updateCloudStatusBadge("local");
    return;
  }

  updateCloudStatusBadge("syncing");

  try {
    const cloudRes = await fetchCloudEmailTemplates();
    if (cloudRes.success) {
      if (cloudRes.templates && Array.isArray(cloudRes.templates) && cloudRes.templates.length > 0) {
        // Cloud has existing templates! Load and cache in localStorage
        templates = cloudRes.templates;
        saveTemplates(false);
        renderCategoryPills();
        renderTemplateList();
        updateCloudStatusBadge("online");
        showToast("☁️ ซิงค์ข้อมูลล่าสุดจาก Cloud เรียบร้อย ทุกเครื่องเห็นตรงกัน");
      } else {
        // Cloud is empty, seed it with current templates from this machine
        await saveEmailTemplatesToCloud(templates);
        updateCloudStatusBadge("online");
      }
    } else {
      updateCloudStatusBadge("error");
    }

    // Subscribe to Realtime Updates from other machines
    if (typeof listenToEmailTemplatesRealtime === "function") {
      listenToEmailTemplatesRealtime((updatedTemplates) => {
        if (!Array.isArray(updatedTemplates)) return;
        isSyncingFromCloud = true;
        templates = updatedTemplates;
        saveTemplates(false);
        renderCategoryPills();
        renderTemplateList();
        isSyncingFromCloud = false;
        showToast("🔄 ได้รับข้อมูลรูปแบบอีเมลที่อัปเดตจากเครื่องอื่นแล้ว");
      });
    }
  } catch (err) {
    console.warn("Cloud sync exception:", err);
    updateCloudStatusBadge("error");
  }
}

function saveTemplates(pushToCloud = true) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (e) {
    console.error("Error saving localStorage", e);
    showToast("⚠️ ไม่สามารถบันทึกข้อมูลลงเครื่องได้");
  }

  // Synchronize to Cloud Database
  if (pushToCloud && !isSyncingFromCloud && typeof isCloudConfigured === "function" && isCloudConfigured() && typeof saveEmailTemplatesToCloud === "function") {
    updateCloudStatusBadge("syncing");
    saveEmailTemplatesToCloud(templates).then(res => {
      if (res && res.success) {
        updateCloudStatusBadge("online");
      } else {
        updateCloudStatusBadge("error");
      }
    });
  }
}

function updateCloudStatusBadge(status) {
  const badge = document.getElementById("email-cloud-status-badge");
  if (!badge) return;

  if (status === "online") {
    badge.className = "cloud-sync-badge online";
    badge.innerHTML = `<span class="cloud-sync-dot"></span><span>☁️ Cloud ซิงค์ทุกเครื่อง</span>`;
    badge.title = "เชื่อมต่อ Cloud Database สำเร็จ ทุกเครื่องเห็นข้อมูลเดียวกันแบบ Real-time";
  } else if (status === "syncing") {
    badge.className = "cloud-sync-badge syncing";
    badge.innerHTML = `<span class="cloud-sync-dot"></span><span>🔄 กำลังซิงค์...</span>`;
    badge.title = "กำลังรับ-ส่งข้อมูลกับ Cloud Database กลาง";
  } else if (status === "error") {
    badge.className = "cloud-sync-badge error";
    badge.innerHTML = `<span class="cloud-sync-dot"></span><span>⚠️ โหมดในเครื่อง (เน็ตขัดข้อง)</span>`;
    badge.title = "ไม่สามารถเชื่อมต่อ Cloud ได้ ระบบจะบันทึกในเครื่องแทน";
  } else {
    badge.className = "cloud-sync-badge local";
    badge.innerHTML = `<span>💾 โหมดในเครื่อง</span>`;
    badge.title = "ทำงานในเครื่อง";
  }
}

// Helper: Reconstruct clean plain text from template object
function generateRawBodyFromTemplate(t) {
  if (t.rawBody) return t.rawBody;
  let text = "";
  if (t.salutation) text += `${t.salutation}\n\n`;
  if (t.subjectIntro) text += `${t.subjectIntro}\n`;
  if (t.bulletItems && t.bulletItems.length > 0) {
    t.bulletItems.forEach(b => {
      text += `• ${b}\n`;
    });
  }
  if (t.statusHighlight) {
    text += `\n${t.statusPrefix || 'สถานะ ในระบบ'} ${t.statusHighlight}\n`;
  }
  if (t.footerNotes) {
    text += `${t.footerNotes}\n`;
  }
  return text.trim();
}

// Helper: Auto extract title and category from pasted email text
function autoExtractTitleAndCategoryFromRaw(text) {
  if (!text) return;
  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return;

  const titleInput = document.getElementById("form-title");
  const catInput = document.getElementById("form-category");
  const autoBadge = document.getElementById("auto-detected-badge");

  if (titleInput && (!titleInput.value || titleInput.dataset.autofilled === "true")) {
    let candidate = lines[0];
    if (candidate.startsWith("เรียน") && lines.length > 1) {
      candidate = lines[1];
    }
    candidate = candidate.replace(/^[\•\-\*\d\.\s]+/, "").trim();
    if (candidate) {
      titleInput.value = candidate.slice(0, 75);
      titleInput.dataset.autofilled = "true";
    }
  }

  if (catInput && (!catInput.value || catInput.dataset.autofilled === "true")) {
    const detected = detectCategoryAutomatically(text);
    catInput.value = detected;
    catInput.dataset.autofilled = "true";
    if (autoBadge) autoBadge.style.display = "inline";
  }
}

// ==========================================================================
// 4. UI Rendering Functions
// ==========================================================================

function renderCategoryPills() {
  const container = document.getElementById("category-pills");
  if (!container) return;

  // Aggregate category counts dynamically
  const counts = { all: templates.length };
  templates.forEach(t => {
    const cat = t.category || "ทั่วไป & เอกสารสาขา";
    counts[cat] = (counts[cat] || 0) + 1;
  });

  const categories = Object.keys(counts).filter(c => c !== "all");

  let html = `
    <button class="cat-pill ${currentFilterCategory === 'all' ? 'active' : ''}" data-cat="all">
      <span>ทั้งหมด</span>
      <span class="cat-pill-count">(${counts.all})</span>
    </button>
  `;

  categories.forEach(cat => {
    const isActive = currentFilterCategory === cat;
    html += `
      <button class="cat-pill ${isActive ? 'active' : ''}" data-cat="${escapeHtml(cat)}">
        <span>${escapeHtml(cat)}</span>
        <span class="cat-pill-count">(${counts[cat]})</span>
      </button>
    `;
  });

  container.innerHTML = html;

  // Add click listeners
  container.querySelectorAll(".cat-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilterCategory = btn.getAttribute("data-cat");
      renderCategoryPills();
      renderTemplateList();
    });
  });
}

function renderTemplateList() {
  const listEl = document.getElementById("template-list");
  const emptyEl = document.getElementById("empty-list");
  const countEl = document.getElementById("total-template-count");

  if (!listEl) return;

  // Filter templates
  const filtered = templates.filter(t => {
    const matchCat = currentFilterCategory === "all" || t.category === currentFilterCategory;
    const q = currentSearchQuery.trim().toLowerCase();
    const matchSearch = !q || 
      t.title.toLowerCase().includes(q) ||
      (t.category && t.category.toLowerCase().includes(q)) ||
      (t.subjectIntro && t.subjectIntro.toLowerCase().includes(q)) ||
      (t.bulletItems && t.bulletItems.some(b => b.toLowerCase().includes(q)));
    return matchCat && matchSearch;
  });

  if (countEl) countEl.textContent = `${filtered.length} รายการ`;
  const secBadge = document.getElementById("email-section-count-badge");
  if (secBadge) secBadge.textContent = `${filtered.length} รูปแบบ`;

  if (filtered.length === 0) {
    listEl.innerHTML = "";
    emptyEl.style.display = "block";
    return;
  }

  emptyEl.style.display = "none";

  // If no active template, select first
  if (!templates.some(t => t.id === activeTemplateId)) {
    activeTemplateId = filtered[0] ? filtered[0].id : null;
  }

  let html = "";
  filtered.forEach(t => {
    const isActive = t.id === activeTemplateId;
    const snippet = t.subjectIntro || (t.bulletItems && t.bulletItems[0]) || "";
    const attachBadge = t.attachmentType === "gallery" 
      ? "🖼️ รูปแนบ 3 รูป" 
      : (t.attachmentType === "file" ? "📄 แนบ PDF" : "✉️ ข้อความล้วน");

    html += `
      <div class="template-item-card ${isActive ? 'active' : ''}" data-id="${t.id}">
        <div class="item-top">
          <span class="item-title">${escapeHtml(t.title)}</span>
          <span class="item-cat-tag">${escapeHtml(t.category || "ทั่วไป")}</span>
        </div>
        <div class="item-snippet">${escapeHtml(snippet)}</div>
        <div class="item-bottom">
          <span class="item-badge-pill">${attachBadge}</span>
          <span>${escapeHtml(t.timestamp || "")}</span>
        </div>
      </div>
    `;
  });

  listEl.innerHTML = html;

  // Click handler
  listEl.querySelectorAll(".template-item-card").forEach(card => {
    card.addEventListener("click", () => {
      activeTemplateId = card.getAttribute("data-id");
      renderTemplateList();
      renderActiveEmail();
    });
  });

  renderActiveEmail();
}

// Render the Active Realistic Email View
function renderActiveEmail() {
  const emptyState = document.getElementById("mail-empty-state");
  const cardContent = document.getElementById("mail-card-content");
  const catBadge = document.getElementById("preview-category-badge");
  const btnClearSample = document.getElementById("btn-clear-sample");
  const btnRestoreSample = document.getElementById("btn-restore-sample");

  // Show/Hide Clear/Restore sample buttons
  if (templates.length === 0) {
    if (btnClearSample) btnClearSample.style.display = "none";
    if (btnRestoreSample) btnRestoreSample.style.display = "inline-flex";
  } else {
    if (btnClearSample) btnClearSample.style.display = "inline-flex";
    if (btnRestoreSample) btnRestoreSample.style.display = "none";
  }

  const t = templates.find(item => item.id === activeTemplateId);

  // If no template is active / empty state
  if (!t) {
    if (emptyState) emptyState.style.display = "block";
    if (cardContent) cardContent.style.display = "none";
    if (catBadge) catBadge.textContent = "หน้าเปล่า";

    // Dim actions
    ["btn-copy-email", "btn-edit-current", "btn-duplicate-current", "btn-delete-current"].forEach(id => {
      const b = document.getElementById(id);
      if (b) {
        b.style.opacity = "0.35";
        b.style.pointerEvents = "none";
      }
    });
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (cardContent) cardContent.style.display = "block";

  // Enable actions
  ["btn-copy-email", "btn-edit-current", "btn-duplicate-current", "btn-delete-current"].forEach(id => {
    const b = document.getElementById(id);
    if (b) {
      b.style.opacity = "1";
      b.style.pointerEvents = "auto";
    }
  });

  // Update Toolbar Category
  if (catBadge) catBadge.textContent = t.category || "แบบฟอร์มสาขา";

  // 1. Header
  const avatar = document.getElementById("view-avatar");
  if (avatar) avatar.textContent = t.senderAvatar || "AL";

  const senderName = document.getElementById("view-sender-name");
  if (senderName) senderName.textContent = t.senderName || "Anusat Limpirat";

  const recipientName = document.getElementById("view-recipient-name");
  if (recipientName) recipientName.textContent = t.recipientName || "Nattawut Boonprakopporn (Arm)";

  const timestamp = document.getElementById("view-timestamp");
  if (timestamp) timestamp.textContent = t.timestamp || formatCurrentThaiDate();

  // 2. Attachments
  const attachContainer = document.getElementById("mail-attachments-container");
  if (attachContainer) {
    if (t.attachmentType === "file") {
      const fileName = (t.attachmentData && t.attachmentData.fileName) || `${t.title || 'เอกสาร'}.pdf`;
      const fileSize = (t.attachmentData && t.attachmentData.fileSize) || "4 เมกะไบต์";
      attachContainer.innerHTML = `
        <div class="attachment-pill-card" title="คลิกเพื่อดาวน์โหลดเอกสาร">
          <div class="pdf-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
          </div>
          <div class="attachment-info">
            <span class="attachment-filename">${escapeHtml(fileName)}</span>
            <span class="attachment-size">${escapeHtml(fileSize)}</span>
          </div>
          <span class="attachment-arrow">▼</span>
        </div>
      `;
    } else if (t.attachmentType === "gallery") {
      const images = (t.attachmentData && t.attachmentData.images) || [];
      const count = (t.attachmentData && t.attachmentData.itemCount) || images.length;
      const size = (t.attachmentData && t.attachmentData.totalSize) || "907 กิโลไบต์";
      const cloud = (t.attachmentData && t.attachmentData.cloudTarget) || "OneDrive - Auto X Co.,Ltd.";

      let imgHtml = "";
      images.forEach((img) => {
        imgHtml += `
          <div class="gallery-item" data-url="${escapeHtml(img.url)}" data-caption="${escapeHtml(img.label || 'รูปภาพแนบ')}">
            <img src="${escapeHtml(img.url)}" alt="${escapeHtml(img.label || 'รูปภาพ')}">
            <div class="gallery-caption-overlay">${escapeHtml(img.label || '')}</div>
          </div>
        `;
      });

      attachContainer.innerHTML = `
        <div class="image-gallery-container">
          <div class="gallery-grid">
            ${imgHtml}
          </div>
          <div class="gallery-meta-bar">
            <span>สิ่งที่แนบมา ${count} รายการ (${size})</span>
            <span class="gallery-action-link" title="บันทึกไฟล์ทั้งหมด">
              ☁ บันทึกทั้งหมดไปยัง ${cloud}
            </span>
            <span class="gallery-action-link" title="ดาวน์โหลดภาพทั้งหมด">
              ↓ ดาวน์โหลดทั้งหมด
            </span>
          </div>
        </div>
      `;

      attachContainer.querySelectorAll(".gallery-item").forEach(item => {
        item.addEventListener("click", () => {
          openLightbox(item.getAttribute("data-url"), item.getAttribute("data-caption"));
        });
      });
    } else {
      attachContainer.innerHTML = "";
    }
  }

  // 3. Body Content (Render rich formatted HTML or fallback to raw email text)
  const bodyContainer = document.getElementById("mail-body-content");
  if (bodyContainer) {
    if (t.richBody) {
      bodyContainer.innerHTML = t.richBody;
    } else if (t.rawBody) {
      bodyContainer.innerHTML = renderRawEmailBody(t.rawBody);
    } else {
      let bulletHtml = "";
      if (t.bulletItems && t.bulletItems.length > 0) {
        bulletHtml = `<ul class="mail-bullet-list">`;
        t.bulletItems.forEach(item => {
          bulletHtml += `<li>${formatBulletText(item)}</li>`;
        });
        bulletHtml += `</ul>`;
      }

      let statusHtml = "";
      if (t.statusHighlight) {
        statusHtml = `
          <div class="mail-status-box">
            <div class="status-highlight-line">
              <span>${escapeHtml(t.statusPrefix || 'สถานะ')}</span>
              <span class="status-highlight-text">${escapeHtml(t.statusHighlight)}</span>
            </div>
            ${t.footerNotes ? `<div class="mail-footer-notes">${escapeHtml(t.footerNotes)}</div>` : ''}
          </div>
        `;
      }

      bodyContainer.innerHTML = `
        <div class="mail-salutation">${escapeHtml(t.salutation || 'เรียน ผู้อำนวยการเขต')}</div>
        <div class="mail-subject-intro">${escapeHtml(t.subjectIntro || '')}</div>
        ${bulletHtml}
        ${statusHtml}
      `;
    }
  }
}

// Render raw pasted email preserving line breaks, bullets, and highlighting
function renderRawEmailBody(rawText) {
  if (!rawText) return "";
  const lines = rawText.split("\n");
  let html = "";
  let insideBulletList = false;

  function closeListIfNeeded() {
    if (insideBulletList) {
      html += "</ul>";
      insideBulletList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      closeListIfNeeded();
      html += `<div style="height: 10px;"></div>`;
      continue;
    }

    // Salutation: e.g. "เรียน ผู้อำนวยการเขต"
    if (trimmed.startsWith("เรียน") && i < 3) {
      closeListIfNeeded();
      html += `<div class="mail-salutation">${escapeHtml(trimmed)}</div>`;
      continue;
    }

    // Bullet item line: starts with •, -, *, or digit dot
    const bulletMatch = trimmed.match(/^[\•\-\*]\s*(.+)$/);
    if (bulletMatch) {
      if (!insideBulletList) {
        html += `<ul class="mail-bullet-list">`;
        insideBulletList = true;
      }
      html += `<li>${formatBulletText(bulletMatch[1])}</li>`;
      continue;
    }

    // Status highlight: contains "สถานะ"
    if (trimmed.includes("สถานะ")) {
      closeListIfNeeded();
      let prefix = "สถานะ";
      let highlight = trimmed;
      if (trimmed.includes(":")) {
        const parts = trimmed.split(":");
        prefix = parts[0].trim();
        highlight = parts.slice(1).join(":").trim();
      } else if (trimmed.startsWith("สถานะ ในระบบ")) {
        prefix = "สถานะ ในระบบ";
        highlight = trimmed.replace("สถานะ ในระบบ", "").trim();
      } else if (trimmed.startsWith("สถานะ")) {
        prefix = "สถานะ";
        highlight = trimmed.replace("สถานะ", "").trim();
      }
      html += `
        <div class="mail-status-box" style="margin-top:14px;padding-top:12px;border-top:1px dashed #e2e8f0;">
          <div class="status-highlight-line" style="font-size:15px;margin-bottom:4px;">
            <span>${escapeHtml(prefix)} </span>
            <span class="status-highlight-text" style="color:#d93829;font-weight:700;">${escapeHtml(highlight || trimmed)}</span>
          </div>
        </div>
      `;
      continue;
    }

    // Normal paragraph line
    closeListIfNeeded();
    html += `<p style="margin-bottom:8px;font-size:15px;line-height:1.65;color:#24292f;">${formatBulletText(trimmed)}</p>`;
  }

  closeListIfNeeded();
  return html;
}

// Smart formatter for bullet points (make numbers/amounts bold like in sample)
function formatBulletText(str) {
  if (!str) return "";
  let formatted = escapeHtml(str);

  // Bold numbers with 8+ digits (like contract number 700003897045)
  formatted = formatted.replace(/(\b\d{8,15}\b)/g, '<strong>$1</strong>');
  
  // Bold money amounts (e.g. 135,650.25 บาท)
  formatted = formatted.replace(/([\d,]+\.\d{2})/g, '<strong>$1</strong>');

  // Bold car brand/model if present
  formatted = formatted.replace(/(Honda|Toyota|Isuzu|Yamaha|Wave 110i|D-Max|Yaris)/gi, '<strong>$1</strong>');

  return formatted;
}

// ==========================================================================
// 5. Modal & Form Handling (Create & Edit Templates)
// ==========================================================================

function openEditModal(templateToEdit = null) {
  const modal = document.getElementById("edit-modal");
  const modalTitle = document.getElementById("modal-title");
  const form = document.getElementById("template-form");

  if (!modal || !form) return;

  form.reset();

  const titleInput = document.getElementById("form-title");
  const catInput = document.getElementById("form-category");
  const rawBodyInput = document.getElementById("form-raw-body");
  const autoBadge = document.getElementById("auto-detected-badge");

  if (titleInput) titleInput.dataset.autofilled = "false";
  if (catInput) catInput.dataset.autofilled = "false";
  if (autoBadge) autoBadge.style.display = "none";

  if (templateToEdit) {
    if (modalTitle) modalTitle.textContent = "✏️ แก้ไขรูปแบบอีเมล";
    document.getElementById("form-template-id").value = templateToEdit.id;
    if (titleInput) titleInput.value = templateToEdit.title || "";
    if (catInput) catInput.value = templateToEdit.category || "";
    if (rawBodyInput) rawBodyInput.value = templateToEdit.rawBody || generateRawBodyFromTemplate(templateToEdit);

    const senderInput = document.getElementById("form-sender");
    if (senderInput) senderInput.value = templateToEdit.senderName || "Anusat Limpirat";
    const avatarInput = document.getElementById("form-sender-avatar");
    if (avatarInput) avatarInput.value = templateToEdit.senderAvatar || "AL";
    const recipientInput = document.getElementById("form-recipient");
    if (recipientInput) recipientInput.value = templateToEdit.recipientName || "Nattawut Boonprakopporn (Arm)";

    // Rich Editor content
    const richEditor = document.getElementById("form-rich-editor");
    if (richEditor) {
      richEditor.innerHTML = templateToEdit.richBody || renderRawEmailBody(templateToEdit.rawBody || generateRawBodyFromTemplate(templateToEdit));
    }

    const attachType = templateToEdit.attachmentType || "none";
    const radio = document.querySelector(`input[name="attachment_type"][value="${attachType}"]`);
    if (radio) radio.checked = true;

    if (attachType === "file" && templateToEdit.attachmentData) {
      const docName = document.getElementById("form-doc-name");
      if (docName) docName.value = templateToEdit.attachmentData.fileName || "";
      const docSize = document.getElementById("form-doc-size");
      if (docSize) docSize.value = templateToEdit.attachmentData.fileSize || "";
    }
  } else {
    if (modalTitle) modalTitle.textContent = "📝 วางข้อความอีเมล & จัดรูปแบบสี (หน้าเปล่า)";
    document.getElementById("form-template-id").value = "";
    if (titleInput) titleInput.value = "";
    if (catInput) catInput.value = "";
    if (rawBodyInput) rawBodyInput.value = "";

    const richEditor = document.getElementById("form-rich-editor");
    if (richEditor) richEditor.innerHTML = "";

    const senderInput = document.getElementById("form-sender");
    if (senderInput) senderInput.value = "Anusat Limpirat";
    const avatarInput = document.getElementById("form-sender-avatar");
    if (avatarInput) avatarInput.value = "AL";
    const recipientInput = document.getElementById("form-recipient");
    if (recipientInput) recipientInput.value = "Nattawut Boonprakopporn (Arm)";

    const radioNone = document.querySelector(`input[name="attachment_type"][value="none"]`);
    if (radioNone) radioNone.checked = true;
  }

  toggleAttachmentFields();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Auto-focus richEditor directly so user can immediately paste with Ctrl+V!
  setTimeout(() => {
    const richEditor = document.getElementById("form-rich-editor");
    if (richEditor) {
      richEditor.focus();
    } else if (rawBodyInput) {
      rawBodyInput.focus();
    }
  }, 100);
}

function closeEditModal() {
  const modal = document.getElementById("edit-modal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

function toggleAttachmentFields() {
  const checked = document.querySelector('input[name="attachment_type"]:checked');
  const type = checked ? checked.value : "none";

  const fileFields = document.getElementById("attachment-file-fields");
  const galleryFields = document.getElementById("attachment-gallery-fields");

  if (fileFields) fileFields.style.display = type === "file" ? "block" : "none";
  if (galleryFields) galleryFields.style.display = type === "gallery" ? "block" : "none";
}

function saveTemplateFromForm() {
  const richEditor = document.getElementById("form-rich-editor");
  const rawBodyInput = document.getElementById("form-raw-body");
  
  const richBody = richEditor ? richEditor.innerHTML.trim() : "";
  const rawBody = richEditor ? richEditor.innerText.trim() : (rawBodyInput ? rawBodyInput.value.trim() : "");

  let title = document.getElementById("form-title").value.trim();
  if (!title) {
    if (rawBody) {
      const lines = rawBody.split("\n").map(l => l.trim()).filter(l => l.length > 0);
      let candidate = lines[0];
      if (candidate.startsWith("เรียน") && lines.length > 1) {
        candidate = lines[1];
      }
      candidate = candidate.replace(/^[\•\-\*\d\.\s]+/, "").trim();
      title = candidate.slice(0, 75) || `อีเมลบันทึก ${formatCurrentThaiDate()}`;
    } else {
      showToast("⚠️ กรุณาวางข้อความอีเมลหรือระบุชื่อเรื่อง");
      if (richEditor) richEditor.focus();
      return;
    }
  }

  const idInput = document.getElementById("form-template-id").value;
  const isEdit = !!idInput;
  const id = isEdit ? idInput : "tpl-" + Date.now();

  let category = document.getElementById("form-category").value.trim();
  if (!category) {
    category = detectCategoryAutomatically(rawBody || title);
  }

  const senderName = document.getElementById("form-sender")?.value.trim() || "Anusat Limpirat";
  const senderAvatar = document.getElementById("form-sender-avatar")?.value.trim() || "AL";
  const recipientName = document.getElementById("form-recipient")?.value.trim() || "Nattawut Boonprakopporn (Arm)";

  // Parse details from rawBody for fallback & search compatibility
  let salutation = "เรียน ผู้อำนวยการเขต";
  let subjectIntro = "";
  const bulletItems = [];
  let statusHighlight = "";
  let statusPrefix = "สถานะ ในระบบ";

  if (rawBody) {
    const rawLines = rawBody.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    rawLines.forEach((l, idx) => {
      if (l.startsWith("เรียน") && idx < 2) {
        salutation = l;
      } else if (l.match(/^[\•\-\*]/)) {
        bulletItems.push(l.replace(/^[\•\-\*]\s*/, ""));
      } else if (l.includes("สถานะ")) {
        statusHighlight = l;
      } else if (!subjectIntro && !l.startsWith("เรียน")) {
        subjectIntro = l;
      }
    });
  }

  // Attachment
  const checkedType = document.querySelector('input[name="attachment_type"]:checked');
  const attachmentType = checkedType ? checkedType.value : "none";
  let attachmentData = null;

  if (attachmentType === "file") {
    attachmentData = {
      fileName: document.getElementById("form-doc-name")?.value.trim() || `${title}.pdf`,
      fileSize: document.getElementById("form-doc-size")?.value.trim() || "3.5 เมกะไบต์"
    };
  } else if (attachmentType === "gallery") {
    attachmentData = {
      itemCount: 3,
      totalSize: "907 กิโลไบต์",
      cloudTarget: "OneDrive - Auto X Co.,Ltd.",
      images: [
        {
          label: document.getElementById("form-img1-label")?.value.trim() || "รูปถ่ายลูกค้าหน้าร้าน",
          url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
        },
        {
          label: document.getElementById("form-img2-label")?.value.trim() || "รูปบัตรกดเงินไชโย",
          url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80"
        },
        {
          label: document.getElementById("form-img3-label")?.value.trim() || "ใบคำขอเปิดบัตรใหม่",
          url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80"
        }
      ]
    };
  }

  const templateData = {
    id,
    title,
    category,
    senderName,
    senderAvatar,
    recipientName,
    rawBody,
    richBody,
    salutation,
    subjectIntro,
    bulletItems,
    statusPrefix,
    statusHighlight,
    attachmentType,
    attachmentData,
    timestamp: formatCurrentThaiDate(),
    updatedAt: new Date().toISOString()
  };

  if (isEdit) {
    const idx = templates.findIndex(t => t.id === id);
    if (idx !== -1) {
      templates[idx] = { ...templates[idx], ...templateData };
    }
    showToast("✓ บันทึกการแก้ไขเรียบร้อย");
  } else {
    templates.unshift(templateData);
    activeTemplateId = id;
    showToast("✓ บันทึกรวบรวมอีเมลเรียบร้อย");
  }

  saveTemplates();
  closeEditModal();
  renderCategoryPills();
  renderTemplateList();
  if (typeof renderCategories === "function") {
    renderCategories();
  }
}

function duplicateCurrentTemplate() {
  const current = templates.find(t => t.id === activeTemplateId);
  if (!current) return;

  const copy = JSON.parse(JSON.stringify(current));
  copy.id = "tpl-" + Date.now();
  copy.title = `${copy.title} (สำเนา)`;
  copy.timestamp = formatCurrentThaiDate();
  
  templates.unshift(copy);
  activeTemplateId = copy.id;
  saveTemplates();
  renderCategoryPills();
  renderTemplateList();
  showToast("✓ คัดลอกสร้างเทมเพลตใหม่แล้ว");
}

function deleteCurrentTemplate() {
  const current = templates.find(t => t.id === activeTemplateId);
  if (!current) return;

  if (confirm(`คุณต้องการลบเทมเพลต "${current.title}" หรือไม่?`)) {
    templates = templates.filter(t => t.id !== current.id);
    activeTemplateId = templates.length > 0 ? templates[0].id : null;
    saveTemplates();
    renderCategoryPills();
    renderTemplateList();
    if (typeof renderCategories === "function") {
      renderCategories();
    }
    showToast("✓ ลบเทมเพลตเรียบร้อย");
  }
}

function clearToBlankState() {
  if (confirm("ต้องการล้างแม่แบบตัวอย่างออกทั้งหมด เพื่อเริ่มเก็บรวบรวมอีเมลของคุณเองจากหน้าเปล่าหรือไม่?")) {
    templates = [];
    activeTemplateId = null;
    saveTemplates();
    renderCategoryPills();
    renderTemplateList();
    if (typeof renderCategories === "function") {
      renderCategories();
    }
    showToast("✨ เริ่มต้นหน้าเปล่าเรียบร้อย แปะอีเมลของคุณได้เลย");
  }
}

function restoreSampleTemplates() {
  templates = JSON.parse(JSON.stringify(INITIAL_TEMPLATES));
  activeTemplateId = templates.length > 0 ? templates[0].id : null;
  saveTemplates();
  renderCategoryPills();
  renderTemplateList();
  if (typeof renderCategories === "function") {
    renderCategories();
  }
  showToast("🔄 โหลดแม่แบบตัวอย่างกลับมาแล้ว");
}

// ==========================================================================
// 6. Copy to Clipboard (Outlook Rich Text & Plain Text)
// ==========================================================================

async function copyCurrentEmailToClipboard() {
  const t = templates.find(item => item.id === activeTemplateId);
  if (!t) return;

  const plain = t.rawBody || generateRawBodyFromTemplate(t);
  const html = t.richBody || renderRawEmailBody(plain);

  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const blobHtml = new Blob([html], { type: "text/html" });
      const blobText = new Blob([plain], { type: "text/plain" });
      const item = new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText
      });
      await navigator.clipboard.write([item]);
      showToast("📋 คัดลอกพร้อมฟอร์แมตสีแล้ว! วางใน Outlook ได้สวยงามทันที");
      return;
    }
    await navigator.clipboard.writeText(plain);
    showToast("📋 คัดลอกข้อความแล้ว! วางใน Outlook ได้ทันที");
  } catch (err) {
    const textarea = document.createElement("textarea");
    textarea.value = plain;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast("📋 คัดลอกข้อความแล้ว!");
  }
}

// ==========================================================================
// 7. Presentation Mode (Fullscreen / Focus)
// ==========================================================================

function togglePresentationMode(enable) {
  const exitBar = document.getElementById("presentation-exit-bar");
  if (enable) {
    document.body.classList.add("presentation-mode");
    if (exitBar) exitBar.style.display = "flex";
    showToast("📺 เข้าสู่โหมดนำเสนอ (กด Esc เพื่อออก)");
  } else {
    document.body.classList.remove("presentation-mode");
    if (exitBar) exitBar.style.display = "none";
  }
}

// ==========================================================================
// 8. Lightbox Handler
// ==========================================================================

function openLightbox(url, caption) {
  const overlay = document.getElementById("lightbox-overlay");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  if (!overlay || !img) return;

  img.src = url;
  if (cap) cap.textContent = caption || "";
  overlay.style.display = "flex";
}

function closeLightbox() {
  const overlay = document.getElementById("lightbox-overlay");
  if (overlay) overlay.style.display = "none";
}

// ==========================================================================
// 9. Backup & Restore (JSON Export / Import)
// ==========================================================================

function exportBackupJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(templates, null, 2));
  const a = document.createElement("a");
  a.setAttribute("href", dataStr);
  const date = new Date().toISOString().slice(0, 10);
  a.setAttribute("download", `Email_Templates_Backup_${date}.json`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("💾 สำรองข้อมูลเป็นไฟล์ JSON สำเร็จ");
}

function importBackupJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        templates = imported;
        saveTemplates();
        renderCategoryPills();
        renderTemplateList();
        showToast("✓ กู้คืนข้อมูลแบบฟอร์มสำเร็จ");
      } else {
        alert("ไฟล์ JSON ไม่ถูกต้องตามรูปแบบ");
      }
    } catch (err) {
      alert("ไม่สามารถอ่านไฟล์ JSON ได้: " + err.message);
    }
  };
  reader.readAsText(file, "UTF-8");
  event.target.value = "";
}

// ==========================================================================
// 10. Helper Utilities
// ==========================================================================

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCurrentThaiDate() {
  const days = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
  const now = new Date();
  const dayName = days[now.getDay()];
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `${dayName} ${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

// ==========================================================================
// 11. Event Listeners Setup
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadTemplates();
  renderCategoryPills();
  renderTemplateList();

  // Search input
  const searchInput = document.getElementById("global-search");
  const clearSearchBtn = document.getElementById("clear-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = currentSearchQuery ? "inline-block" : "none";
      }
      renderTemplateList();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      currentSearchQuery = "";
      clearSearchBtn.style.display = "none";
      renderTemplateList();
    });
  }

  // Buttons in Toolbar & Header
  document.getElementById("btn-new-template")?.addEventListener("click", () => openEditModal());
  document.getElementById("btn-edit-current")?.addEventListener("click", () => {
    const cur = templates.find(t => t.id === activeTemplateId);
    if (cur) openEditModal(cur);
  });
  document.getElementById("btn-duplicate-current")?.addEventListener("click", duplicateCurrentTemplate);
  document.getElementById("btn-delete-current")?.addEventListener("click", deleteCurrentTemplate);
  document.getElementById("btn-copy-email")?.addEventListener("click", copyCurrentEmailToClipboard);
  document.getElementById("btn-clear-sample")?.addEventListener("click", clearToBlankState);
  document.getElementById("btn-restore-sample")?.addEventListener("click", restoreSampleTemplates);
  document.getElementById("btn-empty-add-first")?.addEventListener("click", () => openEditModal());
  document.getElementById("btn-empty-restore-samples")?.addEventListener("click", restoreSampleTemplates);

  // Paste raw text auto title & category detection in rich editor
  const richEditor = document.getElementById("form-rich-editor");
  const rawBodyInput = document.getElementById("form-raw-body");

  if (richEditor) {
    richEditor.addEventListener("input", () => {
      const text = richEditor.innerText;
      if (rawBodyInput) rawBodyInput.value = text;
      autoExtractTitleAndCategoryFromRaw(text);
    });

    richEditor.addEventListener("paste", () => {
      setTimeout(() => {
        const text = richEditor.innerText;
        if (rawBodyInput) rawBodyInput.value = text;
        autoExtractTitleAndCategoryFromRaw(text);
      }, 50);
    });
  }

  if (rawBodyInput) {
    rawBodyInput.addEventListener("input", () => {
      autoExtractTitleAndCategoryFromRaw(rawBodyInput.value);
    });
  }

  // --- Rich Formatting Toolbar Handlers ---
  // 1. Text commands (Bold, Italic, Underline, Bullet)
  document.querySelectorAll(".fmt-tool-btn[data-cmd]").forEach(btn => {
    btn.addEventListener("mousedown", (e) => {
      e.preventDefault(); // Keep selection
      const cmd = btn.getAttribute("data-cmd");
      document.execCommand(cmd, false, null);
    });
  });

  // 2. Color dots
  document.querySelectorAll(".fmt-color-dot[data-color]").forEach(dot => {
    dot.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const color = dot.getAttribute("data-color");
      document.execCommand("foreColor", false, color);
    });
  });

  // 3. Custom text color picker
  const pickerColor = document.getElementById("picker-text-color");
  if (pickerColor) {
    pickerColor.addEventListener("input", (e) => {
      document.execCommand("foreColor", false, e.target.value);
    });
  }

  // 4. Highlight dots
  document.querySelectorAll(".fmt-hl-dot[data-hl]").forEach(dot => {
    dot.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const hl = dot.getAttribute("data-hl");
      if (hl === "transparent") {
        document.execCommand("removeFormat", false, null);
      } else {
        document.execCommand("hiliteColor", false, hl);
      }
    });
  });

  // 5. Quick template insertion chips
  document.querySelectorAll(".fmt-chip[data-insert]").forEach(chip => {
    chip.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const snippet = chip.getAttribute("data-insert");
      if (snippet === "• ") {
        document.execCommand("insertUnorderedList", false, null);
      } else {
        document.execCommand("insertHTML", false, ` ${snippet} `);
      }
    });
  });

  // 6. Magic Auto-Format Button
  document.getElementById("btn-magic-format")?.addEventListener("click", () => {
    if (!richEditor) return;
    const currentText = richEditor.innerText.trim();
    if (!currentText) {
      showToast("⚠️ กรุณาวางหรือพิมพ์ข้อความก่อนจัดรูปแบบ");
      richEditor.focus();
      return;
    }
    richEditor.innerHTML = renderRawEmailBody(currentText);
    autoExtractTitleAndCategoryFromRaw(currentText);
    showToast("✨ จัดสี & รูปแบบสถานะอัตโนมัติเรียบร้อย!");
  });

  // --- Zoom font buttons in Outlook Preview ---
  const zoomBtns = [
    { id: "btn-zoom-sm", cls: "zoom-small" },
    { id: "btn-zoom-md", cls: "" },
    { id: "btn-zoom-lg", cls: "zoom-large" }
  ];
  zoomBtns.forEach(({ id, cls }) => {
    document.getElementById(id)?.addEventListener("click", () => {
      const bodyEl = document.getElementById("mail-body-content");
      if (bodyEl) {
        bodyEl.classList.remove("zoom-small", "zoom-large");
        if (cls) bodyEl.classList.add(cls);
      }
      zoomBtns.forEach(b => document.getElementById(b.id)?.classList.remove("active"));
      document.getElementById(id)?.classList.add("active");
    });
  });

  // Auto-category suggestion in form
  const formTitle = document.getElementById("form-title");
  const formCategory = document.getElementById("form-category");
  const autoBadge = document.getElementById("auto-detected-badge");
  
  if (formTitle && formCategory) {
    formTitle.addEventListener("input", () => {
      const detected = detectCategoryAutomatically(formTitle.value);
      if (!formCategory.value || formCategory.dataset.autofilled === "true") {
        formCategory.value = detected;
        formCategory.dataset.autofilled = "true";
        if (autoBadge) autoBadge.style.display = "inline";
      }
    });

    formCategory.addEventListener("input", () => {
      formCategory.dataset.autofilled = "false";
      if (autoBadge) autoBadge.style.display = "none";
    });
  }

  document.getElementById("btn-suggest-cat")?.addEventListener("click", () => {
    const title = formTitle ? formTitle.value : "";
    const rawVal = richEditor ? richEditor.innerText : (rawBodyInput ? rawBodyInput.value : "");
    const detected = detectCategoryAutomatically(rawVal || title);
    if (formCategory) {
      formCategory.value = detected;
      formCategory.dataset.autofilled = "true";
    }
    showToast(`✨ แนะนำหมวด: ${detected}`);
  });

  // Modal actions
  document.getElementById("btn-close-modal")?.addEventListener("click", closeEditModal);
  document.getElementById("btn-cancel-modal")?.addEventListener("click", closeEditModal);
  document.getElementById("btn-save-template")?.addEventListener("click", saveTemplateFromForm);

  // Attachment radio toggle
  document.querySelectorAll('input[name="attachment_type"]').forEach(r => {
    r.addEventListener("change", toggleAttachmentFields);
  });

  // Presentation Mode
  document.getElementById("btn-presentation-mode")?.addEventListener("click", () => togglePresentationMode(true));
  document.getElementById("btn-exit-presentation")?.addEventListener("click", () => togglePresentationMode(false));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      togglePresentationMode(false);
      closeEditModal();
      closeLightbox();
    }
  });

  // Lightbox
  document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
  document.getElementById("lightbox-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "lightbox-overlay") closeLightbox();
  });

  // Export / Import
  document.getElementById("btn-export-data")?.addEventListener("click", exportBackupJSON);
  const fileInput = document.getElementById("file-import-input");
  document.getElementById("btn-import-data")?.addEventListener("click", () => fileInput?.click());
  fileInput?.addEventListener("change", importBackupJSON);
});
