import { Post, Prefix } from "egg-shell-decorators";
import BaseController from "./BaseController";

@Prefix("build")
export default class BuildController extends BaseController {
    @Post("/createJob")
    public async createJob({
        request: {
            body: { params }
        }
    }) {
        const { ctx } = this;
        const { access_token: accessToken } = this.token;
        const {
            id,
            projectId,
            branchName,
            projectVersion,
            buildPath,
            type,
            cache,
        } = params;
        const project = await ctx.service.projectService.getProject({ projectId, accessToken });
        console.log(9999,project)
        let projectGitPath = project.projectUrl.replace(
            "http://",
            `http://oauth2:${accessToken}@`
        );
        const callBack = await ctx.service.buildService.buildProject({
            type,
            projectName: project.projectGitName,
            projectVersion,
            projectGitPath: `${projectGitPath}.git`,
            branchName,
            buildPath,
            cache,
        });
        await ctx.service.branchService.updateBranch({
            branchIds: id,
            opt: {
                branchStatus: 2,
            },
        });
        await ctx.helper.robot.ding.text({content: `项目：${project.projectGitName}，分支：${branchName} 开始构建 `});
        // this.success({});
        // console.log(11111,callBack)
        this.success(callBack)
    }
}