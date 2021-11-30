<template lang="pug">
ElMenu(@select="select")
    CustomSubMenu(v-for="menu in menuList" :key="menu.name" :menu="menu")
</template>

<script lang="ts" setup>
import { defineComponent, h } from 'vue';
import type { VNode } from 'vue';
import { useRouter } from 'vue-router';
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import setupNavigationInit from '@/composition/common/navigation';

const CustomSubMenu = defineComponent({
    name: 'CustomSubMenu',
    props: {
        menu: {
            type: Object,
            required: true,
        },
    },
    computed: {
        menuName() {
            return this.menu.meta?.name ?? this.menu.name;
        },
    },
    methods: {
        renderName() {
            const vnodes: VNode[] = [];
            if (this.menu.meta?.icon) {
                if (typeof this.menu.meta.icon === 'string') {
                    vnodes.push(h('i', { class: ['iconfont', this.menu.meta.icon] }));
                } else {
                    vnodes.push(h(this.menu.meta.icon));
                }
            }
            vnodes.push(this.menu.meta.name ?? this.menu.name);
            return vnodes;
        },
    },
    render() {
        return this.menu.children?.length
            ? h(ElSubMenu, {
                index: this.menu.name,
            }, {
                title: () => this.renderName(),
                default: () => this.menu.children.map((item: any) => h(CustomSubMenu, { menu: item })),
            })
            : h(ElMenuItem, {
                index: this.menu.name,
            }, () => this.renderName());
    },
});

const router = useRouter();
const { menuList } = setupNavigationInit();

const select = (index: string) => {
    router.push({ name: index });
}
</script>

<style lang="scss" scoped></style>