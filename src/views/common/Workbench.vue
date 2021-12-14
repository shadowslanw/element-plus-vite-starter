<template lang="pug">
| Workbench {{ count }}
br
button(@click="count++") increment
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onActivated } from 'vue';

export default defineComponent({
    name: 'Workbench',
    setup() {
        onMounted(() => {
            console.log('%cmounted', 'color:orange');
        });
        onActivated(() => {
            console.log('%cactivated', 'color:green');
        });
        return {
            count: ref<number>(0),
        };
    },
});
</script>