<template lang="pug">
ElPopover(
    v-model:visible="visible"
    placement="bottom-end"
    :width="400"
    trigger="focus"
    :show-arrow="false"
)
    template(#reference="padding")
        ElInput.search(
            v-model="queryString"
            size="mini"
            placeholder="产品 / 功能 / 文档"
            clearable
            :prefix-icon="SearchIcon"
        )

    .result-title 搜索结果
    .result
        .features.result-item(v-show="queryString")
            .result-item-title 产品&nbsp;/&nbsp;功能
            .result-item-body
                CustomList(:dataSource="features")
                    template(#default="{ item }")
                        router-link(:to="{ name: item.name }") {{ item.meta?.name || item.name }}
        .docs.result-item(v-show="queryString")
            .result-item-title 相关文档
            .result-item-body
                CustomList(:dataSource="docs")
        .empty.result-item(ref="emptyResultRef" v-show="!queryString") 请输入想要搜索的产品/功能/文档关键字
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElPopover, ElInput } from 'element-plus';
import { Search as SearchIcon } from '@element-plus/icons-vue';
import { throttle } from '@/utils';
import setupNavigationInit from '@/composition/common/navigation';
import setupHelpInit from '@/composition/help';
import CustomList from '@/components/common/CustomList/CustomList.vue';

const { menuList } = setupNavigationInit();
const { list: HelpList } = setupHelpInit();
const queryString = ref<string>('');
const visible = ref<boolean>(false);

const features = ref<any[]>([]);
const featureFilter = throttle(200, (query: string) => {
    function find(src: any) {
        let results: any = [];
        if (Array.isArray(src)) {
            results = src.reduce((acc: any, item: any) => {
                acc.push(...find(item));
                return acc;
            }, []);
        } else if (src.children?.length) {
            results = [...find(src.children)];
        } else {
            if (src.name.indexOf(query) !== -1
                || (src.meta?.name && src.meta.name.indexOf(query) !== -1)
            ) {
                results = [src];
            }
        }
        return results;
    }
    features.value = query ? find(menuList.value) : [];
});
watch(queryString, featureFilter);

const docs = ref<any[]>([]);
const docFilter = throttle(200, (query: string) => {
    // docs.value = await HelpList();
    docs.value = [];
});
watch(queryString, docFilter);
</script>

<style lang="scss" scoped>
.search {
    float: right;
    width: 200px;
}

.result {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    .result-item {
        flex: 1;
    }

    .empty {
        line-height: 3em;
        text-align: center;
    }
}
</style>