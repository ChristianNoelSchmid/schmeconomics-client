<script setup>
    const props = defineProps({
        cat: {
            cat_name: "",
            bal: 0,
        },
    });
</script>
<template>
    <div class="card d-flex flex-row justify-content-around">
        <div class="card-det">
            <h3>{{ props.cat.cat_name }}</h3>
            <span class="bal">Balance: ${{ (props.cat.bal / 100).toFixed(2) }}</span>
        </div>
        <div>
            <button @click="$emit('minus_pressed')" class="btn btn-outline-primary">-</button>
            <button @click="$emit('plus_pressed')" class="btn">+</button>
        </div>
    </div>
</template>
<style scoped>
    .card {
        width: 100%;
        border-bottom: solid 1px #fefefe;
        padding: 2em 0;
    }
    .card-det {
        width: 50%;
        text-align: left;
    }
    .cat-card:last-child {
        border-bottom: none;
    }
    .btn {
        width: 100%;
    } 
</style>