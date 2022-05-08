import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.security = {
    csrf: {
      enable: false
    }
  };
  // socketio 配置
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      "/": {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
      "/example": {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };
  return config;
};
