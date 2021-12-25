import { flatten } from '../';

describe('VueRouter', () => {
    test(`flatten`, () => {
        const mock: any[] = [
            {
                name: 'A', path: '/A',
                children: [
                    { name: 'A1', path: 'A1' },
                    { name: 'A2', path: 'A2', children: [] }
                ],
            },
            {
                name: 'B',
                children: [{ name: 'B1', path: 'B1' }],
            },
            {
                name: 'C', path: '/C', meta: { name: '西' },
            },
        ];
        const expected: any[] = [
            { name: 'A1', path: '/A/A1' },
            { name: 'A2', path: '/A/A2' },
            { name: 'B1', path: 'B1' },
            { name: 'C', path: '/C', meta: { name: '西' } },
        ];
        const result = flatten(mock);
        
        while(result.length) {
            const item = result.shift();
            const target = expected.find((v: any) => v.name === item.name);
            expect(item.path).toEqual(target.path);
            if (item.meta) {
                expect(item.meta.name).toEqual(target.meta.name);
            }
        }
    });
});