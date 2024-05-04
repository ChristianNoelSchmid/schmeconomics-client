<script setup>
    import { onMounted, ref } from "vue";
    import { get_categories } from "../fetches";
    import { use_auth_store } from "../stores/auth";
    import { use_state_store } from "../stores/state";

    const 
        user_id = ref(""),
        api_key = ref("");
    
    // Store the login data when user inputs
    const on_submit = async (event) => {
        event.preventDefault();
        const auth = use_auth_store();
        auth.sign_in(user_id.value, api_key.value);
    }
</script>

<template>
    <form @submit="on_submit" class="container">
        <div class="form-group mb-2">
            <label for="user-id">User Id</label>
            <input v-model="user_id" type="username" class="form-control" id="user-id">
        </div>
        <div class="form-group mb-2">
            <label for="key">Api-Key</label>
            <input v-model="api_key" type="password" class="form-control" id="api-key">
        </div>
        <div class="button-wrapper mt-4">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
</template>

<style scoped>
    form {
        margin-top: 72px;
    }
    .button-wrapper, .button-wrapper > * {
        width: 100%;
    }
</style>