<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="menu-logo">
      <router-link class="menu-logo text-light ps-4" to="/posts" href="#">TrendBook</router-link>
    </div>
    <button class="navbar-toggler" type="button"
      data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end"
      id="navbarNavAltMarkup">
      <div v-if="$store.state.userInfo" class="navbar-nav align-items-center">
        <router-link class="nav-item nav-link text-light me-4" to="/posts">貼文牆</router-link>
        <router-link class="nav-item nav-link text-light me-4" :to="`/user/${$store.state.userInfo._id}`">我的貼文牆</router-link>
        <router-link class="nav-item nav-link text-light me-4" to="/user" href="#">修改個人資料</router-link>
        <router-link class="nav-item nav-link text-light me-4" @click="loginOut" to="/login" href="#">登出</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    loginOut () {
      localStorage.setItem('test-token', '')
      this.$store.commit('setUserInfo', null)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Noto+Sans+TC:wght@400;500;700&family=Paytone+One&display=swap');
.menu-logo {
  text-decoration:none;
  font-family: 'Paytone One', sans-serif;
  font: normal normal normal 26px/36px Paytone One;
}
</style>
