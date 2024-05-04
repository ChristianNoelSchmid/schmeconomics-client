<script setup>
import { computed } from "@vue/reactivity";
import { RouterLink, RouterView } from "vue-router";
import router from "./router";

import { use_auth_store } from "./stores/auth";
import { use_app_store } from "./stores/app";

const routes = router.getRoutes().filter(route => route.name !== "sign-in" && route.name !== "bday");
const active_nav = computed(() => router.currentRoute.value.name);

const auth = use_auth_store();
const app = use_app_store();

auth.try_load();

</script>

<template>
    
    <div class="loading" :class="{ invisible: !app.is_loading }">
      <div class="spinner-border"></div>
    </div>
    <header class="d-flex flex-wrap justify-content-center align-items-center">
      <ul class="nav nav-pills">
        <li v-for="route of routes">
          <RouterLink 
            :to="route.path" 
            :class="{ active: active_nav === route.name }"
             class="nav-link" 
          >{{ route.name.toUpperCase() }}</RouterLink>
        </li>
      </ul> 
    </header>
    <div class="router-view">
      <RouterView />
    </div>
    <footer class="container border-top d-flex justify-content-between align-items-center">
        <RouterLink
          to="/sign-in"
          class="nav-link"
        >Sign In</RouterLink>
        <div class="align-item-end">
          <RouterLink to="/6a3a1c5f-5d84-494b-a84f-ab874e46ed65">
            <img src="@/assets/alyssa_bday/balloons.svg" class="balloons" />
          </RouterLink>
      </div>
    </footer>
</template>

<style scoped>
  header {
    background-color: white;
    z-index: 10;
    position: sticky;
    top: 0; left: 0;
    box-shadow: 0px 0px 10px 0px #0003;
  }
  header, footer {
    height: 72px;
  }
  .active {
    background-color: #00f;
  } 
  .balloons {
    width: 2em;
    height: 2em;
  }

  .router-view {
    min-height: calc(100vh - 72px - 72px);
  }

  .loading {
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0; left: 0;
    display: flex;

    width: 100%;
    height: 100vh;

    background-color: #fffd;

    z-index: 5;
  }

  .nav {
    font-size: 0.75em;
  }
</style>
