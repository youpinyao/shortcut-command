# shortcut command

```node
本工具用于对命令行进行缩写
```


## 安装

```node
npm i shortcut-command -g
```

## 初始化

```node
sc --init
```

## 配置文件

```node
{
  "gpu": "git push",
  "gpl": "git pull",
  "gcp": "git cherry-pick",
  "build": "npm run build",
  "start": "npm run start"
}
```

## 执行

```node
sc gpl (git pull)
sc gcp 5405d3bcec7651894a378ac661fb274529168cea (git cherry-pick 5405d3bcec7651894a378ac661fb274529168cea)
```


## 特殊处理

```node
--string 字符串
+ 前后连接无空格

```
