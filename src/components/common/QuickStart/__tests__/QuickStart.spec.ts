import { mount, shallowMount } from '@vue/test-utils';
import QuickStart from '../QuickStart.vue';

const flushPromises = (delay = 0) => new Promise((resolve: any) => setTimeout(resolve, delay));

jest.mock('@/composition/common/navigation', () => {
    return () => ({
        menuList: {
            value: [
                { name: 'A' },
                { name: 'B', meta: { name: 'menuB' } },
                { name: 'C', meta: { name: 'menuC' } },
                {
                    name: 'Z',
                    children: [
                        { name: 'Z+', meta: { name: 'menuAB' } },
                    ],
                },
            ],
        },
    });
});

describe('QuickStart 快捷导航', () => {

    test('存在搜索框', () => {
        const wrapper = mount(QuickStart);
        const input = wrapper.findComponent('.search');
        expect(input.exists()).toBeTruthy();
    });

    test('聚焦搜索框，存在搜索结果弹窗', async () => {
        const wrapper = mount(QuickStart);
        const input = wrapper.findComponent('.search');

        expect(wrapper.vm.visible).not.toBeTruthy();

        input.find('input').trigger('focus');

        await flushPromises(20);
        expect(wrapper.vm.visible).toBeTruthy();
    });

    test('输入关键字，筛选产品/功能正确匹配', async () => {
        const wrapper = shallowMount(QuickStart);

        wrapper.vm.queryString = 'A';

        await flushPromises();
        expect(wrapper.vm.features.length).toBe(2);
        expect(wrapper.vm.features.find((v: any) => v.name === 'A')).toBeTruthy();
        expect(wrapper.vm.features.find((v: any) => v.meta?.name === 'menuAB')).toBeTruthy();

        await flushPromises(200);
        wrapper.vm.queryString = 'D';

        await flushPromises();
        expect(wrapper.vm.features.length).toBe(0);

        await flushPromises(200);
        wrapper.vm.queryString = 'menuAB';

        await flushPromises();
        expect(wrapper.vm.features.length).toBe(1);
        expect(wrapper.vm.features[0]?.name).toBe('Z+');

        await flushPromises(200);
        wrapper.vm.queryString = '';
        
        await flushPromises();
        expect(wrapper.vm.features.length).toBe(0);
    });

    test.todo('输入关键字，调起远程筛选相关文档的方法');

    test('没有输入关键字，弹窗展示提示信息', async () => {
        const wrapper = mount(QuickStart);
        wrapper.find('input').trigger('focus');

        await flushPromises(20);
        expect(wrapper.vm.$refs.emptyResultRef.innerHTML).toContain('请输入想要搜索的产品/功能/文档关键字');
    });
});