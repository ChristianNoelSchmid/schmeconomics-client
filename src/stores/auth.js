import { defineStore } from "pinia";

export const use_auth_store = defineStore("auth", {
  state: () => ({
    user_id: "",
    api_key: ""
  }),
  actions: {
    try_load() {
      const login_info = localStorage.getItem("login");
      if(login_info !== null) {
        this.user_id = login_info.split(":")[0];
        this.api_key = login_info.split(":")[1];
      }
    },
    sign_in(user_id, api_key) {
      this.user_id = user_id;
      this.api_key = api_key;

      localStorage.setItem("login", `${user_id}:${api_key}`);
    },
  },
  getters: {
    logged_in(state) { return state.api_key !== ""; }
  }
});