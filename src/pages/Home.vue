<template>
  <div id="home">
    <!-- --100vh  -->
    <Main />
    <div class="card-flex">
      <Card />
      <Map />
    </div>
  </div>
</template>

<script setup>
import Main from "@/components/Main.vue";
import Card from "@/components/Card.vue";
import Map from "@/components/Map.vue";
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 60px;
  @media screen and (max-width: 1024px) {
    & {
      padding: 0 48px;
    }
  }
  @media screen and (max-width: 768px) {
    & {
      padding: 0 36px;
    }
  }
  @media screen and (max-width: 480px) {
    & {
      padding: 0 24px;
    }
  }
  .card-flex {
    display: flex;
    justify-content: space-between;
    gap: 96px;
    @media screen and (max-width: 1440px) {
      & {
        gap: 64px;
      }
    }
    @media screen and (max-width: 1024px) {
      & {
        gap: 32px;
      }
    }
    @media screen and (max-width: 768px) {
      & {
        gap: 24px;
      }
    }
    @media screen and (max-width: 480px) {
      & {
        gap: 16px;
      }
    }
  }
}
</style>
