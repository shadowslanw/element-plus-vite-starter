<template lang="pug">
ElBreadcrumb(v-show="isBreadcrumbVisible")
    ElBreadcrumbItem(
        v-for="(item, index) in breadcrumbs"
        :key="item.name"
        :to="item.path"
    ) {{ item.meta.name }}
</template>

<script lang="ts" setup>
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
import setupNavigationInit from '@/composition/common/navigation';
const { breadcrumbs, isBreadcrumbVisible } = setupNavigationInit();
</script>

<style lang="scss" scoped></style>