import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getTreePath } from '@/utils';

export default function setupNavigationInit() {

    const route = useRoute();
    const store = useStore();
    const menuList = ref<any[]>([
        {
            name: 'Login',
            meta: {
                name: '登录',
            },
        },
        {
            name: 'Setting',
            meta: {
                name: '设置',
            },
            children: [
                {
                    name: 'PageNotFound',
                    meta: {
                        name: 'PageNotFound',
                    },
                },
                {
                    name: 'Forbidden',
                    meta: {
                        name: 'Forbidden',
                    },
                },
            ],
        },
    ]);

    const breadcrumbs = computed(() => {
        const { name } = route;
        const result: any[] = [];
        let index = 0;
        let path: any[] = [];

        while (!path.length && index < menuList.value.length) {
            path = getTreePath(
                (value: any) => value === name,
                menuList.value[index],
                'name',
                ['children'],
            );
            index++;
        }
        for (const item of path) {
            result.push({
                path: item.path,
                name: item.name,
                meta: item.meta,
            });
        }

        return result;
    });

    const isBreadcrumbVisible = computed(() => {
        if (!store.state.PreferSetting.breadcrumb) {
            return false;
        }
        if (route.meta?.isBreadcrumbVisible === false) {
            return false;
        }
        return true;
    });

    return {
        menuList,
        breadcrumbs,
        isBreadcrumbVisible,
    };
}