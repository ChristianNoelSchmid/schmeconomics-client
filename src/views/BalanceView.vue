<script setup>
    import { computed, onMounted, ref, reactive } from "vue";
    import { use_state_store } from "../stores/state";
    import { use_auth_store } from "../stores/auth";

    import { post_transaction } from "../fetches";

    import Dialog from "../components/Dialog.vue";
    import CategoryCard from "../components/CategoryCard.vue";

    const state = use_state_store();
    const auth = use_auth_store();
    const accept_currency_vals = "0123456789";

    const transact_active = ref(false);
    const transact_state = reactive({
        cat: undefined,
        is_add: true,
        am: "",
        notes: ""
    });
    const transact_fmt = computed(() => ({
        cat_name: transact_state.cat?.cat_name,
        action: transact_state.is_add ? "Add to" : "Subtract from"
    }));

    onMounted(async () => {
        if(auth.logged_in) { 
            app.is_loading = true; 
            await state.load_state();
            app.is_loading = false;
        }
    });

    const on_transact = (cat, is_add) => {
        transact_state.cat = cat;
        transact_state.is_add = is_add;
        transact_state.am = "0.00";
        transact_state.notes = "";

        transact_active.value = true;
    }
    const on_submit_transact = async () => {
        if(transact_state.am.length > 0) {

            let am = transact_state.am;
            if(!transact_state.is_add) am = "-" + am;

            const res = await post_transaction(
                transact_state.cat.id, am, transact_state.notes
            );

            if(res !== null) {
                transact_active.value = false;
                await state.load_state();
            }
        }
    }
    const format_currency_input = (event) => {
        let newString = "";
        for(let char of event.target.value) {
            if(accept_currency_vals.includes(char)) {
                newString += char;
            }
        }
        while(newString.startsWith("0")) {
            newString = newString.substring(1);
        }

        while(newString.length < 3) newString = "0" + newString;

        newString 
            = newString.substring(0, newString.length - 2) 
            + "." 
            + newString.substring(newString.length - 2);

        event.target.value = newString;
    }
</script>
<template>
    <CategoryCard 
        v-for="cat in state.cats" 
        :cat="cat"
        v-on:plus_pressed="on_transact(cat, true)" 
        v-on:minus_pressed="on_transact(cat, false)" />
    <Dialog 
        :is_active="transact_active"
        @on-cancel="transact_active = false"
        @on-submit="on_submit_transact"
        submit_button_text="Submit" >
        <h4 class="mb-4">{{ transact_fmt.action }} {{ transact_fmt.cat_name }}</h4>
        <form>
            <div class="form-row mb-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            $
                        </div>
                    </div>
                    <input 
                        v-model="transact_state.am" 
                        inputmode="numeric"
                        @input="format_currency_input" 
                        class="form-control" 
                        type="text" />
                </div>
            </div>
            <div class="form-row">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            Notes
                        </div>
                    </div>
                    <input 
                        v-model="transact_state.notes" 
                        class="form-control" 
                        name="notes" 
                        type="text" />
                </div>
            </div>
        </form>
    </Dialog>
</template>
<style scoped>
</style>