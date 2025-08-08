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
      <button type="submit" class="btn btn-success" :disabled="loading">
        {{ loading ? 'Posting...' : 'Post' }}
      </button>
    </form>

    <div v-if="showToast" class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index:9999;">
      <div class="toast show bg-success text-white">
        <div class="toast-body">Announcement posted successfully!</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      title: '',
      message: '',
      showToast: false,
      loading: false
    };
  },
  methods: {
    ...mapActions('announcement', ['createAnnouncement', 'fetchAnnouncements']),
    
    async submitAnnouncement() {
      this.loading = true;
      
      const newAnnouncement = {
        title: this.title,
        message: this.message,
        date: new Date().toISOString().slice(0, 10)
      };

      try {
        await this.createAnnouncement(newAnnouncement);
        
        // Reset form
        this.title = '';
        this.message = '';
        this.showToast = true;
        
        // Immediately refresh the data to get updated announcements
        await this.fetchAnnouncements();
        
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
        
      } catch (error) {
        console.error('Error creating announcement:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
