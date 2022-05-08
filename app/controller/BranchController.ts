import { Post, Prefix, Get } from "egg-shell-decorators";
import BaseController from "./BaseController";

@Prefix("branch")
export default class BranchController extends BaseController {
    @Post("/create")
    public async createBranch({
        request: {
        body: { params },
        },
    }) {
        console.log(111,params)
        const { ctx } = this;
        const { access_token } = this.token;
        const { name: userName } = this.user;
        const { projectSourceId, ref, branch } = params;
        const newBranch = await ctx.service.branchService.createBranch({
            access_token,
            projectSourceId,
            ref,
            branch,
            userName,
        });
        this.success(newBranch);
    }

    @Get("/getList")
    public async getBranchList({ request: { query } }) {
        const { ctx, token } = this;
        const { access_token } = token;
        const { projectId } = query;
        const { projectSourceId } = await ctx.service.projectService.getProject({ projectId, accessToken: access_token });

        const branchList = await ctx.service.branchService.getBranchList({
            projectId,
            access_token,
            projectSourceId: projectSourceId,
        });
        this.success(branchList);
    }

    @Post("/submitTest")
    public async submitTest({ request: { query } }) {
        const { ctx } = this;
        const { id } = query;
        // const project = await ctx.service.projectService.getProject({ projectId, accessToken });
        // console.log(9999,project)
        // let projectGitPath = project.projectUrl.replace(
        //     "http://",
        //     `http://oauth2:${accessToken}@`
        // );
        // const callBack = await ctx.service.buildService.buildProject({
        //     type,
        //     projectName: project.projectGitName,
        //     projectVersion,
        //     projectGitPath: `${projectGitPath}.git`,
        //     branchName: branchGitName,
        //     buildPath,
        //     cache,
        // });
        const res = await ctx.service.branchService.updateBranch({
            branchIds: id,
            opt: {
                branchStatus: 1,
            },
        });
        // const { projectSourceId } = await ctx.service.projectService.getProject({ projectId, accessToken: access_token });

        // const branchList = await ctx.service.branchService.getBranchList({
        //     projectId,
        //     access_token,
        //     projectSourceId: projectSourceId,
        // });
        this.success(res);
    }
}