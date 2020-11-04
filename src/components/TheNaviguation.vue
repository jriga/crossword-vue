<template>
  <nav id="nav">
    <van-row justify="center">
      <van-col span="4">    <router-link :to="{name: 'Home'}">Home</router-link> </van-col>
      <van-col span="4">{{coins}}</van-col>
      <van-col span="4"><router-link :to="{name: 'Settings'}"><van-icon name="setting" /></router-link></van-col>
    </van-row>
  </nav>
  <div class="van-hairline--top"></div>
</template>

<script>
import {Icon} from 'vant';

export default {
  components: {
    'van-icon': Icon
  },
  data () {
   return {}
  },
  computed: {
    coins () { return this.$store.getters.coins + " coins" }
  },
  methods: {
    onClickIcon () {},
    goBack () { this.$router.back(); },
    showBack () { return window.location.pathname != "/"}
  }
}
</script>

<style scoped>
#nav {
  display: block;
  align-items: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 10px;
}

#nav a.router-link-exact-active {
  color: #4201FD;
}
</style>
