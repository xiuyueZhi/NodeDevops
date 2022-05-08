import { Prefix, Post, Get } from 'egg-shell-decorators';
import BaseController from './BaseController';

@Prefix('project')
export default class ProjectController extends BaseController {
    @Get("/getProjectList")
    public async getProjectList({ request: { query }}) {
        const { ctx } = this;
        // const { id: userId } = this.user;
        const { pageSize, pageNum } = query;
        console.log(222,this.token)
        const projectList = await ctx.service.projectService.getProjectList({
            pageSize,
            pageNum,
            accessToken: this.token.access_token,
        });
        this.success(projectList);
    }
    @Get("/get")
    public async getProject({ request: { query } }) {
        const { ctx } = this;
        const { projectId } = query;
        const project = await ctx.service.projectService.getProject({
            projectId,
            accessToken: this.token.access_token
        });
        this.success(project);
    }
    @Post("/ding")
    public async ding() {
        const { ctx } = this;
        const { body: { params: {content} }} = ctx.request;
        await ctx.helper.robot.ding.text({ content });
        this.success({});
    }
}