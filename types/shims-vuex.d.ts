import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
// import type { State } from '@/store';

declare module '@vue/runtime-core' {

    interface ComponentCustomProperties {
        $store: Store<any>
    }
}