<template>
  <div class="page-container">
    <nav-bar />
    <div class="content-wrapper">
      <side-bar />
      <div class="main-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/navbar.vue';
import sideBar from '@/components/sideBar.vue';

export default {
  name: 'AppLayout',
  components: {
    navBar,
    sideBar
  }
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex: 1;
  align-items: flex-start;
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
}
</style>
