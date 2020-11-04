<template>
  <div class="home">
    <img alt="Crossword" src="../assets/logo.svg"/>
    <div class="next-game">
      <router-link :to="{name: 'Crossword'}"><h2>Level {{level}}</h2></router-link>
    </div>
    <div class="add-container"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
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
.next-game {
  margin: 20px auto;
  border: 5px solid black;
  width: 100px;
  border-radius: 12px;
  background: white;
}
</style>
