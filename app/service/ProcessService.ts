import { Service } from "egg";

export default class ProcessService extends Service {
    public async createProcess({
        desc,
        name,
        branchIds,
        workflowTplId,
        createdUser,
        updateUser,
      }) {
        const { ctx } = this;
        const workflowTpl = await ctx.model.Process.create({
            desc,
            name,
            branchIds,
            workflowTplId,
            createdUser,
            updateUser,
        });
        return workflowTpl;
    }

    public async getProcessList({ pageSize = 10, pageNum = 1, opt = {} }) {
        const { ctx } = this;
        // 创建任务流模板
        let offset = (pageNum - 1) * pageSize;
        const processList = await ctx.model.Process.findAndCountAll({
          where: { ...opt },
          limit: pageSize,
          offset,
          order: [["created_at", "DESC"]],
        });
        return processList && JSON.parse(JSON.stringify(processList));
    }
}