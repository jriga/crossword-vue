<template>
<van-row id="settings" justify="center">
  <van-col span="20">
  <van-field name="stepper" label="Grid size">
    <template #input>
      <van-stepper v-model="size"
                   integer
                   @change="updateBoard"
                       disable-input
                   :min="minGrid"
                   :max="maxGrid"/>
    </template>
  </van-field>
  <van-field name="switch" label="Show words">
    <template #input>
      <van-switch v-model="showWords" size="20" />
    </template>
  </van-field>
  </van-col>
</van-row>
</template>

<script>
import { mapActions } from 'vuex'
import lodash from 'lodash'
import { Field, Switch, Stepper } from 'vant';

export default {
  name: 'Settings',
  components: {
    'van-field': Field,
    'van-switch': Switch,
    'van-stepper': Stepper
  },
  data () {
    return {
      minGrid: 7,
      maxGrid: 20,
      options: [7,9,12,14,16,20]
    }
  },
  computed: {
    size: {
      get () {
        return this.$store.getters.size;
      },
      set (value) {
        this.$store.commit('updateSize', value)
      }
    },
    showWords: {
      get () {
        return this.$store.state.showWords
      },
      set (value) {
        this.$store.commit('updateShowWords', value)
      }
    }
  },
  methods: {
    updateBoard: _.debounce(function() {
      this.$store.dispatch('updateBoard')
      }, 700),
  }
}
</script>

<style scoped>
#settings{
    margin: 0 auto;

}
</style>
