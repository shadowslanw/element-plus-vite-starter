<template lang="pug">
div 布局
    ElRadioGroup(ref="directionRef" v-model="currentDirection")
        ElRadioButton(label="HAM") HAM
        ElRadioButton(label="AHM") AHM
div 固定框架
    ElSwitch(ref="fixedRef" v-model="currentFixed")
div 菜单路径
    ElSwitch(ref="breadcrumbRef" v-model="currentBreadcrumb")
div 多标签
    ElSwitch(ref="tabsRef" v-model="currentTabs")
div
    ElButton(ref="resetRef" @click="reset") 恢复默认

</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ElRadioGroup, ElRadioButton, ElSwitch, ElButton } from 'element-plus';

const store = useStore();

/** 布局 */
const currentDirection = computed({
    get: () => store.state.PreferSetting.direction,
    set: (direction: any) => store.dispatch('PreferSetting/update', { direction }),
});

/** 固定框架 */
const currentFixed = computed({
    get: () => store.state.PreferSetting.fixed,
    set: (fixed: any) => store.dispatch('PreferSetting/update', { fixed }),
});

/** 菜单路径 */
const currentBreadcrumb = computed({
    get: () => store.state.PreferSetting.breadcrumb,
    set: (breadcrumb: any) => store.dispatch('PreferSetting/update', { breadcrumb }),
});

/** 多标签 */
const currentTabs = computed({
    get: () => store.state.PreferSetting.tabs,
    set: (tabs: any) => store.dispatch('PreferSetting/update', { tabs }),
});

/** 恢复默认 */
const reset = () => {
    store.dispatch('PreferSetting/reset');
}
</script>

<style lang="scss" scoped></style>