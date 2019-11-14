<template>
  <div class="container">
    <div class="row login justify-content-center align-items-center">
      <form class="form-signin rounded">
        <div class="text-center mb-4">
          <h1 class="h1 m-3 text-secondary font-weight-ligh">LOGIN</h1>
        </div>
        <div class="form-label-group mt-4">
          <div class="text m-2">Email</div>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            required
            autofocus
          />
        </div>
        <div class="form-label-group p1 mt-4">
          <div class="text m-2">Password</div>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            required
          />
        </div>
        <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">
          <span>Login</span>
        </button>
        <div class="d-flex mt-1">
          <span class="pt-2">Don’t have account? </span>
          <router-link :to="{ name: 'ROUTE_REGISTER' }" class="btn pb-0">
            <strong>Register Now</strong>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register"
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
