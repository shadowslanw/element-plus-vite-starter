<template lang="pug">
Framework(
    aside-width="200px"
    header-height="60px"
    :direction="direction"
    :fixed="fixed"
    :breakpoint="992"
    @breakpoint="handleBreakpoint"
)
    template(#aside) 
        .aside 
            BaseMenu
    template(#header)
        .header HEADER
            button(@click="preferSettingVisible = true") 偏好设置
    template(#main)
        .main
            Breadcrumb
            router-view
ElDrawer(v-model="preferSettingVisible" title="偏好设置" direction="rtl" size="400px")
    PreferSetting
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { ElDrawer } from 'element-plus';
import Framework from '@/components/layouts/Framework/Framework.vue';
import BaseMenu from '@/components/common/BaseMenu/BaseMenu.vue';
import PreferSetting from '@/components/common/PreferSetting/PreferSetting.vue';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.vue';

const store = useStore();

const direction = computed(() => store.state.PreferSetting.direction);
const fixed = computed(() => store.state.PreferSetting.fixed);

const preferSettingVisible = ref<boolean>(false);

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
