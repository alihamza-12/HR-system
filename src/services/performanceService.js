import api from '@/services/api';

export default {
  async getPerformanceReviews() {
    try {
      const response = await api.get('/list-performance-review');
      return {
        data: response.data.data || response.data || [],
        message: response.data.message || 'Reviews fetched successfully'
      };
    } catch (error) {
      console.error('[PerformanceReviewService] Error fetching reviews:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch performance reviews');
    }
  },

  async exportReviews() {
    try {
      const response = await api.get('/export-performance-reviews', {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('[PerformanceReviewService] Error exporting reviews:', error);
      throw new Error(error.response?.data?.message || 'Failed to export reviews');
    }
  },

  async deletePerformanceReview(id) {
    try {
      const response = await api.post(`/delete-performance-review/${id}`);
      return {
        data: response.data.data || response.data,
        message: response.data.message || 'Review deleted successfully'
      };
    } catch (error) {
      console.error(`[PerformanceReviewService] Error deleting review ${id}:`, error);
      throw new Error(error.response?.data?.message || 'Failed to delete performance review');
    }
  },

  async createPerformanceReview(reviewData) {
    try {
      const response = await api.post('/create-performance-review', reviewData);
      return {
        data: response.data.data || response.data,
        message: response.data.message || 'Review created successfully'
      };
    } catch (error) {
      console.error('[PerformanceReviewService] Error creating review:', error);
      throw new Error(error.response?.data?.message || 'Failed to create performance review');
    }
  },

  async updatePerformanceReview(reviewData) {
    try {
      // Map frontend field names to backend expected field names
      const payload = {
        user_id: reviewData['User ID'],
        user_rating: reviewData['User Rating'],
        user_feedback: reviewData['User Feedback'],
        review_date: reviewData['Review Date']
      };
      
      const response = await api.put(`/update-performance-review/${reviewData['Review ID']}`, payload);
      return {
        data: response.data.data || response.data,
        message: response.data.message || 'Review updated successfully'
      };
    } catch (error) {
      console.error('[PerformanceReviewService] Error updating review:', error);
      throw new Error(error.response?.data?.message || 'Failed to update performance review');
    }
  }
};
