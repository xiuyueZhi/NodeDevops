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
  io.of('/').route('server', io.controller?.nsp?.ping);
}
