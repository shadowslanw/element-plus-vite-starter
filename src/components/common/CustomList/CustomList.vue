<template lang="pug">
.custom-list
    .custom-item(v-for="(item, index) in dataSource" :key="dataKey ? item[dataKey] ?? index : index")
        slot(:item="item" :dataSource="dataSource" :index="index")
    .custom-list-empty(v-show="!dataSource.length")
        slot(name="empty") {{ emptyContent }}
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue';

interface Props {
    dataSource?: any[]
    dataKey?: string
    emptyContent?: string
}

const props = withDefaults(defineProps<Props>(), {
    dataSource: () => [],
    emptyContent: '暂无数据',
});
</script>