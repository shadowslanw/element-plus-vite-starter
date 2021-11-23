/**
* 函数节流
* @param delay 延迟处理时间，在该时间范围内一定会处理一次，毫秒
* @param action 需调用的方法
*/
export default function throttle(delay: number, action: any) {
    let last = 0;
    let timer: any = 0;
 
    return function(this: any, ...args: any) {
        const now = new Date().getTime();
        clearTimeout(timer);
        if (now - last > delay) {
            last = now;
            action.apply(this, args);
        } else {
            timer = setTimeout(() => {
                action.apply(this, args);
            }, delay);
        }
    };
}
