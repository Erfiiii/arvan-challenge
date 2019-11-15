<template>
  <div class="container">
    <div class="row login justify-content-center align-items-center">
      <form class="form-signin rounded" @submit.prevent="onRegister">
        <div class="text-center mb-4">
          <h1 class="h1 m-3 text-secondary font-weight-ligh">REGISTER</h1>
        </div>
        <div class="form-label-group mt-4">
          <input-cm label="Username" type="text" :required="true" v-model="username"/>
        </div>
        <div class="form-label-group mt-4">
          <input-cm label="Email" type="email" :required="true" v-model="email"/>
        </div>
        <div class="form-label-group p1 mt-4">
          <input-cm label="Password" type="password" :required="true" v-model="password"/>
        </div>
        <button
          class="btn btn-lg btn-primary btn-block mt-3"
          type="submit"
          :disabled="buttonDisabled"
        >
          <span
            v-if="loadingState"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span v-else>Register</span>
        </button>
        <div class="d-flex mt-1">
          <span class="pt-2">Already Registered? </span>
          <router-link :to="{ name: 'ROUTE_LOGIN' }" class="btn pb-0">
            <strong>Login</strong>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputCm from "../../components/UI/Input";

export default {
  name: "login",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loadingState: false
    };
  },
  components: {
    InputCm
  },
  computed: {
    buttonDisabled() {
      return !this.email || !this.password || !this.username;
    }
  },
  methods: {
    async onRegister() {
      let data = {
        user: {
          username: this.username,
          password: this.password,
          email: this.email
        }
      };
      try {
        this.loadingState = true;
        await this.$store.dispatch("registerUser", data);
        this.$router.push({ name: "ROUTE_HOME" });
        this.loadingState = false;

      } catch (error) {
        this.loadingState = false;

        throw error;
      }
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
