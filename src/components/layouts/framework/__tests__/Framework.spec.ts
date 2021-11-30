import { mount } from '@vue/test-utils';
import Framework from '../Framework.vue';

describe('Framework 框架容器', () => {
    
    test('组件渲染', async () => {
        const wrapper = mount(Framework, {
            slots: {
                header: 'Header',
                aside: 'Aside',
                main: 'Main',
            },
        });
        const aside = wrapper.find('.framework-aside');
        expect(aside.exists()).toBe(true);
        expect(aside.text()).toBe('Aside');

        const header = wrapper.find('.framework-header');
        expect(header.exists()).toBe(true);
        expect(header.text()).toBe('Header');

        const main = wrapper.find('.framework-main');
        expect(main.exists()).toBe(true);
        expect(main.text()).toBe('Main');
    });

    test('参数 direction = \'AHM\'', () => {
        const wrapper = mount(Framework, {
            props: {
                direction: 'AHM',
            },
        });
        expect(wrapper.classes()).toContain('AHM');
    });

    test('参数 direction = \'HAM\'', () => {
        const wrapper = mount(Framework, {
            props: {
                direction: 'HAM',
            },
        });
        expect(wrapper.classes()).toContain('HAM');
    });

    test('参数 direction = \'HM\'', () => {
        const wrapper = mount(Framework, {
            props: {
                direction: 'HM',
            },
        });
        expect(wrapper.classes()).toContain('HM');
        expect(wrapper.vm.asideStyle.display).toBe('none');
    });

    test('参数 direction = \'M\'', () => {
        const wrapper = mount(Framework, {
            props: {
                direction: 'M',
            },
        });
        expect(wrapper.classes()).toContain('M');
        expect(wrapper.vm.asideStyle.display).toBe('none');
        expect(wrapper.vm.headerStyle.display).toBe('none');
    });

    test('参数 fixed = true', () => {
        const wrapper = mount(Framework, {
            props: {
                fixed: true,
            },
        });
        expect(wrapper.classes()).toContain('is-fixed');
    });

    test('参数 asideWidth = 150px', () => {
        const wrapper = mount(Framework, {
            props: {
                asideWidth: '150px',
            },
        });
        expect(wrapper.vm.containerStyle.gridTemplateColumns).toBe('150px auto auto');
    });

    test('参数 headerHeight = 100px', () => {
        const wrapper = mount(Framework, {
            props: {
                headerHeight: '100px',
            },
        });
        expect(wrapper.vm.containerStyle.gridTemplateRows).toBe('100px auto auto');
    });

    test('参数 breakpoint = 992, 窗口宽度 in [990, 993, 992]', async () => {
        const mockFn = jest.fn();
        const flushPromises = () => new Promise((resolve: any) => setTimeout(resolve, 300));

        window.resizeTo(990, 768);
        const wrapper = mount(Framework, {
            props: {
                breakpoint: 992,
            },
            attrs: {
                onBreakpoint: mockFn,
            },
        });
        expect(mockFn).toBeCalled();

        // Framework 组件节流监听resize事件，需要延时更改窗口宽度
        await flushPromises();
        window.resizeTo(993, 768);
        expect(mockFn).not.toBeCalledTimes(2);

        await flushPromises();
        window.resizeTo(992, 768);
        expect(mockFn).toBeCalledTimes(2);
    });

    test('参数 breakpoint = false, 窗口宽度 in [990, 993, 992]', async () => {
        const mockFn = jest.fn();
        const flushPromises = () => new Promise((resolve: any) => setTimeout(resolve, 300));

        window.resizeTo(990, 768);
        const wrapper = mount(Framework, {
            props: {
                breakpoint: false,
            },
            attrs: {
                onBreakpoint: mockFn,
            },
        });
        expect(mockFn).not.toBeCalled();

        // Framework 组件节流监听resize事件，需要延时更改窗口宽度
        await flushPromises();
        window.resizeTo(993, 768);
        expect(mockFn).not.toBeCalled();

        await flushPromises();
        window.resizeTo(992, 768);
        expect(mockFn).not.toBeCalled();
    });
});