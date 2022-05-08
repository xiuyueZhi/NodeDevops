import { Service } from "egg";

export default class BranchService extends Service {
    public async getBranchList({
        projectId,
        projectSourceId,
        access_token,
        pageSize = 100,
        pageNum = 1,
      }) {
        const { ctx } = this;
        const branchList = await ctx.helper.api.gitlab.branch.getBranchList({
            projectId: projectSourceId,
            access_token,
            pageSize,
            pageNum,
        });
        branchList?.forEach((branch) => {
            branch.branchGitName = branch.name;
            branch.projectId = projectId;
            branch.projectSourceId = projectSourceId;
            delete branch.name;
        });
        branchList?.length > 0 &&
          (await ctx.model.Branch.bulkCreate(branchList, {
            ignoreDuplicates: true,
            updateOnDuplicate: ["commit"],
          }));
    
        const local = await ctx.model.Branch.findAll({
          where: {
            projectId,
          },
        });
        return local;
    }

    public async getSelfBranchList({ branchIds }) {
        const { ctx } = this;
        const local = await ctx.model.Branch.findAll({
            where: {
                id: branchIds,
            },
        });
        return local;
    }

    public async createBranch({
        projectSourceId,
        access_token,
        ref,
        branch,
        userName,
      }) {
        const { ctx } = this;
        const newBranch = await ctx.helper.api.gitlab.branch.createBranch({
            projectId: projectSourceId,
            access_token,
            ref,
            branch,
            userName,
        });
        console.log(2222,newBranch)
    
        if (!newBranch) return null;
    
        const branchCallBack = await ctx.model.Branch.create({
            projectId: projectSourceId,
            branchName: branch,
            branchType: branch.branchType,
            branchGitName: branch.branchGitName,
            branchFrom: branch.ref,
            processStatus: "dev",
            remarks: branch.remarks,
            createdUser: userName,
        });
        return branchCallBack;
    }

    public async updateBranch({ branchIds, opt }) {
        const { ctx } = this;
        const branchCallBack = await ctx.model.Branch.update(
          {
            ...opt,
          },
          {
            where: {
              id: branchIds,
            },
          }
        );
        return branchCallBack;
    }

    public async checkProcess({ branchIds, status = "some" }) {
        const { ctx } = this;
        const branchCallBack = await ctx.model.Branch.findAll({
          where: { id: branchIds },
        });
        if (branchCallBack[status]((branch) => branch.processId)) {
          return false;
        }
        return true;
    }

    
}