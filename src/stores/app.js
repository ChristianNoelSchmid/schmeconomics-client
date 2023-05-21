import { defineStore } from "pinia";

export const use_app_store = defineStore("app", {
    state: () => ({
        is_loading: false
    })
});