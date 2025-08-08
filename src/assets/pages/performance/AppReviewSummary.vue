<template>
  <Layout>
    <div class="container-fluid p-4 animate__animated animate__fadeIn">
      <!-- Loading indicator -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading performance reviews...</p>
      </div>

      <!-- Error message -->
      <div v-else-if="error" class="alert alert-danger">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {{ error }}
        <button @click="fetchReviews" class="btn btn-sm btn-outline-danger ms-3">
          Retry
        </button>
      </div>

      <!-- Main content -->
      <div v-else class="card-gradient p-4 mx-auto" style="max-width: 1200px;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 text-primary mb-0">
            <i class="bi bi-clipboard2-data me-2" aria-hidden="true"></i>
            Performance Review Summary
          </h1>
          <div class="d-flex gap-2">
            <button 
              @click="exportToExcel" 
              class="btn btn-outline-secondary"
              aria-label="Export to Excel"
              :disabled="reviews.length === 0"
            >
              <i class="bi bi-file-earmark-excel me-2" aria-hidden="true"></i> Export
            </button>
            <button 
              @click="fetchReviews" 
              class="btn btn-outline-primary"
              aria-label="Refresh data"
              :disabled="isRefreshing"
            >
              <i class="bi bi-arrow-clockwise me-2" aria-hidden="true"></i> 
              {{ isRefreshing ? 'Refreshing...' : 'Refresh' }}
            </button>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="stat-card stat-card-1">
              <div class="d-flex justify-content-between">
                <div>
                  <h6 class="text-muted">Total Reviews</h6>
                  <h4 class="mb-0">{{ stats.totalReviews }}</h4>
                </div>
                <div class="icon-gradient icon-gradient-1">
                  <i class="bi bi-clipboard2-check" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="stat-card stat-card-2">
              <div class="d-flex justify-content-between">
                <div>
                  <h6 class="text-muted">Avg. Rating</h6>
                  <h4 class="mb-0">{{ stats.avgRating.toFixed(1) }}★</h4>
                </div>
                <div class="icon-gradient icon-gradient-2">
                  <i class="bi bi-star-fill" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="stat-card stat-card-3">
              <div class="d-flex justify-content-between">
                <div>
                  <h6 class="text-muted">Top Performers</h6>
                  <h4 class="mb-0">{{ stats.topPerformers }}</h4>
                </div>
                <div class="icon-gradient icon-gradient-3">
                  <i class="bi bi-award" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews Table -->
        <div class="table-responsive">
          <table class="table table-hover table-gradient" aria-label="Performance reviews summary">
            <thead>
              <tr>
                <th scope="col">Review ID</th>
                <th scope="col">User ID</th>
                <th scope="col">Rating</th>
                <th scope="col">Feedback</th>
                <th scope="col">Review Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="review in reviews" :key="review['Review ID']">
                <td>{{ review['Review ID'] }}</td>
                <td>{{ review['User ID'] }}</td>
                <td>
                  <div class="rating-display">
                    <span 
                      v-for="n in 5" 
                      :key="n" 
                      class="me-1"
                      :class="n <= review['User Rating'] ? 'text-warning' : 'text-muted'"
                      :aria-label="`${n <= review['User Rating'] ? 'Filled' : 'Empty'} star`"
                    >
                      <i class="bi bi-star-fill"></i>
                    </span>
                    <span class="badge ms-2" :class="ratingClass(review['User Rating'])">
                      {{ ratingText(review['User Rating']) }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="truncate-text" :title="review['User Feedback']">
                    {{ review['User Feedback'] || 'N/A' }}
                  </div>
                </td>
                <td>{{ formatDate(review['Review Date']) }}</td>
                <td>
                  <button 
                    @click="viewDetails(review)" 
                    class="btn btn-sm btn-outline-primary"
                    aria-label="View review details"
                  >
                    <i class="bi bi-eye me-1" aria-hidden="true"></i> View
                  </button>
                  <button 
                    @click="editReview(review)"
                    class="btn btn-sm btn-outline-info ms-2"
                    aria-label="Edit review"
                  >
                    <i class="bi bi-pencil me-1" aria-hidden="true"></i> Edit
                  </button>
                  <button 
                    @click="confirmDelete(review['Review ID'])"
                    class="btn btn-sm btn-outline-danger ms-2"
                    aria-label="Delete review"
                  >
                    <i class="bi bi-trash" aria-hidden="true"></i> Delete
                  </button>
                </td>
              </tr>
              <tr v-if="reviews.length === 0">
                <td colspan="6" class="text-center py-4 text-muted">
                  No reviews found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Review Details Modal -->
        <div 
          class="modal fade" 
          id="reviewModal" 
          tabindex="-1" 
          aria-labelledby="reviewModalLabel" 
          aria-hidden="true"
          ref="reviewModal"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-gradient-primary text-white">
                <h2 id="reviewModalLabel" class="modal-title h5">Performance Review Details</h2>
                <button 
                  type="button" 
                  class="btn-close btn-close-white" 
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" v-if="selectedReview">
                <div class="row mb-4">
                  <div class="col-md-6">
                    <h3 class="h6 text-muted">Review Information</h3>
                    <div>
                      <h4 class="mb-1">Review ID: {{ selectedReview['Review ID'] }}</h4>
                      <p class="text-muted mb-0">User ID: {{ selectedReview['User ID'] }}</p>
                      <p class="text-muted mb-0">Date: {{ formatDate(selectedReview['Review Date']) }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <h3 class="h6 text-muted">Performance Rating</h3>
                    <div class="rating-display mb-2">
                      <span 
                        v-for="n in 5" 
                        :key="n" 
                        class="me-1"
                        :class="n <= selectedReview['User Rating'] ? 'text-warning' : 'text-muted'"
                        :aria-label="`${n <= selectedReview['User Rating'] ? 'Filled' : 'Empty'} star`"
                      >
                        <i class="bi bi-star-fill fs-3"></i>
                      </span>
                      <span class="badge fs-6 ms-2" :class="ratingClass(selectedReview['User Rating'])">
                        {{ ratingText(selectedReview['User Rating']) }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header bg-light">
                    <h3 class="h6 mb-0">Feedback Details</h3>
                  </div>
                  <div class="card-body">
                    <p>{{ selectedReview['User Feedback'] || 'No feedback provided' }}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button 
                  type="button" 
                  class="btn btn-secondary" 
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Review Modal -->
        <div 
          class="modal fade" 
          id="editModal" 
          tabindex="-1" 
          aria-labelledby="editModalLabel" 
          aria-hidden="true"
          ref="editModal"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-gradient-info text-white">
                <h2 id="editModalLabel" class="modal-title h5">Edit Performance Review</h2>
                <button 
                  type="button" 
                  class="btn-close btn-close-white" 
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" v-if="editingReview">
                <form @submit.prevent="saveReview">
                  <div class="row mb-4">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Review ID</label>
                        <input type="text" class="form-control" v-model="editingReview['Review ID']" readonly>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">User ID</label>
                        <input type="text" class="form-control" v-model="editingReview['User ID']" readonly>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Rating</label>
                        <select class="form-select" v-model="editingReview['User Rating']">
                          <option value="1">1 - Needs Improvement</option>
                          <option value="2">2 - Below Expectations</option>
                          <option value="3">3 - Meets Expectations</option>
                          <option value="4">4 - Exceeds Expectations</option>
                          <option value="5">5 - Outstanding</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Feedback</label>
                    <textarea 
                      class="form-control" 
                      rows="4" 
                      v-model="editingReview['User Feedback']"
                      placeholder="Enter feedback..."
                    ></textarea>
                  </div>

                  <div class="modal-footer">
                    <button 
                      type="button" 
                      class="btn btn-secondary" 
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      class="btn btn-primary"
                      :disabled="isSaving"
                    >
                      <span v-if="isSaving" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      {{ isSaving ? 'Saving...' : 'Save Changes' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true" ref="deleteModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-danger text-white">
                <h5 class="modal-title">Confirm Deletion</h5>
                <button 
                  type="button" 
                  class="btn-close btn-close-white" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete this performance review? This action cannot be undone.</p>
              </div>
              <div class="modal-footer">
                <button 
                  type="button" 
                  class="btn btn-secondary" 
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  class="btn btn-danger"
                  @click="deleteReview"
                  :disabled="isDeleting"
                >
                  <span v-if="isDeleting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {{ isDeleting ? 'Deleting...' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Toast Notification -->
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
          <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
            <div class="toast-header" :class="{'bg-success text-white': toastType === 'success', 'bg-danger text-white': toastType === 'error'}">
              <strong class="me-auto">{{ toastTitle }}</strong>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              {{ toastMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { Modal, Toast } from 'bootstrap';
import Layout from '@/components/Layout.vue';
import performanceReviewService from '@/services/performanceService';

export default {
  name: "AppReviewSummary",
  components: { Layout },
  data() {
    return {
      reviews: [],
      currentPage: 1,
      perPage: 10,
      selectedReview: null,
      editingReview: null,
      reviewModal: null,
      editModal: null,
      deleteModal: null,
      toast: null,
      toastMessage: '',
      toastTitle: '',
      toastType: 'success',
      isLoading: true,
      isRefreshing: false,
      isDeleting: false,
      isSaving: false,
      error: null,
      reviewToDelete: null
    };
  },
  computed: {
    stats() {
      const stats = {
        totalReviews: this.reviews.length,
        avgRating: 0,
        topPerformers: 0
      };
      
      if (this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((sum, r) => sum + r['User Rating'], 0);
        stats.avgRating = totalRating / this.reviews.length;
        stats.topPerformers = this.reviews.filter(r => r['User Rating'] >= 4).length;
      }
      
      return stats;
    }
  },
  methods: {
    async fetchReviews() {
      this.isLoading = true;
      this.isRefreshing = true;
      this.error = null;
      
      try {
        const response = await performanceReviewService.getPerformanceReviews();
        this.reviews = response.data || [];
      } catch (error) {
        console.error('Error fetching reviews:', error);
        this.error = error.message || 'Failed to load performance reviews';
        this.showNotification(this.error, 'error');
      } finally {
        this.isLoading = false;
        this.isRefreshing = false;
      }
    },

    ratingText(rating) {
      const texts = [
        "Needs Improvement",
        "Below Expectations",
        "Meets Expectations",
        "Exceeds Expectations",
        "Outstanding"
      ];
      return texts[rating - 1] || "Not rated";
    },

    ratingClass(rating) {
      const classes = [
        "bg-danger",
        "bg-warning",
        "bg-primary",
        "bg-info",
        "bg-success"
      ];
      return classes[rating - 1] || "bg-secondary";
    },

    formatDate(dateStr) {
      if (!dateStr) return "N/A";
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
    },

    viewDetails(review) {
      this.selectedReview = review;
      this.$nextTick(() => {
        this.reviewModal = new Modal(this.$refs.reviewModal);
        this.reviewModal.show();
      });
    },

    editReview(review) {
      this.editingReview = JSON.parse(JSON.stringify(review));
      this.$nextTick(() => {
        this.editModal = new Modal(this.$refs.editModal);
        this.editModal.show();
      });
    },

    async saveReview() {
      if (!this.editingReview) return;
      
      this.isSaving = true;
      
      try {
        await performanceReviewService.updatePerformanceReview(this.editingReview);
        await this.fetchReviews();
        this.showNotification('Review updated successfully', 'success');
        this.editModal.hide();
      } catch (error) {
        console.error('Error saving review:', error);
        this.showNotification(error.message || 'Failed to update review', 'error');
      } finally {
        this.isSaving = false;
      }
    },

    async exportToExcel() {
      if (this.reviews.length === 0) return;
      
      try {
        this.showNotification('Preparing export...', 'info');
        const response = await performanceReviewService.exportReviews();
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `performance-reviews-${new Date().toISOString().slice(0,10)}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        this.showNotification('Export completed successfully', 'success');
      } catch (error) {
        console.error('Export error:', error);
        this.showNotification('Failed to export reviews', 'error');
      }
    },

    confirmDelete(reviewId) {
      this.reviewToDelete = reviewId;
      this.$nextTick(() => {
        this.deleteModal = new Modal(this.$refs.deleteModal);
        this.deleteModal.show();
      });
    },

    async deleteReview() {
      if (!this.reviewToDelete) return;
      
      this.isDeleting = true;
      
      try {
        await performanceReviewService.deletePerformanceReview(this.reviewToDelete);
        await this.fetchReviews();
        this.showNotification('Review deleted successfully', 'success');
        this.deleteModal.hide();
      } catch (error) {
        console.error('Delete error:', error);
        this.showNotification(error.message || 'Failed to delete review', 'error');
      } finally {
        this.isDeleting = false;
        this.reviewToDelete = null;
      }
    },

    showNotification(message, type = 'success') {
      this.toastType = type;
      this.toastMessage = message;
      this.toastTitle = type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info';
      
      if (!this.toast) {
        this.toast = new Toast(this.$refs.toast);
      }
      this.toast.show();
    }
  },
  async mounted() {
    await this.fetchReviews();
  }
};
</script>

<style scoped>
.rating-display {
  display: flex;
  align-items: center;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.icon-gradient {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon-gradient-1 { background: linear-gradient(135deg, #3a7bd5, #00d2ff); }
.icon-gradient-2 { background: linear-gradient(135deg, #f46b45, #eea849); }
.icon-gradient-3 { background: linear-gradient(135deg, #11998e, #38ef7d); }

.table-gradient thead th {
  background: linear-gradient(135deg, #3a7bd5, #00d2ff);
  color: white;
  position: sticky;
  top: 0;
}

.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

.card-gradient {
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .truncate-text {
    max-width: 150px;
  }
  
  .stat-card {
    padding: 0.75rem;
  }
  
  .icon-gradient {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
}
</style>