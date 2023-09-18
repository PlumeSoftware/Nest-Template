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
} else {
    throw new Error(`${entityName} already exists`);
}

//生成controller.js
const controllerContent = controllerTemplate.replaceAll('entityName', entityName).replaceAll('EntityName', capEntityName);
console.log(`${capEntityName} Controller created`);

//生成service.js
const serviceContent = serviceTemplate.replaceAll('entityName', entityName).replaceAll('EntityName', capEntityName);
console.log(`${capEntityName} Service created`);

//生成module.js
const moduleContent = moduleTemplate.replaceAll('entityName', entityName).replaceAll('EntityName', capEntityName);
console.log(`${capEntityName} Module created`);

//生成entity.js
const entityContent = entityTemplate.replaceAll('entityName', entityName).replaceAll('EntityName', capEntityName);

//读取lib/entity.ts文件
const entityPath = path.resolve(__dirname, './lib/entity.ts');
const entityFileContent = fs.readFileSync(entityPath, 'utf8');
//检查是否已经存在同名entity
console.log(entityFileContent);
if (entityFileContent.indexOf(`import { ${capEntityName} } from '../src/${entityName}/${entityName}.entity';`) !== -1) {
    throw new Error(`${capEntityName} already exists`);
}

// 在第一个空行后加入import { EntityNameEntity } from '../src/entityName/entityName.entity';
const entityImportContent = `import { ${capEntityName} } from '../src/${entityName}/${entityName}.entity';\n`;
console.log(entityImportContent);
let entityFirstEmptyLineIndex = entityFileContent.indexOf('\n\n');
entityFirstEmptyLineIndex = entityFirstEmptyLineIndex < 0 ? 0 : entityFirstEmptyLineIndex;
let newEntityFileContent = entityFileContent.slice(0, entityFirstEmptyLineIndex) + entityImportContent + entityFileContent.slice(entityFirstEmptyLineIndex);
const entitiesIndex = newEntityFileContent.indexOf('const entities = [');
newEntityFileContent = newEntityFileContent.slice(0, entitiesIndex + 18) + `\n    ${capEntityName},` + newEntityFileContent.slice(entitiesIndex + 18);

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

fs.writeFileSync(path.resolve(__dirname, `./src/${entityName}/${entityName}.controller.ts`), controllerContent);
fs.writeFileSync(path.resolve(__dirname, `./src/${entityName}/${entityName}.service.ts`), serviceContent);
fs.writeFileSync(path.resolve(__dirname, `./src/${entityName}/${entityName}.module.ts`), moduleContent);

fs.writeFileSync(path.resolve(__dirname, `./src/${entityName}/${entityName}.entity.ts`), entityContent);
fs.writeFileSync(entityPath, newEntityFileContent);
fs.writeFileSync(appModulePath, newAppModuleContent);