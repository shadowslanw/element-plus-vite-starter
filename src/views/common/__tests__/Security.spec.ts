import { mount } from '@vue/test-utils';
import Security from '../Security.vue';
import * as compositionSecurity from '@/composition/security';


describe('登录页', () => {

    const flushPromises = (delay = 0) => new Promise((resolve: any) => setTimeout(resolve, delay));

    describe('组件渲染', () => {

        test('存在密码输入框', () => {
            const wrapper = mount(Security);
            expect(wrapper.findComponent({ ref: 'oldPasswordInputRef' }).exists()).toBeTruthy();
        });
    
        test('存在新密码输入框', () => {
            const wrapper = mount(Security);
            expect(wrapper.findComponent({ ref: 'newPasswordInputRef' }).exists()).toBeTruthy();
        });
    
        test('存在确认密码输入框', () => {
            const wrapper = mount(Security);
            expect(wrapper.findComponent({ ref: 'confirmPasswordInputRef' }).exists()).toBeTruthy();
        });
    
        test('存在提交按钮', () => {
            const wrapper = mount(Security);
            expect(wrapper.findComponent({ ref: 'submitBtnRef' }).exists()).toBeTruthy();
        });
    });

    test('输入密码，点击修改按钮，调用reset', async () => {
        const reset = jest.spyOn(compositionSecurity, 'reset');
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: 'abcdefg',
                        newPassword: '123456',
                        confirmPassword: '123456',
                    },
                    reset,
                },
            },
        });
        wrapper.find('[data-action="submit"]').trigger('click');

        await flushPromises();
        expect(reset).toBeCalled();
    });

    test('不输入密码，点击修改按钮，提示错误信息，不调用reset', async () => {
        const reset = jest.fn();
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: '',
                        newPassword: 'abcdefg',
                        confirmPassword: 'abcdefg',
                    },
                    reset,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(wrapper.html()).toContain('请输入密码');
        expect(reset).not.toBeCalled();
    });

    test('不输入新密码，点击修改按钮，提示错误信息，不调用reset', async () => {
        const reset = jest.fn();
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: '123456',
                        newPassword: '',
                        confirmPassword: 'abcdefg',
                    },
                    reset,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(wrapper.html()).toContain('请输入新密码');
        expect(reset).not.toBeCalled();
    });

    test('不再次输入新密码，点击修改按钮，提示错误信息，不调用reset', async () => {
        const reset = jest.fn();
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: '123456',
                        newPassword: 'abcdefg',
                        confirmPassword: '',
                    },
                    reset,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(wrapper.html()).toContain('请再次输入新密码');
        expect(reset).not.toBeCalled();
    });

    test('新旧密码相同，点击修改按钮，提示错误信息，不调用reset', async () => {
        const reset = jest.fn();
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: '123456',
                        newPassword: '123456',
                        confirmPassword: 'abcdefg',
                    },
                    reset,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(wrapper.html()).toContain('新密码不能与现有密码相同');
        expect(reset).not.toBeCalled();
    });

    test('新密码两次输入不相同，点击修改按钮，提示错误信息，不调用reset', async () => {
        const reset = jest.fn();
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: '123456',
                        newPassword: 'abcdefg',
                        confirmPassword: '987654321',
                    },
                    reset,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(wrapper.html()).toContain('两次输入的新密码不一致');
        expect(reset).not.toBeCalled();
    });

    test('新密码123456/\'123456\', 通过验证', async () => {
        const reset = jest.fn();
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: 'abcdefg',
                        newPassword: 123456,
                        confirmPassword: '123456',
                    },
                    reset,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(reset).toBeCalled();
    });

    test('新密码\' \'/\' \', 不通过验证', async () => {
        const reset = jest.fn();
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: 'abcdefg',
                        newPassword: ' ',
                        confirmPassword: ' ',
                    },
                    reset,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(reset).not.toBeCalled();
    });

    test('新密码null/null, 不通过验证', async () => {
        const reset = jest.fn();
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: 'abcdefg',
                        newPassword: null,
                        confirmPassword: null,
                    },
                    reset,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(reset).not.toBeCalled();
    });

    test('新密码\'abc\'/null, 不通过验证', async () => {
        const reset = jest.fn();
        const wrapper = mount(Security, {
            global: {
                mocks: {
                    formState: {
                        oldPassword: 'abcdefg',
                        newPassword: 'abc',
                        confirmPassword: null,
                    },
                    reset,
                },
            },
        });

        wrapper.find('[data-action="submit"]').trigger('click');
        
        await flushPromises(20);
        expect(reset).not.toBeCalled();
    });
});