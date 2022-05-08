import http from '../../utils/http'

module.exports = (app) => {
    const getUserInfo = async ({ accessToken }) => {
        const { data: userInfo } = await http(app).methodV({
          url: "/user",
          method: "GET",
          query: {
            access_token: accessToken,
          },
        });
        return userInfo;
    };
    const getUsers = async ({ params = {}, pageNum = 1, pageSize = 100 }) => {
        const { data } = await http(app).methodV({
          url: "/users",
          params: {
            ...params,
            per_page: pageSize,
            page: pageNum,
          },
          method: "GET",
        });
        return data;
      };

      return {
        getUserInfo,
        getUsers
      }
}