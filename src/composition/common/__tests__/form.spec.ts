import { validators } from '../form';
import type { RuleItemOption } from '../form';
import Schema from 'async-validator';
import type { Rule } from 'async-validator';


interface TestOptionsItem {
    /** describe.name */
    title: string
    /** tests options */
    tests: {
        /** test.name, use JSON({ data, args }) replace title if not set */
        title?: string
        /** test data */
        data: Record<string, any>
        /** arguments to build Rule */
        args?: any[]
        /** function to build Rule */
        func?: (...args: any) => RuleItemOption
        /** a Schema instance */
        schema?: Schema,
        /** called by Schema.validate().then */
        resolve: () => void
        /** called by Schema.validate().catch */
        reject: ({ errors, fields }: any) => void
        /** test.todo */
        todo?: boolean
        /** test.only */
        only?: boolean
        /** test.skip */
        skip?: boolean
    }[]
    /** use describe.skip */
    skip?: boolean
    /** use describe.only */
    only?: boolean
}

/**
 * @example value: { a: '', b: '' }
 * rules: { a: required, b: required }
 * validate.catch(({ errors, fields }))
 * errors: [
 *   { message: '', fieldValue: '', field: 'a' },
 *   { message: '', fieldValue: '', field: 'b' }
 * ]
 * fields: {
 *   a: [{ message: '', fieldValue: '', field: 'a' }],
 *   b: [{ message: '', fieldValue: '', field: 'b' }]
 * }
 */
describe('Composition setupFormInit()', () => {

    const Expected = {
        Pass: () => expect(true).toBeTruthy(),
        NoPass: () => expect(false).toBeTruthy(),
    }

    const TestOptions: TestOptionsItem[] = [
        {
            title: `Validator.required(message = '必填项未填写')`,
            tests: [
                {
                    data: { value: '' },
                    args: [],
                    func: validators.required,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: '' },
                    args: ['请填写value'],
                    func: validators.required,
                    resolve: Expected.NoPass,
                    reject: ({ fields }: any) => {
                        expect(fields.value?.[0].message).toBe('请填写value');
                    },
                },
                {
                    data: { value: 'Tom' },
                    args: [],
                    func: validators.required,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: void 0 },
                    schema: new Schema({ value: validators.required() }),
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: null },
                    args: [],
                    func: validators.required,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: { isObj: true } },
                    args: [],
                    func: validators.required,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
            ],
        },
        {
            title: `Validator.digital(limit = 2, fixed = false), 默认val = 3.14`,
            tests: [
                {
                    data: { value: 3.14 },
                    args: [3, true],
                    func: validators.digital,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: 3.14 },
                    args: [3, false],
                    func: validators.digital,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 3.14 },
                    args: [],
                    func: validators.digital,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: -3.14 },
                    args: [],
                    func: validators.digital,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: '3.14' },
                    args: [],
                    func: validators.digital,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: '-3.14' },
                    args: [],
                    func: validators.digital,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: '3.14.15.926' },
                    args: [],
                    func: validators.digital,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: '-3.14.15.926' },
                    args: [],
                    func: validators.digital,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: void 0 },
                    schema: new Schema({ value: validators.digital() }),
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: null },
                    func: validators.digital,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: '' },
                    func: validators.digital,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
            ],
        },
        {
            title: `Validator.integer(message = '请输入整数')`,
            tests: [
                {
                    data: { value: 1 },
                    args: [],
                    func: validators.integer,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: -1 },
                    args: [],
                    func: validators.integer,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 0 },
                    args: [],
                    func: validators.integer,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: '-0' },
                    args: [],
                    func: validators.integer,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 0.5 },
                    args: ['必须是整数'],
                    func: validators.integer,
                    resolve: Expected.NoPass,
                    reject: ({ fields }) => {
                        expect(fields.value?.[0].message).toBe('必须是整数');
                    },
                },
                {
                    data: { value: '-0.5' },
                    args: [],
                    func: validators.integer,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: '-0.3.1415926' },
                    args: [],
                    func: validators.integer,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: void 0 },
                    schema: new Schema({ value: validators.integer() }),
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: null },
                    func: validators.integer,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
            ],
        },
        {
            title: `Validator.positiveNumber(message = '请输入正数')`,
            tests: [
                {
                    data: { value: 1 },
                    func: validators.positiveNumber,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 1.256 },
                    func: validators.positiveNumber,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: '3.14.15.926' },
                    func: validators.positiveNumber,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: 0 },
                    func: validators.positiveNumber,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: -1 },
                    args: ['必须是正数'],
                    func: validators.positiveNumber,
                    resolve: Expected.NoPass,
                    reject: ({ fields }: any) => {
                        expect(fields.value?.[0].message).toBe('必须是正数');
                    },
                },
                {
                    data: { value: void 0 },
                    func: validators.positiveNumber,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: null },
                    schema: new Schema({ value: validators.positiveNumber() }),
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: '' },
                    schema: new Schema({ value: validators.positiveNumber() }),
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
            ],
        },
        {
            title: `Validator.min(min: number, message = '不能小于\${value}')`,
            tests: [
                {
                    data: { value: 0 },
                    args: [0],
                    func: validators.min,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 1 },
                    args: [0],
                    func: validators.min,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: '-1' },
                    args: [0],
                    func: validators.min,
                    resolve: Expected.NoPass,
                    reject: ({ fields }: any) => {
                        expect(fields.value?.[0].message).toBe('不能小于0');
                    },
                },
                {
                    data: { value: '' },
                    args: [0],
                    func: validators.min,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: null },
                    args: [0],
                    func: validators.min,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: void 0 },
                    schema: new Schema({ value: validators.min(0) }),
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: 'abc' },
                    args: ['1', '最小值:\${value}'],
                    func: validators.min,
                    resolve: Expected.NoPass,
                    reject: ({ fields }: any) => {
                        expect(fields.value?.[0].message).toBe('最小值:1');
                    },
                },
            ],
        },
        {
            title: `Validator.max(max: number, message = '不能大于\${value}')`,
            tests: [
                {
                    data: { value: 0 },
                    args: [0],
                    func: validators.max,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 1 },
                    args: [0],
                    func: validators.max,
                    resolve: Expected.NoPass,
                    reject: ({ fields }: any) => {
                        expect(fields.value?.[0].message).toBe('不能大于0');
                    },
                },
                {
                    data: { value: '-1' },
                    args: [0],
                    func: validators.max,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: '' },
                    args: [0],
                    func: validators.max,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: null },
                    args: [0],
                    func: validators.max,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: void 0 },
                    schema: new Schema({ value: validators.max(0) }),
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: 'abc' },
                    args: ['1', '最大值:\${value}'],
                    func: validators.max,
                    resolve: Expected.NoPass,
                    reject: ({ fields }: any) => {
                        expect(fields.value?.[0].message).toBe('最大值:1');
                    },
                },
            ],
        },
        {
            title: `Validator.maxLength(len: number, message = '最大长度限制:\${value}')`,
            tests: [
                {
                    data: { value: 'abc' },
                    args: [3],
                    func: validators.maxLength,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 'a二c' },
                    args: [3],
                    func: validators.maxLength,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 'a二' },
                    args: [3],
                    func: validators.maxLength,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 'a二cd' },
                    args: [3],
                    func: validators.maxLength,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: 'a二cd' },
                    args: [3, '最大字数长度${value}'],
                    func: validators.maxLength,
                    resolve: Expected.NoPass,
                    reject: ({ fields }) => {
                        expect(fields.value?.[0].message).toBe('最大字数长度3');
                    },
                },
                {
                    data: { value: [1, 2, 3] },
                    args: [3],
                    func: validators.maxLength,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: '' },
                    args: [3],
                    func: validators.maxLength,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: null },
                    args: [3],
                    func: validators.maxLength,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: void 0 },
                    schema: new Schema({ value: validators.maxLength(3) }),
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
            ],
        },
        {
            title: `Validator.minLength(len = 1, message = '最小长度限制:\${value}')`,
            tests: [
                {
                    data: { value: '1' },
                    args: [],
                    func: validators.minLength,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: 1 },
                    args: [],
                    func: validators.minLength,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: '' },
                    args: [],
                    func: validators.minLength,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: null },
                    args: [1, '至少有${value}项'],
                    func: validators.minLength,
                    resolve: Expected.NoPass,
                    reject: ({ fields }) => {
                        expect(fields.value?.[0].message).toBe('至少有1项');
                    },
                },
                {
                    data: { value: void 0 },
                    schema: new Schema({ value: validators.minLength() }),
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: [] },
                    args: [1],
                    func: validators.minLength,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { value: [1] },
                    args: [1],
                    func: validators.minLength,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: { length: 2 } },
                    args: [1],
                    func: validators.minLength,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { value: {} },
                    args: [1],
                    func: validators.minLength,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
            ],
        },
        {
            title: `Validator.phone('手机格式不正确')`,
            tests: [
                {
                    title: '不输不验证',
                    data: { value1: '', value2: null, value3: void 0 },
                    args: [],
                    func: validators.phone,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    title: '自定义错误信息',
                    data: { phone: 'a' },
                    args: ['自定义错误信息'],
                    func: validators.phone,
                    resolve: Expected.NoPass,
                    reject: ({ fields }) => {
                        expect(fields.phone?.[0].message).toBe('自定义错误信息');
                    },
                },
                {
                    data: { phone: '01234567890' },
                    args: [],
                    func: validators.phone,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { phone: 12345678901 },
                    args: [],
                    func: validators.phone,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { phone: ' 17766665555 ' },
                    args: [],
                    func: validators.phone,
                    resolve: Expected.Pass,
                    reject: Expected.NoPass,
                },
                {
                    data: { phone: '1776665555' },
                    args: [],
                    func: validators.phone,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
                {
                    data: { phone: '177666655554' },
                    args: [],
                    func: validators.phone,
                    resolve: Expected.NoPass,
                    reject: Expected.Pass,
                },
            ],
        },
    ];
    TestOptions.map((options) => {
        let action;
        if (options.skip) {
            action = describe.skip;
        } else if (options.only) {
            action = describe.only;
        } else {
            action = describe;
        }
        if (!options.tests.length) {
            action(options.title, () => {});
            return;
        }
        action.each(options.tests)(
            options.title,
            ({
                data,
                args = [], func,
                resolve, reject,
                todo, only, skip,
                title,
                schema,
            }) => {
                const testName = title ?? JSON.stringify({ data, args });
                let testAction = test;
                if (todo) {
                    test.todo(testName);
                    return;
                } else if (only) {
                    testAction = test.only;
                } else if (skip) {
                    testAction = test.skip;
                }
                testAction(testName, () => {
                    if (schema) {
                        return schema.validate(data)
                            .then(resolve)
                            .catch(reject);
                    } else if (func) {
                        /**
                         * 根据data生成对应字段的Rule.
                         * 如果data = { value: undefined }, descriptor是一个空对象.
                         * 需要测试undefined时，请使用schema参数.
                         */
                        const descriptor = Object.keys(data)
                            .reduce((obj: Record<string, Rule>, key: string) => {
                                obj[key] = func(...args);
                                return obj;
                            }, {} as Record<string, Rule>);
                        return new Schema(descriptor)
                            .validate(data)
                            .then(resolve)
                            .catch(reject);
                    } else {
                        throw new Error('缺少func或schema参数');
                    }
                });
            });
    });
});