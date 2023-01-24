import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { cacheSql, recordSheet } from '../../lib/tools/cache';
import { Observable } from 'rxjs';
import { LogService } from '../../ops/log/log.service';
import path from 'path';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly logService: LogService
    ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const { method, headers, route, body } = context.switchToHttp().getRequest();
        /**
         * v1接口小程序专用
         * GET请求不需要做检查，非GET请求记录入日志表
         */
        if (route['path'].indexOf('v1') != -1) {
            if (method != 'GET' && route['path'] != "/v1/mp/order/cart/culfav") {
                try {
                    this.logService.addlog({ createby: headers['token'], method: method, path: route['path'] })
                        .then(() => {
                            cacheSql();
                            if (JSON.stringify(body).length > 100) {
                                recordSheet(route['path'], body)
                            }
                        })
                } catch { }
            }
            return true;
        }

        /**
         * v2接口管理系统专用
         * 需要先检查token，然后将所有操作记录入日志表
         */
        else if (route['path'].indexOf('v2') != -1) {
            if (headers.token) {
                this.logService.addlog({ createby: headers['token'], method: method, path: route['path'] })
                    .then(() => {
                        cacheSql();
                        if (JSON.stringify(body).length > 100) {
                            recordSheet(route['path'], body)
                        }
                    })
                return true
            }
            else return false
        }
        else if (route['path'].indexOf('v3') != -1) {
            return true
        }
    }
}