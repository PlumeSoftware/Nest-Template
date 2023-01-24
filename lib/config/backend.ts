//服务端配置文件
import { meta } from "../entity/meta"

//服务器信息
export const projectServer = {
    host: "127.0.0.1",
    webpagePort: process.env.PORT
}

//服务器邮箱配置
export const serverEmail = {
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}

//数据库配置
export const databaseConfig = {
    type: process.env.SQL_TYPE,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_BASE,
    entities: meta,
    synchronize: true,
}