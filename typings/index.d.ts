import 'egg';

declare module 'egg' {
    interface Application { }
    interface CustomController {
        nsp: any;
    }

    interface EggSocketNameSpace {
        emit: any
    }
}