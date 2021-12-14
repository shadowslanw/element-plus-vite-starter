import {
    createWebHistory,
    createRouter,
} from 'vue-router';
import type { RouterOptions, RouteRecordRaw } from 'vue-router';
import { routes, baseRoutes } from './routes';

/**
 * 树形路由结构扁平化
 * @desc 递归输出所有包含在children中的子路由，但不输出包含children的路由节点
 * @example [{ name: 'A', children: [{ name: 'B' }, { name: 'C' }] }]
 * @result [{ name: 'B' }, { name: 'C' }]
 * @param {T[]} source 路由
 * @param {T} parent 父级路由
 * @returns {T[]} 扁平化路由
 */
function flatten<T extends RouteRecordRaw>(source: T[], parent?: T): T[] {
    return source.reduce((acc: any[], val: any) => {
        const item: any = {};
        Object.keys(val).forEach((key: string) => {
            switch (key) {
                case 'children':
                    // do nothing.
                    break;
                case 'path':
                    if (parent?.path) {
                        item[key] = `${parent.path}/${val[key]}`;
                    } else {
                        item[key] = val[key];
                    }
                    break;
                default:
                    item[key] = val[key];
                    break;
            }
        });
        if (val.children?.length) {
            acc = acc.concat(flatten(val.children, item));
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
}

const routers: RouterOptions = {
    history: createWebHistory(),
    routes: [...baseRoutes, ...flatten(routes)],
};

const router = createRouter(routers);

export {
    routes,
    routers,
    router,
    baseRoutes,
    flatten,
};
