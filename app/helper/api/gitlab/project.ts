import http from '../../utils/http'

module.exports = (app) => {
    const getProjects = async ({ pageSize, pageNum, accessToken }) => {
        const { data: projectList } = await http(app).methodV({
            url: '/projects',
            method: 'GET',
            query: {
                per_page: pageSize,
                page: pageNum,
                access_token: accessToken
            }
        })
        return { projectList }
    };
    const createProjects = async ({ gitParams }) => {
        const status = await http(app).methodV({
            url: "/projects",
            method: 'POST',
            params: {
                ...gitParams,
            },
        });
        return status;
    };
    const deleteProtectedBranches = async (projectId: number) => {
        const url = `/projects/${projectId}/protected_branches/master`;
        const status = await http(app).methodV({
            url,
            method: 'DELETE',
        });
        return status;
    };
    const protectedBranches = async (projectId: number) => {
        const url = `/projects/${projectId}/protected_branches`;
        const status = await http(app).methodV({
            url,
            method: 'POST',
            params: {
                name: "master",
                push_access_level: 0,
                merge_access_level: 40,
            },
        });
        return status;
    };
    const getProject = async ({ id, access_token }) => {
        console.log(666,id,access_token)
        const project = await http(app).methodV({
            url: `/projects/${id}`,
            method: "GET",
            query: { access_token }
        });
        return project;
    };
    const getProjectByUser = async ({ pageSize, pageNum, access_token }) => {
        const { data: projectList } = await http(app).methodV({
            url: `/projects`,
            method: "GET",
            query: {
                per_page: pageSize,
                page: pageNum,
                access_token
            },
        });
        return { projectList };
    };
    
    return {
        getProjects,
        createProjects,
        deleteProtectedBranches,
        protectedBranches,
        getProject,
        getProjectByUser
    };
}

