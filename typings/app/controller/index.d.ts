// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportBuildController from '../../../app/controller/BuildController';
import ExportDefaultController from '../../../app/controller/DefaultController';
import ExportProjectController from '../../../app/controller/ProjectController';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    buildController: ExportBuildController;
    defaultController: ExportDefaultController;
    projectController: ExportProjectController;
    home: ExportHome;
    user: ExportUser;
  }
}
