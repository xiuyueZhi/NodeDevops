import { Controller } from "egg";

export default class BaseController extends Controller {
    get token() {
        return this.ctx.user.token;
    }
    
    get user() {
        return this.ctx.user.userInfo;
    }
    async success(data) {
        this.ctx.body = {
            code: 0,
            data,
        };
    }
    error({ code, data, message }) {
        // 根据业务返回不同的错误 code，提供给前端做业务判断处理
        this.ctx.body = {
            code,
            data,
            message
        };
    }
}