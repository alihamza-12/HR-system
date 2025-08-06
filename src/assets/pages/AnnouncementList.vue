<template>
  <div>
    <h5 class="mb-3">All Announcements</h5>
    <div v-if="announcements.length === 0" class="alert alert-info">
      No announcements yet.
    </div>
    <div class="row">
      <div
        v-for="(announcement, index) in announcements"
        :key="index"
        class="col-md-6 mb-4"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">{{ announcement.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ announcement.date }}</h6>
            <p class="card-text">{{ announcement.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    announcements: {
      type: Array,
      required: true
    }
  }
};
</script>
