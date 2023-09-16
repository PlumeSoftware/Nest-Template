# 引力岛Trip小程序

## 项目介绍
基于Nest.js + TypeOrm，对接MySQL

## 开发规范
请参考[Nest.js](https://docs.nestjs.com/)(https://docs.nestjs.com/)官方文档  
此外，还需要注意以下几点：
- 使用TypeScript进行开发
- 遵循MVC规范，控制器负责处理请求，服务负责处理业务逻辑，实体负责定义数据结构
- 在新开发模块时，请使用命令 `node gen.js <module-name>` 创建

## 配置文件
需要在根目录下创建`.env`文件，内容如下：
```
PORT=39450

SQL_HOST=127.0.0.1
SQL_PORT=3306
SQL_USER=root
SQL_PASS=password
SQL_BASE=databasename

WEAPPID=wx123456789abcdef0
WEAPPSECRET=fedcba9876543210fedcba987654321
WEMCHID=11111111111
```
或配置相同的环境变量

## 项目启动
```
npm install
npm run start:dev
```
需要注意，请使用npm安装依赖，否则版本不一致有可能导致项目无法启动

## 项目打包
```
npm run build
```

## 联系作者
Author: Dcolor  
Email: corfer@yeah.net  
