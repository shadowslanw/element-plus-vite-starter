import { mount } from '@vue/test-utils';
import LoginView from '../Login.vue';


describe('登录页', () => {

    const flushPromises = (delay = 0) => new Promise((resolve: any) => setTimeout(resolve, delay));
    const routerMock = {
        replace: jest.fn(),
    };

    describe('组件渲染', () => {

        test('存在账户输入框', () => {
            const wrapper = mount(LoginView);
            expect(wrapper.findComponent({ ref: 'accountInputRef' }).exists()).toBeTruthy();
        });
    
        test('存在密码输入框', () => {
            const wrapper = mount(LoginView);
            expect(wrapper.findComponent({ ref: 'passwordInputRef' }).exists()).toBeTruthy();
        });
    
        test('存在登录按钮', () => {
            const wrapper = mount(LoginView);
            expect(wrapper.findComponent({ ref: 'submitBtnRef' }).exists()).toBeTruthy();
        });
    });

    test('输入账号、密码，点击登录按钮，调用login', async () => {
        const login = jest.fn();
        const wrapper = mount(LoginView, {
            global: {
                mocks: {
                    formState: {
                        account: '123456',
                        password: '123456',
                    },
                    login,
                    $router: routerMock,
                },
            },
        });
        
        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises();
        expect(login).toBeCalled();
    });

    test('不输入账号/手机号，点击登录按钮，提示错误信息，不调用login', async () => {
        const login = jest.fn();
        const wrapper = mount(LoginView, {
            global: {
                mocks: {
                    formState: {
                        account: '',
                        password: '123456',
                    },
                    login,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(wrapper.html()).toContain('请输入账号/手机号');
        expect(login).not.toBeCalled();
    });

    test('不输入密码，点击登录按钮，提示错误信息，不调用login', async () => {
        const login = jest.fn();
        const wrapper = mount(LoginView, {
            global: {
                mocks: {
                    formState: {
                        account: '123456',
                        password: '',
                    },
                    login,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(wrapper.html()).toContain('请输入密码');
        expect(login).not.toBeCalled();
    });

    test('从缓存读取上次登录名', () => {
        const account = 'account-from-storage';
        localStorage.setItem('LoginName', account);

        const wrapper = mount(LoginView);

        expect(wrapper.vm.formState.account).toBe(account);
    });

    test('登录成功后记录当前登录名到缓存', async () => {
        const account = 'account-to-storage';
        const wrapper = mount(LoginView, {
            global: {
                mocks: {
                    $router: routerMock,
                },
            },
        });

        wrapper.vm.formState.account = account;
        wrapper.vm.formState.password = '123456';
        wrapper.find('[data-action="submit"]').trigger('click');

        await flushPromises();
        expect(localStorage.getItem('LoginName')).toBe(account);
    });

    test('登录不成功，不记录当前登录名到缓存', async () => {
        const account = 'login-fail';
        const wrapper = mount(LoginView, {
            global: {
                mocks: {
                    $router: routerMock,
                },
            },
        });

        wrapper.vm.formState.account = account;
        wrapper.vm.formState.password = '';
        wrapper.find('[data-action="submit"]').trigger('click');

        await flushPromises();
        expect(localStorage.getItem('LoginName')).not.toBe(account);
    });
});