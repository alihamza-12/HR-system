<template>
  <div class="page-container">
    <nav-bar />
    <div class="content-wrapper">
      <div class="sidebar-fixed">
        <side-bar />
      </div>
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

/* NEW: Make sidebar fixed width and stick */
.sidebar-fixed {
  position: sticky;
  top: 0;
  height: 100vh;
  min-width: 250px;
  max-width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  z-index: 10;
  overflow-y: auto;
}

/* Adjust main content width accordingly */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-x: hidden;
}
</style>
