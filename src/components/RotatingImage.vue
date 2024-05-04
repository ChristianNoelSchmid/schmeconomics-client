<script setup>
    import { defineProps, onMounted, ref } from 'vue';

    const props = defineProps({
        dir: Number,
        img_path: String,
        speed: Number,
        width: String,
        height: String,
        top: String,
        left: String,
        z_index: Number
    });

    const rotz = ref(0);

    onMounted(() => {
        setInterval(() => { rotz.value += props.speed * props.dir }, 1000);
    });
</script>
<template>
    <div class="outer">
        <img 
            :src="props.img_path"
            :style="{ 
                width: props.width ?? '128px', 
                height: props.height ?? '128px',
                top: props.top ?? 0,
                left: props.left ?? 0,
                transform: `rotateZ(${rotz}deg)`,
                zIndex: z_index
            }"
            class="rotate"
        >
    </div>
</template>
<style scoped>
    .rotate {
        position: absolute;
        transition: transform 1s linear;
        overflow: hidden;
    }
</style>