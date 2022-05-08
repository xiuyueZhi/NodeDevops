import { Controller } from 'egg';
import { Prefix, Post } from 'egg-shell-decorators'

// export default class HomeController extends Controller {
//   public async index() {
//     const { ctx } = this;
//     // ctx.body = await ctx.service.test.sayHi('egg');
//     // ctx.body = 'Hello World!'
//     // 获取 url 后面的参数
//     // ctx.body = `Hello ${ctx.query.name}!`
//     // 获取 url 后面的同名参数，会将同名参数组成一个数组
//     // ctx.body = `Hello ${ctx.queries.name.join('、')}!`
//     // 获取 Restful 接口的参数
//     // ctx.body = `Hello ${ctx.params.name}!`
//     // 获取 Post 请求
//     ctx.body = `Hello ${ctx.request.body.name}!`
//   }
// }

@Prefix('/home')
export default class HomeController extends Controller {

  @Post('/')
  public async index() {
    const { ctx } = this
    const { helper: { util } } = ctx
    // ctx.body = `Hello ${ctx.request.body.name}!`
    ctx.body = util.hello()
  }
}
