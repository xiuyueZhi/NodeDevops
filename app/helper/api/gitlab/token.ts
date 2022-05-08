import http from '../../utils/http'

module.exports = (app) => {
    const getDeployTokens = async ({ projectId, access_token }) => {
        try {
          const { data, code } = await http(app).methodV({
            url: `/projects/${projectId}/deploy_tokens`,
            method: "GET",
            query: {
              access_token,
            },
          });
          switch (code) {
            case 200: {
              return data;
            }
            default: {
              return { msg: data };
            }
          }
        } catch (e) {
          return { msg: e };
        }
    };
    
    return {
        getDeployTokens,
    };
}