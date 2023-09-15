const fs = require('fs');
const path = require('path');

//使用 node generate.js entityName 

//模板文件路径 ./templates/controller.txt /templates/service.txt ./templates/module.txt entity.txt
const controllerTemplate = fs.readFileSync(path.resolve(__dirname, './templates/controller.txt'), 'utf8');
const serviceTemplate = fs.readFileSync(path.resolve(__dirname, './templates/service.txt'), 'utf8');
const moduleTemplate = fs.readFileSync(path.resolve(__dirname, './templates/module.txt'), 'utf8');
const entityTemplate = fs.readFileSync(path.resolve(__dirname, './templates/entity.txt'), 'utf8');

//将会在app下新建文件夹，名为entityName，并在该文件夹下生成entityName.controller.js entityName.service.js entityName.module.js
const entityName = process.argv[2];
const capEntityName = entityName.substring(0, 1).toUpperCase() + entityName.substring(1);


if (!fs.existsSync(path.resolve(__dirname, `./src/${entityName}`))) {
    fs.mkdirSync(path.resolve(__dirname, `./src/${entityName}`));
}else{
    throw new Error(`${entityName} already exists`);
}

//生成controller.js
const controllerContent = controllerTemplate.replaceAll('entityName', entityName).replaceAll('EntityName', capEntityName);
fs.writeFileSync(path.resolve(__dirname, `./src/${entityName}/${entityName}.controller.ts`), controllerContent);
console.log(`${capEntityName} Controller created`);

//生成service.js
const serviceContent = serviceTemplate.replaceAll('entityName', entityName).replaceAll('EntityName', capEntityName);
fs.writeFileSync(path.resolve(__dirname, `./src/${entityName}/${entityName}.service.ts`), serviceContent);
console.log(`${capEntityName} Service created`);

//生成module.js
const moduleContent = moduleTemplate.replaceAll('entityName', entityName).replaceAll('EntityName', capEntityName);
fs.writeFileSync(path.resolve(__dirname, `./src/${entityName}/${entityName}.module.ts`), moduleContent);
console.log(`${capEntityName} Module created`);

//生成entity.js
const entityContent = entityTemplate.replaceAll('entityName', entityName).replaceAll('EntityName', capEntityName);
fs.writeFileSync(path.resolve(__dirname, `./src/${entityName}/${entityName}.entity.ts`), entityContent);
console.log(`${capEntityName} Entity created`);


//读取src/app.module.ts文件
const appModulePath = path.resolve(__dirname, './src/app.module.ts');
const appModuleContent = fs.readFileSync(appModulePath, 'utf8');
//检查是否已经存在同名module
if (appModuleContent.indexOf(`import { ${capEntityName}Module } from './${entityName}/${entityName}.module';`) !== -1) {
    throw new Error(`${capEntityName}Module already exists`);
}
// 在第一个空行后加入import { EntityNameModule } from './entityName/entityName.module';
const importContent = `\nimport { ${capEntityName}Module } from './${entityName}/${entityName}.module';`;
const firstEmptyLineIndex = appModuleContent.indexOf('\n\n');
let newAppModuleContent = appModuleContent.slice(0, firstEmptyLineIndex) + importContent + appModuleContent.slice(firstEmptyLineIndex);

//找到imports: []，在[]中加入EntityNameModule
const importsIndex = newAppModuleContent.indexOf('imports: [');
newAppModuleContent = newAppModuleContent.slice(0, importsIndex + 10) + `\n    ${capEntityName}Module,` + newAppModuleContent.slice(importsIndex + 10);
fs.writeFileSync(appModulePath, newAppModuleContent);