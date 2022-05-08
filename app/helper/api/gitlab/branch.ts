import http from '../../utils/http'

module.exports = (app) => {
    const getBranchList = async ({
        pageSize,
        pageNum,
        projectId,
        access_token,
      }) => {
        try {
          const res = await http(app).methodV({
            url: `/projects/${projectId}/repository/branches`,
            method: "GET",
            query: {
              per_page: pageSize,
              page: pageNum,
              access_token,
            },
          });
          const { code, data} = res
          console.log(222,res,code,data)
          return data
        //   switch (code) {
        //     case 200: {
        //       return data;
        //     }
        //     default: {
        //       return { msg: data };
        //     }
        //   }
        } catch (e) {
          return { msg: e };
        }
    };

    const getBranch = async ({ projectId, branch: branchName }) => {
        const branch = await http(app).methodV({
          url: `/projects/${projectId}/repository/branches/${branchName}`,
          method: "GET",
        });
        return branch;
    };

    const createBranch = async ({ ref, projectId, branch, access_token }) => {
        const { data, code } = await http(app).methodV({
          url: `/projects/${projectId}/repository/branches`,
          params: {
            ref,
            branch,
          },
          query: { access_token },
          method: "POST",
        });
        if(code !==200) return false
        return data;
    };

    const setProtectedBranch = async ({ branch }) => {
        const { projectId } = branch;
        const status = await http(app).methodV({
          url: `/projects/${projectId}/protected_branches`,
          params: {
            name: "zeus/*",
            merge_access_level: 30,
            push_access_level: 0,
          },
          method: "POST",
        });
        return status;
    };

    const delProtectedBranch = async ({ branch }) => {
        const { projectId } = branch;
        const status = await http(app).methodV({
          url: `/projects/${projectId}/protected_branches/zeus%2F*`,
          method: "DELETE",
        });
        return status;
    };

    const delBranch = async (projectId, branchGitName) => {
        const status = await http(app).methodV({
          url: `/projects/${projectId}/repository/branches/${encodeURIComponent(
            branchGitName
          )}`,
          method: "DELETE",
        });
        return status;
    };

    return {
        getBranchList,
        createBranch,
        getBranch,
        setProtectedBranch,
        delProtectedBranch,
        delBranch,
    };
}