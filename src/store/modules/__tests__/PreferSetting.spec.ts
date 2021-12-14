import { createStore } from 'vuex';
import PreferSetting, { storeOptionsInit, preferSettingDefault } from '../PreferSetting';

describe('Vuex Modules PreferSetting', () => {

    test('调用mutations, state更新', () => {
        const store = createStore<any>({
            modules: { PreferSetting },
        });

        store.dispatch('PreferSetting/update', { direction: 'HM' });
        expect(store.state.PreferSetting.direction).toBe('HM');
        
        store.dispatch('PreferSetting/update', { fixed: false });
        expect(store.state.PreferSetting.fixed).toBe(false);
        
        store.dispatch('PreferSetting/update', { breadcrumb: false });
        expect(store.state.PreferSetting.breadcrumb).toBe(false);
        
        store.dispatch('PreferSetting/update', { tabs: false });
        expect(store.state.PreferSetting.tabs).toBe(false);
    });

    test('localStorage.PreferSetting不存在，赋默认值', () => {
        localStorage.removeItem('PreferSetting');

        const store = createStore<any>({
            modules: { PreferSetting: storeOptionsInit() },
        });

        expect(store.state.PreferSetting.direction).toBe(preferSettingDefault.direction);
        expect(store.state.PreferSetting.fixed).toBe(preferSettingDefault.fixed);
        expect(store.state.PreferSetting.breadcrumb).toBe(preferSettingDefault.breadcrumb);
        expect(store.state.PreferSetting.tabs).toBe(preferSettingDefault.tabs);
    });

    test('localStorage.PreferSetting不是jons字符串，赋默认值', () => {
        localStorage.setItem('PreferSetting', 'abc');

        const store = createStore<any>({
            modules: { PreferSetting: storeOptionsInit() },
        });

        expect(store.state.PreferSetting.direction).toBe(preferSettingDefault.direction);
        expect(store.state.PreferSetting.fixed).toBe(preferSettingDefault.fixed);
        expect(store.state.PreferSetting.breadcrumb).toBe(preferSettingDefault.breadcrumb);
        expect(store.state.PreferSetting.tabs).toBe(preferSettingDefault.tabs);
    });

    test('localStorage.PreferSetting配置只有direction = \'HM\'，其余参数赋默认值', () => {
        localStorage.setItem('PreferSetting', JSON.stringify({
            direction: 'HM',
        }));

        const store = createStore<any>({
            modules: { PreferSetting: storeOptionsInit() },
        });

        expect(store.state.PreferSetting.direction).toBe('HM');
        expect(store.state.PreferSetting.fixed).toBe(preferSettingDefault.fixed);
        expect(store.state.PreferSetting.breadcrumb).toBe(preferSettingDefault.breadcrumb);
        expect(store.state.PreferSetting.tabs).toBe(preferSettingDefault.tabs);
    });

    test('localStorage.PreferSetting配置齐', () => {
        const data = {
            direction: 'HM',
            fixed: false,
            breadcrumb: false,
            tabs: false,
        };

        localStorage.setItem('PreferSetting', JSON.stringify(data));

        const store = createStore<any>({
            modules: { PreferSetting: storeOptionsInit() },
        });

        expect(store.state.PreferSetting.direction).toBe(data.direction);
        expect(store.state.PreferSetting.fixed).toBe(data.fixed);
        expect(store.state.PreferSetting.breadcrumb).toBe(data.breadcrumb);
        expect(store.state.PreferSetting.tabs).toBe(data.tabs);
    });

    test('dispatch(\'update\', { direction: \'HM\' })，localStorage写入正常', () => {
        localStorage.removeItem('PreferSetting');
        
        const store = createStore<any>({
            modules: { PreferSetting: storeOptionsInit() },
        });
        store.dispatch('PreferSetting/update', { direction: 'HM' });

        const local = JSON.parse(localStorage.getItem('PreferSetting') || '{}');

        expect(local.direction).toBe(store.state.PreferSetting.direction);
        expect(local.fixed).toBe(store.state.PreferSetting.fixed);
        expect(local.breadcrumb).toBe(store.state.PreferSetting.breadcrumb);
        expect(local.tabs).toBe(store.state.PreferSetting.tabs);
    });

    test('dispatch(\'reset\'), localStorage、store恢复默认设置，', () => {
        localStorage.removeItem('PreferSetting');

        const store = createStore<any>({
            modules: {
                PreferSetting: {
                    ...PreferSetting,
                    state: () => ({
                        direction: 'HM',
                        fixed: false,
                        breadcrumb: false,
                        tabs: false,
                    })
                },
            },
        });
        store.dispatch('PreferSetting/reset');

        expect(store.state.PreferSetting.direction).toBe(preferSettingDefault.direction);
        expect(store.state.PreferSetting.fixed).toBe(preferSettingDefault.fixed);
        expect(store.state.PreferSetting.breadcrumb).toBe(preferSettingDefault.breadcrumb);
        expect(store.state.PreferSetting.tabs).toBe(preferSettingDefault.tabs);

        const local = JSON.parse(localStorage.getItem('PreferSetting') || '{}');

        expect(local.direction).toBe(store.state.PreferSetting.direction);
        expect(local.fixed).toBe(store.state.PreferSetting.fixed);
        expect(local.breadcrumb).toBe(store.state.PreferSetting.breadcrumb);
        expect(local.tabs).toBe(store.state.PreferSetting.tabs);
    });
});