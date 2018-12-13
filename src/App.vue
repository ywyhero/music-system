<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    let loginData = JSON.parse(window.sessionStorage.getItem('loginData'))
    if(loginData) {
        this.$store.state.loginData = loginData;
    }
  }
}
</script>