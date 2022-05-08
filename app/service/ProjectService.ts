import { Service } from 'egg';

export default class ProjectService extends Service {
   
    public async getProjectList({ pageSize = 100, pageNum = 1, accessToken }) {
        const { ctx } = this
        const {helper: { api }} = ctx
        console.log(accessToken)
        const {
          projectList,
        } = await api.gitlab.project.getProjectByUser({
            pageSize,
            pageNum,
            access_token: accessToken
        });
        console.log(33333,projectList)
        const selfProjectList: any = [];
        const opt: number[] = [];
        if (!projectList) return []
        projectList?.forEach((project) => {
            if(!project) {
                return
            }
            selfProjectList.push({
                projectSourceId: project.id,
                namespace: project.namespace.name,
                projectUrl: project.web_url,
                projectGitName: project.name,
                projectGitDesc: project.description,
                projectDesc: project.description,
                logo: project.logo,
                lastActivityAt: new Date(project.last_activity_at),
                nameWithNamespace: project.name_with_namespace,
            });
            opt.push(project.id);
        });

        // 数据落库，批量更新
        if (selfProjectList.length > 0) {
            await ctx.model.Project.bulkCreate(selfProjectList, {
                updateOnDuplicate: [
                    "projectGitDesc",
                    "namespace",
                    "projectUrl",
                    "projectGitName",
                    "lastActivityAt",
                    "logo",
                    "nameWithNamespace",
                ],
            });
        }
        const local: any = await ctx.model.Project.findAll({
            where: {
                projectSourceId: opt,
            },
        });
      
        return local;
    }

    public async getProject({ projectId, accessToken }) {
        const { ctx } = this;
        const selfProject = await ctx.model.Project.findOne({
            where: {
                id: projectId
            },
            raw: true,
        });
        console.log(8888,selfProject,accessToken)
        const project = await ctx.helper.api.gitlab.project.getProject({
            id: selfProject.projectSourceId,
            access_token: accessToken
        });
        console.log(777,project)
        return { ...selfProject, ...project };
    }
}
