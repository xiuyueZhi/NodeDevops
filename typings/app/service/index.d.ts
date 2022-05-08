// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBuildService from '../../../app/service/BuildService';
import ExportProjectService from '../../../app/service/ProjectService';
import ExportUserService from '../../../app/service/UserService';

declare module 'egg' {
  interface IService {
    buildService: AutoInstanceType<typeof ExportBuildService>;
    projectService: AutoInstanceType<typeof ExportProjectService>;
    userService: AutoInstanceType<typeof ExportUserService>;
  }
}
