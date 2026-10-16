/**
 * Branch Smart Document Hub — Cloud Storage & Realtime Sync (Supabase)
 * จัดการ:
 *   1. ซิงค์รายการเอกสารข้ามทุกสาขาแบบ Real-time
 *   2. อัปโหลดไฟล์เอกสารจริง (PDF, Word, Excel) ขึ้น Cloud Storage กลาง
 *   3. ดาวน์โหลดไฟล์จาก Cloud Storage
 */

let supabaseClient = null;

function isCloudConfigured() {
  return Boolean(
    typeof APP_CONFIG !== "undefined" &&
    APP_CONFIG.SUPABASE_URL &&
    APP_CONFIG.SUPABASE_URL.trim().length > 0 &&
    APP_CONFIG.SUPABASE_ANON_KEY &&
    APP_CONFIG.SUPABASE_ANON_KEY.trim().length > 0
  );
}

function getCloudClient() {
  if (!isCloudConfigured()) return null;
  if (!supabaseClient && typeof supabase !== "undefined") {
    supabaseClient = supabase.createClient(
      APP_CONFIG.SUPABASE_URL.trim(),
      APP_CONFIG.SUPABASE_ANON_KEY.trim()
    );
  }
  return supabaseClient;
}

/**
 * ดึงรายการเอกสารทั้งหมดจาก Cloud Database
 */
async function fetchCloudDocuments() {
  const client = getCloudClient();
  if (!client) return { success: false, docs: [] };

  try {
    const { data, error } = await client
      .from("documents")
      .select("*")
      .neq("category_id", "system_email_templates")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch error:", error);
      return { success: false, error: error.message, docs: [] };
    }

    const realDocs = (data || []).filter(d => !d.doc_id.startsWith("SYS_"));
    return { success: true, docs: realDocs };
  } catch (err) {
    console.warn("Cloud fetch exception:", err);
    return { success: false, error: err.message, docs: [] };
  }
}

/**
 * ดึงข้อมูลรูปแบบอีเมลทั้งหมดจาก Cloud กลาง (Supabase)
 */
async function fetchCloudEmailTemplates() {
  const client = getCloudClient();
  if (!client) return { success: false, templates: null };

  try {
    const { data, error } = await client
      .from("documents")
      .select("changelog_summary, effective_date")
      .eq("doc_id", "SYS_EMAIL_TEMPLATES_V1")
      .maybeSingle();

    if (error) {
      console.warn("Supabase email templates fetch error:", error);
      return { success: false, error: error.message, templates: null };
    }

    if (!data || !data.changelog_summary) {
      return { success: true, templates: null }; // ยังไม่เคยมีข้อมูลใน Cloud
    }

    const parsed = JSON.parse(data.changelog_summary);
    return { success: true, templates: Array.isArray(parsed) ? parsed : [] };
  } catch (err) {
    console.warn("Cloud email templates exception:", err);
    return { success: false, error: err.message, templates: null };
  }
}

/**
 * บันทึกรูปแบบอีเมลทั้งหมดขึ้น Cloud กลาง (Supabase)
 */
async function saveEmailTemplatesToCloud(templatesArray) {
  const client = getCloudClient();
  if (!client) return { success: false, error: "Cloud not configured" };

  try {
    const jsonStr = JSON.stringify(templatesArray);
    const { error } = await client
      .from("documents")
      .upsert({
        doc_id: "SYS_EMAIL_TEMPLATES_V1",
        category_id: "system_email_templates",
        subcategory: "email_templates",
        title: "Email Templates Central Store",
        changelog_summary: jsonStr,
        status: "system",
        effective_date: new Date().toISOString(),
        last_updated_by: "Email Hub Sync"
      });

    if (error) {
      console.warn("Supabase email templates save error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.warn("Cloud email templates save exception:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Realtime Listener สำหรับรูปแบบอีเมล: เมื่อเครื่องอื่นแก้ไข หน้าจอจะอัปเดตให้อัตโนมัติทันที
 */
function listenToEmailTemplatesRealtime(onUpdateCallback) {
  const client = getCloudClient();
  if (!client) return null;

  try {
    const channel = client
      .channel("email-templates-realtime-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "documents",
          filter: "doc_id=eq.SYS_EMAIL_TEMPLATES_V1"
        },
        (payload) => {
          if (payload && payload.new && payload.new.changelog_summary) {
            try {
              const updatedTemplates = JSON.parse(payload.new.changelog_summary);
              if (Array.isArray(updatedTemplates) && typeof onUpdateCallback === "function") {
                onUpdateCallback(updatedTemplates);
              }
            } catch (e) {
              console.warn("Parse realtime templates error:", e);
            }
          }
        }
      )
      .subscribe();

    return channel;
  } catch (err) {
    console.warn("Realtime email subscription error:", err);
    return null;
  }
}

/**
 * อัปโหลดไฟล์เอกสารจริงขึ้น Supabase Storage Bucket
 */
async function uploadFileToCloudStorage(docId, file) {
  const client = getCloudClient();
  if (!client) return { success: false, error: "Cloud not configured" };

  try {
    const bucket = APP_CONFIG.SUPABASE_STORAGE_BUCKET || "documents";
    // สร้าง path ปลอดภัยแบบ ASCII สากลเพื่อรองรับ Supabase S3 (ป้องกัน Error InvalidKey จากภาษาไทย)
    const ext = (file.name && file.name.includes(".")) ? file.name.split(".").pop().toLowerCase() : "pdf";
    const cleanDocId = (docId || "DOC").replace(/[^a-zA-Z0-9_-]/g, "_");
    const filePath = `${cleanDocId}/${Date.now()}_file.${ext}`;

    const { data, error } = await client.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type || (ext === "pdf" ? "application/pdf" : "application/octet-stream"),
        cacheControl: "3600",
        upsert: true
      });

    if (error) {
      console.warn("Supabase upload error:", error);
      return { success: false, error: error.message };
    }

    // ดึง Public URL สำหรับดาวน์โหลด
    const { data: publicUrlData } = client.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      path: filePath,
      publicUrl: publicUrlData.publicUrl
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * บันทึกหรืออัปเดตข้อมูลเอกสารลงตาราง documents บน Cloud
 */
async function saveDocumentToCloud(doc) {
  const client = getCloudClient();
  if (!client) return { success: false, error: "Cloud not configured" };

  try {
    const { data, error } = await client
      .from("documents")
      .upsert({
        doc_id: doc.doc_id,
        category_id: doc.category_id,
        subcategory: doc.subcategory,
        title: doc.title,
        file_name: doc.file_name,
        version: doc.version,
        effective_date: doc.effective_date,
        status: doc.status || "active",
        download_url: doc.download_url,
        changelog_summary: doc.changelog_summary,
        download_count: doc.download_count || 0,
        last_updated_by: doc.last_updated_by || "สาขา"
      });

    if (error) {
      console.warn("Supabase save error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Realtime Listener: เมื่อสาขาอื่นเพิ่มหรือแก้เอกสาร หน้าจอจะอัปเดตให้อัตโนมัติทันที
 */
function listenToCloudRealtime(onUpdateCallback) {
  const client = getCloudClient();
  if (!client) return null;

  try {
    const channel = client
      .channel("documents-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "documents" },
        (payload) => {
          if (typeof onUpdateCallback === "function") {
            onUpdateCallback(payload);
          }
        }
      )
      .subscribe();

    return channel;
  } catch (err) {
    console.warn("Realtime subscription error:", err);
    return null;
  }
}

/**
 * ลบเอกสารออกจาก Cloud Database
 */
async function deleteDocumentFromCloud(docId) {
  const client = getCloudClient();
  if (!client) return { success: false };

  try {
    const { error } = await client
      .from("documents")
      .delete()
      .eq("doc_id", docId);

    if (error) {
      console.warn("Supabase delete error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
