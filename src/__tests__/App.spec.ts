import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import App from '../App.vue';
import Framework from '@/components/layouts/framework/Framework.vue';
import PreferSettingStoreModule from '@/store/modules/PreferSetting';

describe(`App.vue`, () => {
    describe(`渲染`, () => {
        const store: any = createStore({
            modules: {
                PreferSetting: PreferSettingStoreModule,
            },
        });
        const wrapper = shallowMount(App, {
            global: {
                provide: { store },
            },
        });
        const framework = wrapper.findComponent(Framework);
        test(`包含Framework框架`, () => {
            expect(framework.exists()).toBeTruthy();
        });
        test(`framework.aside-width = 200px`, () => {
            expect(framework.vm.asideWidth).toBe('200px');
        });
        test(`framework.header-height = 60px`, () => {
            expect(framework.vm.headerHeight).toBe('60px');
        });
        test(`framework.breakpoint = 992`, () => {
            expect(framework.vm.breakpoint).toBe(992);
        });
        test(`framework.direction = store.state.PreferSetting.direction`, () => {
            expect(framework.vm.direction).toBe(store.state.PreferSetting.direction);
        });
        test(`framework.fixed = store.state.PreferSetting.fixed`, () => {
            expect(framework.vm.fixed).toBe(store.state.PreferSetting.fixed);
        });
    });
});