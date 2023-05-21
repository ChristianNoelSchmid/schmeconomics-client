import { use_auth_store } from "./stores/auth";

async function get_route(intermediate_route) {
    const auth = use_auth_store();
    if(!auth.logged_in) { return null; }

    const url = `https://schmeconomics.christianssoftware.com:5010/${intermediate_route}?` +
        `user-id=${auth.user_id}&` +
        `api-key=${auth.api_key}`;

    const res = await fetch(url);
    if(res.status >= 400) { return null }

    return res;
}
async function post_route(intermediate_route, body) {
    const auth = use_auth_store();
    if(!auth.logged_in) { return null; }

    const url = `https://schmeconomics.christianssoftware.com:5010/${intermediate_route}?` +
        `user-id=${auth.user_id}&` +
        `api-key=${auth.api_key}`;

    let res;
    if(body !== undefined) {
        res = await fetch(url, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body
        });
    } else {
        res = await fetch(url, { method: "POST" });
    }

    if(res.status >= 400) { return null; }

    return res;
}

/**
 * Retrieves all categories currently in 
 * the database
 */
async function get_categories() {
    const res = await get_route("categories");
    return await res?.json();
}

/**
 * 
 * @param {*} value 
 * @param {*} notes 
 * @param {*} isAdd 
 * @param {*} cat 
 */
async function post_transaction(cat_id, am, notes) {
    return await post_route("transaction", JSON.stringify({ cat_id, am, notes }));
}

/**
 * Returns the next group of transactions covered
 * in the group index, with the supplied category,
 * (or all categories if cat_id is undefined).
 * @param {number | undefined} cat_id 
 * @param {number} group_index 
 * @returns 
 */
async function get_transactions(cat_id, group_index) {
    cat_id ??= -1;
    const res = await get_route(`transactions/${cat_id}/${group_index}`);
    return await res?.json();
}
async function get_users() {
    const res = await get_route("users");
    return await res?.json();
}
async function post_refill() {
    return await post_route("refill");
}
async function post_adjust_refills(refill_vals) {
    return await post_route("adjust-refills", JSON.stringify(refill_vals));
}

export {
    get_users,
    get_categories,
    get_transactions,
    post_transaction,
    post_refill,
    post_adjust_refills
}