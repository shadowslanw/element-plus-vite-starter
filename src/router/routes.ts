import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/common/Home.vue'; /** @important 异步加载首页会导致校验初始化路由时取不到route.name，跳转404 */
import Workbench from '@/views/common/Workbench.vue';
import Login from '@/views/common/Login.vue';
import Setting from '@/views/common/Setting.vue';
import PageNotFound from '@/views/common/PageNotFound.vue';
import Forbidden from '@/views/common/Forbidden.vue';
import View from '@/views/common/View.vue';

/**
* @desc 基座项目中 name 为必填项，作为判断子项目路由与基座内路由的标识
* @option name **需要与组件内name相同**，作为keep-alive缓存判定标识
* @option meta
* @option meta.name 路由名称
* @option meta.icon 展示图标，可为iconfont字符串，也可为Component
* @option meta.withoutLayout 是否跳出框架展示页面，显式配置true生效
* @option meta.isKeepAlive 是否需要缓存状态，默认true，显式配置false关闭缓存
* @option meta.hidden 不在侧边栏展示，通常用于大型表单新增，默认false
* @option meta.checkPermission 显式配置true表示需要进行权限校验
* @option meta.tabStick 显式配置为true时，自动出现在标签页导航中不可关闭
* @option meta.tabClosable 显式配置为false时，不允许关闭该标签页
* @option meta.isBreadcrumbVisible 显式配置为false时，不展示面包屑导航
*/
export const routes: RouteRecordRaw[] = [
    // {
    //     name: 'Setting',
    //     meta: {
    //         name: '设置',
    //         icon: 'icon-setting',
    //         checkPermission: true,
    //     },
    //     component: View,
    //     path: '/setting',
    //     children: [
    //         {
    //             name: 'SettingDepartment',
    //             meta: {
    //                 name: '部门管理',
    //                 checkPermission: true,
    //             },
    //             path: 'department',
    //             component: () => import('@/views/setting/department.vue'),
    //         },
    //         {
    //             name: 'SettingRole',
    //             meta: {
    //                 name: '角色管理',
    //                 checkPermission: true,
    //             },
    //             path: 'role',
    //             component: () => import('@/views/setting/role.vue'),
    //         },
    //         {
    //             name: 'SettingParam',
    //             meta: {
    //                 name: '参数配置',
    //                 checkPermission: true,
    //             },
    //             path: 'param',
    //             component: () => import('@/views/setting/param.vue'),
    //         },
    //     ],
    // },
];

export const baseRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        redirect: '/workbench',
    },
    {
        path: '/workbench',
        name: 'Workbench',
        component: Workbench,
        meta: {
            name: '工作台',
            tabStick: true,
            tabClosable: false,
            isBreadcrumbVisible: false,
        },
    },
    {
        path: '/404',
        name: 'PageNotFound',
        component: PageNotFound,
        meta: {
            isBreadcrumbVisible: false,
        },
    },
    {
        path: '/403',
        name: 'Forbidden',
        component: Forbidden,
        meta: {
            isBreadcrumbVisible: false,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            name: '登录',
            withoutLayout: true,
            isKeepAlive: false,
            isBreadcrumbVisible: false,
        },
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: {
            name: '设置',
            isKeepAlive: false,
        },
    },
];

export { };
