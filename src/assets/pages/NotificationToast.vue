<template>
  <div class="toast show position-fixed" style="top: 20px; right: 20px; min-width: 200px; z-index: 9999;">
    <div class="toast-header bg-success text-white">
      <strong class="mr-auto">Success</strong>
    </div>
    <div class="toast-body">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationToast',
  props: {
    message: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.toast {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
