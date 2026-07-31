# files/

放跟站点一起部署的小文件下载（建议 < 20MB，如 demo、模板）。
大文件（20MB~2GB）不要放这里，走对象存储（Cloudflare R2 / GitHub Releases），
在 `data/downloads.js` 里把 `url` 填成直链即可。

目录现在为空，部署前把 PPT OS 的 pptx 放进来，并更新 `data/downloads.js` 的 url。
