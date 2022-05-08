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
console.log(222,authToken)
        // 设置 headers
        ctx.set({ "Access-Control-Expose-Headers": "authorization" });
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
        const { ctx, app } =this
         // gitLab 获取 access_token
        const token = await ctx.service.userService.getTokenByApplication({ code });
        // gitlab 获取用户信息
        const userInfo = await ctx.service.userService.getUserInfo({
            accessToken: token.access_token
        });
  
       // 添加用户数据本地落库，此段代码为用户落库
       ctx.service.userService.saveUser({
            userInfo,
        });
        // token 进行 jwt 注册
        const authToken = app.jwt.sign(
            {
                token,
                userInfo
            },
            app.config.jwt.secret
        )
  
        ctx.set({ "Access-Control-Expose-Headers": "authorization" });
        ctx.set({ authorization: authToken }); // 设置 headers
        ctx.cookies.set('authorization', authToken, {
            maxAge: 1000 * 3600 * 24, // cookie存储一天 设置过期时间后关闭浏览器重新打开cookie还存在
            httpOnly: true, // 仅允许服务获取,不允许js获取
            domain: 'test.com' // 设置cookie跨域
        });
        ctx.redirect(`http://devops.test.com:8000`);
    }

    @Get("/getUserInfo")
    public async getUserInfo() {
        const { ctx } = this;
        // gitLab 获取用户信息
        const userInfo = await ctx.service.userService.getUserInfo({
            accessToken: this.token.access_token
        });

        this.success(userInfo);
    }

} 