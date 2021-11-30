import { shallowMount } from '@vue/test-utils'
import EventCard from '@/components/EventCard.vue'

describe('EventCard.vue', () => {
  it('renders props.msg when passed', () => {
    const eventCard = {name: "event_card_name", location: "seattle, wa"}
    const wrapper = shallowMount(EventCard, {
      propsData: { event: eventCard }
    })
    expect(wrapper.text()).toMatch(eventCard.name)
  })
})
