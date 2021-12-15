
export const validators = {
    // 基础必填项
    required(message = '必填项未填写') {
        return {
            required: true, message: message, trigger: 'change',
            validator: (rule: any, value: any) => {
                try {
                    if (['', void 0].includes(value) || value?.toString().match(/^\s+$/)?.length) {
                        return Promise.reject(message);
                    } else {
                        return Promise.resolve();
                    }
                } catch (error: any) {
                    console.warn('validators ERROR', error);
                    return Promise.reject(error.message);
                }
            },
        };
    },
    /**
     * digital
     * @param limit 小数位数
     * @param fixed 是否必填够limit项的小数位数
     */
    digital(limit = 2, fixed = false) {
        const message = `请输入${limit}位小数`;
        return {
            trigger: 'change',
            validator: (rule: any, value: any) => {
                try {
                    const val = value?.toString() ?? '';
                    const reg = fixed
                        ? new RegExp(`^\\-?\\d+(.\\d{${limit}})?$`)
                        : new RegExp(`^\\-?\\d+(.\\d{0,${limit}})?$`);
                    if (reg.test(val) || !val) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject(message);
                    }
                } catch (error: any) {
                    console.warn('validators ERROR', error);
                    return Promise.reject(error.message);
                }
            },
        };
    },
    integer() {
        return {
            trigger: 'change',
            validator: (rule: any, value: any) => {
                try {
                    const val = value?.toString() ?? '';
                    const reg = /^[1-9]+[0-9]*$/;

                    if (reg.test(val) || !val || value === 0) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('请输入整数');
                    }
                } catch (error: any) {
                    console.warn('validators ERROR', error);
                    return Promise.reject(error.message);
                }
            },
        };
    },
    positiveNumber() {
        return {
            trigger: 'change',
            validator: (rule: any, value: any) => {
                try {
                    if (!value) {
                        return Promise.resolve();
                    } else if (Number(value) > 0
                        && Number(value) === Math.abs(Number(value))
                    ) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('请输入正数');
                    }
                } catch (error: any) {
                    console.warn('validators ERROR', error);
                    return Promise.reject(error.message);
                }
            },
        };
    },
    min(min: number) {
        const message = `不能小于${min}`;
        return {
            trigger: 'change',
            validator: (rule: any, value: any) => {
                try {
                    if (Number(value) >= min || !value) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject(message);
                    }
                } catch (error: any) {
                    console.warn('validators ERROR', error);
                    return Promise.reject(error.message);
                }
            },
        };
    },
    max(max: number) {
        const message = `不能大于${max}`;
        return {
            trigger: 'change',
            validator: (rule: any, value: any) => {
                try {
                    if (Number(value) <= max || !value) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject(message);
                    }
                } catch (error: any) {
                    console.warn('validators ERROR', error);
                    return Promise.reject(error.message);
                }
            },
        };
    },
    maxLength(len: number) {
        const message = `字数限制：${len}`;
        return {
            trigger: 'change',
            validator: (rule: any, value: any) => {
                try {
                    if (value.length > len) {
                        return Promise.reject(message);
                    } else {
                        return Promise.resolve();
                    }
                } catch (error: any) {
                    console.warn('validators ERROR', error);
                    return Promise.reject(error.message);
                }
            },
        };
    },
    arrayLength(len = 1, message = '至少有一项') {
        return {
            required: true, message: message, trigger: 'change',
            validator: (rule: any, value: any) => {
                try {
                    if (value?.length < len) {
                        return Promise.reject(message);
                    } else {
                        return Promise.resolve();
                    }
                } catch (error: any) {
                    console.warn('validators ERROR', error);
                    return Promise.reject(error.message);
                }
            },
        };
    },
    phone() {
        return {
            trigger: 'change',
            validator: (rule: any, value: any) => {
                try {
                    if (!/^1\d{10}$/.test(value)) {
                        return Promise.reject('手机格式不正确');
                    } else {
                        return Promise.resolve();
                    }
                } catch (error: any) {
                    console.warn('validators ERROR', error);
                    return Promise.reject(error.message);
                }
            },
        };
    },
};

export default function setupFormInit() {
    return {
        validators,
    };
}