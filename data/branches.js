/**
 * Branch Master Data — ข้อมูลรหัสสาขา (OC) และชื่อสาขา
 */

const BRANCHES = [
  { code: "20412", name: "สาขาจอมบึง" },
  { code: "20422", name: "สาขาดอนตูม" },
  { code: "20416", name: "สาขาสวนผึ้ง" },
  { code: "20417", name: "สาขาบ้านคา" },
  { code: "20419", name: "สาขานางแก้ว" },
  { code: "20425", name: "สาขาด่านทับตะโก" },
  { code: "20430", name: "สาขาหุบกระทิง" },
  { code: "20410", name: "สาขาชัฏป่าหวาย" },
  { code: "20433", name: "สาขาเขาช่องพราน" },
  { code: "20448", name: "สาขาหนองเสือ" },
  { code: "20206", name: "สาขาท่ามะกา" },
  { code: "20214", name: "สาขาลูกแก" },
  { code: "20209", name: "สาขาหนองตากยา" },
  { code: "20213", name: "สาขาท่าเรือ" },
  { code: "20232", name: "สาขาตะคร้ำเอน" }
];

function findBranchByCode(code) {
  if (!code) return null;
  const clean = String(code).trim();
  return BRANCHES.find(b => b.code === clean) || null;
}
