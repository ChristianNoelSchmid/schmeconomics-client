<script setup>
import RotatingImage from "../components/RotatingImage.vue";
import RandomPopupText from "../components/RandomPopupText.vue";
import PopupImage from "../components/PopupImage.vue";

import galactic_bloom from "@/assets/GalacticBloom.mp3";

import backdrop_1 from '@/assets/alyssa_bday/backdrop_pink.png';
import backdrop_2 from '@/assets/alyssa_bday/backdrop_orange.png';
import flower_1 from '@/assets/alyssa_bday/flower_purple.png';
import flower_2 from '@/assets/alyssa_bday/flower_blue.png';
import circle_1 from '@/assets/alyssa_bday/circle_pink.png';
import circle_2 from '@/assets/alyssa_bday/circle_blue.png';

import text_1 from '@/assets/alyssa_bday/msg_1.png';
import text_2 from '@/assets/alyssa_bday/msg_2.png';
import text_3 from '@/assets/alyssa_bday/msg_3.png';
import text_4 from '@/assets/alyssa_bday/msg_4.png';

import hat_1 from '@/assets/alyssa_bday/alyssa_hat.png';
import hat_2 from '@/assets/alyssa_bday/chris_oliver_hat.png';
</script>

<template>
    <audio loop autoplay>
      <source :src="galactic_bloom" type="audio/mp3">
      Your browser does not support the audio element.
    </audio> 
    <div class="relative-wrapper">
        <RotatingImage :dir="1" :img_path="backdrop_1" width="80%" height="auto" :speed="5" top="20%" left="10%" :z_index="0"></RotatingImage> 
        <RotatingImage :dir="-1" :img_path="backdrop_2" width="80%" height="auto" :speed="5" top="20%" left="10%" :z_index="1"></RotatingImage> 
        <RotatingImage :dir="1" :img_path="flower_1" width="50%" height="auto" :speed="20" top="15%" left="10%" :z_index="2"></RotatingImage> 
        <RotatingImage :dir="1" :img_path="flower_2" width="50%" height="auto" :speed="20" top="45%" left="25%" :z_index="3"></RotatingImage> 
        <RotatingImage :dir="-1" :img_path="flower_2" width="50%" height="auto" :speed="20" top="20%" left="50%" :z_index="3"></RotatingImage> 
        <RotatingImage :dir="-1" :img_path="circle_1" width="90%" height="auto" :speed="20" top="17.5%" left="5%" :z_index="1"></RotatingImage> 
        <RotatingImage :dir="1" :img_path="circle_2" width="100%" height="auto" :speed="15" top="15%" :z_index="1"></RotatingImage> 

        <RandomPopupText :img_path="text_1"></RandomPopupText> 
        <RandomPopupText :img_path="text_2"></RandomPopupText> 
        <RandomPopupText :img_path="text_3"></RandomPopupText> 
        <RandomPopupText :img_path="text_4"></RandomPopupText> 

        <PopupImage :img_paths="[hat_2, hat_1]"></PopupImage>
    </div>
</template>

<style scoped>
    .relative-wrapper { 
        width: 100%;
        height: 100vh;
        position: relative;
        overflow: hidden;
    }
</style>