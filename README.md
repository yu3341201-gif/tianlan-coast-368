# 天澜海岸网页

这是一个无需安装依赖的静态网站，可部署到 Netlify、Cloudflare Pages、Vercel、GitHub Pages 或任意虚拟主机。

## 修改内容

用记事本或任意代码编辑器打开 `content.js`。所有房源资料、卖点、价格口径及联系方式都集中在该文件中。修改中文内容后保存，再重新上传整个文件夹即可。

需要更换风格时编辑 `styles.css`；页面结构位于 `index.html` 和 `app.js`。

## 本地预览

直接双击 `index.html` 即可查看。若浏览器限制本地脚本，可在本目录运行：

```powershell
python -m http.server 8000
```

然后打开 `http://localhost:8000`。

## 发布

将本文件夹整体上传至静态网站托管服务即可。入口文件为 `index.html`。
