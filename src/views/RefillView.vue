<script setup>
    import { onMounted, reactive, ref } from 'vue';
    import { use_state_store } from "../stores/state";
    import { use_app_store } from "../stores/app";
    import { post_adjust_refills, post_refill } from "../fetches";

    import Dialog from '../components/Dialog.vue';
    import RefillCard from "../components/RefillCard.vue";
    import { computed } from '@vue/reactivity';

    const state = use_state_store();
    const app = use_app_store();

    const active = ref(false); 
    const refill_dialog_active = ref(false);
    const adjust_dialog_active = ref(false);
    const cat_refills = new reactive({});

    const refill_changes = computed(() => {
        let changes = []; 
        for(let cat of state.cats) {
            if(cat.refill_val !== cat_refills[cat.id]) {
                const op = cat_refills[cat.id] < cat.refill_val ? "-" : "+";
                changes.push(`${cat.cat_name}: $${cat_refills[cat.id] / 100} (${op}$${(cat_refills[cat.id] - cat.refill_val) / 100})`)
            }
        }
        return changes;
    });
    const refill_changes_total = computed(() => {
        let sum = 0;
        for(let cat of state.cats) {
            sum += cat_refills[cat.id] - cat.refill_val;
        }
        return sum / 100;
    });

    onMounted(() => reset_refills());

    const reset_refills = () => {
        for(let cat of state.cats) {
            cat_refills[cat.id] = cat.refill_val;
        }
    }
    const on_refill = async () => {
        app.is_loading = true; 
        await post_refill();
        await state.load_state();
        app.is_loading = false;
        refill_dialog_active.value = false;
    }
    const on_start_adjust = () => {
        if(active.value) {
            adjust_dialog_active.value = true;
        } else {
            active.value = true;
        }
    }
    const on_adjust_cat_refill = (cat_id, val) => {
        let refill_val = 0;
        if(cat_refills[cat_id]) { refill_val = cat_refills[cat_id]; }
        refill_val += val;
        if(refill_val < 0) { refill_val = 0; }
        cat_refills[cat_id] = refill_val;
    }
    const on_adjust_commit = async () => {
        app.is_loading = true; 
        await post_adjust_refills(cat_refills);    
        await state.load_state();
        app.is_loading = false;
        adjust_dialog_active.value = false;
        active.value = false;
    }
    const on_cancel_adjust = () => {
        reset_refills();
        active.value = false;
    }
</script>
<template>
    <button @click="refill_dialog_active=true" class="btn btn-primary-outline col-12 refill-button mb-2">Refill Now</button>
    <button @click="on_start_adjust" class="btn btn-secondary-outline col-12">Adjust</button>
    <button @click="on_cancel_adjust" class="btn btn-secondary button col-12" :class="{ hidden: !active }" >Cancel</button>
    <RefillCard 
        v-for="cat in state.cats" 
        :cat_name="cat.cat_name" 
        :refill_val="cat_refills[cat.id]" 
        :active="active"
        @on_adjust="(val) => on_adjust_cat_refill(cat.id, val)" />
    <Dialog 
        :is_active="adjust_dialog_active" 
        @on-cancel="adjust_dialog_active = false"
        @on-submit="on_adjust_commit"
        submit_button_text="Adjust">
        <p>The following adjustments have been made to the following categories:</p>
        <ul>
            <li v-for="refill of refill_changes">{{ refill }}</li>
        </ul>
        <p>This is a total difference of ${{ refill_changes_total }}</p>
        <p>Commit categories?</p>
    </Dialog>
    <Dialog
        :is_active="refill_dialog_active"
        @on-cancel="refill_dialog_active = false"
        @on-submit="on_refill"
        submit_button_text="Yes">
        <p>Refill all categories?</p>
    </Dialog>
</template>
<style scoped>
</style>