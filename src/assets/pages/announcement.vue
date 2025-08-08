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
import { mapState, mapActions } from 'vuex';

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
    };
  },
  computed: {
    ...mapState('announcement', ['announcements', 'loading', 'error']),
  },
  methods: {
    ...mapActions('announcement', ['fetchAnnouncements', 'createAnnouncement']),
    
    async loadAnnouncements() {
      await this.fetchAnnouncements();
    },
    
    async addAnnouncement(newAnnouncement) {
      try {
        await this.createAnnouncement(newAnnouncement);
        this.showCreate = false;
      } catch (error) {
        console.error('Failed to create announcement:', error);
      }
    },
  },
  async mounted() {
    await this.loadAnnouncements();
  },
};
</script>
