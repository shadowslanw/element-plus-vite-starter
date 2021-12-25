import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import PreferSetting from '@/store/modules/PreferSetting';
import BaseMenu from '../BaseMenu.vue';

describe(`BaseMenu 菜单`, () => {

    const ViewComponent = defineComponent({
        name: 'View',
        template: '<div>ViewComponent</div>',
    });
    const routes = [
        { path: '/', redirect: { name: 'A' } },
        { name: 'A', path: '/a', component: ViewComponent },
        { name: 'B', path: '/b', component: ViewComponent },
        { name: 'C', path: '/c', component: ViewComponent, meta: { name: '西' } },
        {
            name: 'D', path: '/d',
            component: defineComponent({
                name: 'ViewWrap',
                template: '<router-view></router-view>',
            }),
            children: [
                {
                    name: 'D1', path: 'd1', component: ViewComponent,
                    meta: { icon: 'icon-setting' },
                },
                {
                    name: 'D2', path: 'd2', component: ViewComponent,
                    meta: {
                        icon: defineComponent({ name: 'icon', template: '<i>icon</i>' }),
                    },
                },
            ],
        },
    ];
    const router = createRouter({
        history: createWebHistory(),
        routes,
    });
    const store = createStore<any>({
        modules: { PreferSetting },
    });
    const global = {
        plugins: [ router ],
        provide: { store },
        mocks: {
            menuList: routes,
        },
    };

    test(`渲染`, async () => {
        router.push({ name: 'D1' });
        await router.isReady();
        
        const wrapper = mount(BaseMenu, { global });
 
        expect(wrapper.exists()).toBeTruthy();
    });

    test(`defaultOpeneds`, async () => {
        router.push({ name: 'D1' });
        await router.isReady();
        
        const wrapper = mount(BaseMenu, { global });
        const defaultOpeneds = wrapper.vm.defaultOpeneds.sort();
        const expectOpeneds = ['D', 'D1'].sort();

        expect(defaultOpeneds).toEqual(expect.arrayContaining(expectOpeneds));
    });

});