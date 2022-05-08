import { Post, Prefix, Get } from "egg-shell-decorators";
import BaseController from "./BaseController";

@Prefix("process")
export default class ProcessController extends BaseController {
  /**
   * 创建 devOps 任务流
   */
  @Post("/create")
  public async createProcess({
    request: {
      body: { params },
    },
  }) {
    const { ctx } = this;
    const { username } = this.user;
    const { name, branchIds, workflowTplId, desc } = params;
    const branchStatus = await ctx.service.branchService.checkProcess({ branchIds });
    if (!branchStatus)
        this.error({
            code: '401',
            data: null,
            message: "已有分支在流程中",
        });
    const status = await ctx.service.processService.createProcess({
        desc,
        name,
        branchIds,
        workflowTplId,
        createdUser: username,
        updateUser: username,
    });
    await ctx.service.branchService.updateBranch({
        branchIds,
        opt: {
            processId: status.id,
        },
    });
    this.success(status);
  }

  /**
   * 查询 devOps 任务流
   */
  @Get("/getList")
  public async getProcessList({ request: { query } }) {
    const { ctx } = this;
    const { pageSize = 10, pageNum = 1 } = query;
    const processList = await ctx.service.processService.getProcessList({
        pageNum: parseInt(pageNum),
        pageSize: parseInt(pageSize),
    });
    // 联表查询分支信息
    for (let process of processList.rows) {
        const { branchIds } = process;
        process.branches = await ctx.service.branchService.getSelfBranchList({
            branchIds,
        });
    }
    this.success(processList);
  }
}