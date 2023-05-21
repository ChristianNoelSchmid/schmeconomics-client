<script setup>
    const props = defineProps({
        cat: {
            cat_name: "",
            bal: 0,
        },
    });
</script>
<template>
    <div class="card row align-items-center">
        <div class="col-6">
            <h3>{{ props.cat.cat_name }}</h3>
            <span class="bal">Balance: ${{ props.cat.bal / 100 }}</span>
        </div>
        <div class="col-6 d-flex flex-column">
            <button @click="$emit('minus_pressed')" class="btn btn-outline-primary">-</button>
            <button @click="$emit('plus_pressed')" class="btn">+</button>
        </div>
    </div>
</template>
<style scoped>
    .card {
        border-bottom: solid 1px #fefefe;
        padding: 2em 0;
    }
    .cat-card:last-child {
        border-bottom: none;
    }
    .btn {
        width: 100%;
    } 
</style>