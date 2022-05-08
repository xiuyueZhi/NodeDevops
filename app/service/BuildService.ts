import { Service } from "egg";
export default class BuildService extends Service {
    public async buildProject({
        type = "h5",
        projectName,
        projectVersion,
        projectGitPath,
        branchName,
        buildPath,
        cache,
    }) {
        const { ctx } = this;
        const callBack = await ctx.helper.api.jenkins.index.buildJenkins({
          type,
          job: "node-devops",
          params: {
            PROJECT_NAME: projectName,
            PROJECT_VERSION: projectVersion,
            PROJECT_GIT_PATH: projectGitPath,
            BRANCH_NAME: branchName,
            BUILD_PATH: buildPath,
            CACHE: cache,
          },
        });
        return callBack;
    }
}