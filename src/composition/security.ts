import { ref } from 'vue';
import { validators } from '@/composition/common/form';

interface FormState {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

export default function setupLoginInit() {
    const formState = ref<FormState>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const formRules: {[P in keyof FormState]: any} = {
        oldPassword: validators.required('请输入密码'),
        newPassword: [
            validators.required('请输入新密码'),
            {
                trigger: 'change',
                validator: (rule: any, value: any) => {
                    try {
                        if (['', void 0].includes(value) || value?.toString().match(/^\s+$/)?.length) {
                            return Promise.resolve();
                        } else if (value.toString() === formState.value.oldPassword.trim()) {
                            return Promise.reject('新密码不能与现有密码相同');
                        } else {
                            return Promise.resolve();
                        }
                    } catch (error: any) {
                        console.warn('validators ERROR', error);
                        return Promise.reject(error.message);
                    }
                },
            },
        ],
        confirmPassword: [
            validators.required('请再次输入新密码'),
            {
                trigger: 'change',
                validator: (rule: any, value: any) => {
                    try {
                        if (['', void 0].includes(value) || value?.toString().match(/^\s+$/)?.length) {
                            return Promise.resolve();
                        } else if (value.toString() !== formState.value.newPassword.trim()) {
                            return Promise.reject('两次输入的新密码不一致');
                        } else {
                            return Promise.resolve();
                        }
                    } catch (error: any) {
                        console.warn('validators ERROR', error);
                        return Promise.reject(error.message);
                    }
                },
            },
        ],
    };
    const reset = () => {
        console.log('todo: http here.');
    }
    return {
        formState,
        formRules,
        reset,
    };
}