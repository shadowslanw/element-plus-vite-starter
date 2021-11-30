<template lang="pug">
.framework-container(:class="[direction, { 'is-fixed': fixed }]" :style="containerStyle")
    .framework-aside(:style="asideStyle")
        slot(name="aside")
    .framework-header(:style="headerStyle")
        slot(name="header")
    .framework-main
        slot(name="main")
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, toRefs } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { throttle } from '@/utils';

const props = defineProps({
    direction: {
        type: String as PropType<'AHM' | 'HAM' | 'HM' | 'M'>,
        default: 'AHM',
    },
    fixed: {
        type: Boolean,
        default: false,
    },
    asideWidth: {
        type: String,
        default: '200px',
    },
    headerHeight: {
        type: String,
        default: '60px',
    },
    breakpoint: {
        type: [Number, Boolean as PropType<false>] as any,
        default: false,
    },
});

const emits = defineEmits(['breakpoint']);

const { direction, fixed, asideWidth, headerHeight, breakpoint } = toRefs(props);

/** 容器布局 */
const containerStyle = computed(() => ({
    gridTemplateColumns: `${asideWidth.value} auto auto`,
    gridTemplateRows: `${headerHeight.value} auto auto`,
}));
const asideStyle = computed(() => {
    const style: CSSProperties = {};
    if (direction.value.indexOf('A') === -1) {
        style.display = 'none';
    }
    return style;
});
const headerStyle = computed(() => {
    const style: CSSProperties = {};
    if (direction.value.indexOf('H') === -1) {
        style.display = 'none';
    }
    return style;
});

/**
 * 响应式断点，在组件加载时或窗口变化时触发验证
 * 当前窗口小于等于断点值（单位px）时触发事件
 */
const breakpointInit = () => {
    if (window.innerWidth <= breakpoint.value) {
        emits('breakpoint');
    }
}
const breakpointInitThrottle = throttle(250, breakpointInit);
if (breakpoint.value) {
    onMounted(() => {
        breakpointInit();
        window.addEventListener('resize', breakpointInitThrottle);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', breakpointInitThrottle);
    });
}
</script>

<style lang="scss" scoped>
.framework-container {
    display: grid;
    width: 100%;
    height: 100%;
    &.is-fixed {
        .framework-main {
            overflow: auto;
        }
    }
    &.AHM {
        grid-template-areas: 'a h h'
                             'a m m'
                             'a m m';
    }
    &.HAM {
        grid-template-areas: 'h h h'
                             'a m m'
                             'a m m';
    }
    &.HM {
        grid-template-areas: 'h h h'
                             'm m m'
                             'm m m';
    }

    &.M {
        grid-template-areas: 'm m m'
                             'm m m'
                             'm m m';
    }
    .framework-aside {
        grid-area: a;
        z-index: 3;
    }
    .framework-header {
        grid-area: h;
        z-index: 2;
    }
    .framework-main {
        grid-area: m;
        z-index: 1;
    }
}
</style>