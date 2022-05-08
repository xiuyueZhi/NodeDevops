import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_zhi_xiu_yue';

  // add your egg config in here
  config.middleware = ["jwtAuth"];

  config.sequelize = {
    delegate: "model", // load all models to app.model and ctx.model
    baseDir: "model", // load models from `app/model/*.js`
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: "root",
    password: "ly123456",
    database: 'node_devops',
  };

  config.cors = {
    origin: (ctx) => ctx.get("origin"),
    credentials: true,
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };
  config.jwt = {
    secret: "123456", // 自定义 token 的加密条件字符串
  };
  config.jwtAuth = {};

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // const onerror = {
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     ctx.body = 'error';
  //     ctx.status = 500;
  //   },
  //   html(err, ctx) {
  //     // html hander
  //     ctx.body = '<h3>error</h3>';
  //     ctx.status = 500;
  //   },
  //   json(err, ctx) {
  //     // json hander
  //     ctx.body = { message: 'error' };
  //     ctx.status = 500;
  //   },
  // };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    // onerror
  };
};
