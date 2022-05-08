import { Prefix, Post, Get } from 'egg-shell-decorators';
import BaseController from './BaseController';

@Prefix('user')
export default class UserController extends BaseController {

    @Post('/getUserToken')
    public async getUserToken({
        request: {
            body: { params }
        }
    }) {
        const { ctx, app } = this
        const { username, password } = params

        // 从 gitlab 获取用户的 access_token
        const token = await ctx.service.userService.getUserToken({
            username,
            password
        })

        // gitlab 获取用户信息
        const userInfo = await ctx.service.userService.getUserInfo({
            accessToken: token.access_token
        });

        // token 进行 jwt 注册
        const authToken = app.jwt.sign(
            {
                token,
                userInfo
            },
            app.config.jwt.secret
        )

        // 设置 headers
        ctx.set({ authorization: authToken });

        // 添加用户数据本地落库，此段代码为用户落库
        ctx.service.userService.saveUser({
            userInfo,
        });
        this.success(userInfo);
        // ctx.body = token
    }

    @Get('/getTokenByApplication')
    public async getTokenByApplication({
        request: {
            query: { code }
        }
    }) {
        const { ctx } =this
         // gitLab 获取 access_token
        const token = await ctx.service.userService.getTokenByApplication({ code });
        ctx.body = token;
    }

} 