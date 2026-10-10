/**
 * Branch Smart Document Hub — Configuration
 * 
 * ⚠️ ตั้งค่า API Key ของคุณที่นี่
 * วิธีขอ Gemini API Key ฟรี:
 *   1. ไปที่ https://aistudio.google.com/app/apikey
 *   2. กด "Create API Key"
 *   3. คัดลอก Key มาวางด้านล่าง
 * 
 * 🔒 ห้ามแชร์ไฟล์นี้กับคนอื่น หรืออัปโหลดขึ้น GitHub
 */

const APP_CONFIG = {
  // ใส่ Gemini API Key ของคุณตรงนี้ (หรือใส่ผ่านหน้าเว็บแอปได้)
  GEMINI_API_KEY: (typeof atob !== "undefined" ? atob("QVEuQWI4Uk42SVptSzdxT01KTDFtOE51OVZiU0lRTnFOcnhUQmhDQ1RHeWx2ZzBFM3RsMUE=") : ""),

  // รุ่นของ Gemini ที่ใช้ (อัปเดตเป็นรุ่นล่าสุดตามคำแนะนำของ API)
  GEMINI_MODEL: "gemini-3.8-flash",

  // API endpoint
  GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models",

  // ==========================================
  // Cloud Database & Storage กลางสำหรับทุกสาขา (Supabase ฟรี)
  // สมัครฟรีได้ที่: https://supabase.com
  // ==========================================
  // Project URL จาก Supabase
  SUPABASE_URL: "https://mjvltjkloibzynoihpxl.supabase.co",

  // anon public key จาก Supabase
  SUPABASE_ANON_KEY: "sb_publishable_ksMjhzjd3FnnV4asTCXUnA_scIzuRx1",

  // ชื่อ Storage Bucket สำหรับเก็บไฟล์
  SUPABASE_STORAGE_BUCKET: "documents",

  // ชื่อแอป
  APP_NAME: "Branch Smart Document Hub",
  APP_VERSION: "1.0.0",
};
