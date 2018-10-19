# ylwebapp

> ylsoft webapp


## 项目启动相关命令

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 文档发布相关命令

```bash

cnpm run docs:dev

# 文档本地运行

cnpm run docs:build

# 文档编译


```
## 文档发布git命令

```
cd docs/.vuepress/dist

git init 

git add -A

git commit -m '20180725'

git branch gh-pages

git checkout gh-pages

# 切换分支

git remote add origin https://github.com/danielmlc/webApp.git

git push -u origin gh-pages

# 注意： 上传时遇到版本冲突时

git fetch origin gh-pages:temp

git merge temp

# 合并分支

git branch -d temp

# 删除本地分支

# 当然简洁的方式直接删除远程分支

git branch -r

git branch -r -d origin/gh-pages

git push  origin :gh-pages

git push -u origin gh-pages

```

## 一键部署
cd docs/.vuepress/dist
git init 
git add -A
git commit -m '文档更新'
git branch gh-pages
git checkout gh-pages
git remote add origin https://github.com/danielmlc/webApp.git
git branch -r -d origin/gh-pages
git push  origin :gh-pages
git push -u origin gh-pages

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# shoppingMall
