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
        // console.log(11111,callBack)
        this.success(callBack)
    }
}