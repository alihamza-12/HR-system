// src/store/modules/task.js
import * as taskService from '@/services/taskServices';

export default {
  namespaced: true,
  state: {
    tasks: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    REMOVE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      try {
        const tasks = await taskService.fetchTasks();
        commit('SET_TASKS', tasks);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to load tasks. Please try again.';
        commit('SET_ERROR', errorMessage);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async addTask({ commit }, taskData) {
      commit('CLEAR_ERROR');
      try {
        // Ensure taskId is included in the payload
        const payload = {
          ...taskData,
          taskId: taskData.taskId || `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
        const task = await taskService.addTask(payload);
        commit('ADD_TASK', task);
        return task;
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to add new task.';
        commit('SET_ERROR', errorMessage);
        throw error;
      }
    },

    
async toggleTaskStatus({ commit, state }, taskId) {
  commit('CLEAR_ERROR');
  try {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const response = await taskService.updateTaskStatus(taskId, newStatus, {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      assigned_to: task.assigned_to,
      // status:task.newStatus
    });
    
    // Check if response.data exists and has the expected structure
    if (!response || !response.data || !response.data.data) {
      throw new Error('Invalid response from server');
    }
    
    const responseData = response.data.data;
    
    const updatedTask = {
      id: responseData.task_no,
      title: responseData['task title'],
      description: responseData.Description,
      status: responseData['Status of Task'],
      due_date: responseData['due date'],
      completed_date: responseData['Status of Task'] === 'completed' ? new Date().toISOString() : null,
      assigned_by: responseData['Assigned By'],
      assigned_to: responseData['Assigned To']
    };
    
    commit('UPDATE_TASK', updatedTask);
    return updatedTask;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update task status.';
    commit('SET_ERROR', errorMessage);
    throw error;
  }
},

    async removeTask({ commit }, taskId) {
      commit('CLEAR_ERROR');
      try {
        console.log(`Vuex: Removing task with ID: ${taskId}`);
        await taskService.deleteTask(taskId);
        commit('REMOVE_TASK', taskId);
        console.log(`Vuex: Successfully removed task ${taskId}`);
      } catch (error) {
        console.error('Vuex: Error in removeTask action:', error);
        
        // Use the enhanced error message from the service
        const errorMessage = error.message || 'Failed to delete task';
        commit('SET_ERROR', errorMessage);
        
        // Also log to console for debugging
        console.error('Task deletion failed:', {
          taskId,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        throw error;
      }
    }
  },
  getters: {
    allTasks: state => state.tasks,
    completedTasks: state => state.tasks.filter(task => task.status === 'completed'),
    pendingTasks: state => state.tasks.filter(task => task.status === 'pending'),
    isLoading: state => state.loading,
    error: state => state.error
  }
};