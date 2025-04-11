import { defineComponent, Fragment } from 'vue'

export default defineComponent({
  props: {
    label: String,
  },
  setup(props) {
    return () => {
      return (
        <Fragment>
          <button>{props.label}</button>
          <div>123</div>
          <span>456</span>
        </Fragment>
      )
    }
  },
})
