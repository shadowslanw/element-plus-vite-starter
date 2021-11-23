<template lang="pug">
Framework(
    aside-width="150px"
    header-height="80px"
    :direction="direction"
    :fixed="fixed"
    :breakpoint="992"
    @breakpoint="handleBreakpoint"
)
    template(#aside) 
        .aside Aside
    template(#header)
        .header
            button(@click="direction = 'AHM'") AHM
            button(@click="direction = 'HAM'") HAM
            button(@click="direction = 'HM'") HM
            button(@click="fixed = true") 固定
            button(@click="fixed = false") 不固定
    template(#main)
        .main
            div(style="line-height: 100vh;") 很长很长的
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Framework from '@/components/layouts/Framework/Framework.vue';

const direction = ref<'AHM' | 'HAM' | 'HM'>('AHM');
const fixed = ref<boolean>(false);
function handleBreakpoint() {
    console.log('break point');
}
</script>

<style lang="scss">
#app {
    width: 100vw;
    height: 100vh;
}

.aside, .header, .main {
    width: 100%;
    height: 100%;
}

.aside {
    color: #eee;
    background: #333;
}

.header {
    color: #333;
    background: #f5f5f5;
}

.main {
    color: #333;
    background: #eee;
}
</style>
