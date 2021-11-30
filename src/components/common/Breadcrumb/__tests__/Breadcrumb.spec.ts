import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { createStore } from 'vuex';
import { ElBreadcrumb } from 'element-plus';
import PreferSetting from '@/store/modules/PreferSetting';
import Breadcrumb from '../Breadcrumb.vue';

jest.mock('vue-router', () => ({
    useRoute: jest.fn(),
    useRouter: jest.fn(() => ({
        push: () => {},
    })),
}));

describe('Breadcrumb 面包屑导航', () => {
    const store = createStore({
        modules: { PreferSetting },
    });

    test('组件渲染', async () => {
        (useRoute as any).mockImplementationOnce(() => ({
            name: 'Security',
        }));
        const wrapper = mount(Breadcrumb, {
            global: {
                provide: { store },
            },
        });
        expect(wrapper.findComponent(ElBreadcrumb).exists()).toBeTruthy();
    });

    test('PreferSetting.breadcrumb = false, route.meta.isBreadcrumbVisible = false, 组件隐藏', async () => {
        (useRoute as any).mockImplementationOnce(() => ({
            name: 'Security',
            meta: { isBreadcrumbVisible: false },
        }));
        const wrapper = mount(Breadcrumb, {
            global: {
                provide: { store },
            },
        });
        store.commit('PreferSetting/update', { breadcrumb: false });
        await nextTick();
        expect(wrapper.findComponent(ElBreadcrumb).isVisible()).not.toBeTruthy();
    });

    test('PreferSetting.breadcrumb = true, route.meta.isBreadcrumbVisible = false, 组件隐藏', async () => {
        (useRoute as any).mockImplementationOnce(() => ({
            name: 'Security',
            meta: { isBreadcrumbVisible: false },
        }));
        const wrapper = mount(Breadcrumb, {
            global: {
                provide: { store },
            },
        });
        store.commit('PreferSetting/update', { breadcrumb: true });
        await nextTick();
        expect(wrapper.findComponent(ElBreadcrumb).isVisible()).not.toBeTruthy();
    });

    test('PreferSetting.breadcrumb = true, route.meta.isBreadcrumbVisible = true, 组件展示', async () => {
        (useRoute as any).mockImplementationOnce(() => ({
            name: 'Security',
            meta: { isBreadcrumbVisible: true },
        }));
        const wrapper = mount(Breadcrumb, {
            global: {
                provide: { store },
            },
        });
        store.commit('PreferSetting/update', { breadcrumb: true });
        await nextTick();
        expect(wrapper.findComponent(ElBreadcrumb).isVisible()).toBeTruthy();
    });

    test('PreferSetting.breadcrumb = true, route.meta.isBreadcrumbVisible不设置, 组件展示', async () => {
        (useRoute as any).mockImplementationOnce(() => ({
            name: 'Security',
            meta: {},
        }));
        const wrapper = mount(Breadcrumb, {
            global: {
                provide: { store },
            },
        });
        store.commit('PreferSetting/update', { breadcrumb: true });
        await nextTick();
        expect(wrapper.findComponent(ElBreadcrumb).isVisible()).toBeTruthy();
    });
});