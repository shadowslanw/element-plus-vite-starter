<template lang="pug">
ElTabs(
    v-show="visible"
    v-model="currentTab"
    @tab-remove="remove"
)
    ElTabPane(
        v-for="tab in allTabs"
        :key="tab.name"
        :name="tab.name"
        :label="tab.meta?.name ?? tab.name"
        :closable="tab.meta?.tabClosable !== false")
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElTabs, ElTabPane } from 'element-plus';

const route = useRoute();
const router = useRouter();
const store = useStore();

const visible = computed(() => store.state.PreferSetting?.tabs !== false);
const currentTab = computed<string>({
    get: () => route.name as string,
    set: (name: string) => router.push({ name }),
});
const allTabs = computed(() => store.getters['PageTabs/allTabs']);

const remove = (name: string) => {
    // index为tabs的序号，非allTabs
    store.dispatch('PageTabs/removeByName', name).then((index: number) => {
        // 关闭当前页，优先激活后一个标签，其次是前一个标签
        if (name === currentTab.value) {
            const next = allTabs.value[index + 1] ?? allTabs.value[index];
            router.replace({ name: next.name });
        }
    });
}

const insert = (name: any) => {
    const current = allTabs.value.find((v: any) => v.name === name);
    if (current) {
        return;
    }
    store.dispatch('PageTabs/insert', {
        name: route.name,
        path: route.path,
        query: route.query,
        params: route.params,
        meta: route.meta,
    });
}

watch(() => route.name, insert);
</script>

<style lang="scss" scoped></style>