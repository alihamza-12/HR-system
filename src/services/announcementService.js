// src/services/announcementService.js
import API from "./api";

const announcementService = {
  // Get all announcements
  async getAllAnnouncements(params = {}) {
    return API.get("/announcements", { params });
  },

  // Get single announcement by ID
  async getAnnouncementById(id) {
    return API.get(`/announcements/${id}`);
  },

  // Create new announcement
  async createAnnouncement(announcementData) {
    return API.post("/announcements", announcementData);
  },

  // Update existing announcement
  async updateAnnouncement(id, announcementData) {
    return API.put(`/announcements/${id}`, announcementData);
  },

  // Delete announcement
  async deleteAnnouncement(id) {
    return API.delete(`/announcements/${id}`);
  },

  // Get announcements by author
  async getAnnouncementsByAuthor(authorId) {
    return API.get(`/announcements/author/${authorId}`);
  },

  // Search announcements
  async searchAnnouncements(query) {
    return API.get("/announcements/search", { params: { q: query } });
  },

  // Get recent announcements
  async getRecentAnnouncements(limit = 10) {
    return API.get("/announcements/recent", { params: { limit } });
  }
};

export default announcementService;
