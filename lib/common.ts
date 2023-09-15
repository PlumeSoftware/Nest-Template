export enum Code {
    SUCCESS = 0,
    ERROR = 1,
}


export interface BaseReq {
    readonly page: number;
}


export class BaseRes<T = any> {
    code: Code;
    message: string;
    data: T;
    constructor(code: Code, data?: T | string) {
        this.code = code;
        switch (code) {
            case Code.SUCCESS:
                this.data = data as T;
                this.message = 'success';
                break;
            case Code.ERROR:
                this.message = data as string || 'error';
                break;
        }
    }
}
