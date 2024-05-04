<script setup>
    import { computed, onMounted } from "vue";
    import { use_state_store } from "../stores/state";
    import { use_app_store } from "../stores/app";

    import Transaction from "../components/Transaction.vue";

    const state = use_state_store();
    const app = use_app_store();

    const transacts = computed(() => state.transacts);
    const transact_complete = computed(() => state.transact_complete);

    onMounted(async () => {
        app.is_loading = true;
        await state.load_transacts(-1, true);
        app.is_loading = false;
    });
    const on_load_more = async () => await state.load_transacts(-1, false);
        
</script>
<template>
    <div class="container">
        <Transaction 
            v-for="transact in transacts"
            :transact="transact" />
    </div>
    <div :class="{ hidden: transact_complete }">
        <button @click="on_load_more" class="btn">Load more...</button>
    </div>
</template>