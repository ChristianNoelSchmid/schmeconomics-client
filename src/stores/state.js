import { defineStore } from "pinia";
import { get_categories, get_transactions, get_users } from "../fetches";

export const use_state_store = defineStore("state", {
    state: () => ({
        cats: [],
        transacts: [],
        transact_complete: false,
        users: [],

        _transact_cat_id: undefined,
        _transact_group: undefined
    }),
    actions: {
        async load_state() {
            const cats = await get_categories();
            const users = await get_users();
            if (cats !== null) { this.cats = cats; }
            if (users !== null) { this.users = users; }
        },
        async load_transacts(cat_id, initial) {
            if(this._transact_cat_id !== cat_id || initial) {
                this._transact_cat_id = cat_id;
                this._transact_group = 0;
                this.transacts = [];
                this.transact_complete = false;
            }
            const data = await get_transactions(this._transact_cat_id, this._transact_group);
            this._transact_group += 1;
            if(data !== null) { 
                this.transacts.push(...data.transacts);
                this.transact_complete = data.get_complete;
            }
        }
    }
});