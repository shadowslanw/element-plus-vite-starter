import { mount, shallowMount } from '@vue/test-utils';
import App from '../App.vue';

describe(`App.vue`, () => {
    test(`渲染`, () => {
        const wrapper = shallowMount(App);
        expect(wrapper.exists()).toBeTruthy();
    });
});