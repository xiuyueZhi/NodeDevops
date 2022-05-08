import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  helper: {
    enable: true,
    package: 'egg-helper',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  }
};

export default plugin;
