<template>
  <div>
    <nav class="desktop-navbar navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1">
      <div>
        <span class="navbar-brand d-inline col-sm-3 col-md-2 mr-0"
          >Arvan challenge</span
        >
        <span class="text col-sm-3 col-md-2 d-inline text-white font-weight-light"
          >Wellcome {{ username }}</span
        >
      </div>
      <ul class="navbar-nav px-3 py-2">
        <li class="nav-item text-nowrap">
          <button
            @click="logout"
            class="nav-link btn text-info py-1 px-3 rounded border border-info"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
    <nav>
      <div class="pos-f-t">
        <nav class="navbar navbar-dark bg-dark">
          <div>
            <span class="navbar-brand d-inline col-sm-3 col-md-2 mr-0"
              >Arvan challenge</span
            >
            <span class="text col-sm-3 col-md-2 d-inline text-white font-weight-light"
              >Wellcome {{ username }}</span
            >
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="menu-content bg-dark p-4">
            <router-link
              :to="{ name: 'ROUTE_HOME' }"
              class="menu-link"
              >All Articles</router-link
            >
            <router-link
              :to="{ name: 'ROUTE_ADD_ARTICLE' }"
              class="menu-link"
              >New Article</router-link
            >
            <button
              @click="logout"
              class="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    username: {
      type: String
    }
  },
  methods: {
    logout() {
      try {
        this.$store.dispatch("removeToken");
        this.$router.push({ name: "ROUTE_LOGIN" });
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

<style lang="css">
  @media ( min-width: 550px ) {
    .desktop-navbar {
       display: flex
    }
    .pos-f-t {
      display: none
    }
  }
  @media ( max-width: 550px ) {
    .desktop-navbar {
      display: none 
    }
    .pos-f-t {
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      z-index: 1000;
    }
    .menu-content {
      display: flex;
      flex-flow: column;
      align-items: flex-start
    }
    .menu-link , .logout-button {
      display: block;
      width: 100%;
      color: white;
      font-size: 15px;
      padding: 0 20px;
      text-align: left
    }
    .logout-button {
      border: none;
      background: transparent
    }
    .menu-link {
      padding-bottom: 1.5rem
    }
  }
</style>