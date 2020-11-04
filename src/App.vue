<template>
  <TheNaviguation />
  <router-view/>
</template>

<script>
import TheNaviguation from "@/components/TheNaviguation.vue";

export default {
  name: 'AppMain',
  components: {
    TheNaviguation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
}
</style>
