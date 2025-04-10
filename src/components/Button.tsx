import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: String,
  },
  setup(props) {
    return () => h('button', props.label)
  },
})
