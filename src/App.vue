<template>
  <div id="app" class="container-fluid">
    <header-cm></header-cm>
    <sidebar-cm/>
    <router-view/>
  </div>
</template>

<script>
import HeaderCm from "./components/Header";
import SidebarCm from "./components/Sidebar";

export default {
  components: {
    HeaderCm,
    SidebarCm
  }
}
</script>

<style>

</style>
