<script setup>
    import { computed, defineProps } from "vue";
    import { use_state_store } from "../stores/state";
    
    const state = use_state_store();
    const props = defineProps({
        transact: undefined
    });

    const transact_fmt = computed(() => {
        const t_stamp = new Date(props.transact.t_stamp * 1000);
        const date = 
            t_stamp.getMonth().toString() + "/" +
            t_stamp.getDate().toString() + "/" +
            t_stamp.getFullYear().toString() + ", " +
            t_stamp.getHours().toString().padStart(2, '0') + ":" +
            t_stamp.getMinutes().toString().padStart(2, '0');
        
        const cat_name = props.transact.cat_name;
        const user_name = state
            .users
            .find(user => user.id === props.transact.user_id)
            .user_name;

        const am = props.transact.am;
        const is_refill = props.transact.is_refill;
        const notes = props.transact.notes;

        return { date, name: user_name, am, is_refill, notes, cat_name }
    });
</script>
<template>
    <div class="row transact" :class="{ refill: transact_fmt.is_refill }">
        <div class="col-6">
            <h4>{{ transact_fmt.date }}</h4>
            <span>{{ transact_fmt.cat_name }}: ${{ transact_fmt.am / 100 }}</span>
        </div>
        <div class="col-6 d-flex flex-column">
            <p>{{ transact_fmt.name }}</p>
        </div>
        <p>{{ transact.is_refill ? "Refill" : transact_fmt.notes }}</p>
    </div>
</template>
<style>
    .transact {
        border-bottom: solid 1px #fefefe;
        padding: 2em 0;
    }
    .transact:last-child {
        border-bottom: none;
    }
</style>