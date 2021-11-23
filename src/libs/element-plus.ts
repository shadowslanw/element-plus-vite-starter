import {
    ElMessage
} from 'element-plus';

import 'element-plus/theme-chalk/src/message.scss';

const components = [
    ElMessage,
];

export const install = function(app: any) {
    for (const component of components) {
        app.use(component);
    }
    // app.config.globalProperties.$message = message;
    // app.config.globalProperties.$confirm = Modal.confirm;
    return app;
};

export default {
    install,
};