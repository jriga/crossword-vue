<template>
  <div class="home">
    <h1>Crosswords</h1>

    <van-button plain
                hairline
                type="primary"
                icon="apps"
                color="#7232dd"
                :to="{name: 'Crossword'}">Level {{level}}</van-button>

  </div>
</template>

<script>
import { Button, Icon } from 'vant'

export default {
  name: 'Home',
  components: {
    'van-icon': Icon,
    'van-button': Button
  },
  data() {
    return { }
  },
  mounted () {
    if (this.$store.getters.words.length == 0) {
      this.$store.dispatch('updateBoard');
    }
  },
  computed: {
    level () { return this.$store.state.level; }
  }
}
</script>

<style scoped>

</style>
