<template>
<div id="settings">
<van-row justify="center">
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
  <van-field name="switch" label="Play Fx sound">
    <template #input>
      <van-switch v-model="playFx" size="20" />
    </template>
  </van-field>
  <van-field name="slider" label="Music Volume">
    <template #input>
      <van-slider v-model="musicVol" :min="vol.min" :max="vol.max" :step="vol.step"/>
    </template>
  </van-field>
  </van-col>
</van-row>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import lodash from 'lodash'
import { Field, Switch, Stepper, Slider } from 'vant';
import snd from '@/plugins/sound.js'

export default {
  name: 'Settings',
  components: {
    'van-field': Field,
    'van-switch': Switch,
    'van-stepper': Stepper,
    'van-slider': Slider
  },
  data () {
    return {
      vol: {
        min: 0,
        max: 1,
        step: 0.1
      },
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
    },
    playFx: {
      get () {
        return this.$store.state.sounds.fx
      },
      set (value) {
        this.$store.commit('updateSoundsFx', value)
      }
    },
    musicVol: {
      get () {
        return this.$store.state.sounds.musicVol
      },
      set (value) {
        this.$store.commit('updateSoundsMusicVol', value)
        snd.audioPlayer.volume = value;
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
 margin: 1rem auto;
 padding: 10px;
 border-radius: 12px;
 background: white;
 width: 85%;
}
</style>
