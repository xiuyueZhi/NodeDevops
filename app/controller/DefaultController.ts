import { Controller } from "egg";

export default class DefaultController extends Controller {
    async ping() {
        const { ctx } = this;
        const message = ctx.args[0];
        await ctx.socket.emit("res", `Hi! I've got your message: ${message}`);
    }
}