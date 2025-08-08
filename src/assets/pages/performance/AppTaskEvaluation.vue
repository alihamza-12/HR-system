<template>
  <Layout>
    <div class="task-evaluator-container animate__animated animate__fadeIn">
      <h2 class="evaluator-title">
        <i class="bi bi-check-circle me-2" aria-hidden="true"></i>
        Task Completion Evaluator
      </h2>
      
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="task-stats">
          <span class="badge bg-primary me-2">
            Total: {{ allTasks.length }}
          </span>
          <span class="badge bg-success me-2">
            Completed: {{ completedTasks.length }}
          </span>
          <span class="badge bg-warning">
            Pending: {{ pendingTasks.length }}
          </span>
        </div>
        <button 
          @click="addNewTask" 
          class="btn btn-sm btn-outline-primary"
          aria-label="Add new task"
        >
          <i class="bi bi-plus-lg me-1" aria-hidden="true"></i> Add Task
        </button>
      </div>

      <div v-if="isLoading" class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <ul class="task-list" v-if="allTasks.length > 0 && !isLoading">
        <li 
          v-for="task in filteredTasks" 
          :key="task.id" 
          class="task-item"
          :class="{ 'completed-task': task.status === 'completed' }"
        >
          <div class="task-content">
            <div class="d-flex align-items-center">
              <input
                type="checkbox"
                :id="`task-${task.id}`"
                :checked="task.status === 'completed'"
                @change="toggleStatus(task.id)"
                class="form-check-input me-2"
                aria-label="Toggle task completion status"
              >
              <label :for="`task-${task.id}`" class="task-label">
                <strong>{{ task.title }}</strong>
                <span class="task-status">
                  ({{ task.status }})
                </span>
                <small class="text-muted d-block">
                  Due Date: {{ formatDate(task.due_date) }}
                </small>
                <small class="text-muted d-block">
                  <strong>Assigned By:</strong> User {{ task.assigned_by }}
                </small>
                <small class="text-muted d-block">
                  <strong>Assigned To:</strong> User {{ task.assigned_to }}
                </small>
                <small 
                  v-if="task.completed_date" 
                  class="text-muted d-block"
                >
                  Completed on: {{ formatDate(task.completed_date) }}
                </small>
              </label>
            </div>
            <div class="task-actions">
              <button 
                @click="toggleStatus(task.id)" 
                :class="['btn btn-sm', task.status === 'completed' ? 'btn-danger' : 'btn-success']"
                aria-label="Toggle task status"
              >
                {{ task.status === 'completed' ? 'Mark Pending' : 'Mark Complete' }}
              </button>
              <button 
                @click="removeTask(task.id)" 
                class="btn btn-sm btn-outline-danger ms-2"
                aria-label="Delete task"
              >
                <i class="bi bi-trash" aria-hidden="true"></i> Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
      
      <div v-else-if="!isLoading" class="empty-state text-center py-4">
        <i class="bi bi-check2-circle fs-1 text-muted" aria-hidden="true"></i>
        <p class="mt-2">No tasks available. Add your first task!</p>
      </div>

      <div class="mt-3 d-flex justify-content-end">
        <div class="btn-group btn-group-sm">
          <button 
            @click="filter = 'all'"
            :class="['btn', filter === 'all' ? 'btn-primary' : 'btn-outline-primary']"
            aria-label="Show all tasks"
          >
            All
          </button>
          <button 
            @click="filter = 'completed'"
            :class="['btn', filter === 'completed' ? 'btn-primary' : 'btn-outline-primary']"
            aria-label="Show completed tasks"
          >
            Completed
          </button>
          <button 
            @click="filter = 'pending'"
            :class="['btn', filter === 'pending' ? 'btn-primary' : 'btn-outline-primary']"
            aria-label="Show pending tasks"
          >
            Pending
          </button>
        </div>
      </div>

      <div class="modal fade" id="taskModal" ref="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-gradient-primary text-white">
              <h2 id="taskModalLabel" class="modal-title h5">Add New Task</h2>
              <button 
                type="button" 
                class="btn-close btn-close-white" 
                @click="closeModal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="newTaskName" class="form-label">Task Title *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="newTaskName" 
                  v-model="newTask.title"
                  placeholder="Enter task title"
                  required
                >
                <div v-if="validationErrors.title" class="text-danger small mt-1">
                  {{ validationErrors.title }}
                </div>
              </div>
              <div class="mb-3">
                <label for="newTaskDescription" class="form-label">Description (Optional)</label>
                <textarea 
                  class="form-control" 
                  id="newTaskDescription" 
                  v-model="newTask.description"
                  rows="3"
                  placeholder="Enter task description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="newTaskDueDate" class="form-label">Due Date *</label>
                <input 
                  type="date" 
                  class="form-control" 
                  id="newTaskDueDate" 
                  v-model="newTask.due_date"
                  required
                >
                <div v-if="validationErrors.due_date" class="text-danger small mt-1">
                  {{ validationErrors.due_date }}
                </div>
              </div>
              <div class="mb-3">
                <label for="newTaskId" class="form-label">Task ID</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="newTaskId" 
                  v-model="newTask.taskId"
                  placeholder="Auto-generated if left empty"
                >
              </div>
              <div class="mb-3">
                <label for="newTaskAssignee" class="form-label">Assign To *</label>
                <select 
                  class="form-select" 
                  id="newTaskAssignee" 
                  v-model="newTask.assigned_to"
                  required
                >
                  <option value="">Select User</option>
                  <option value="3">User 3</option>
                  <option value="4">User 4</option>
                  <option value="5">User 5</option>
                  <option value="8">User 8</option>
                </select>
                <div v-if="validationErrors.assigned_to" class="text-danger small mt-1">
                  {{ validationErrors.assigned_to }}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              <button 
                type="button" 
                class="btn btn-primary" 
                @click="confirmAddTask"
                :disabled="isAddingTask"
              >
                <span v-if="isAddingTask" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                {{ isAddingTask ? 'Adding...' : 'Add Task' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { Modal } from 'bootstrap';
import { mapState, mapActions, mapGetters } from 'vuex';
import Layout from '@/components/Layout.vue';

export default {
  name: "TaskPage",
  components: { Layout },
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        due_date: "",
        assigned_to: "",
        taskId: ""
      },
      filter: 'all',
      taskModal: null,
      isAddingTask: false,
      validationErrors: {
        title: '',
        due_date: '',
        assigned_to: ''
      }
    };
  },
  computed: {
    ...mapState('task', ['error']),
    ...mapGetters('task', [
      'allTasks',
      'completedTasks',
      'pendingTasks',
      'isLoading'
    ]),
    filteredTasks() {
      switch (this.filter) {
        case 'completed':
          return this.completedTasks;
        case 'pending':
          return this.pendingTasks;
        default:
          return [...this.allTasks].sort((a, b) => {
            if (a.status === 'completed' && b.status !== 'completed') return 1;
            if (a.status !== 'completed' && b.status === 'completed') return -1;
            return new Date(a.due_date) - new Date(b.due_date);
          });
      }
    }
  },
  methods: {
    ...mapActions('task', [
      'fetchTasks',
      'addTask',
      'toggleTaskStatus',
      'removeTask'
    ]),
    addNewTask() {
      this.resetValidationErrors();
      this.newTask = { 
        title: "", 
        description: "", 
        due_date: "",
        assigned_to: ""
      };
      this.$nextTick(() => {
        this.taskModal.show();
      });
    },
    resetValidationErrors() {
      this.validationErrors = {
        title: '',
        due_date: '',
        assigned_to: ''
      };
    },
    validateForm() {
      let isValid = true;
      this.resetValidationErrors();

      if (!this.newTask.title.trim()) {
        this.validationErrors.title = 'Title is required';
        isValid = false;
      }
      if (!this.newTask.due_date) {
        this.validationErrors.due_date = 'Due date is required';
        isValid = false;
      }
      if (!this.newTask.assigned_to) {
        this.validationErrors.assigned_to = 'Assignee is required';
        isValid = false;
      }

      return isValid;
    },
    async confirmAddTask() {
      if (!this.validateForm()) return;
      
      this.isAddingTask = true;
      try {
        await this.addTask({
          title: this.newTask.title.trim(),
          description: this.newTask.description,
          due_date: this.newTask.due_date,
          assigned_to: this.newTask.assigned_to,
          status: 'pending'
        });
        
        // Refresh the task list after adding
        await this.fetchTasks();
        
        this.closeModal();
      } catch (error) {
        // Handle API validation errors
        if (error.response?.data?.errors) {
          const apiErrors = error.response.data.errors;
          if (apiErrors.title) this.validationErrors.title = apiErrors.title[0];
          if (apiErrors.due_date) this.validationErrors.due_date = apiErrors.due_date[0];
          if (apiErrors.assigned_to) this.validationErrors.assigned_to = apiErrors.assigned_to[0];
        }
      } finally {
        this.isAddingTask = false;
      }
    },
    closeModal() {
      this.taskModal.hide();
      this.resetValidationErrors();
      this.newTask = { 
        title: "", 
        description: "", 
        due_date: "",
        assigned_to: ""
      };
    },
    async toggleStatus(taskId) {
      try {
        await this.toggleTaskStatus(taskId);
      } catch (error) {
        console.error("Error toggling task status:", error);
      }
    },
    removeTask(taskId) {
      if (confirm("Are you sure you want to delete this task?")) {
        this.$store.dispatch('task/removeTask', taskId);
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    initModal() {
      this.taskModal = new Modal(this.$refs.taskModal);
      
      this.$refs.taskModal.addEventListener('hidden.bs.modal', () => {
        this.resetValidationErrors();
        this.newTask = { 
          title: "", 
          description: "", 
          due_date: "",
          assigned_to: ""
        };
      });
    }
  },
  mounted() {
    this.initModal();
    this.fetchTasks();
  },
  beforeUnmount() {
    if (this.taskModal) {
      this.taskModal.dispose();
    }
  }
};
</script>

<style scoped>
.task-evaluator-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.evaluator-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  margin-bottom: 0.75rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.completed-task {
  border-left-color: #28a745;
  background-color: #f8f9fa;
}

.completed-task .task-label {
  opacity: 0.7;
}

.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.task-label {
  cursor: pointer;
  flex-grow: 1;
}

.task-status {
  font-size: 0.875rem;
  color: #6c757d;
  margin-left: 0.5rem;
}

.task-actions {
  display: flex;
  align-items: center;
}

.empty-state {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  color: #6c757d;
}

.btn-success {
  background: linear-gradient(135deg, #28a745, #5cb85c);
  color: white;
  border: none;
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  border: none;
}

@media (max-width: 576px) {
  .task-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .task-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .task-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>