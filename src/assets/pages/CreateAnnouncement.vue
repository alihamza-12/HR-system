<template>
  <div class="card p-4 shadow-sm mb-4">
    <h4 class="mb-3">Create New Announcement</h4>
    <form @submit.prevent="submitAnnouncement">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Message</label>
        <textarea v-model="message" class="form-control" rows="3" required></textarea>
      </div>
      <button type="submit" class="btn btn-success">Post</button>
    </form>

    <div v-if="showToast" class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index:9999;">
      <div class="toast show bg-success text-white">
        <div class="toast-body">Announcement posted successfully!</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      message: '',
      showToast: false
    };
  },
  methods: {
    submitAnnouncement() {
      const newAnnouncement = {
        title: this.title,
        message: this.message,
        date: new Date().toISOString().slice(0, 10)
      };

      this.$emit('announcement-posted', newAnnouncement);

      this.title = '';
      this.message = '';
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  }
};
</script>
