# frostsalix

一个不太正经、但能正常工作的个人网站。

这里住着：
- 首页头像一只
- 几篇博客碎片
- 一点点 GitHub Pages 魔法

## 本地启动

```bash
npm install
npm run dev
```

然后打开 [http://localhost:3000](http://localhost:3000) ，看这只网站开始营业。

## 构建发布

```bash
npm run build
```

构建产物会输出到 `out`，然后由 GitHub Actions 送去 GitHub Pages。

## 目录里有啥

- `app/`：页面和路由
- `posts/`：文章正文
- `data/`：文章数据和一些站点工具

## 小声说明

如果某个头像看起来像在装死，通常不是它的错，是路径、缓存，或者浏览器在闹脾气。