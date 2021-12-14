import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import { ElTabs } from 'element-plus';
import PreferSetting from '@/store/modules/PreferSetting';
import PageTabsModule from '@/store/modules/PageTabs';
import PageTabs from '../PageTabs.vue';

describe('PageTabs 多标签页面', () => {
    const ViewComponent = defineComponent({
        name: 'View',
        template: '<div>ViewComponent</div>',
    });
    const routes = [
        { path: '/', redirect: { name: 'A' } },
        { name: 'A', path: '/a', component: ViewComponent },
        { name: 'B', path: '/b', component: ViewComponent },
        { name: 'C', path: '/c', component: ViewComponent },
    ];
    const router = createRouter({
        history: createWebHistory(),
        routes,
    });
    const store = createStore<any>({
        modules: {
            PreferSetting,
            PageTabs: PageTabsModule,
        },
    });

    test('组件渲染', async () => {
        const wrapper = mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
            },
        });
        expect(wrapper.findComponent(ElTabs).exists()).toBeTruthy();
    });

    test('PreferSetting.tabs = false, 组件隐藏', async () => {
        const wrapper = mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
            },
        });
        store.commit('PreferSetting/update', { tabs: false });

        await flushPromises();
        expect(wrapper.findComponent(ElTabs).isVisible()).not.toBeTruthy();
    });

    test('PreferSetting.tabs = true, 组件展示', async () => {
        const wrapper = mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
            },
        });
        store.commit('PreferSetting/update', { tabs: true });

        await flushPromises();
        expect(wrapper.findComponent(ElTabs).isVisible()).toBeTruthy();
    });

    test('currentTab绑定当前路由', async () => {
        router.push({ name: 'A' });
        await router.isReady();

        const wrapper = mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
            },
        });

        await flushPromises();
        expect(wrapper.vm.currentTab).toBe('A');
    });

    test('currentTab赋值，路由变更', async () => {
        router.push({ name: 'A' });
        await router.isReady();

        const wrapper = mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
            },
        });
        wrapper.vm.currentTab = 'B';

        await flushPromises();
        expect(router.currentRoute.value.name).toBe('B');
    });

    test('触发tab-remove事件，remove方法被调用', () => {
        const remove = jest.fn();
        const wrapper = mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
                mocks: { remove },
            },
        });
        wrapper.getComponent(ElTabs).vm.$emit('tab-remove');
        expect(remove).toBeCalledTimes(1);
    });

    test('切换新路由，insert方法被调用', async () => {
        await store.dispatch('PageTabs/removeAll');
        
        router.push({ name: 'A' });
        await router.isReady();

        mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
            },
        });
        expect(store.getters['PageTabs/allTabs'].find((v: any) => v.name === 'C')).not.toBeTruthy();
        router.push({ name: 'C' });

        await flushPromises();
        expect(router.currentRoute.value.name).toBe('C');
        expect(store.getters['PageTabs/allTabs'].find((v: any) => v.name === 'C')).toBeTruthy();
    });

    test('切换旧路由，insert方法不被调用', async () => {
        await store.dispatch('PageTabs/removeAll');

        router.push({ name: 'A' });
        await router.isReady();

        mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
            },
        });
        router.push({ name: 'A' });

        await flushPromises();
        router.push({ name: 'B' });

        await flushPromises();
        const len = store.getters['PageTabs/allTabs'].length;
        router.push({ name: 'A' });

        await flushPromises();
        expect(store.getters['PageTabs/allTabs'].length).toBe(len);
    });

    test('关闭标签页后当前页选择优先级，非当前页直接关闭', async () => {
        await store.dispatch('PageTabs/removeAll');

        router.push({ name: 'A' });
        await router.isReady();

        const wrapper = mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
            },
        });

        const chain = ['A', 'B', 'C'];
        while(chain.length) {
            router.push({
                name: chain.pop(),
            });
            await flushPromises();
        }
        
        wrapper.vm.remove('B');
        await flushPromises();

        expect(wrapper.vm.currentTab).toBe('A');

        wrapper.vm.remove('C');
        await flushPromises();

        expect(wrapper.vm.currentTab).toBe('A');
    });

    test('关闭标签页后当前页选择优先级，当前页的后一页>前一页', async () => {
        await store.dispatch('PageTabs/removeAll');

        router.push({ name: 'A' });
        await router.isReady();

        const wrapper = mount(PageTabs, {
            global: {
                plugins: [ router ],
                provide: { store },
            },
        });

        const chain = ['B', 'A', 'B', 'C'];
        while(chain.length) {
            router.push({ name: chain.pop() });
            await flushPromises();
        }
        
        wrapper.vm.remove('B');
        await flushPromises();

        expect(wrapper.vm.currentTab).toBe('A');

        wrapper.vm.remove('A');
        await flushPromises();

        expect(wrapper.vm.currentTab).toBe('C');
    });
});