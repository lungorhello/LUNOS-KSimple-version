# lungorstudio

lungor 的个人站。主要放 PPT OS 相关，也放一点奇奇怪怪的东西。

- 深色 + 朱红，无渐变、无发光、无图标、无 emoji
- 纯静态零构建，`index.html` 双击即可预览
- 三栏目：首页 / 唠唠 / 下载

## 本地预览

```bash
python -m http.server 4321
# 浏览器打开 http://localhost:4321
```

## 发内容

- 唠唠：改 `data/posts.js` 加对象。
- 下载：改 `data/downloads.js` 加对象；小文件放 `files/`，大文件走 [GitHub Releases](https://github.com/lungorhello/LUNOS-KSimple-version/releases)。

## 部署

部署在 Cloudflare Pages（git push 自动部署）。本仓库即源码。
