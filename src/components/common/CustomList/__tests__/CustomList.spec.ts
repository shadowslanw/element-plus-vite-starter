import { mount } from '@vue/test-utils';
import { h } from 'vue';
import CustomList from '../CustomList.vue';

describe('CustomList', () => {
    
    describe('空数据源', () => {
        
        test('显示默认空列表文本', () => {
            const wrapper = mount(CustomList, {
                props: {
                    dataSource: [],
                },
            });
            expect(wrapper.vm.dataSource.length).toBe(0);
            expect(wrapper.html()).toContain('暂无数据');
        });

        test('自定义空列表文本', () => {
            const testContent = '列表为空';
            const wrapper = mount(CustomList, {
                props: {
                    dataSource: [],
                    emptyContent: testContent,
                },
            });
            expect(wrapper.html()).toContain(testContent);
        });

        test('通过slot自定义空列表文本', () => {
            const testVNode = h('h1', '空');
            const wrapper = mount(CustomList, {
                props: {
                    dataSource: [],
                },
                slots: {
                    empty: testVNode,
                },
            });
            const emptyDOM = wrapper.get('.custom-list-empty');
            expect(emptyDOM.html()).toEqual('<div class="custom-list-empty"><h1>空</h1></div>');
        });

        test('同时自定义空列表文本和slot, slot生效', () => {
            const testVNode = h('h1', '空');
            const wrapper = mount(CustomList, {
                props: {
                    dataSource: [],
                    emptyContent: '列表为空',
                },
                slots: {
                    empty: testVNode,
                },
            });
            const emptyDOM = wrapper.get('.custom-list-empty');
            expect(emptyDOM.html()).toEqual('<div class="custom-list-empty"><h1>空</h1></div>');
        });
    });

    describe('有数据源', () => {

        test('渲染项目数量与数据源一致', () => {
            const dataSource = [1, 2, 3];
            const wrapper = mount(CustomList, {
                props: {
                    dataSource,
                },
            });
            const itemDOM = wrapper.findAll('.custom-item');
            expect(itemDOM.length).toEqual(dataSource.length);
        });

        test('插槽Prop正确传参', () => {
            const dataSource = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
            const wrapper = mount(CustomList, {
                props: {
                    dataSource,
                },
                slots: {
                    default: ({ item, dataSource: arr, index }: any) => {
                        return h('div', item.name + arr[index].name);
                    },
                },
            });
            const html = wrapper.vm.$el.innerHTML;
            const expectHTML = dataSource
                .reduce((str: string, item: any, index: number, arr: any[]) => {
                    str += `<div class="custom-item"><div>${item.name}${arr[index].name}</div></div>`;
                    return str;
                }, '');
            expect(html).toContain(expectHTML);
        });

        test('隐藏空列表DOM', () => {
            const dataSource = [1, 2, 3];
            const wrapper = mount(CustomList, {
                props: {
                    dataSource,
                },
            });
            const emptyDOM = wrapper.get('.custom-list-empty');
            expect(emptyDOM.isVisible()).toEqual(false);
        });
    });
});