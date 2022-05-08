import BaseController from "../../controller/BaseController";

export default class NspController extends BaseController {
    async ping() {
        const { ctx } = this;
        const message = ctx.args[0];
        await ctx.socket.emit("res", `Hi! I've got your message: ${message}`);
    }

    public async creatJob() {
        const { ctx } = this;
        const message = ctx.args[0] || {};
        try {
          const { payload } = message;
    
          const {
            authorization,
            projectId,
            branchGitName,
            projectVersion = '0.0.01',
            buildPath = './',
            type = "h5",
            cache,
          } = payload;
          const deCode: any = ctx.app.jwt.verify(
            authorization,
            ctx.app.config.jwt.secret
          );
          const accessToken = deCode.token.access_token
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
              branchName: branchGitName,
              buildPath,
              cache,
          });
    
          setTimeout(() => {
            ctx.socket.emit("res", callBack);
          }, 2000)
    
          this.success(callBack);
        } catch (e) {
          throw e
        }
      }
}