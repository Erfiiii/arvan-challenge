<template>
  <div id="app" class="container-fluid">
    <header-cm v-if="isAuthenticated" :username="user.username"></header-cm>
    <sidebar-cm v-if="isAuthenticated" />
    <router-view />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import HeaderCm from "./components/Header";
import SidebarCm from "./components/Sidebar";

export default {
  components: {
    HeaderCm,
    SidebarCm
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters(["isAuthenticated"])
  }
};
</script>

<style></style>
