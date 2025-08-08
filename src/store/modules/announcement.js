// src/store/modules/announcement.js
import announcementService from '@/services/announcementService';

const state = {
  announcements: [],
  currentAnnouncement: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  }
};

const getters = {
  allAnnouncements: (state) => state.announcements,
  currentAnnouncement: (state) => state.currentAnnouncement,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
  getPagination: (state) => state.pagination
};

const actions = {
  // Fetch all announcements
  async fetchAnnouncements({ commit }, params = {}) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await announcementService.getAllAnnouncements(params);
      commit('SET_ANNOUNCEMENTS', response.data.data || response.data);
      
      // Handle pagination if provided
      if (response.data.pagination) {
        commit('SET_PAGINATION', response.data.pagination);
      }
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch announcements');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Fetch single announcement
  async fetchAnnouncement({ commit }, id) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await announcementService.getAnnouncementById(id);
      commit('SET_CURRENT_ANNOUNCEMENT', response.data);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch announcement');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Create new announcement
  async createAnnouncement({ commit }, announcementData) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await announcementService.createAnnouncement(announcementData);
      commit('ADD_ANNOUNCEMENT', response.data);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to create announcement');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Update announcement
  async updateAnnouncement({ commit }, { id, data }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await announcementService.updateAnnouncement(id, data);
      commit('UPDATE_ANNOUNCEMENT', response.data);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to update announcement');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Delete announcement
  async deleteAnnouncement({ commit }, id) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      await announcementService.deleteAnnouncement(id);
      commit('REMOVE_ANNOUNCEMENT', id);
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to delete announcement');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Search announcements
  async searchAnnouncements({ commit }, query) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await announcementService.searchAnnouncements(query);
      commit('SET_ANNOUNCEMENTS', response.data.data || response.data);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to search announcements');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  }
};

const mutations = {
  SET_ANNOUNCEMENTS(state, announcements) {
    state.announcements = announcements;
  },
  
  SET_CURRENT_ANNOUNCEMENT(state, announcement) {
    state.currentAnnouncement = announcement;
  },
  
  ADD_ANNOUNCEMENT(state, announcement) {
    state.announcements.unshift(announcement);
  },
  
  UPDATE_ANNOUNCEMENT(state, updatedAnnouncement) {
    const index = state.announcements.findIndex(
      announcement => announcement.id === updatedAnnouncement.id
    );
    if (index !== -1) {
      state.announcements.splice(index, 1, updatedAnnouncement);
    }
  },
  
  REMOVE_ANNOUNCEMENT(state, id) {
    state.announcements = state.announcements.filter(
      announcement => announcement.id !== id
    );
  },
  
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  
  SET_ERROR(state, error) {
    state.error = error;
  },
  
  SET_PAGINATION(state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  },
  
  CLEAR_ERROR(state) {
    state.error = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
