import Vue from 'vue'
import vSelect from 'vue-select'



vSelect.props.components.default = () => ({
    Deselect: {
        render: h => h('close-icon' ),
      },
    OpenIndicator: {    render: h => h('arrow-down-icon',{ class: 'open-indicator' }),
    },
  })
  Vue.component('v-select', vSelect)