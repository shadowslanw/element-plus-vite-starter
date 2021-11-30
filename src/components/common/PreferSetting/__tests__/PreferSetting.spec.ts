import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createStore } from 'vuex';
import PreferSettingStoreModule, { preferSettingDefault } from '@/store/modules/PreferSetting';
import PreferSetting from '../PreferSetting.vue';

describe('PreferSetting 偏好设置', () => {
    
    test('组件渲染', () => {
        const wrapper = mount(PreferSetting, {
            global: {
                provide: {
                    store: createStore({
                        modules: {
                            PreferSetting: PreferSettingStoreModule,
                        },
                    }),
                },
            },
        });
        expect(wrapper.findComponent({ ref: 'directionRef' }).exists()).toBeTruthy();
        expect(wrapper.findComponent({ ref: 'fixedRef' }).exists()).toBeTruthy();
        expect(wrapper.findComponent({ ref: 'breadcrumbRef' }).exists()).toBeTruthy();
        expect(wrapper.findComponent({ ref: 'tabsRef' }).exists()).toBeTruthy();
        expect(wrapper.findComponent({ ref: 'resetRef' }).exists()).toBeTruthy();
    });

    test('从store读', () => {
        const wrapper = mount(PreferSetting, {
            global: {
                provide: {
                    store: createStore({
                        modules: {
                            PreferSetting: PreferSettingStoreModule,
                        },
                    }),
                },
            },
        });
        expect(wrapper.vm.currentDirection).toBe('HAM');
        expect(wrapper.vm.currentFixed).toBe(true);
        expect(wrapper.vm.currentBreadcrumb).toBe(true);
        expect(wrapper.vm.currentTabs).toBe(true);
    });

    test('往store写', async () => {
        const store: any = createStore({
            modules: {
                PreferSetting: PreferSettingStoreModule,
            },
        });
        const wrapper = mount(PreferSetting, {
            global: {
                provide: { store },
            },
        });

        wrapper.vm.currentDirection = 'AHM';
        wrapper.vm.currentFixed = false;
        wrapper.vm.currentBreadcrumb = false;
        wrapper.vm.currentTabs = false;

        await nextTick();

        expect(store.state.PreferSetting.direction).toBe('AHM');
        expect(store.state.PreferSetting.fixed).toBe(false);
        expect(store.state.PreferSetting.breadcrumb).toBe(false);
        expect(store.state.PreferSetting.tabs).toBe(false);
    });

    test('恢复默认', async () => {
        const store: any = createStore({
            modules: {
                PreferSetting: PreferSettingStoreModule,
            },
        });
        const wrapper = mount(PreferSetting, {
            global: {
                provide: { store },
            },
        });

        wrapper.vm.currentDirection = 'AHM';
        wrapper.vm.currentFixed = false;
        wrapper.vm.currentBreadcrumb = false;
        wrapper.vm.currentTabs = false;

        wrapper.findComponent({ ref: 'resetRef' }).trigger('click');
        await nextTick();

        expect(store.state.PreferSetting.direction).toBe(preferSettingDefault.direction);
        expect(store.state.PreferSetting.fixed).toBe(preferSettingDefault.fixed);
        expect(store.state.PreferSetting.breadcrumb).toBe(preferSettingDefault.breadcrumb);
        expect(store.state.PreferSetting.tabs).toBe(preferSettingDefault.tabs);
    });
});