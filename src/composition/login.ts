import { ref } from 'vue';
import { validators } from '@/composition/common/form';

interface FormState {
    account: string
    password: string
}

export default function setupLoginInit() {
    const formState = ref<FormState>({
        account: localStorage.getItem('LoginName') ?? '',
        password: '',
    });
    const formRules: {[P in keyof FormState]: any} = {
        account: validators.required('请输入账号/手机号'),
        password: validators.required('请输入密码'),
    };
    const login = () => {
        console.log('todo: http here.', formState.value.account);
        localStorage.setItem('LoginName', formState.value.account);
    }
    return {
        formState,
        formRules,
        login,
    };
}