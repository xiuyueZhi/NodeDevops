import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators'

// export default (app: Application) => {
//   const { controller, router } = app;

//   // router.get('/', controller.home.index);
//   // router.get('/:name', controller.home.index);
//   router.post('/', controller.home.index);

// };

export default (app: Application) => {
  const { io } = app;
  EggShell(app)
  // socket.io
  console.log( io.controller)
  io.of('/').route('io/server', io.controller.nsp.ping);
  io.of('/').route('creatJob', io.controller.nsp.creatJob);
}
