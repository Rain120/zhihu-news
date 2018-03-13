<template>
  <div id="app">
    <m-header @showSidebar="show"></m-header>
    <sidebar ref="sidebar"></sidebar>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Sidebar from 'components/Sidebar/Sidebar'

export default {
  methods: {
    show () {
      this.$refs.sidebar.open()
    }
  },
  components: {
    MHeader,
    Sidebar
  }
}
</script>

<style>
</style>
