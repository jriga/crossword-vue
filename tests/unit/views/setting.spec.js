import { shallowMount } from '@vue/test-utils'
import Settings from '@/views/Settings.vue'

describe('view settings.vue', () => {
  it('has name settings', () => {
    const wrapper = shallowMount(Settings)
    expect(wrapper.name()).toMatch('Settings')
  })
})
