<template>
  <Layout>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Announcements</h2>

      <div class="text-end mb-3">
        <button class="btn btn-primary" @click="showCreate = !showCreate">
          {{ showCreate ? 'Hide Form' : 'Create Announcement' }}
        </button>
      </div>

      <CreateAnnouncement
        v-if="showCreate"
        @announcement-posted="addAnnouncement"
      />
      <AnnouncementList :announcements="announcements" />
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'; 
import CreateAnnouncement from '@/assets/pages/CreateAnnouncement.vue'; 
import AnnouncementList from '@/assets/pages/AnnouncementList.vue';

export default {
  name: "AnnouncementHere",
  components: {
    Layout,
    CreateAnnouncement,
    AnnouncementList,
  },
  data() {
    return {
      showCreate: false,
      announcements: [
        {
          title: "Welcome",
          message: "We welcome all new employees!",
          date: "2025-08-01",
        },
        {
          title: "Holiday Notice",
          message: "Office will be closed on Independence Day.",
          date: "2025-08-14",
        },
      ],
    };
  },
  methods: {
    addAnnouncement(newAnnouncement) {
      this.announcements.unshift(newAnnouncement);
      this.showCreate = false;
    },
  },
};
</script>
