export { default as throttle } from './throttle';

/**
 * 递归查找树形结构路径
 * @param {any} value 查找路径结尾的字段值 或参数为当前匹配值的回调
 * @param {any} source 目标对象
 * @param {string|null} compareAttr 与查找路径结尾字段值对比的属性字段名，不传匹配整个节点
 * @param {string[]} childAttrs 每级的子节点集合的字段名
 * @return {any[]} 返回所有到达目标的路径集合
 * @example 有路径1-2-3-4-5, 查找到达3的路径, 返回结果['1-2-3', '2-3', '3']
 */
export function getTreePath<T = (val: any) => boolean>(
    value: T | string | number,
    source: Record<string, any>,
    compareAttr: string|null,
    childAttrs: string[],
): any[] {
    const path: any[] = [];
    if (!source || Object.prototype.toString.call(source) !== '[object Object]') {
        console.warn('目标对象不存在或格式错误，source为非数组对象，如:{}', source);
        return path;
    }
    function getNodePath(node: Record<string, any>) {
        path.push(node);
        const compareValue = compareAttr ? node[compareAttr] : node;
        if (typeof value === 'function' && value(compareValue)) {
            throw 'GOT it';
        } else if (compareValue === value) {
            throw 'GOT it';
        }
        let children: any;
        childAttrs.forEach((v: string) => {
            if (children) {
                return;
            }
            children = node[v];
        });
        if (children && children.length > 0) {
            for (const child of children) {
                getNodePath(child);
            }
            path.pop();
        } else {
            path.pop();
        }
    }

    try {
        getNodePath(source);
    } catch (error) {
        return path;
    }
    return path;
}
