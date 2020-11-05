<template>
  <nav id="nav">
    <van-row justify="center">
      <van-col span="8">    <router-link :to="{name: 'Home'}">Home</router-link> </van-col>
      <van-col span="8">{{coins}}</van-col>
      <van-col span="8">
        <router-link :to="{name: 'Settings'}">
          <van-icon name="setting-o" color="whitesmoke"/>
        </router-link>
      </van-col>
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
  padding: 40px 0 20px;
}
#nav a.router-link-exact-active, #nav a {
    color: whitesmoke;
}
#nav .van-col:first-child{
  text-align: left;
  padding-left: 3rem;
}
#nav .van-col:last-child{
  text-align: right;
  padding-right: 3rem;
}
</style>
