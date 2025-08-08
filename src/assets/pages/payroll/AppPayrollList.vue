<template>
  <Layout>
    <template #default>
      <div class="container-fluid p-4">
        <!-- Header & Actions -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h2 text-primary mb-0">Payroll Management</h2>
          <div class="d-flex gap-2">
            <button @click="exportToExcel" class="btn btn-outline-secondary">
              <i class="bi bi-file-earmark-excel me-2"></i> Export
            </button>
            <button @click="addPayroll" class="btn btn-success">
              <i class="bi bi-plus-circle me-2"></i> Add Payroll
            </button>
          </div>
        </div>

        <!-- Filters Card -->
        <div class="card p-4 mb-4 filter-card">
          <div class="row g-3 align-items-end">
            <div class="col-md-4">
              <label class="form-label">User ID</label>
              <input 
                v-model="searchQuery" 
                type="text" 
                class="form-control" 
                placeholder="Search by User ID"
              >
            </div>
            <div class="col-md-3">
              <label class="form-label">Month</label>
              <select v-model="monthFilter" class="form-select">
                <option value="all">All Months</option>
                <option v-for="(month, index) in months" :key="index" :value="index + 1">
                  {{ month }}
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Year</label>
              <select v-model="yearFilter" class="form-select">
                <option value="all">All Years</option>
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
            <div class="col-md-2">
              <button 
                @click="resetFilters" 
                class="btn btn-outline-secondary w-100"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="row mb-4" v-if="!loading">
          <div class="col-md-3">
            <div class="card stat-card stat-card-1 h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6 class="text-muted">Total Payrolls</h6>
                    <h4 class="mb-0">{{ stats.totalPayrolls }}</h4>
                  </div>
                  <div class="stat-icon">
                    <i class="bi bi-cash-stack"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card stat-card stat-card-2 h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6 class="text-muted">Total Paid</h6>
                    <h4 class="mb-0">${{ stats.totalAmount.toLocaleString() }}</h4>
                  </div>
                  <div class="stat-icon">
                    <i class="bi bi-currency-dollar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card stat-card stat-card-3 h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6 class="text-muted">Avg. Salary</h6>
                    <h4 class="mb-0">${{ stats.avgSalary.toLocaleString() }}</h4>
                  </div>
                  <div class="stat-icon">
                    <i class="bi bi-graph-up"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card stat-card stat-card-4 h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6 class="text-muted">This Month</h6>
                    <h4 class="mb-0">${{ stats.thisMonth.toLocaleString() }}</h4>
                  </div>
                  <div class="stat-icon">
                    <i class="bi bi-calendar-month"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading payroll data...</p>
        </div>

        <!-- Payroll Table -->
        <div class="card p-4" v-if="!loading">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="table-primary">
                <tr>
                  <th>Payroll ID</th>
                  <th>User ID</th>
                  <th>Basic Pay</th>
                  <th>Bonuses</th>
                  <th>Net Salary</th>
                  <th>Pay Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="payroll in paginatedPayrolls" :key="payroll['Payroll ID']">
                  <td>{{ payroll['Payroll ID'] }}</td>
                  <td>{{ payroll['User ID'] }}</td>
                  <td>${{ formatCurrency(payroll['Basic Pay']) }}</td>
                  <td>${{ formatCurrency(payroll['Bonuses']) }}</td>
                  <td>${{ formatCurrency(payroll['Net Salary']) }}</td>
                  <td>{{ formatDate(payroll['Pay Date']) }}</td>
                  <td>
                    <div class="d-flex gap-2">
                      <button 
                        @click="viewPayslip(payroll)" 
                        class="btn btn-sm btn-outline-primary"
                        title="View Payslip"
                      >
                        <i class="bi bi-eye"></i> View
                      </button>
                      <button 
                        @click="editPayroll(payroll)" 
                        class="btn btn-sm btn-primary"
                        title="Edit"
                      >
                        <i class="bi bi-pencil"></i> Edit
                      </button>
                      <button 
                        @click="confirmDelete(payroll['Payroll ID'])" 
                        class="btn btn-sm btn-danger"
                        title="Delete"
                      >
                        <i class="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredPayrolls.length === 0">
                  <td colspan="7" class="text-center py-4 text-muted">
                    <i class="bi bi-cash-coin fs-4"></i>
                    <p class="mt-2 mb-0">No payroll records found</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav v-if="totalPages > 1" class="mt-4">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="prevPage" :disabled="currentPage === 1">
                  &laquo;
                </button>
              </li>
              <li 
                v-for="page in totalPages" 
                :key="page" 
                class="page-item" 
                :class="{ active: currentPage === page }"
              >
                <button class="page-link" @click="goToPage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="alert alert-danger mt-3">
          <i class="bi bi-exclamation-triangle me-2"></i> {{ error }}
        </div>

        <!-- Payroll Form Modal -->
        <AppPayrollForm
          :visible="showForm"
          :payroll="selectedPayroll"
          :mode="formMode"
          @save="handleSave"
          @close="closeForm"
        />

        <!-- Payslip View Modal -->
        <div v-if="showPayslipModal" class="modal fade show" style="display: block; background-color: rgba(0,0,0,0.5)">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Payslip for User {{ currentPayslip['User ID'] }}</h5>
                <button type="button" class="btn-close" @click="closePayslipModal"></button>
              </div>
              <div class="modal-body">
                <p><strong>Payroll ID:</strong> {{ currentPayslip['Payroll ID'] }}</p>
                <p><strong>Payment Date:</strong> {{ formatDate(currentPayslip['Pay Date']) }}</p>
                <hr>
                <p><strong>Basic Pay:</strong> ${{ formatCurrency(currentPayslip['Basic Pay']) }}</p>
                <p><strong>Bonuses:</strong> ${{ formatCurrency(currentPayslip['Bonuses']) }}</p>
                <hr>
                <p class="fw-bold">Net Salary: ${{ formatCurrency(currentPayslip['Net Salary']) }}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closePayslipModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="modal fade show" style="display: block; background-color: rgba(0,0,0,0.5)">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Confirm Deletion</h5>
                <button type="button" class="btn-close" @click="closeDeleteModal"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete this payroll record? This action cannot be undone.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeDeleteModal">
                  Cancel
                </button>
                <button type="button" class="btn btn-danger" @click="deletePayroll">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import AppPayrollForm from "./AppPayrollForm.vue";
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Layout,
    AppPayrollForm
  },
  data() {
    const currentYear = new Date().getFullYear();
    return {
      loading: false,
      error: null,
      searchQuery: '',
      monthFilter: 'all',
      yearFilter: 'all',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 
               'July', 'August', 'September', 'October', 'November', 'December'],
      years: Array.from({length: 10}, (_, i) => currentYear - i),
      currentPage: 1,
      itemsPerPage: 10,
      showForm: false,
      formMode: 'add',
      selectedPayroll: null,
      showDeleteModal: false,
      payrollToDelete: null,
      showPayslipModal: false,
      currentPayslip: null,
      stats: {
        totalPayrolls: 0,
        totalAmount: 0,
        avgSalary: 0,
        thisMonth: 0
      }
    };
  },
  computed: {
    ...mapState('payroll', ['payrolls', 'isLoading']),
    
    filteredPayrolls() {
      let filtered = this.payrolls || [];
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
          String(p['User ID']).toLowerCase().includes(query)
        );
      }
      
      if (this.monthFilter !== 'all') {
        filtered = filtered.filter(p => {
          const date = new Date(p['Pay Date']);
          return date.getMonth() + 1 === parseInt(this.monthFilter);
        });
      }
      
      if (this.yearFilter !== 'all') {
        filtered = filtered.filter(p => {
          const date = new Date(p['Pay Date']);
          return date.getFullYear() === parseInt(this.yearFilter);
        });
      }
      
      return filtered;
    },
    
    totalPages() {
      return Math.ceil(this.filteredPayrolls.length / this.itemsPerPage);
    },
    
    paginatedPayrolls() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPayrolls.slice(start, end);
    }
  },
  methods: {
    ...mapActions('payroll', ['fetchPayrolls', 'createPayroll', 'updatePayroll', 'deletePayroll']),
    
    async loadPayrolls() {
      this.loading = true;
      this.error = null;
      try {
        await this.fetchPayrolls();
        this.calculateStats();
      } catch (error) {
        // this.error = error.message || "Failed to load payrolls";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    
    calculateStats() {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      
      const payrollsWithNumbers = this.payrolls.map(p => ({
        ...p,
        netSalary: parseFloat(p['Net Salary']) || 0
      }));
      
      this.stats = {
        totalPayrolls: payrollsWithNumbers.length,
        totalAmount: payrollsWithNumbers.reduce((sum, p) => sum + p.netSalary, 0),
        avgSalary: payrollsWithNumbers.reduce((sum, p) => sum + p.netSalary, 0) / 
                  (payrollsWithNumbers.length || 1),
        thisMonth: payrollsWithNumbers
          .filter(p => {
            const date = new Date(p['Pay Date']);
            return date.getMonth() + 1 === currentMonth && 
                   date.getFullYear() === currentYear;
          })
          .reduce((sum, p) => sum + p.netSalary, 0)
      };
    },
    
    formatCurrency(value) {
      return parseFloat(value || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    
    viewPayslip(payroll) {
      this.currentPayslip = payroll;
      this.showPayslipModal = true;
      document.body.classList.add('modal-open');
    },
    
    closePayslipModal() {
      this.showPayslipModal = false;
      document.body.classList.remove('modal-open');
    },
    
    editPayroll(payroll) {
      this.selectedPayroll = { ...payroll };
      this.formMode = 'edit';
      this.showForm = true;
    },
    
    addPayroll() {
      this.selectedPayroll = {
        'User ID': '',
        'Basic Pay': '',
        'Bonuses': '',
        'Pay Date': new Date().toISOString().split('T')[0]
      };
      this.formMode = 'add';
      this.showForm = true;
    },
    
    async handleSave(payrollData) {
      try {
        this.loading = true;
        
        if (this.formMode === 'add') {
          await this.createPayroll(payrollData);
          this.$toast.success('Payroll created successfully');
        } else {
          // Ensure we include the Payroll ID for updates
          const updateData = {
            'Payroll ID': this.selectedPayroll['Payroll ID'],
            ...payrollData
          };
          await this.updatePayroll(updateData);
          this.$toast.success('Payroll updated successfully');
        }
        
        this.showForm = false;
        await this.loadPayrolls();
      } catch (error) {
        console.error('Save error:', error);
        this.$toast.error(error.message || 'Failed to save payroll');
        await this.loadPayrolls(); // Reload even on error
      } finally {
        this.loading = false;
      }
    },
    
    closeForm() {
      this.showForm = false;
    },
    
    confirmDelete(id) {
      this.payrollToDelete = id;
      this.showDeleteModal = true;
      document.body.classList.add('modal-open');
    },
    
    closeDeleteModal() {
      this.showDeleteModal = false;
      document.body.classList.remove('modal-open');
    },
    
    async deletePayroll() {
      if (!this.payrollToDelete) return;
      
      try {
        this.loading = true;
        await this.$store.dispatch('payroll/deletePayroll', this.payrollToDelete);
        this.closeDeleteModal();
        this.$toast.success('Payroll deleted successfully');
      } catch (error) {
        console.error('Delete error:', error);
        this.$toast.error(error.message || 'Failed to delete payroll');
      } finally {
        this.loading = false;
        await this.loadPayrolls(); // Always reload after delete
      }
    },
    
    resetFilters() {
      this.searchQuery = '';
      this.monthFilter = 'all';
      this.yearFilter = 'all';
      this.currentPage = 1;
    },
    
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    
    goToPage(page) {
      this.currentPage = page;
    },
    
    exportToExcel() {
      console.log("Exporting to Excel...");
      this.$toast.info('Export to Excel functionality would be implemented here');
    }
  },
  created() {
    this.loadPayrolls();
  }
};
</script>

<style scoped>
.filter-card {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
}

.stat-card {
  border: none;
  border-radius: 0.5rem;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-card-1 {
  background-color: #e3f2fd;
}

.stat-card-2 {
  background-color: #e8f5e9;
}

.stat-card-3 {
  background-color: #fff3e0;
}

.stat-card-4 {
  background-color: #f3e5f5;
}

.stat-icon {
  font-size: 2rem;
  opacity: 0.7;
}

.table th {
  white-space: nowrap;
}

.table-hover tbody tr:hover {
  background-color: rgba(13, 110, 253, 0.05);
}

.btn-success {
  background-color: #198754;
  border-color: #198754;
}

.btn-success:hover {
  background-color: #157347;
  border-color: #146c43;
}

.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: white;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-outline-primary {
  border-color: #0d6efd;
  color: #0d6efd;
}

.btn-outline-primary:hover {
  background-color: #0d6efd;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #bb2d3b;
  border-color: #b02a37;
}

.text-primary {
  color: #0d6efd !important;
}

.text-muted {
  color: #6c757d !important;
}

.text-danger {
  color: #dc3545 !important;
}

.fw-bold {
  font-weight: 600 !important;
}

.table-primary {
  background-color: #0d6efd;
  color: white;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-link {
  color: #0d6efd;
}

.empty-state {
  color: #6c757d;
}

.empty-state i {
  font-size: 2.5rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  overflow-y: auto;
}

.modal-dialog {
  margin: 1.75rem auto;
}

.modal-content {
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
  padding: 1rem;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
  padding: 1rem;
}

.modal-body {
  padding: 1rem;
}

.btn-close {
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  opacity: 0.5;
  padding: 0.5rem;
}

.btn-close:hover {
  opacity: 0.75;
}
</style>