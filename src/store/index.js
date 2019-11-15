import Vue from "vue";
import Vuex from "vuex";
import { HttpService } from "../services/apiService";
import { Endpoints } from "../services/apiService/routes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || null,
    user: {}
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== null;
    }
  },
  mutations: {
    addUserAndToken(state, data) {
      state.user = data;
      state.token = data.token;
    }
  },
  actions: {
    registerUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        HttpService.postRequest(
          Endpoints.get(Endpoints.ROUTE_REGISTER),
          data
        ).then(({ user }) => {
          localStorage.setItem("token", user.token);
          commit("addUserAndToken", user);
          resolve();
        }).catch(e=> {
          reject(e)
        })
      })
    },
    loginUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        HttpService.postRequest(
          Endpoints.get(Endpoints.ROUTE_LOGIN),
          data
        ).then(({ user }) => {
          localStorage.setItem("token", user.token);
          commit("addUserAndToken", user);
          resolve();
        }).catch(e=> {
          reject(e)
        })
      });
    },
    getUser({commit}) {
      return new Promise((resolve,reject)=> {
        HttpService.getRequest(Endpoints.get(Endpoints.ROUTE_USER))
        .then(({user})=> {
          commit("addUserAndToken",user)
          resolve()
        }).catch(e=> {
          reject(e);
        })
      })
    }
  }
});
