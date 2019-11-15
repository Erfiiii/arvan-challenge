<template>
  <nav class="col-md-2 d-none d-md-block bg-primary sidebar">
    <ul class="nav flex-column">
      <li class="nav-item">
        <div class=" h4 nav-link text-white">Post</div>
      </li>
      <li class="nav-item">
        <router-link
          :class="{ active: route === 'ROUTE_HOME' }"
          :to="{ name: 'ROUTE_HOME' }"
          class="nav-link text-white"
          >All Articles</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          :class="{ active: route === 'ROUTE_ADD_ARTICLE' }"
          :to="{ name: 'ROUTE_ADD_ARTICLE' }"
          class="nav-link text-white"
          >New Article</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "sidebar",
  computed: { 
    route() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 62px 0 0;
  /* box-shadow: inset -1px 0 0
  rgba(0, 0, 0, .1); */
}

.nav-link.active {
  background: rgba(255, 250, 250, 0.2);
}
</style>
