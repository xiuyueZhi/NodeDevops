import http from '../../utils/http'

module.exports = (app) => {
    const getMergeList = async ({ params }) => {
        const { data } = await http(app).methodV({
          url: "/merge_requests",
          params,
          method: "GET",
        });
        return JSON.parse(data);
    };

    const acceptMerge = async ({ projectId, mergeRequestId }) => {
        const { data, code } = await http(app).methodV({
          url: `/projects/${projectId}/merge_requests/${mergeRequestId}/merge`,
          method: "PUT",
        });
        switch (code) {
          case 200: {
            return { data: JSON.parse(data) };
          }
          case 201: {
            return { data: JSON.parse(data) };
          }
          case 404: {
            return { msg: "无效合并请求，请去 gitLab 检查" };
          }
          case 405: {
            return { msg: "无效合并请求，请去 gitLab 检查" };
          }
          default:
            return { msg: data.message };
        }
    };

    const createMerge = async ({
        projectId,
        sourceBranch,
        targetBranch,
        title,
        description,
        assigneeId,
      }) => {
        try {
          const { data, code } = await http(app).methodV({
            url: `/projects/${projectId}/merge_requests`,
            params: {
              source_branch: sourceBranch,
              target_branch: targetBranch,
              title,
              description,
              assignee_id: assigneeId,
            },
            method: "POST",
          });
          switch (code) {
            case 200: {
              return { data: JSON.parse(data) };
            }
            case 201: {
              return { data };
            }
            case 404: {
              return { msg: "无效合并请求，请去gitlab检查" };
            }
            case 405: {
              return { msg: "无效合并请求，请去gitlab检查" };
            }
            default:
              return { msg: data.message };
          }
        } catch (e) {
          console.log(e);
        }
    };

    const updateMerge = async ({ projectId, mergeRequestId, stateEvent }) => {
        const { data, code } = await http(app).methodV({
          url: `/projects/${projectId}/merge_requests/${mergeRequestId}`,
          params: {
            state_event: stateEvent,
          },
          method: "PUT",
        });
        switch (code) {
          case 200: {
            return { data: JSON.parse(data) };
          }
          case 201: {
            return { data };
          }
          case 404: {
            return { msg: "无效更新请求，请去gitlab检查" };
          }
          case 405: {
            return { msg: "无效更新请求，请去gitlab检查" };
          }
          default:
            return { msg: data.message };
        }
    };

    return {
        getMergeList,
        acceptMerge,
        createMerge,
        updateMerge,
    };
}