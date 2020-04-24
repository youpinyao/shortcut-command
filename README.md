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
  "push": "git push",
  "pull": "git pull",
  "pick": "git cherry-pick",
  "build": "npm run build",
  "start": "npm run start"
}
```

## 执行

```node
sc push (git push)
sc pull (git pull)
sc pick 5405d3bcec7651894a378ac661fb274529168cea (git cherry-pick 5405d3bcec7651894a378ac661fb274529168cea)
```


## 特殊处理

```node
--string      字符串
+             前后连接无空格
[key]=[value] 参数替换
```
