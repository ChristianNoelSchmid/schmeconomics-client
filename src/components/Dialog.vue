<script setup>
    import { defineProps } from "vue";
    const props = defineProps({
        submit_button_text: "",
        is_active: false
    });

</script>
<template>
    <div class="background" :class="{ hidden: !props.is_active }">
        <div class="dialog p-4 d-flex flex-column justify-content-stretch">
            <div class="content">
                <slot class="content"></slot>
            </div>
            <div class="button-div d-flex justify-content-stretch">
                <button @click="$emit('on-submit')" class="btn btn-primary">{{ submit_button_text }}</button>
                <button @click="$emit('on-cancel')" class="btn btn-secondary-outline">Cancel</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .background {
        background-color: #fffa;
        z-index: 11;
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 100vh;
    }
    .dialog {
        box-shadow: 0px 0px 7px 0px #0003; 
        background-color: #fff;
        top: 12.5%;
        left: 5%;
        border: solid 1px #eee;
        z-index: 3;
        position: fixed;
        width: 90%;
        height: 75vh;
    }
    
    .content {
        height: 100%;
    }
    .button-div {
        height: 72px;
    }
    .button-div > * {
        width: 100%;
    }
</style>
