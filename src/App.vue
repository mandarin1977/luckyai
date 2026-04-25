<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import StarryBackground from './components/StarryBackground.vue'
</script>

<template>
  <StarryBackground />
  <div class="app-wrapper">
    <AppHeader />
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 80px; /* Header height offset */
}
</style>
