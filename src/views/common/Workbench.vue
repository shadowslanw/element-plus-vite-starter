<template lang="pug">
| Workbench {{ count }}
br
button(@click="count++") increment

div(v-show="showPWA")
    ElButton(@click="pwa") 添加到桌面


</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onActivated, onUnmounted } from 'vue';

export default defineComponent({
    name: 'Workbench',
    setup() {

        /** 生成pwa应用 */
        const showPWA = ref<boolean>(false);
        const callPWA = ref<any>();
        const pwa = () => {
            callPWA.value.prompt();
            callPWA.value.userChoice.then((result: any) => {
                if (result.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                callPWA.value = null;
            });
        }
        const pwaRegister = (e: Event) => { console.log('beforeinstallprompt', e);
            // 防止 Chrome 67 及更早版本自动显示安装提示
            e.preventDefault();
            // 稍后再触发此事件
            callPWA.value = e;
            // 更新 UI 以提醒用户可以将 App 安装到桌面
            showPWA.value = true;
        }

        window.addEventListener('beforeinstallprompt', (e: any) =>{ 
            console.log('add event beforeinstallprompt');
            pwaRegister(e);
        });

        onMounted(() => {
            console.log('%cWorkbench mounted', 'color:orange');
        });
        onUnmounted(() => {
            window.removeEventListener('beforeinstallprompt', pwaRegister);
        });
        onActivated(() => {
            console.log('%cWorkbench activated', 'color:green');
        });


        return {
            count: ref<number>(0),
            showPWA,
            pwa,
        };
    },
    mounted() {
        window.addEventListener('appinstalled', (event) => {
            console.log('installed');
        });
    },
});
</script>