<template>
  <Layout>
    <template v-slot>
      <div class="employee-list-container">
        <div class="header-section">
          <h1>Employee List</h1>
          <button class="add-button" @click="openAddModal">Add Employee</button>
        </div>
        <div class="employee-list-content">
          <div class="employee-table-container">
            <table class="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="employee in employees" :key="employee.id" :class="{ 'deleted': employee.status === 'deleted' }">
                  <td>{{ employee.id }}</td>
                  <td>{{ employee.firstName }} {{ employee.lastName }}</td>
                  <td>{{ employee.position }}</td>
                  <td>{{ employee.department }}</td>
                  <td>{{ employee.email }}</td>
                  <td>
                    <span :class="`status-badge ${employee.status}`">{{ employee.status }}</span>
                  </td>
                  <td>
                    <button class="action-button view" @click="viewEmployee(employee)">View</button>
                    <button class="action-button edit" @click="openEditModal(employee)">Edit</button>
                    <button 
                      v-if="employee.status !== 'deleted'" 
                      class="action-button delete" 
                      @click="softDeleteEmployee(employee)"
                    >
                      Delete
                    </button>
                    <button 
                      v-else 
                      class="action-button restore" 
                      @click="restoreEmployee(employee)"
                    >
                      Restore
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Employee Modal -->
      <EmployeeModal 
        :is-visible="isModalVisible" 
        :is-edit-mode="isEditMode"
        :employee="currentEmployee"
        @close="closeModal"
        @save-success="handleSaveSuccess"
      />
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import EmployeeModal from '@/components/EmployeeModal.vue';

export default {
  name: 'EmployeeList',
  components: {
    Layout,
    EmployeeModal
  },
  data() {
    return {
      isModalVisible: false,
      isEditMode: false,
      currentEmployee: {},
      employees: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          position: 'Software Engineer',
          department: 'IT',
          email: 'john.doe@example.com',
          status: 'active'
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          position: 'HR Manager',
          department: 'Human Resources',
          email: 'jane.smith@example.com',
          status: 'active'
        }
      ]
    }
  },
  methods: {
    openAddModal() {
      this.isEditMode = false;
      this.currentEmployee = {};
      this.isModalVisible = true;
    },
    openEditModal(employee) {
      this.isEditMode = true;
      this.currentEmployee = { ...employee };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.currentEmployee = {};
    },
    handleSaveSuccess(employeeData) {
      if (this.isEditMode) {
        // Update existing employee
        const index = this.employees.findIndex(emp => emp.id === employeeData.id);
        if (index !== -1) {
          this.employees.splice(index, 1, { ...employeeData, status: 'active' });
        }
      } else {
        // Add new employee
        const newEmployee = {
          ...employeeData,
          id: this.employees.length + 1,
          status: 'active'
        };
        this.employees.push(newEmployee);
      }
    },
    viewEmployee(employee) {
      // In a real app, this would navigate to the employee profile page
      this.$router.push(`/employee/profile/${employee.id}`);
    },
    softDeleteEmployee(employee) {
      const index = this.employees.findIndex(emp => emp.id === employee.id);
      if (index !== -1) {
        this.employees[index].status = 'deleted';
      }
    },
    restoreEmployee(employee) {
      const index = this.employees.findIndex(emp => emp.id === employee.id);
      if (index !== -1) {
        this.employees[index].status = 'active';
      }
    }
  }
}
</script>

<style scoped>
.employee-list-container {
  width: 100%;
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-section h1 {
  margin: 0;
}

.add-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-button:hover {
  background-color: #0056b3;
  /* transform: translateY(-2px); */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.employee-list-content {
  margin-top: 20px;
}

.employee-table-container {
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.employee-table th,
.employee-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.employee-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}

.employee-table tr:hover {
  background-color: #f5f5f5;
}

.employee-table tr.deleted {
  background-color: #f8d7da;
  opacity: 0.7;
}

.action-button {
  padding: 6px 12px;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
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

.action-button.restore {
  background-color: #20c997;
  color: white;
}

.action-button:hover {
  opacity: 0.8;
  /* transform: translateY(-1px); */
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.status-badge.active {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.deleted {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
