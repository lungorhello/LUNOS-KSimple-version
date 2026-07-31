/* =========================================================
   lungorstudio — 交互
   - 首屏加载动画收尾
   - 四栏目单页切换（无整页刷新，淡入手感）
   - 唠唠 / 下载 / 首页动态流 全部由 data/*.js 渲染
   注意：本文件无任何网络写接口，站点不可被他人投稿/篡改。
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    /* ---- 加载动画收尾 ---- */
    var loader = document.querySelector('.loader');
    if (loader) setTimeout(function () { loader.remove(); }, 1800);

    /* ---- 栏目切换 ---- */
    var navButtons = document.querySelectorAll('.nav button');
    var panes = document.querySelectorAll('.pane');
    function show(target) {
      navButtons.forEach(function (b) {
        b.classList.toggle('active', b.dataset.target === target);
      });
      panes.forEach(function (p) {
        p.classList.toggle('is-active', p.id === target);
      });
      window.scrollTo({ top: 0 });
    }
    navButtons.forEach(function (b) {
      b.addEventListener('click', function () { show(b.dataset.target); });
    });

    var POSTS = window.POSTS || [];
    var DOWNLOADS = window.DOWNLOADS || [];

    /* ---- 唠唠列表 ---- */
    var list = document.getElementById('laolao-list');
    var postView = document.getElementById('laolao-post');
    var postTitle = document.getElementById('laolao-post-title');
    var postMeta = document.getElementById('laolao-post-meta');
    var postBody = document.getElementById('laolao-post-body');
    var back = document.getElementById('laolao-back');

    POSTS.slice().sort(function (a, b) { return b.date.localeCompare(a.date); })
      .forEach(function (p) {
        var item = document.createElement('button');
        item.className = 'item--link';
        item.innerHTML =
          '<span class="item__title">' + p.title + '</span>' +
          '<span class="meta">' + p.date + (p.ai ? ' · <span class="ai">AI</span>' : '') + '</span>';
        item.addEventListener('click', function () {
          postTitle.textContent = p.title;
          postMeta.innerHTML = p.tag + ' · ' + p.date + (p.ai ? ' · <span class="ai">AI 撰写</span>' : '');
          postBody.innerHTML = p.body;
          list.hidden = true;
          postView.hidden = false;
          window.scrollTo({ top: 0 });
        });
        list.appendChild(item);
      });

    back.addEventListener('click', function () {
      postView.hidden = true;
      list.hidden = false;
    });

    /* ---- 下载列表 ---- */
    var dl = document.getElementById('download-list');
    DOWNLOADS.forEach(function (d) {
      var item = document.createElement('div');
      item.className = 'item';
      item.innerHTML =
        '<div>' +
          '<span class="item__title">' + d.name + '</span><br>' +
          '<span class="meta">' + d.version + ' · ' + d.type + ' · ' +
            d.size + ' · ' + d.date + '</span>' +
          (d.note ? '<p class="item__note">' + d.note + '</p>' : '') +
        '</div>' +
        '<a class="dl" href="' + d.url + '"' + (d.external ? ' target="_blank" rel="noopener"' : ' download') + '>' + (d.external ? '外链 ↗' : '下载 ↓') + '</a>';
      dl.appendChild(item);
    });

    /* ---- 首页：最近更新（文章 + 发布 混排时间线） ---- */
    var feed = document.getElementById('home-feed');
    var feedItems = DOWNLOADS.filter(function (d) { return !d.weird; }).map(function (d) {
      return { label: d.name + ' ' + d.version + ' 发布', date: d.date, kind: '发布' };
    }).concat(POSTS.map(function (p) {
      return { label: '唠唠 · ' + p.title, date: p.date, kind: '唠唠', ai: !!p.ai };
    })).sort(function (a, b) { return b.date.localeCompare(a.date); })
      .slice(0, 6);
    feedItems.forEach(function (it) {
      var row = document.createElement('div');
      row.className = 'item';
      row.innerHTML =
        '<span><span class="meta">' + it.kind + (it.ai ? ' · <span class="ai">AI</span>' : '') + '</span> ' + it.label + '</span>' +
        '<span class="meta">' + it.date + '</span>';
      feed.appendChild(row);
    });

    /* ---- 首页：奇奇怪怪分区（奇奇怪怪文章 + 标 weird 的下载） ---- */
    var weird = document.getElementById('home-weird');
    var weirdPosts = POSTS.filter(function (p) { return p.category === '奇奇怪怪'; })
      .map(function (p) { return { title: p.title, date: p.date, url: null, external: false }; });
    var weirdDls = DOWNLOADS.filter(function (d) { return d.weird; })
      .map(function (d) { return { title: d.name, date: d.date, url: d.url, external: !!d.external }; });
    weirdPosts.concat(weirdDls)
      .sort(function (a, b) { return b.date.localeCompare(a.date); })
      .forEach(function (it) {
        var row = document.createElement('div');
        row.className = 'item';
        if (it.url) {
          row.innerHTML =
            '<a class="item__title" href="' + it.url + '"' + (it.external ? ' target="_blank" rel="noopener"' : '') + '>' + it.title + ' ↗</a>' +
            '<span class="meta">' + it.date + '</span>';
        } else {
          row.innerHTML =
            '<span class="item__title">' + it.title + '</span>' +
            '<span class="meta">' + it.date + '</span>';
        }
        weird.appendChild(row);
      });
  });
})();
