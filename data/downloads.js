/* =========================================================
   下载清单数据源 —— 全站唯一数据源（下载页 + 首页流都读它）
   字段：
     name      文件名展示名
     version   版本号
     date      发布日期 YYYY-MM-DD
     size      文件大小（字符串，如 "48.2 MB"）
     type      类型（如 pptx）
     url       直链（仓库内小文件放 files/；大文件放 R2 / GitHub Releases）
     note      更新说明（可选）
     sha       SHA-256（可选，大文件建议填）
   分层建议：< 20MB 进 files/；20MB~2GB 走 R2 或 GitHub Releases
   已有一条测试条目（LUNOS KSCN / alpha2.7）。
   ========================================================= */
var DOWNLOADS = [
  {
    name: "LUNOS KSCN",
    version: "alpha2.7",
    date: "2026-07-30",
    size: "27.3 MB",
    type: "pptm",
    url: "https://gh-proxy.com/https://github.com/lungorhello/LUNOS-KSimple-version/releases/download/alpha/LUNOS-KSCN.pptm",
    note: "国内加速下载（gh-proxy）。源文件见 GitHub Releases。",
    sha: ""
  },
  {
    name: "osu!",
    version: "外链",
    date: "2026-07-30",
    size: "—",
    type: "链接",
    url: "https://osu.ppy.sh/home/download",
    external: true,
    weird: true,
    note: "由于我 TIP 开屏动画借鉴了 OSU，所以我提供 OSU 下载很合理吧。",
    sha: ""
  }
];
