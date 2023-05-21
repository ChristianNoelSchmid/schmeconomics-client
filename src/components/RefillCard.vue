<script setup>
    const props = defineProps({
        cat_name: "",
        refill_val: 0,
        active: false
    });
</script>
<template>
    <div class="card d-flex flex-row justify-content-around align-items-center">
        <div>
            <h3>{{ props.cat_name }}</h3>
            <span>Refill ${{ props.refill_val / 100 }}</span>
        </div>
        <div class="d-flex flex-column align-items-center" :class="{ invisible: !props.active }">
            <button @click="$emit('on_adjust',  1000)" class="btn adjust-refill-button">+$10</button>
            <button @click="$emit('on_adjust', -1000)" class="btn adjust-refill-button">-$10</button>
        </div>
    </div>
</template>
<style scoped>
    .card {
        border-bottom: solid 1px #fefefe;
        padding: 2em 0;
    }
    .card:last-child {
        border-bottom: none;
    }
</style>