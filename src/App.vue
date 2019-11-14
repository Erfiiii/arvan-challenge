<template>
  <div id="app" class="container-fluid">
    <header-cm/>
    <router-view/>
  </div>
</template>

<script>
import HeaderCm from "./components/Header";

export default {
  components: {
    HeaderCm
  }
}
</script>

<style>

</style>
