import type { StoreOptions } from 'vuex';
import { baseRoutes } from '@/router';
import type { RouteRecordRaw } from 'vue-router';

const sticks = baseRoutes.filter((value: RouteRecordRaw) => value.meta?.tabStick === true);
const storeOptions: StoreOptions<any> & { namespaced?: boolean } = {
    namespaced: true,
    mutations: {
        insert(state: any, value: RouteRecordRaw) {
            state.tabs.push(value);
            localStorage.setItem('PageTabs', JSON.stringify(state.tabs));
        },
        remove(state: any, index: number) {
            state.tabs.splice(index, 1);
            localStorage.setItem('PageTabs', JSON.stringify(state.tabs));
        },
        clear(state: any) {
            state.tabs = [];
            localStorage.setItem('PageTabs', '[]');
        }
    },
    actions: {
        insert({ commit }, value: RouteRecordRaw) {
            commit('insert', value);
        },
        removeByIndex({ commit }, index: number) {
            commit('remove', index);
            return Promise.resolve(index);
        },
        removeByName({ commit, state }, name: string) {
            const index = state.tabs.findIndex((tab: any) => tab.name === name);
            if (index !== -1) {
                commit('remove', index);
            }
            return Promise.resolve(index);
        },
        removeAll({ commit }) {
            commit('clear');
            return Promise.resolve();
        },
    },
    getters: {
        allTabs(state: any) {
            return sticks.length
                ? [...sticks, ...state.tabs]
                :  [
                    {
                        name: 'Home',
                        meta: {
                            name: '工作台',
                            closable: false,
                        },
                        path: '/',
                    },
                    ...state.tabs,
                ];
        },
        keepAlive(state: any, getters: any) {
            return getters.allTabs
                .filter((tabs: any) => tabs.meta?.isKeepAlive !== false)
                .reduce((acc: string[], item: any) => {
                    acc.push(item.name);
                    return acc;
                }, []);
        }
    },
};

export const storeOptionsInit = () => {
    try {
        const tabStore = JSON.parse(localStorage.getItem('PageTabs') || '[]');
        storeOptions.state = () => ({
            tabs: tabStore,
        });
    } catch (error) {
        storeOptions.state = () => ({
            tabs: [],
        });
    }
    return storeOptions;
};

storeOptionsInit();

export default storeOptions;