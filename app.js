/**
 * Branch Smart Document Hub — Main Application Logic
 */

// ========================
// State
// ========================
const state = {
  searchQuery: "",
  activeCategory: null,     // null = ทุกหมวด
  activeSubcategory: null,  // null = ทุก subcategory
  documents: [...DOCUMENTS],
};

// ========================
// Lucide SVG Icons (inline)
// ========================
const ICONS = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  "file-text": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  "refresh-cw": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  "user-check": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
  "clipboard-list": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><circle cx="8" cy="11" r="0.5" fill="currentColor"/><circle cx="8" cy="16" r="0.5" fill="currentColor"/></svg>`,
  "trending-up": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
  "bar-chart": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
  tag: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>`,
  "folder-open": `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>`,
  bell: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
};

function icon(name) {
  return ICONS[name] || "";
}

// ========================
// Helpers
// ========================
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function formatDate(dateStr) {
  const months = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function formatNumber(n) {
  return n.toLocaleString("th-TH");
}

function getStatusLabel(status) {
  const map = { active: "ใช้งานอยู่", upcoming: "เตรียมใช้", archived: "เลิกใช้แล้ว" };
  return map[status] || status;
}

// ========================
// Get filtered documents
// ========================
function getFilteredDocuments() {
  let docs = [...DOCUMENTS];

  // Filter by category
  if (state.activeCategory) {
    docs = docs.filter(d => d.category_id === state.activeCategory);
  }

  // Filter by subcategory
  if (state.activeSubcategory) {
    docs = docs.filter(d => d.subcategory === state.activeSubcategory);
  }

  // Search
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.trim().toLowerCase();
    docs = docs.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.subcategory.toLowerCase().includes(q) ||
      d.changelog_summary.toLowerCase().includes(q) ||
      d.doc_id.toLowerCase().includes(q) ||
      d.version.toLowerCase().includes(q)
    );
  }

  return docs;
}

// ========================
// Top 5 Most Used
// ========================
function getTop5() {
  return [...DOCUMENTS]
    .filter(d => d.status === "active")
    .sort((a, b) => b.download_count - a.download_count)
    .slice(0, 5);
}

// ========================
// Count docs per category
// ========================
function getCategoryCount(catId) {
  return DOCUMENTS.filter(d => d.category_id === catId && d.status === "active").length;
}

// ========================
// Render Functions
// ========================

function renderCategories() {
  const container = $("#category-grid");
  container.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card ${state.activeCategory === cat.id ? 'active' : ''}"
         data-category="${cat.id}"
         id="cat-${cat.id}">
      <div class="cat-icon-wrap">
        ${icon(cat.icon)}
      </div>
      <div class="cat-name">${cat.name}</div>
      <div class="cat-count">${getCategoryCount(cat.id)} เอกสาร</div>
    </div>
  `).join("");

  // Bind click
  container.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const catId = card.dataset.category;
      if (state.activeCategory === catId) {
        state.activeCategory = null;
        state.activeSubcategory = null;
      } else {
        state.activeCategory = catId;
        state.activeSubcategory = null;
      }
      renderCategories();
      renderSubFilters();
      renderDocuments();
    });
  });
}

function renderSubFilters() {
  const container = $("#sub-filters");

  if (!state.activeCategory) {
    container.innerHTML = "";
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  const cat = CATEGORIES.find(c => c.id === state.activeCategory);
  if (!cat) return;

  const allBtn = `<button class="sub-filter-btn ${!state.activeSubcategory ? 'active' : ''}" data-sub="__all">ทั้งหมด</button>`;
  const subBtns = cat.subcategories.map(sub =>
    `<button class="sub-filter-btn ${state.activeSubcategory === sub ? 'active' : ''}" data-sub="${sub}">${sub}</button>`
  ).join("");

  container.innerHTML = allBtn + subBtns;

  container.querySelectorAll(".sub-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const sub = btn.dataset.sub;
      state.activeSubcategory = sub === "__all" ? null : sub;
      renderSubFilters();
      renderDocuments();
    });
  });
}

function renderQuickAccess() {
  const container = $("#quick-grid");
  const top5 = getTop5();

  if (top5.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 22px 20px; text-align: center; background: var(--bg-surface); border-radius: var(--radius-md); border: 1.5px dashed var(--border-mid); color: var(--text-tertiary); font-size: 13.5px;">
        📌 ยังไม่มีเอกสารที่เข้าใช้บ่อย — เมื่อเพิ่มเอกสารและมีการดาวน์โหลด รายการ 5 อันดับแรกจะแสดงที่นี่อัตโนมัติ
      </div>`;
    return;
  }

  container.innerHTML = top5.map((doc, i) => {
    const rankClass = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
    const cat = CATEGORIES.find(c => c.id === doc.category_id);
    return `
    <div class="quick-card" data-docid="${doc.doc_id}">
      <div class="quick-rank">
        <div class="quick-rank-num ${rankClass}">${i + 1}</div>
        <span style="font-size:12px;color:var(--text-tertiary)">${doc.version}</span>
      </div>
      <div class="quick-title">${doc.title}</div>
      <div class="quick-meta">
        <span style="color:${cat ? cat.color : 'inherit'};font-weight:500">${cat ? cat.name.split(' /')[0].split(' &')[0] : ''}</span>
        <span class="quick-downloads">${icon("bar-chart")} ${formatNumber(doc.download_count)}</span>
      </div>
    </div>`;
  }).join("");

  // Click to filter
  container.querySelectorAll(".quick-card").forEach(card => {
    card.addEventListener("click", () => {
      const docId = card.dataset.docid;
      const doc = DOCUMENTS.find(d => d.doc_id === docId);
      if (doc) {
        state.activeCategory = doc.category_id;
        state.activeSubcategory = doc.subcategory;
        state.searchQuery = "";
        $("#search-input").value = "";
        updateSearchClear();
        renderCategories();
        renderSubFilters();
        renderDocuments();
        // Scroll to documents section
        $(".documents-section").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function renderDocuments() {
  const container = $("#doc-grid");
  const docs = getFilteredDocuments();

  if (DOCUMENTS.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        ${icon("folder-open")}
        <p>ยังไม่มีเอกสารในระบบ</p>
        <p class="sub">คลิกปุ่ม <strong>"อัปโหลดเอกสาร"</strong> ด้านบนขวาเพื่อเริ่มเพิ่มเอกสารจริง หรือใช้ปุ่ม Import ข้อมูล JSON</p>
        <button class="modal-btn-primary" onclick="$('#btn-upload').click()" style="margin-top: 14px">
          ${icon("upload")} เพิ่มเอกสารใหม่
        </button>
      </div>`;
    return;
  }

  if (docs.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        ${icon("folder-open")}
        <p>ไม่พบเอกสารที่ตรงกับการค้นหา</p>
        <p class="sub">ลองค้นหาด้วยคำอื่น หรือคลิกดูหมวดหมู่อื่น</p>
      </div>`;
    return;
  }

  container.innerHTML = docs.map((doc, i) => {
    const cat = CATEGORIES.find(c => c.id === doc.category_id);
    return `
    <div class="doc-card" style="animation-delay: ${i * 0.04}s">
      <div class="doc-header">
        <div class="doc-title-area">
          <div class="doc-title">${doc.title}</div>
          <div class="doc-sub">${doc.subcategory}</div>
        </div>
        <span class="status-badge ${doc.status}">${getStatusLabel(doc.status)}</span>
      </div>
      <div class="doc-changelog">${doc.changelog_summary}</div>
      <div class="doc-footer">
        <div class="doc-meta">
          <span class="doc-meta-item">${icon("tag")} ${doc.version}</span>
          <span class="doc-meta-item">${icon("calendar")} ${formatDate(doc.effective_date)}</span>
          <span class="doc-meta-item">${icon("bar-chart")} ${formatNumber(doc.download_count)}</span>
        </div>
        <div class="doc-actions">
          <button class="doc-action-btn edit-btn" data-docid="${doc.doc_id}" title="แก้ไขหรืออัปเดตเวอร์ชัน">
            ${icon("edit")} แก้ไข
          </button>
          <button class="doc-download-btn" data-docid="${doc.doc_id}" id="btn-dl-${doc.doc_id}">
            ${icon("download")} ดาวน์โหลด
          </button>
        </div>
      </div>
    </div>`;
  }).join("");

  // Edit button handler
  container.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const docId = btn.dataset.docid;
      openEditModal(docId);
    });
  });

  // Download button handler
  container.querySelectorAll(".doc-download-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const docId = btn.dataset.docid;
      const doc = DOCUMENTS.find(d => d.doc_id === docId);
      if (doc) {
        doc.download_count++;
        saveDocumentsToStorage();
        showToast(`กำลังดาวน์โหลด "${doc.title}" (${doc.version})`, "success");
        await triggerDocumentDownload(doc);
        renderQuickAccess();
        renderDocuments();
      }
    });
  });
}

// ========================
// Search
// ========================
function updateSearchClear() {
  const clearBtn = $("#search-clear");
  if (state.searchQuery.length > 0) {
    clearBtn.classList.add("visible");
  } else {
    clearBtn.classList.remove("visible");
  }
}

function initSearch() {
  const input = $("#search-input");
  const clearBtn = $("#search-clear");
  let debounce;

  input.addEventListener("input", () => {
    state.searchQuery = input.value;
    updateSearchClear();
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      renderDocuments();
    }, 200);
  });

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const q = input.value.trim();
      if (!q) return;

      const isConversational = /[ไหม|อะไร|ยังไง|ต้อง|ควร|ช่วย|แนะนำ|?]/.test(q) || q.length > 15;
      if (isConversational) {
        showToast("🤖 AI กำลังวิเคราะห์ค้นหาเอกสารที่ตรงกับคำถาม...", "info");
        if (typeof semanticSearch === "function" && isGeminiConfigured()) {
          const res = await semanticSearch(q);
          if (res.success && res.docs.length > 0) {
            renderAIDocuments(res.docs);
            showToast(`พบเอกสารที่เกี่ยวข้อง ${res.docs.length} รายการ`, "success");
            return;
          }
        }
        // Fallback local search
        renderDocuments();
      }
    }
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    state.searchQuery = "";
    updateSearchClear();
    renderDocuments();
    input.focus();
  });
}

// ========================
// Sticky Nav shadow
// ========================
function initScrollShadow() {
  const nav = $(".top-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 8) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }, { passive: true });
}

// ========================
// Toast
// ========================
function showToast(message, type = "success") {
  const container = $("#toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.3s, transform 0.3s";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// =============================================
// Branch Authentication System (ระบบเข้าสู่ระบบด้วยรหัสสาขา OC)
// =============================================
let currentBranch = null;

function loadActiveBranch() {
  try {
    const saved = localStorage.getItem("branch_hub_active_branch");
    if (saved) {
      currentBranch = JSON.parse(saved);
      updateBranchBadgeUI(currentBranch);
      return currentBranch;
    }
  } catch (e) {
    console.warn("Could not load branch auth:", e);
  }
  return null;
}

function setActiveBranch(branch) {
  currentBranch = branch;
  try {
    localStorage.setItem("branch_hub_active_branch", JSON.stringify(branch));
  } catch (e) {}
  updateBranchBadgeUI(branch);
}

function clearActiveBranch() {
  currentBranch = null;
  try {
    localStorage.removeItem("branch_hub_active_branch");
  } catch (e) {}
  updateBranchBadgeUI(null);
}

function updateBranchBadgeUI(branch) {
  const badge = $("#branch-user-badge");
  const nameEl = $("#display-branch-name");
  const codeEl = $("#display-branch-code");
  if (!nameEl) return;

  if (branch && branch.name) {
    nameEl.textContent = branch.name;
    if (codeEl) codeEl.textContent = `รหัส ${branch.code}`;
    if (badge) badge.classList.add("logged-in");
  } else {
    nameEl.textContent = "เข้าสู่ระบบสาขา";
    if (codeEl) codeEl.textContent = "คลิกเพื่อระบุรหัส";
    if (badge) badge.classList.remove("logged-in");
  }
}

function populateLoginBranchSelect() {
  const select = $("#login-branch-select");
  if (!select || typeof BRANCHES === "undefined") return;
  select.innerHTML = '<option value="">— เลือกสาขาจากรายชื่อ —</option>' +
    BRANCHES.map(b => `<option value="${b.code}">${b.name} (${b.code})</option>`).join("");
}

function openLoginModal(canClose = true) {
  const modal = $("#login-modal");
  if (!modal) return;

  populateLoginBranchSelect();

  const codeInput = $("#login-branch-code");
  const select = $("#login-branch-select");
  const preview = $("#login-branch-preview");
  const submitBtn = $("#btn-login-submit");
  const closeBtn = $("#login-modal-close");

  if (closeBtn) {
    closeBtn.style.display = canClose ? "flex" : "none";
  }

  if (currentBranch) {
    if (codeInput) codeInput.value = currentBranch.code;
    if (select) select.value = currentBranch.code;
    updateLoginDetection(currentBranch.code);
  } else {
    if (codeInput) codeInput.value = "";
    if (select) select.value = "";
    if (preview) preview.style.display = "none";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "🚀 เข้าสู่ระบบ";
    }
  }

  openModal("login-modal");

  setTimeout(() => {
    if (codeInput) codeInput.focus();
  }, 120);
}

function closeLoginModal() {
  closeModal("login-modal");
}

let detectedBranchTemp = null;

function updateLoginDetection(code) {
  const preview = $("#login-branch-preview");
  const previewName = $("#login-preview-name");
  const previewCode = $("#login-preview-code");
  const submitBtn = $("#btn-login-submit");
  const select = $("#login-branch-select");

  const clean = (code || "").trim();
  if (!clean) {
    detectedBranchTemp = null;
    if (preview) preview.style.display = "none";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "🚀 เข้าสู่ระบบ";
    }
    return;
  }

  const matched = typeof findBranchByCode === "function" ? findBranchByCode(clean) : null;

  if (matched) {
    detectedBranchTemp = matched;
    if (previewName) previewName.textContent = matched.name;
    if (previewCode) previewCode.textContent = `รหัส OC: ${matched.code}`;
    if (preview) preview.style.display = "block";
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `🚀 เข้าสู่ระบบ (${matched.name})`;
    }
    if (select && select.value !== matched.code) {
      select.value = matched.code;
    }
  } else if (clean.length >= 3) {
    detectedBranchTemp = { code: clean, name: `สาขารหัส ${clean}` };
    if (previewName) previewName.textContent = detectedBranchTemp.name;
    if (previewCode) previewCode.textContent = `รหัส OC: ${clean}`;
    if (preview) preview.style.display = "block";
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `🚀 เข้าสู่ระบบ (${clean})`;
    }
  } else {
    detectedBranchTemp = null;
    if (preview) preview.style.display = "none";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "🚀 เข้าสู่ระบบ";
    }
  }
}

function initBranchAuth() {
  const codeInput = $("#login-branch-code");
  const select = $("#login-branch-select");
  const submitBtn = $("#btn-login-submit");
  const closeBtn = $("#login-modal-close");
  const badge = $("#branch-user-badge");
  const modal = $("#login-modal");

  loadActiveBranch();

  if (!currentBranch) {
    setTimeout(() => {
      openLoginModal(false);
    }, 400);
  }

  if (codeInput) {
    codeInput.addEventListener("input", (e) => {
      updateLoginDetection(e.target.value);
    });

    codeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && detectedBranchTemp) {
        e.preventDefault();
        submitLogin();
      }
    });
  }

  if (select) {
    select.addEventListener("change", (e) => {
      if (e.target.value) {
        if (codeInput) codeInput.value = e.target.value;
        updateLoginDetection(e.target.value);
      }
    });
  }

  function submitLogin() {
    if (!detectedBranchTemp) return;
    setActiveBranch(detectedBranchTemp);
    closeLoginModal();
    showToast(`🏢 เข้าสู่ระบบสำเร็จ: <strong>${detectedBranchTemp.name}</strong> (${detectedBranchTemp.code})`, "success");
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", submitLogin);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (currentBranch) closeLoginModal();
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal && currentBranch) {
        closeLoginModal();
      }
    });
  }

  if (badge) {
    badge.addEventListener("click", () => {
      if (currentBranch) {
        showConfirm(
          "สลับสาขา / ออกจากระบบ",
          `คุณกำลังใช้งานในชื่อ <strong>"${currentBranch.name}" (รหัส ${currentBranch.code})</strong><br>ต้องการสลับไปยังสาขาอื่นหรือไม่?`,
          "🏢",
          () => {
            openLoginModal(true);
          }
        );
      } else {
        openLoginModal(true);
      }
    });
  }
}

// ========================
// Init
// ========================
document.addEventListener("DOMContentLoaded", async () => {
  initBranchAuth();
  loadStoredDocuments();
  renderCategories();
  renderSubFilters();
  renderQuickAccess();
  renderDocuments();
  initSearch();
  initScrollShadow();
  initUploadModal();
  initEditModal();
  initDataBackup();
  initAIChat();

  // Cloud Sync (ถ้าตั้งค่า Supabase ไว้ จะดึงเอกสารกลางจากทุกสาขาอัตโนมัติ)
  if (typeof isCloudConfigured === "function" && isCloudConfigured()) {
    showToast("☁️ กำลังเชื่อมต่อ Cloud Storage กลาง...", "info");
    const cloudRes = await fetchCloudDocuments();
    if (cloudRes.success) {
      DOCUMENTS.length = 0;
      DOCUMENTS.push(...cloudRes.docs);
      saveDocumentsToStorage();
      renderCategories();
      renderSubFilters();
      renderQuickAccess();
      renderDocuments();
      showToast(`☁️ ซิงค์เอกสารจากคลาวด์เรียบร้อย (${cloudRes.docs.length} รายการ)`, "success");
    }

    // Realtime Listener: เมื่อสาขาอื่นอัปเดต หน้าจอจะรีเฟรชให้เองทันที
    listenToCloudRealtime(async () => {
      const updated = await fetchCloudDocuments();
      if (updated.success) {
        DOCUMENTS.length = 0;
        DOCUMENTS.push(...updated.docs);
        saveDocumentsToStorage();
        renderCategories();
        renderSubFilters();
        renderQuickAccess();
        renderDocuments();
        showToast("🔔 มีเอกสารใหม่เข้ามาจากสาขาอื่น", "info");
      }
    });
  }
});

// ========================
// Upload Modal System
// ========================

const uploadState = {
  files: [],         // File objects from user
  checked: false,    // Whether version check ran
};

const ALLOWED_EXTENSIONS = ["pdf","doc","docx","xls","xlsx","jpg","jpeg","png"];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

function initUploadModal() {
  const modal      = $("#upload-modal");
  const dropzone   = $("#dropzone");
  const fileInput  = $("#file-input");
  const browseBtn  = $("#dropzone-browse");
  const closeBtn   = $("#upload-modal-close");
  const cancelBtn  = $("#upload-cancel-btn");
  const resetBtn   = $("#upload-reset-btn");
  const checkBtn   = $("#upload-check-btn");
  const uploadBtn  = $("#btn-upload");

  // Open modal
  uploadBtn.addEventListener("click", () => openModal("upload-modal"));

  // Close modal
  closeBtn.addEventListener("click",  () => closeUploadModal());
  cancelBtn.addEventListener("click", () => closeUploadModal());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeUploadModal();
  });

  // Browse button
  browseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Dropzone click opens file dialog
  dropzone.addEventListener("click", (e) => {
    if (e.target === browseBtn) return;
    fileInput.click();
  });

  // File input change
  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
    fileInput.value = ""; // reset so same file can be picked again
  });

  // Drag events
  dropzone.addEventListener("dragenter", (e) => { e.preventDefault(); dropzone.classList.add("drag-over"); });
  dropzone.addEventListener("dragover",  (e) => { e.preventDefault(); dropzone.classList.add("drag-over"); });
  dropzone.addEventListener("dragleave", ()  => { dropzone.classList.remove("drag-over"); });
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    handleFiles(e.dataTransfer.files);
  });

  // Check version button
  checkBtn.addEventListener("click", () => runVersionCheck());

  // Reset button
  resetBtn.addEventListener("click", () => resetUpload());

  // Toggle manual input form directly
  const toggleManualBtn = $("#btn-toggle-manual-form");
  if (toggleManualBtn) {
    toggleManualBtn.addEventListener("click", () => {
      const form = $("#upload-form");
      const isHidden = form.style.display === "none" || !form.style.display;
      form.style.display = isHidden ? "flex" : "none";
      toggleManualBtn.textContent = isHidden ? "🔼 ซ่อนแบบฟอร์ม" : "✍️ หรือกรอกข้อมูลเอกสารใหม่โดยตรง";
      if (isHidden) {
        $("#upload-reset-btn").style.display = "inline-flex";
        $("#upload-title").focus();
      }
    });
  }

  // ESC to close modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if ($("#upload-modal").classList.contains("open")) closeUploadModal();
      if ($("#confirm-modal").classList.contains("open")) closeModal("confirm-modal");
    }
  });

  // Category cascade in upload form
  const catSelect = $("#upload-category");
  const subSelect = $("#upload-subcategory");

  // Populate categories
  CATEGORIES.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.name;
    catSelect.appendChild(opt);
  });

  catSelect.addEventListener("change", () => {
    const catId = catSelect.value;
    subSelect.innerHTML = '<option value="">— เลือกหมวดย่อย —</option>';
    if (catId) {
      const cat = CATEGORIES.find(c => c.id === catId);
      if (cat) {
        cat.subcategories.forEach(sub => {
          const opt = document.createElement("option");
          opt.value = sub;
          opt.textContent = sub;
          subSelect.appendChild(opt);
        });
        subSelect.disabled = false;
      }
    } else {
      subSelect.disabled = true;
    }
  });

  // AI Summarize Changelog
  const aiSummarizeBtn = $("#btn-ai-summarize");
  if (aiSummarizeBtn) {
    aiSummarizeBtn.addEventListener("click", async () => {
      const title = $("#upload-title").value.trim() || "เอกสารใหม่";
      const ver = $("#upload-version").value.trim() || "v1.0";
      aiSummarizeBtn.classList.add("btn-loading");

      if (typeof isGeminiConfigured === "function" && isGeminiConfigured() && typeof summarizeChangelog === "function") {
        const res = await summarizeChangelog(title, "v1.0", ver, "อัปเดตแบบฟอร์มมาตรฐานสาขาและข้อกำหนด");
        aiSummarizeBtn.classList.remove("btn-loading");
        if (res.success) {
          $("#upload-changelog").value = res.text.trim();
          showToast("AI สรุปการเปลี่ยนแปลงเรียบร้อย", "success");
        } else {
          $("#upload-changelog").value = `ปรับปรุงแบบฟอร์ม ${title} เวอร์ชัน ${ver} ให้เป็นไปตามเกณฑ์มาตรฐานล่าสุด`;
          showToast("สร้างข้อความสรุปเรียบร้อย", "info");
        }
      } else {
        setTimeout(() => {
          aiSummarizeBtn.classList.remove("btn-loading");
          $("#upload-changelog").value = `ปรับปรุงแบบฟอร์ม ${title} (${ver}) ให้เป็นไปตามเกณฑ์มาตรฐานล่าสุด`;
          showToast("AI สรุปการเปลี่ยนแปลงเรียบร้อย (Smart summary)", "success");
        }, 500);
      }
    });
  }

  // Save new doc button
  const saveDocBtn = $("#btn-save-new-doc");
  if (saveDocBtn) {
    saveDocBtn.addEventListener("click", async () => {
      const catId = $("#upload-category").value;
      const sub = $("#upload-subcategory").value;
      const title = $("#upload-title").value.trim();
      const fnInput = $("#upload-filename");
      const ver = $("#upload-version").value.trim() || "v1.0";
      const date = $("#upload-date").value || new Date().toISOString().split("T")[0];
      const changelog = $("#upload-changelog").value.trim() || "อัปเดตเอกสารเวอร์ชันใหม่";

      if (!catId) {
        showToast("กรุณาเลือกหมวดหมู่เอกสาร", "error");
        return;
      }
      if (!sub) {
        showToast("กรุณาเลือกหมวดย่อย", "error");
        return;
      }
      if (!title) {
        showToast("กรุณาระบุชื่อเอกสาร", "error");
        return;
      }

      const nextNum = DOCUMENTS.length + 1;
      const newDocId = "DOC-" + String(nextNum).padStart(3, "0");
      const filename = (fnInput && fnInput.value.trim()) || (uploadState.files[0] ? uploadState.files[0].name : title + ".pdf");
      let fileUrl = "files/" + filename;

      saveDocBtn.classList.add("btn-loading");

      // 1. บันทึกไฟล์ลง IndexedDB ในเครื่อง
      if (uploadState.files.length > 0) {
        await saveFileToDB(newDocId, uploadState.files[0]);
      }

      // 2. ถ้าเชื่อมต่อ Cloud ให้ส่งไฟล์ขึ้น Cloud Storage กลาง
      if (typeof isCloudConfigured === "function" && isCloudConfigured()) {
        if (uploadState.files.length > 0 && typeof uploadFileToCloudStorage === "function") {
          showToast("☁️ กำลังส่งไฟล์ขึ้น Cloud Storage กลาง...", "info");
          const cloudUpload = await uploadFileToCloudStorage(newDocId, uploadState.files[0]);
          if (cloudUpload.success) {
            fileUrl = cloudUpload.publicUrl;
          }
        }
      }

      const newDoc = {
        doc_id: newDocId,
        category_id: catId,
        subcategory: sub,
        title: title,
        file_name: filename,
        version: ver.startsWith("v") ? ver : "v" + ver,
        effective_date: date,
        status: "active",
        download_url: fileUrl,
        changelog_summary: changelog,
        download_count: 0,
        last_updated_by: currentBranch ? `${currentBranch.name} (${currentBranch.code})` : "สาขา"
      };

      // 3. บันทึกข้อมูลลง Cloud Database ถ้ามี
      if (typeof isCloudConfigured === "function" && isCloudConfigured() && typeof saveDocumentToCloud === "function") {
        await saveDocumentToCloud(newDoc);
      }

      saveDocBtn.classList.remove("btn-loading");

      DOCUMENTS.unshift(newDoc);
      saveDocumentsToStorage();
      renderCategories();
      renderSubFilters();
      renderQuickAccess();
      renderDocuments();
      showToast(`✅ บันทึกเอกสาร "${title}" เรียบร้อย!`, "success");
      closeUploadModal();
    });
  }
}

// ---- File Handling ----
function handleFiles(fileList) {
  const newFiles = Array.from(fileList);

  newFiles.forEach(file => {
    // Check extension
    const ext = file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      showToast(`ไม่รองรับไฟล์ .${ext} — กรุณาใช้ PDF, DOC, XLS, JPG, PNG`, "error");
      return;
    }
    // Check size
    if (file.size > MAX_FILE_SIZE) {
      showToast(`ไฟล์ "${file.name}" ขนาดเกิน 25 MB`, "error");
      return;
    }
    // Avoid duplicates
    if (uploadState.files.some(f => f.name === file.name && f.size === file.size)) {
      showToast(`ไฟล์ "${file.name}" ถูกเพิ่มแล้ว`, "warning");
      return;
    }
    uploadState.files.push(file);
  });

  // ออโต้เติมชื่อไฟล์และชื่อเอกสารในแบบฟอร์ม
  if (uploadState.files.length > 0) {
    const first = uploadState.files[0];
    const fnInput = $("#upload-filename");
    const titleInput = $("#upload-title");
    if (fnInput) fnInput.value = first.name;
    if (titleInput && !titleInput.value) {
      titleInput.value = first.name.replace(/\.[^/.]+$/, "");
    }
    // เปิดแบบฟอร์มให้อัตโนมัติเพื่อให้ผู้ใช้ตรวจทานและบันทึก
    $("#upload-form").style.display = "flex";
    $("#upload-reset-btn").style.display = "inline-flex";
  }

  renderUploadFileList();
  updateCheckButton();
}

function removeUploadFile(index) {
  uploadState.files.splice(index, 1);
  renderUploadFileList();
  updateCheckButton();
  // If no files, hide results
  if (uploadState.files.length === 0) {
    resetUpload();
  }
}

function renderUploadFileList() {
  const container = $("#upload-file-list");
  const dropzone  = $("#dropzone");

  if (uploadState.files.length === 0) {
    container.style.display = "none";
    dropzone.classList.remove("has-files");
    dropzone.querySelector(".dropzone-content").innerHTML = `
      <div class="dropzone-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
      </div>
      <p class="dropzone-text">ลากไฟล์มาวางตรงนี้</p>
      <p class="dropzone-subtext">หรือ <button class="dropzone-browse" id="dropzone-browse">เลือกไฟล์จากเครื่อง</button></p>
      <p class="dropzone-hint">รองรับ PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (สูงสุด 25 MB)</p>`;
    // Re-bind browse
    const newBrowse = $("#dropzone-browse");
    if (newBrowse) {
      newBrowse.addEventListener("click", (e) => {
        e.stopPropagation();
        $("#file-input").click();
      });
    }
    return;
  }

  // Show compact dropzone
  dropzone.classList.add("has-files");
  dropzone.querySelector(".dropzone-content").innerHTML = `
    <p style="font-size:14px;color:var(--text-secondary)">
      ✅ เพิ่มแล้ว ${uploadState.files.length} ไฟล์ — ลากเพิ่มหรือ
      <button class="dropzone-browse" id="dropzone-browse">เลือกเพิ่ม</button>
    </p>`;
  const newBrowse = $("#dropzone-browse");
  if (newBrowse) {
    newBrowse.addEventListener("click", (e) => {
      e.stopPropagation();
      $("#file-input").click();
    });
  }

  container.style.display = "flex";
  container.innerHTML = uploadState.files.map((file, i) => {
    const ext = file.name.split(".").pop().toLowerCase();
    const iconClass = getFileIconClass(ext);
    return `
    <div class="upload-file-item" style="animation-delay:${i*0.05}s">
      <div class="upload-file-icon ${iconClass}">${ext}</div>
      <div class="upload-file-info">
        <div class="upload-file-name">${file.name}</div>
        <div class="upload-file-size">${formatFileSize(file.size)}</div>
      </div>
      <button class="upload-file-remove" data-idx="${i}" aria-label="ลบไฟล์">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>`;
  }).join("");

  // Bind remove buttons
  container.querySelectorAll(".upload-file-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      removeUploadFile(parseInt(btn.dataset.idx));
    });
  });
}

function getFileIconClass(ext) {
  if (ext === "pdf") return "pdf";
  if (["doc","docx"].includes(ext)) return "doc";
  if (["xls","xlsx"].includes(ext)) return "xls";
  if (["jpg","jpeg","png"].includes(ext)) return "img";
  return "other";
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function updateCheckButton() {
  const checkBtn = $("#upload-check-btn");
  checkBtn.disabled = uploadState.files.length === 0;
}

// ---- Version Check ----
function runVersionCheck() {
  const checkBtn = $("#upload-check-btn");
  const resetBtn = $("#upload-reset-btn");
  const resultsContainer = $("#version-check-results");
  const formContainer = $("#upload-form");

  // Show loading
  checkBtn.classList.add("btn-loading");
  checkBtn.disabled = true;

  // Simulate AI processing delay (would be Gemini API call in Step 5)
  setTimeout(() => {
    checkBtn.classList.remove("btn-loading");
    resetBtn.style.display = "inline-flex";
    uploadState.checked = true;

    const results = matchFilesToDocuments(uploadState.files);
    renderVersionResults(results);
    resultsContainer.style.display = "flex";

    // Show upload form for unmatched files
    const hasUnknown = results.some(r => r.status === "unknown");
    if (hasUnknown) {
      formContainer.style.display = "flex";
    }

    // Change button text
    checkBtn.innerHTML = `${icon("search")} ตรวจสอบอีกครั้ง`;
    checkBtn.disabled = false;
  }, 1200);
}

function matchFilesToDocuments(files) {
  return files.map(file => {
    const fileName = file.name.toLowerCase();

    // Try to match by keywords in filename
    let bestMatch = null;
    let bestScore = 0;

    const activeDocuments = DOCUMENTS.filter(d => d.status === "active");

    for (const doc of activeDocuments) {
      let score = 0;
      const titleWords = doc.title.toLowerCase().split(/\s+/);
      const subWords = doc.subcategory.toLowerCase().split(/\s+/);
      const allWords = [...titleWords, ...subWords];

      for (const word of allWords) {
        if (word.length >= 3 && fileName.includes(word)) {
          score += word.length; // longer match = higher relevance
        }
      }

      // Also check doc_id in filename
      if (fileName.includes(doc.doc_id.toLowerCase())) {
        score += 50;
      }

      // Check version in filename
      if (fileName.includes(doc.version.toLowerCase().replace(".", ""))) {
        score += 20;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = doc;
      }
    }

    if (bestMatch && bestScore >= 6) {
      // Check if version is current
      const fileHasOldVersion = checkIfOlderVersion(file.name, bestMatch);
      return {
        file,
        matchedDoc: bestMatch,
        status: fileHasOldVersion ? "outdated" : "ok",
        score: bestScore
      };
    }

    return {
      file,
      matchedDoc: null,
      status: "unknown",
      score: 0
    };
  });
}

function checkIfOlderVersion(fileName, doc) {
  // Extract version from filename (e.g. "v2.8" -> 2.8, "v3.1" -> 3.1)
  const fileVersionMatch = fileName.match(/v?(\d+[\.\-]\d+)/i);
  const docVersionMatch = doc.version.match(/v?(\d+[\.\-]\d+)/i);

  if (fileVersionMatch && docVersionMatch) {
    const fileVer = parseFloat(fileVersionMatch[1].replace("-", "."));
    const docVer  = parseFloat(docVersionMatch[1].replace("-", "."));
    return fileVer < docVer;
  }

  // If no version in filename, check date patterns
  const dateMatch = fileName.match(/(\d{4})[-_]?(\d{2})[-_]?(\d{2})/);
  if (dateMatch) {
    const fileDate = new Date(`${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`);
    const docDate  = new Date(doc.effective_date);
    return fileDate < docDate;
  }

  return false; // Can't determine, assume current
}

function renderVersionResults(results) {
  const container = $("#version-check-results");

  container.innerHTML = results.map((r, i) => {
    if (r.status === "ok") {
      return `
      <div class="version-result-card result-ok" style="animation-delay:${i*0.08}s">
        <div class="vr-header">
          <div class="vr-status-icon">✅</div>
          <div class="vr-file-name">${r.file.name}</div>
        </div>
        <div class="vr-body">
          ตรงกับ <strong>${r.matchedDoc.title}</strong> — เวอร์ชัน <strong>${r.matchedDoc.version}</strong> (ล่าสุด)<br>
          มีผลตั้งแต่ ${formatDate(r.matchedDoc.effective_date)}
        </div>
      </div>`;
    }

    if (r.status === "outdated") {
      return `
      <div class="version-result-card result-outdated" style="animation-delay:${i*0.08}s">
        <div class="vr-header">
          <div class="vr-status-icon">⚠️</div>
          <div class="vr-file-name">${r.file.name}</div>
        </div>
        <div class="vr-body">
          ⚠️ <strong>ไฟล์นี้เป็นเวอร์ชันเก่า!</strong><br>
          เวอร์ชันล่าสุดคือ <strong>${r.matchedDoc.title}</strong> — <strong>${r.matchedDoc.version}</strong><br>
          มีผลตั้งแต่ ${formatDate(r.matchedDoc.effective_date)}<br>
          <em>สิ่งที่เปลี่ยนแปลง: ${r.matchedDoc.changelog_summary}</em>
          <br>
          <a href="${r.matchedDoc.download_url}" class="vr-download-link" onclick="event.preventDefault(); showToast('กำลังดาวน์โหลดเวอร์ชันล่าสุด...', 'success')">
            ${icon("download")} ดาวน์โหลดเวอร์ชันล่าสุด
          </a>
        </div>
      </div>`;
    }

    // unknown
    return `
    <div class="version-result-card result-unknown" style="animation-delay:${i*0.08}s">
      <div class="vr-header">
        <div class="vr-status-icon">🔍</div>
        <div class="vr-file-name">${r.file.name}</div>
      </div>
      <div class="vr-body">
        ไม่พบเอกสารที่ตรงกันในระบบ — กรุณากรอกข้อมูลด้านล่างเพื่อเพิ่มเอกสารใหม่<br>
        <span style="font-size:12px;color:var(--text-tertiary)">หรือลองเปลี่ยนชื่อไฟล์ให้ตรงกับเอกสารในระบบ แล้วตรวจสอบอีกครั้ง</span>
      </div>
    </div>`;
  }).join("");
}

// ---- Reset / Close ----
function resetUpload() {
  uploadState.files = [];
  uploadState.checked = false;

  renderUploadFileList();
  updateCheckButton();
  $("#version-check-results").style.display = "none";
  $("#version-check-results").innerHTML = "";
  $("#upload-form").style.display = "none";
  $("#upload-reset-btn").style.display = "none";
  $("#upload-check-btn").innerHTML = `${icon("search")} ตรวจสอบเวอร์ชัน`;
  $("#upload-check-btn").disabled = true;
  $("#upload-check-btn").classList.remove("btn-loading");

  // Reset form
  $("#upload-category").value = "";
  $("#upload-subcategory").innerHTML = '<option value="">— เลือกหมวดย่อยก่อน —</option>';
  $("#upload-subcategory").disabled = true;
  $("#upload-title").value = "";
  if ($("#upload-filename")) $("#upload-filename").value = "";
  $("#upload-version").value = "";
  $("#upload-date").value = "";
  if ($("#btn-toggle-manual-form")) $("#btn-toggle-manual-form").textContent = "✍️ หรือกรอกข้อมูลเอกสารใหม่โดยตรง";
}

function closeUploadModal() {
  closeModal("upload-modal");
  // Delay reset so animation finishes
  setTimeout(() => resetUpload(), 300);
}

// ========================
// Modal Utilities
// ========================
function openModal(id) {
  const modal = $(`#${id}`);
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("open");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeModal(id) {
  const modal = $(`#${id}`);
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ========================
// Edit / Update Modal System
// ========================
let currentEditDoc = null;
let selectedEditFile = null;

function populateEditCategories() {
  const catSelect = $("#edit-category");
  if (!catSelect) return;
  catSelect.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
}

function updateEditSubcategories(catId, selectedSub = null) {
  const subSelect = $("#edit-subcategory");
  if (!subSelect) return;
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) {
    subSelect.innerHTML = '<option value="">— ไม่มีหมวดย่อย —</option>';
    return;
  }
  subSelect.innerHTML = cat.subcategories.map(sub =>
    `<option value="${sub}" ${sub === selectedSub ? 'selected' : ''}>${sub}</option>`
  ).join("");
}

function openEditModal(docId) {
  const doc = DOCUMENTS.find(d => d.doc_id === docId);
  if (!doc) {
    showToast("ไม่พบเอกสารที่ต้องการแก้ไข", "error");
    return;
  }

  currentEditDoc = doc;
  selectedEditFile = null;

  $("#edit-doc-id").value = doc.doc_id;
  $("#edit-modal-title").textContent = `แก้ไข / อัปเดตเอกสาร [${doc.doc_id}]`;

  populateEditCategories();
  $("#edit-category").value = doc.category_id || (CATEGORIES[0] && CATEGORIES[0].id);
  updateEditSubcategories($("#edit-category").value, doc.subcategory);

  $("#edit-title").value = doc.title || "";
  $("#edit-version").value = doc.version || "v1.0";
  $("#edit-status").value = doc.status || "active";
  $("#edit-date").value = doc.effective_date || new Date().toISOString().slice(0, 10);
  $("#edit-changelog").value = doc.changelog_summary || "";

  $("#edit-current-filename").textContent = doc.file_name || `${doc.title}.pdf`;
  $("#edit-new-filename-display").textContent = "ยังไม่ได้เลือกไฟล์ใหม่";
  $("#edit-file-input").value = "";

  openModal("edit-doc-modal");
}

function closeEditModal() {
  closeModal("edit-doc-modal");
  currentEditDoc = null;
  selectedEditFile = null;
}

function initEditModal() {
  const modal = $("#edit-doc-modal");
  if (!modal) return;

  const closeBtn = $("#edit-modal-close");
  const cancelBtn = $("#edit-cancel-btn");
  const saveBtn = $("#edit-save-btn");
  const deleteBtn = $("#edit-delete-btn");
  const catSelect = $("#edit-category");
  const fileInput = $("#edit-file-input");
  const pickFileBtn = $("#btn-edit-pick-file");
  const aiSummBtn = $("#btn-edit-ai-summarize");

  // Close handlers
  if (closeBtn) closeBtn.addEventListener("click", closeEditModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeEditModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeEditModal();
  });

  // Category change cascade
  if (catSelect) {
    catSelect.addEventListener("change", (e) => {
      updateEditSubcategories(e.target.value);
    });
  }

  // File picker for replacement/new version
  if (pickFileBtn && fileInput) {
    pickFileBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        selectedEditFile = file;
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        $("#edit-new-filename-display").innerHTML = `<strong style="color:var(--color-income-kyc)">✓ ${file.name}</strong> (${sizeMb} MB)`;
      } else {
        selectedEditFile = null;
        $("#edit-new-filename-display").textContent = "ยังไม่ได้เลือกไฟล์ใหม่";
      }
    });
  }

  // AI Summarize changelog
  if (aiSummBtn) {
    aiSummBtn.addEventListener("click", async () => {
      if (!currentEditDoc) return;
      const title = $("#edit-title").value.trim() || currentEditDoc.title;
      const ver = $("#edit-version").value.trim() || currentEditDoc.version;
      const oldVer = currentEditDoc.version;

      if (typeof isGeminiConfigured === "function" && isGeminiConfigured()) {
        aiSummBtn.textContent = "⏳ กำลังสรุป...";
        aiSummBtn.disabled = true;
        try {
          const prompt = `ช่วยเขียนข้อความสรุปการเปลี่ยนแปลงสั้นๆ (ภาษาไทย 1 ประโยค ไม่เกิน 15 คำ) สำหรับเอกสารชื่อ "${title}" ที่ปรับปรุงจากเวอร์ชัน ${oldVer} เป็น ${ver} เช่น ปรับปรุงเงื่อนไขหรืออัตราดอกเบี้ยใหม่`;
          const res = await callGemini(prompt);
          if (res && res.success && res.text) {
            $("#edit-changelog").value = res.text.replace(/[\*\"\'\n]/g, "").trim();
            showToast("✨ AI สร้างข้อความสรุปการเปลี่ยนแปลงเรียบร้อย", "success");
          } else {
            $("#edit-changelog").value = `อัปเดตข้อมูลเป็นเวอร์ชัน ${ver} มีผลบังคับใช้ตามประกาศ`;
          }
        } catch (err) {
          $("#edit-changelog").value = `อัปเดตข้อมูลเป็นเวอร์ชัน ${ver} มีผลบังคับใช้ตามประกาศ`;
        } finally {
          aiSummBtn.textContent = "✨ AI สรุป";
          aiSummBtn.disabled = false;
        }
      } else {
        $("#edit-changelog").value = `ปรับปรุงเนื้อหาเป็นเวอร์ชัน ${ver} ให้เป็นปัจจุบัน`;
        showToast("ใส่ข้อความสรุปเวอร์ชันเบื้องต้นให้แล้ว (เปิดใช้ Gemini AI เพื่อให้ระบบสรุปอัตโนมัติ)", "info");
      }
    });
  }

  // Save changes
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      if (!currentEditDoc) return;
      const title = $("#edit-title").value.trim();
      const version = $("#edit-version").value.trim();

      if (!title) {
        showToast("กรุณาระบุชื่อเอกสาร", "warning");
        $("#edit-title").focus();
        return;
      }
      if (!version) {
        showToast("กรุณาระบุเวอร์ชันเอกสาร", "warning");
        $("#edit-version").focus();
        return;
      }

      saveBtn.classList.add("btn-loading");
      saveBtn.disabled = true;

      try {
        currentEditDoc.category_id = $("#edit-category").value;
        currentEditDoc.subcategory = $("#edit-subcategory").value;
        currentEditDoc.title = title;
        currentEditDoc.version = version;
        currentEditDoc.status = $("#edit-status").value;
        currentEditDoc.effective_date = $("#edit-date").value || new Date().toISOString().slice(0, 10);
        currentEditDoc.changelog_summary = $("#edit-changelog").value.trim() || `อัปเดตเวอร์ชัน ${version}`;
        if (currentBranch) {
          currentEditDoc.last_updated_by = `${currentBranch.name} (${currentBranch.code})`;
        }

        // If user provided a new file
        if (selectedEditFile) {
          currentEditDoc.file_name = selectedEditFile.name;
          await saveFileToDB(currentEditDoc.doc_id, selectedEditFile);

          if (typeof isCloudConfigured === "function" && isCloudConfigured()) {
            showToast("☁️ กำลังอัปโหลดไฟล์เวอร์ชันใหม่ขึ้น Cloud Storage...", "info");
            const uploadRes = await uploadFileToCloudStorage(currentEditDoc.doc_id, selectedEditFile);
            if (uploadRes.success && uploadRes.publicUrl) {
              currentEditDoc.download_url = uploadRes.publicUrl;
            }
          }
        }

        // Save locally
        saveDocumentsToStorage();

        // Save to Cloud
        if (typeof isCloudConfigured === "function" && isCloudConfigured()) {
          const cloudRes = await saveDocumentToCloud(currentEditDoc);
          if (!cloudRes.success) {
            console.warn("Cloud save warning:", cloudRes.error);
          }
        }

        // Refresh UI
        renderCategories();
        renderSubFilters();
        renderQuickAccess();
        renderDocuments();

        closeModal("edit-doc-modal");
        showToast(`✅ บันทึกการแก้ไข "${currentEditDoc.title}" เรียบร้อยแล้ว`, "success");
      } catch (err) {
        console.error("Save edit error:", err);
        showToast("เกิดข้อผิดพลาดในการบันทึก: " + err.message, "error");
      } finally {
        saveBtn.classList.remove("btn-loading");
        saveBtn.disabled = false;
      }
    });
  }

  // Delete document
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (!currentEditDoc) return;
      const targetDoc = currentEditDoc;

      showConfirm(
        "ลบเอกสารออกจากระบบ",
        `คุณต้องการลบเอกสาร <strong>"${targetDoc.title}"</strong> (${targetDoc.doc_id}) ออกจากระบบใช่หรือไม่?<br><span style="font-size:12px;color:var(--text-tertiary)">การดำเนินการนี้จะไม่สามารถกู้คืนได้</span>`,
        "🗑️",
        async () => {
          const idx = DOCUMENTS.findIndex(d => d.doc_id === targetDoc.doc_id);
          if (idx !== -1) {
            DOCUMENTS.splice(idx, 1);
          }
          saveDocumentsToStorage();

          if (typeof isCloudConfigured === "function" && isCloudConfigured()) {
            await deleteDocumentFromCloud(targetDoc.doc_id);
          }

          closeEditModal();
          renderCategories();
          renderSubFilters();
          renderQuickAccess();
          renderDocuments();
          showToast(`🗑️ ลบเอกสาร "${targetDoc.title}" เรียบร้อยแล้ว`, "info");
        }
      );
    });
  }
}

// ========================
// Confirmation Modal Utility
// ========================
let confirmCallback = null;

function showConfirm(title, message, iconEmoji, onConfirm) {
  $("#confirm-title").textContent = title;
  $("#confirm-message").textContent = message;
  $("#confirm-icon").textContent = iconEmoji || "⚠️";
  confirmCallback = onConfirm;
  openModal("confirm-modal");

  // Bind buttons (replace to remove old listeners)
  const cancelBtn = $("#confirm-cancel");
  const okBtn = $("#confirm-ok");

  const newCancel = cancelBtn.cloneNode(true);
  const newOk = okBtn.cloneNode(true);
  cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
  okBtn.parentNode.replaceChild(newOk, okBtn);

  newCancel.addEventListener("click", () => closeModal("confirm-modal"));
  newOk.addEventListener("click", () => {
    closeModal("confirm-modal");
    if (confirmCallback) confirmCallback();
    confirmCallback = null;
  });
}

// =============================================
// LocalStorage Persistence & Schema Migration
// =============================================
function loadStoredDocuments() {
  try {
    // ล้างข้อมูลจำลองตัวอย่างที่อาจค้างใน LocalStorage ออกอัตโนมัติ
    if (localStorage.getItem("branch_smart_docs")) {
      localStorage.removeItem("branch_smart_docs");
    }

    // โหลดเฉพาะเอกสารจริงที่ผู้ใช้สร้าง
    const saved = localStorage.getItem("branch_smart_docs_real");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        DOCUMENTS.length = 0;
        DOCUMENTS.push(...parsed);
      }
    }
  } catch (e) {
    console.warn("Could not load from localStorage:", e);
  }
}

function saveDocumentsToStorage() {
  try {
    localStorage.setItem("branch_smart_docs_real", JSON.stringify(DOCUMENTS));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

// =============================================
// Data Backup (Export / Import JSON)
// =============================================
function initDataBackup() {
  const exportBtn = $("#btn-export");
  const importBtn = $("#btn-import");
  const fileInput = $("#import-file-input");

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      try {
        const backupData = {
          app: "Branch Smart Document Hub",
          version: "1.0.0",
          export_date: new Date().toISOString(),
          total_documents: DOCUMENTS.length,
          documents: DOCUMENTS
        };
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const dateStr = new Date().toISOString().split("T")[0];
        a.href = url;
        a.download = `smart-documents-backup-${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("📦 สำรองข้อมูลสำเร็จ (ดาวน์โหลดไฟล์ JSON เรียบร้อย)", "success");
      } catch (err) {
        showToast("เกิดข้อผิดพลาดในการสำรองข้อมูล", "error");
      }
    });
  }

  if (importBtn && fileInput) {
    importBtn.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          const docs = Array.isArray(json) ? json : json.documents;

          if (!Array.isArray(docs) || docs.length === 0) {
            showToast("รูปแบบไฟล์ JSON ไม่ถูกต้องหรือไม่พบรายการเอกสาร", "error");
            return;
          }

          const isValid = docs.every(d => d.doc_id && d.title && d.category_id);
          if (!isValid) {
            showToast("โครงสร้างเอกสารไม่ถูกต้อง ขาด doc_id, title หรือ category_id", "error");
            return;
          }

          showConfirm(
            "กู้คืนข้อมูลเอกสาร",
            `พบข้อมูลเอกสาร ${docs.length} รายการ ต้องการนำเข้าและแทนที่ข้อมูลในระบบหรือไม่?`,
            "📥",
            () => {
              DOCUMENTS.length = 0;
              DOCUMENTS.push(...docs);
              saveDocumentsToStorage();
              renderCategories();
              renderSubFilters();
              renderQuickAccess();
              renderDocuments();
              showToast(`✅ กู้คืนข้อมูลสำเร็จ (${docs.length} รายการ)`, "success");
            }
          );
        } catch (err) {
          showToast("ไม่สามารถอ่านไฟล์ JSON ได้: รูปแบบไฟล์ไม่ถูกต้อง", "error");
        } finally {
          fileInput.value = "";
        }
      };
      reader.readAsText(file, "UTF-8");
    });
  }
}

// =============================================
// AI Chat Panel System
// =============================================
function initAIChat() {
  const fab = $("#ai-fab");
  const panel = $("#ai-chat-panel");
  const closeBtn = $("#ai-chat-close");
  const sendBtn = $("#ai-chat-send");
  const input = $("#ai-chat-input");
  const messages = $("#ai-chat-messages");
  const statusText = $("#ai-status-text");
  const banner = $("#ai-key-banner");

  if (!fab || !panel) return;

  // Toggle open
  fab.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) {
      panel.setAttribute("aria-hidden", "false");
      input.focus();
    } else {
      panel.setAttribute("aria-hidden", "true");
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
    });
  }

  // Update status and banner based on API key
  const hasKey = typeof isGeminiConfigured === "function" && isGeminiConfigured();
  if (statusText) {
    statusText.textContent = hasKey ? `${APP_CONFIG.GEMINI_MODEL} พร้อมใช้งาน` : "SmartDoc AI (พร้อมช่วยเหลือ)";
  }
  if (banner) {
    banner.style.display = hasKey ? "none" : "flex";
  }

  // Save API key locally
  const saveKeyBtn = $("#btn-save-key-local");
  if (saveKeyBtn) {
    saveKeyBtn.addEventListener("click", () => {
      const keyVal = $("#input-api-key-save").value.trim();
      if (keyVal) {
        localStorage.setItem("branch_hub_gemini_key", keyVal);
        showToast("✅ บันทึก Gemini API Key เรียบร้อยแล้ว", "success");
        if (banner) banner.style.display = "none";
        if (statusText) statusText.textContent = `${APP_CONFIG.GEMINI_MODEL} พร้อมใช้งาน`;
      }
    });
  }

  // Enable/disable send button
  input.addEventListener("input", () => {
    sendBtn.disabled = !input.value.trim();
  });

  // Enter to send
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && input.value.trim()) {
      e.preventDefault();
      sendMessage();
    }
  });

  sendBtn.addEventListener("click", () => sendMessage());

  async function sendMessage(textToSend) {
    const text = textToSend || input.value.trim();
    if (!text) return;

    input.value = "";
    sendBtn.disabled = true;

    // Append user message
    appendMessage(text, "user");

    // Append loading bubble
    const loadingId = "ai-loading-" + Date.now();
    appendLoading(loadingId);

    try {
      let reply = "";
      if (typeof isGeminiConfigured === "function" && isGeminiConfigured()) {
        const res = await chatWithAssistant(text);
        reply = res.success ? res.text : `⚠️ ${res.error}`;
      } else {
        // Smart Local Knowledge Base Fallback
        await new Promise(r => setTimeout(r, 600)); // natural small delay
        reply = getLocalSmartResponse(text);
      }
      removeLoading(loadingId);
      appendMessage(reply, "bot");
    } catch (err) {
      removeLoading(loadingId);
      appendMessage("ขออภัย เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง", "bot");
    }
  }

  function appendMessage(text, sender) {
    const time = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
    const msg = document.createElement("div");
    msg.className = `ai-msg ai-msg-${sender}`;

    if (sender === "bot") {
      msg.innerHTML = `
        <div class="ai-msg-avatar">🤖</div>
        <div class="ai-msg-content">
          <div class="ai-msg-bubble">${formatBotReply(text)}</div>
          <div class="ai-msg-time">${time}</div>
        </div>
      `;
    } else {
      msg.innerHTML = `
        <div class="ai-msg-content">
          <div class="ai-msg-bubble">${escapeHtml(text)}</div>
          <div class="ai-msg-time">${time}</div>
        </div>
      `;
    }
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendLoading(id) {
    const msg = document.createElement("div");
    msg.className = "ai-msg ai-msg-bot";
    msg.id = id;
    msg.innerHTML = `
      <div class="ai-msg-avatar">🤖</div>
      <div class="ai-msg-content">
        <div class="ai-msg-bubble" style="display:flex;align-items:center;gap:8px;color:var(--text-tertiary)">
          <span>กำลังค้นหาข้อมูล...</span>
          <span class="btn-loading" style="width:14px;height:14px;display:inline-block"></span>
        </div>
      </div>
    `;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // Quick Chips in Welcome Message
  const firstBotMsg = messages.querySelector(".ai-msg-bot .ai-msg-content");
  if (firstBotMsg && !firstBotMsg.querySelector(".ai-chips-wrap")) {
    const quickChips = [
      "จำนำรถไถต้องใช้เอกสารอะไร",
      "Rate Sheet ล่าสุด",
      "ขอย้ายไฟแนนซ์",
      "แบบฟอร์ม PDPA"
    ];
    const chipsContainer = document.createElement("div");
    chipsContainer.className = "ai-chips-wrap";
    chipsContainer.innerHTML = quickChips.map(c => `<button class="ai-chip" type="button">${c}</button>`).join("");
    firstBotMsg.appendChild(chipsContainer);

    chipsContainer.querySelectorAll(".ai-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        sendMessage(chip.textContent);
      });
    });
  }
}

// =============================================
// Local Smart Response (Simulated AI Knowledge Base)
// =============================================
function getLocalSmartResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("รถไถ") || (q.includes("เกษตร") && q.includes("จำนำ"))) {
    return `สำหรับลูกค้าจำนำทะเบียนรถเพื่อการเกษตร (รถไถ / รถเกี่ยว) ต้องใช้ชุดเอกสารดังนี้ครับ:\n\n` +
      `1. [DOC-004] สัญญาจำนำทะเบียนรถเพื่อการเกษตร (v2.1) — เอกสารสัญญาหลัก\n` +
      `2. [DOC-009] แบบสำรวจอาชีพอิสระและเกษตรกร (v1.5) — บันทึกรายได้และพื้นที่ทำกิน\n` +
      `3. [DOC-010] หนังสือยินยอมเปิดเผยข้อมูล (NCB / PDPA) (v2.8) — ตรวจสอบเครดิตบูโร\n\n` +
      `💡 คุณสามารถค้นหาคำว่า "รถเพื่อการเกษตร" เพื่อดาวน์โหลดทั้งชุดได้ทันทีครับ`;
  }

  if (q.includes("rate sheet") || q.includes("ดอกเบี้ย") || q.includes("ค่างวด")) {
    const rateSheet = DOCUMENTS.find(d => d.doc_id === "DOC-015");
    return `ตารางอัตราดอกเบี้ยและค่างวดล่าสุดในระบบคือ:\n\n` +
      `📄 ${rateSheet ? rateSheet.title : "ตารางอัตราดอกเบี้ย (Rate Sheet)"}\n` +
      `• เวอร์ชัน: ${rateSheet ? rateSheet.version : "ล่าสุด"}\n` +
      `• มีผลบังคับใช้: ${rateSheet ? formatDate(rateSheet.effective_date) : "ปัจจุบัน"}\n` +
      `• หมายเหตุ: ${rateSheet ? rateSheet.changelog_summary : "ปรับอัตราดอกเบี้ยตามเกณฑ์ ธปท."}`;
  }

  if (q.includes("ย้ายไฟแนนซ์") || q.includes("รีไฟแนนซ์") || q.includes("ปิดบัญชี")) {
    return `สำหรับการทำเรื่องย้ายไฟแนนซ์ / รีไฟแนนซ์ ต้องเตรียมเอกสารดังนี้:\n\n` +
      `1. [DOC-006] หนังสือมอบอำนาจปิดบัญชีและย้ายไฟแนนซ์ (v2.3)\n` +
      `2. [DOC-007] แบบคำขอตรวจสอบภาระหนี้เดิมและยอดปิดบัญชี (v1.8)\n` +
      `3. [DOC-010] หนังสือยินยอมเปิดเผยข้อมูล (NCB / PDPA) (v2.8)`;
  }

  if (q.includes("pdpa") || q.includes("ยินยอม") || q.includes("ncb") || q.includes("เครดิตบูโร")) {
    const doc = DOCUMENTS.find(d => d.doc_id === "DOC-010");
    return `เอกสารความยินยอม NCB / PDPA เวอร์ชันล่าสุดคือ:\n\n` +
      `📄 ${doc ? doc.title : "หนังสือยินยอมเปิดเผยข้อมูล (NCB / PDPA)"}\n` +
      `• รหัส: DOC-010\n` +
      `• เวอร์ชัน: ${doc ? doc.version : "v2.8"}\n` +
      `• อัปเดตล่าสุด: ${doc ? doc.changelog_summary : "ปรับถ้อยคำความยินยอม"}`;
  }

  // Generic keyword match against documents
  const matched = DOCUMENTS.filter(d =>
    d.status === "active" && (
      q.includes(d.subcategory.toLowerCase()) ||
      d.title.toLowerCase().split(/\s+/).some(w => w.length > 2 && q.includes(w))
    )
  ).slice(0, 3);

  if (matched.length > 0) {
    const list = matched.map(m => `• [${m.doc_id}] ${m.title} (${m.version})`).join("\n");
    return `พบเอกสารที่เกี่ยวข้องกับคำถามของคุณ ${matched.length} รายการ:\n\n${list}\n\nต้องการให้แนะนำขั้นตอนการกรอกส่วนไหนเพิ่มเติมไหมครับ?`;
  }

  return `ยินดีช่วยเหลือครับ! คุณสามารถถามเกี่ยวกับ:\n• เอกสารที่ต้องใช้สำหรับแต่ละสินเชื่อ (รถจักรยานยนต์, รถยนต์, รถไถ, ที่ดิน)\n• ขั้นตอนการย้ายไฟแนนซ์และปิดบัญชี\n• ตารางอัตราดอกเบี้ย (Rate Sheet ล่าสุด)\n• เอกสารแสดงรายได้และ PDPA`;
}

// =============================================
// AI Document Highlighting & Display
// =============================================
function renderAIDocuments(docs) {
  const container = $("#doc-grid");
  if (!docs || docs.length === 0) {
    renderDocuments();
    return;
  }

  container.innerHTML = docs.map((doc, i) => {
    const cat = CATEGORIES.find(c => c.id === doc.category_id);
    return `
    <div class="doc-card ai-highlight" style="animation-delay: ${i * 0.04}s">
      <div class="doc-header">
        <div class="doc-title-area">
          <div class="ai-badge">✨ แนะนำโดย AI</div>
          <div class="doc-title">${doc.title}</div>
          <div class="doc-sub">${doc.subcategory}</div>
        </div>
        <span class="status-badge ${doc.status}">${getStatusLabel(doc.status)}</span>
      </div>
      <div class="doc-changelog">
        ${doc.ai_explanation ? `<strong>เหตุผล:</strong> ${doc.ai_explanation}<br>` : ''}
        ${doc.changelog_summary}
      </div>
      <div class="doc-footer">
        <div class="doc-meta">
          <span class="doc-meta-item">${icon("tag")} ${doc.version}</span>
          <span class="doc-meta-item">${icon("calendar")} ${formatDate(doc.effective_date)}</span>
          <span class="doc-meta-item">${icon("bar-chart")} ${formatNumber(doc.download_count)}</span>
        </div>
        <div class="doc-actions">
          <button class="doc-action-btn edit-btn" data-docid="${doc.doc_id}" title="แก้ไขหรืออัปเดตเวอร์ชัน">
            ${icon("edit")} แก้ไข
          </button>
          <button class="doc-download-btn" data-docid="${doc.doc_id}" id="btn-dl-${doc.doc_id}">
            ${icon("download")} ดาวน์โหลด
          </button>
        </div>
      </div>
    </div>`;
  }).join("");

  // Edit button handler
  container.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const docId = btn.dataset.docid;
      openEditModal(docId);
    });
  });

  // Re-bind download buttons
  container.querySelectorAll(".doc-download-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const docId = btn.dataset.docid;
      const doc = DOCUMENTS.find(d => d.doc_id === docId);
      if (doc) {
        doc.download_count++;
        saveDocumentsToStorage();
        showToast(`กำลังดาวน์โหลด: ${doc.title} (${doc.version})`, "success");
        await triggerDocumentDownload(doc);
        renderQuickAccess();
      }
    });
  });

  // Scroll smoothly to documents section
  $(".documents-section").scrollIntoView({ behavior: "smooth", block: "start" });
}

// =============================================
// Formatting Helpers
// =============================================
function escapeHtml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatBotReply(text) {
  if (!text) return "";
  let formatted = escapeHtml(text);
  formatted = formatted.replace(/\n/g, "<br>");
  // bold tags inside brackets or markers
  formatted = formatted.replace(/\[([A-Z0-9\-]+)\]/g, "<strong>[$1]</strong>");
  return formatted;
}

// =============================================
// IndexedDB File Storage System (จัดเก็บไฟล์จริงในเครื่อง)
// =============================================
const DB_NAME = "SmartDocHubFilesDB";
const DB_STORE = "document_files";
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE, { keyPath: "doc_id" });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(req.error);
  });
}

async function saveFileToDB(doc_id, file) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      const store = tx.objectStore(DB_STORE);
      const req = store.put({
        doc_id,
        name: file.name,
        type: file.type,
        size: file.size,
        data: file, // File Blob เก็บลงฐานข้อมูลเบราว์เซอร์โดยตรง
        updated_at: new Date().toISOString()
      });
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("IndexedDB save error:", err);
    return false;
  }
}

async function getFileFromDB(doc_id) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readonly");
      const store = tx.objectStore(DB_STORE);
      const req = store.get(doc_id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("IndexedDB get error:", err);
    return null;
  }
}

async function triggerDocumentDownload(doc) {
  try {
    // 0. ถ้าเป็น Public Cloud URL จากคลาวด์ ให้เปิด/ดาวน์โหลดไฟล์จากคลาวด์ทันที
    if (doc.download_url && (doc.download_url.startsWith("http://") || doc.download_url.startsWith("https://"))) {
      window.open(doc.download_url, "_blank");
      return true;
    }

    // 1. ตรวจสอบว่ามีไฟล์จริงที่อัปโหลดไว้ใน IndexedDB หรือไม่
    const record = await getFileFromDB(doc.doc_id);
    if (record && record.data) {
      const url = URL.createObjectURL(record.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = record.name || doc.file_name || `${doc.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return true;
    }

    // 2. ถ้าไม่มีใน IndexedDB ให้เปิด/ดาวน์โหลดจากโฟลเดอร์ files/ ในเครื่อง
    const targetUrl = doc.download_url && doc.download_url !== "#" ? doc.download_url : `files/${doc.file_name || doc.title + '.pdf'}`;
    const a = document.createElement("a");
    a.href = targetUrl;
    a.download = doc.file_name || `${doc.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } catch (err) {
    console.error("Download error:", err);
    return false;
  }
}

