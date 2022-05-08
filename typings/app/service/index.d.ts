// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBranchService from '../../../app/service/BranchService';
import ExportBuildService from '../../../app/service/BuildService';
import ExportProcessService from '../../../app/service/ProcessService';
import ExportProjectService from '../../../app/service/ProjectService';
import ExportUserService from '../../../app/service/UserService';

declare module 'egg' {
  interface IService {
    branchService: AutoInstanceType<typeof ExportBranchService>;
    buildService: AutoInstanceType<typeof ExportBuildService>;
    processService: AutoInstanceType<typeof ExportProcessService>;
    projectService: AutoInstanceType<typeof ExportProjectService>;
    userService: AutoInstanceType<typeof ExportUserService>;
  }
}
