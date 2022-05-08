import * as jenkins from "jenkins";

const getJenkins = (type: "h5" | "node" | "nodeProduct" | "android" | "java") => {
    const jenkinsConfig = {
        h5: {
          baseUrl: "http://root:11835c1c52d4b76de1d9fbad8fe134fe31@localhost:8081",
          crumbIssuer: true,
        },
    };
    return jenkins(jenkinsConfig[type]);
};

/**
 * 触发 jenkins 流水线
 * @param param0 
 * @returns 
 */
const buildJenkins = async ({ type, job, params }) => {
    const jenkinsCallback: any = await new Promise((resolve) => {
        console.log(1111,getJenkins(type).job.build)
      getJenkins(type).job.build(
        { name: job, parameters: params },
        (err: any, data: any) => {
          if (err) {
            console.log("err: ", err);
            throw err;
          }
          resolve({ queueId: data });
        }
      );
    });
    return { data: jenkinsCallback };
};

/** 
 * 获取当前节点信息
 * @param param0 
 * @returns 
 */
const getQueuedInfo = async ({ type, queueId }) => {
    const jenkinsCallback: any = await new Promise((resolve) => {
        getJenkins(type).queue.item(queueId, (err: any, data: any) => {
            if (err) {
                console.log("err---->", err);
                throw err;
            }
            resolve(data);
        });
    });
    return { data: jenkinsCallback };
};

/**
 * 获取当前构建信息
 * @param param0 
 * @returns 
 */
const getJenkinsInfo = async ({ type, job, buildNumber }) => {
    console.log(type, job, buildNumber);
    const jenkinsCallback: any = await new Promise((resolve) => {
        getJenkins(type).build.get(job, buildNumber, (err: any, data: any) => {
            console.log("data: ", data);
            console.log("err: ", err);
            if (err) {
                console.log("err---->", err);
                throw err;
            }
            resolve(data);
        });
    });
    const { statusCode } = jenkinsCallback;
    if (jenkinsCallback && statusCode !== 404) {
        return { data: jenkinsCallback };
    } else {
        return { data: jenkinsCallback };
    }
};

/**
 * 获取 jenkins 打印
 * @param param0 
 * @returns 
 */
const getJenkinsConsole = async ({ type, job, buildId }) => {
    const jenkinsCallback: any = await new Promise((resolve) => {
        getJenkins(type).build.log(job, buildId, (err: any, data: any) => {
            if (err) {
                return console.log("err---->", err);
            }
            resolve(data);
        });
    });
    return { data: jenkinsCallback };
};

export default {
    buildJenkins,
    getQueuedInfo,
    getJenkinsInfo,
    getJenkinsConsole,
};