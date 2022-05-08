// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportBranchController from '../../../app/controller/BranchController';
import ExportBuildController from '../../../app/controller/BuildController';
import ExportNoticeController from '../../../app/controller/NoticeController';
import ExportProcessController from '../../../app/controller/ProcessController';
import ExportProjectController from '../../../app/controller/ProjectController';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    branchController: ExportBranchController;
    buildController: ExportBuildController;
    noticeController: ExportNoticeController;
    processController: ExportProcessController;
    projectController: ExportProjectController;
    home: ExportHome;
    user: ExportUser;
  }
}
