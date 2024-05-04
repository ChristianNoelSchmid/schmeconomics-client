<script setup>
    import { defineProps, onMounted, ref } from 'vue';

    const props = defineProps({
        img_path: String
    });


    let next_popup = Math.random() * 10000;
    const x = ref(0);
    const y = ref(0);
    const displaying = ref(false);

    function nextLocation() {
        const val = Math.random() * 20 - 10;
        if(val > 0) return val + 20;
        else return val - 20;
    }

    function applyNextInterval() {
        setTimeout(() => {
            x.value = nextLocation();
            y.value = nextLocation();
            next_popup = Math.random() * 10000 + 5000;

            displaying.value = true;
            setTimeout(() => displaying.value = false, 5000);

            applyNextInterval();
        }, next_popup)
    }

    onMounted(() => applyNextInterval());
</script>
<template>
    <img 
        :src="props.img_path"
        :style="{ 
            opacity: displaying ? '100%' : '0%',
            top: 50 + x + '%',
            left: 30 + y + '%',
        }"
        class="popup"
    >
</template>
<style scoped>
    .popup {
        width: 50%;
        height: auto;
        position: absolute;
        transition: opacity 0.5s;
        z-index: 6;
        overflow: hidden;
    }
</style>