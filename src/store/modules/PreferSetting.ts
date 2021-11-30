interface PreferSettingState {
    direction: 'HAM' | 'AHM' | 'HM' | 'M'
    fixed: boolean
    breadcrumb: boolean
    tabs: boolean
}

export const preferSettingDefault: PreferSettingState = {
    direction: 'HAM',
    fixed: true,
    breadcrumb: true,
    tabs: true,
};
const storeOptions: any = {
    namespaced: true,
    mutations: {
        update(storeState: any, value: Record<string, any>) {
            Object.entries(value).map(([key, val]: [string, any]) => {
                storeState[key] = val;
            });
            localStorage.setItem('PreferSetting', JSON.stringify(storeState));
        },
    },
    actions: {
        update({ commit }: any, val: any) {
            commit('update', val);
        },
        reset({ commit }: any) {
            commit('update', { ...preferSettingDefault });
        },
    },
};
export const storeOptionsInit = () => {
    try {
        const preferSettingStore = JSON.parse(localStorage.getItem('PreferSetting') || '{}');
        storeOptions.state = () => ({
            ...preferSettingDefault,
            ...preferSettingStore,
        });
    } catch (error) {
        storeOptions.state = () => ({
            ...preferSettingDefault,
        });
    }
    return storeOptions;
};

storeOptionsInit();

/**
 * storeOptions被导入时，已经读取localStorage中的数据
 * 如需控制读取localStorage的时机，请使用storeOptionsInit
 */
export default storeOptions;