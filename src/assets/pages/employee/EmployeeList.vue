<template>
  <Layout>
    <template v-slot>
      <div class="employee-list-container">
        <div class="header-section">
          <h1>Employee List</h1>
          <button class="add-button" @click="openAddModal">Add Employee</button>
        </div>

        <div class="employee-table-container">
          <table class="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Email</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.id }}</td>
                <td>{{ employee.name }}</td>
                <td>{{ employee.phone }}</td>
                <td>{{ employee.role || '-' }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.skills || 'N/A' }}</td>
                <td>
                  <span class="status-badge active">Active</span>
                </td>
                <td>
                  <button class="action-button view" @click="viewEmployee(employee)">View</button>
                  <button class="action-button edit" @click="openEditModal(employee)">Edit</button>
                  <button class="action-button delete" @click="confirmDelete(employee)">Delete</button>
                </td>
              </tr>
              <tr v-if="!employees.length">
                <td colspan="8" class="empty-message">No employees found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <EmployeeModal
        :visible="isModalVisible"
        :employee="currentEmployee"
        :is-edit="isEditMode"
        @close="closeModal"
        @save-success="handleSaveSuccess"
      />
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import EmployeeModal from '@/components/EmployeeModal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'EmployeeList',
  components: { Layout, EmployeeModal },
  data() {
    return {
      isModalVisible: false,
      isEditMode: false,
      currentEmployee: {}
    };
  },
  computed: {
    ...mapState('employee', ['employees'])
  },
  mounted() {
    this.loadEmployees();
  },
  methods: {
    ...mapActions('employee', ['loadEmployees', 'addEmployee', 'updateEmployee', 'deleteEmployee']),

    openAddModal() {
      this.isEditMode = false;
      this.currentEmployee = {};
      this.isModalVisible = true;
    },

    openEditModal(employee) {
      if (employee.role === 'admin') {
        alert('You cannot edit admin');
        return;
      }
      this.isEditMode = true;
      this.currentEmployee = { ...employee };
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    handleSaveSuccess(formData) {
      const action = this.isEditMode ? this.updateEmployee : this.addEmployee;
      const payload = this.isEditMode
        ? { id: this.currentEmployee.id, data: formData }
        : formData;
      
      action(payload)
        .then(() => {
          this.loadEmployees();
          this.closeModal();
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            alert('You cannot edit admin');
          } else {
            alert('Failed to save changes. Please try again.');
          }
          console.error('Save error:', error);
        });
    },

    viewEmployee(employee) {
      this.$router.push(`/employee/profile/${employee.id}`);
    },

    confirmDelete(employee) {
      if (employee.role === 'admin') {
        alert('You cannot delete an admin role employee');
        return;
      }
      
      if (confirm('Are you sure you want to permanently delete this employee?')) {
        this.deleteEmployee(employee.id)
          .then(() => {
            this.loadEmployees();
          })
          .catch((error) => {
            if (error.response && error.response.status === 403) {
              alert('You cannot delete this employee. Admin role employees cannot be deleted.');
            } else {
              alert('Failed to delete employee. Please try again.');
            }
            console.error('Delete error:', error);
          });
      }
    }
  }
};
</script>

<style scoped>
.employee-list-container {
  padding: 20px;
  width: 100%;
}
.header-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.add-button {
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.employee-table-container {
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.employee-table {
  width: 100%;
  border-collapse: collapse;
}
.employee-table th,
.employee-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.employee-table th {
  background-color: #f8f9fa;
}
.action-button {
  padding: 6px 12px;
  margin: 2px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
}
.action-button.view {
  background-color: #17a2b8;
  color: white;
}
.action-button.edit {
  background-color: #28a745;
  color: white;
}
.action-button.delete {
  background-color: #dc3545;
  color: white;
}
.status-badge.active {
  background-color: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
.empty-message {
  text-align: center;
  padding: 20px;
  color: #6c757d;
  font-style: italic;
}
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .employee-table th,
  .employee-table td {
    font-size: 14px;
    padding: 8px 10px;
  }
}
</style>
