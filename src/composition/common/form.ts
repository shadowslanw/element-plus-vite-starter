import type { RuleItem } from 'async-validator';

export interface RuleItemOption extends RuleItem {
    trigger?: string | string[]
}

/**
 * 基于async-validator插件封装的常用表单验证配置
 * @see https://github.com/yiminghe/async-validator
 */
export const validators: Record<string, (...args: any) => RuleItemOption> = {
    // 基础必填项
    required(message = '必填项未填写') {
        return {
            required: true, message: message, trigger: 'change',
            validator: (rule: any, value: any, callback: any) => {
                try {
                    if (['', void 0, null].includes(value)
                        || !value.toString().trim().length
                    ) {
                        callback(new Error(message));
                    } else {
                        callback();
                    }
                } catch (error: any) {
                    callback(error);
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
            validator: (rule: any, value: any, callback: any) => {
                try {
                    const val = value?.toString() ?? '';
                    const reg = fixed
                        ? new RegExp(`^\\-?\\d+(.\\d{${limit}})?$`)
                        : new RegExp(`^\\-?\\d+(.\\d{0,${limit}})?$`);
                    if (reg.test(val) || !val) {
                        callback();
                    } else {
                        callback(new Error(message));
                    }
                } catch (error: any) {
                    callback(error);
                }
            },
        };
    },
    /**
     * integer 整数
     */
    integer(message = '请输入整数') {
        return {
            trigger: 'change',
            validator: (rule: any, value: any, callback: any) => {
                try {
                    const val = value?.toString() ?? '';
                    Math.round(+val)
                    if (Math.round(+val) !== +val) {
                        callback(new Error(message));
                    } else {
                        callback();
                    }
                } catch (error: any) {
                    callback(error);
                }
            },
        };
    },
    /**
     * positiveNumber 正数
     */
    positiveNumber(message = '请输入正数') {
        return {
            trigger: 'change',
            validator: (rule: any, value: any, callback: any) => {
                try {
                    if (+value > 0) {
                        callback();
                    } else {
                        callback(new Error(message));
                    }
                } catch (error: any) {
                    callback(error);
                }
            },
        };
    },
    /**
     * min 限制最小值
     * @param {number} min 最小值
     */
    min(min: number, message = '不能小于${value}') {
        return {
            trigger: 'change',
            validator: (rule: any, value: any, callback: any) => {
                try {
                    const msg = message.replace('${value}', min.toString());
                    if (+value >= +min || ['', void 0, null].includes(value)) {
                        callback();
                    } else {
                        callback(new Error(msg));
                    }
                } catch (error: any) {
                    callback(error);
                }
            },
        };
    },
    /**
     * max 限制最大值
     * @param max 最大值
     */
    max(max: number, message = '不能大于${value}') {
        return {
            trigger: 'change',
            validator: (rule: any, value: any, callback: any) => {
                try {
                    const msg = message.replace('${value}', max.toString());
                    if (+value <= +max || ['', void 0, null].includes(value)) {
                        callback();
                    } else {
                        callback(msg);
                    }
                } catch (error: any) {
                    callback(error);
                }
            },
        };
    },
    /**
     * maxLength
     * @param len 最大长度
     */
    maxLength(len: number, message = '最大长度限制:${value}') {
        return {
            trigger: 'change',
            validator: (rule: any, value: any, callback: any) => {
                try {
                    const msg = message.replace('${value}', len.toString());
                    if ([void 0, null].includes(value)) {
                        callback();
                    } else if (value.length > len) {
                        callback(new Error(msg));
                    } else {
                        callback();
                    }
                } catch (error: any) {
                    callback(error);
                }
            },
        };
    },
    /**
     * minLength
     * @param len 最小长度
     */
    minLength(len = 1, message = '最小长度限制:${value}') {
        return {
            trigger: 'change',
            validator: (rule: any, value: any, callback: any) => {
                try {
                    const msg = message.replace('${value}', len.toString());
                    if ([void 0, null].includes(value)) {
                        callback(new Error(msg));
                    } else if (value.length < len) {
                        callback(new Error(msg));
                    } else {
                        callback();
                    }
                } catch (error: any) {
                    callback(error);
                }
            },
        };
    },
    /**
     * phone
     * @desc 目前仅支持验证1开头11位数字
     */
    phone(message = '手机格式不正确') {
        return {
            trigger: 'change',
            validator: (rule: any, value: any, callback: any) => {
                try {
                    if (['', null, void 0].includes(value)) {
                        callback();
                    } else if (!/^1\d{10}$/.test(value.toString().trim())) {
                        callback(new Error(message));
                    } else {
                        callback();
                    }
                } catch (error: any) {
                    callback(error);
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