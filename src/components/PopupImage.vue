<script setup>
    import { defineProps, onMounted, ref } from 'vue';

    const props = defineProps(['img_paths'])

    let next_popup = Math.random() * 10000;
    const img_idx = ref(0);
    const displaying = ref(false);
    const pivot = ref(10);

    function applyNextImage() {
        setTimeout(() => {
            next_popup = Math.random() * 5000 + 5000;

            displaying.value = true;
            setTimeout(() => displaying.value = false, next_popup - 1000);

            img_idx.value += 1;
            if(img_idx.value > props.img_paths.length) img_idx.value = 0;

            applyNextImage();
        }, next_popup)
    }

    onMounted(() => {
        applyNextImage();
        setInterval(() => pivot.value = (pivot.value < 0 ? 10 : -10), 2000);
    });
</script>
<template>
    <img 
        :src="props.img_paths[img_idx]"
        :style="{ 
            scale: displaying ? '100%' : '0%',
            transform: `rotateZ(${pivot}deg)` 
        }"
        class="popup"
    >
</template>
<style scoped>
    .popup {
        width: 50%;
        height: auto;
        position: absolute;
        transition: transform 1s linear, scale 1s linear;
        z-index: 6;
        overflow: hidden;
        left: 20%;
    }
</style>