<template>
  <div class="container">
    <div class="row login justify-content-center align-items-center">
      <form class="form-signin rounded" @submit.prevent="onRegister">
        <div class="text-center mb-4">
          <h1 class="h1 m-3 text-secondary font-weight-ligh">REGISTER</h1>
        </div>
        <div class="form-label-group mt-4">
          <div class="text m-2">Username</div>
          <input
            type="text"
            id="inputUser"
            class="form-control"
            required
            v-model="username"
          />
        </div>

        <div class="form-label-group mt-4">
          <div class="text m-2">Email</div>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            required
            autofocus
            v-model="email"
          />
        </div>
        <div class="form-label-group p1 mt-4">
          <div class="text m-2">Password</div>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            required
            v-model="password"
          />
        </div>
        <button class="btn btn-lg btn-primary btn-block mt-3" type="submit" :disabled='buttonDisabled'>
          <span>Register</span>
        </button>
        <div class="d-flex mt-1">
          <span class="pt-2">Already Registered? </span>
          <router-link :to="{ name: 'ROUTE_REGISTER' }" class="btn pb-0">
            <strong>Login</strong>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  computed: {
    buttonDisabled() {
      return !this.email || !this.password || !this.username;
    }
  },
  methods: {
    onRegister() {
      
    }
  }
};
</script>

<style scoped>
.login {
  height: 100vh;
}

.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
  background-color: #eceeef;
}
</style>
