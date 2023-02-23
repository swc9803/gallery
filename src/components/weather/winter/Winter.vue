<template>
  <WinterText class="winter" />
  <Snow />
  <Snowman class="winter" />
</template>

<script setup>
import WinterText from "@/components/weather/winter/WinterText";
import Snow from "@/components/weather/winter/Snow";
import Snowman from "@/components/weather/winter/Snowman";
</script>

<style scoped>
.winter {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
