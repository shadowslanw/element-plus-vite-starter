import { mount } from '@vue/test-utils';
import Home from '../Home.vue';

describe('test Index.vue', () => {
    test('render', () => {
        const wrapper = mount(Home);
        expect(wrapper.exists()).toBeTruthy();
    });
});