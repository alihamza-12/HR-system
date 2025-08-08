// src/services/taskServices.js
import API from './api';

export const fetchTasks = async () => {
  try {
    const response = await API.get('/list-task');
    return response.data.data.map(task => ({
      id: task.task_no,
      title: task['task title'],
      description: task.Description,
      status: task['Status of Task'],
      due_date: task['due date'],
      completed_date: task['Status of Task'] === 'completed' ? new Date().toISOString() : null,
      assigned_by: task['Assigned By'],
      assigned_to: task['Assigned To']
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// src/services/taskServices.js
export const addTask = async (taskData) => {
  try {
    const response = await API.post('/create-task', {
      title: taskData.title,
      description: taskData.description,
      due_date: taskData.due_date,
      status: 'pending',
      assigned_to: taskData.assigned_to
    });
    
    // Handle both possible response structures
    const responseData = response.data.data || response.data;
    
    return {
      id: responseData.task_no || responseData.id,
      title: responseData.title || responseData['task title'],
      description: responseData.description || responseData.Description,
      status: responseData.status || responseData['Status of Task'] || 'pending',
      due_date: responseData.due_date || responseData['due date'],
      completed_date: null,
      assigned_by: responseData.assigned_by || responseData['Assigned By'],
      assigned_to: responseData.assigned_to || responseData['Assigned To']
    };
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};


export const updateTaskStatus = async (taskId, status, taskData) => {
  try {
    const response = await API.put(`/update-task/${taskId}`, {
      'task title': taskData.title,
      'Description': taskData.description,
      'due date': taskData.due_date,
      'Status of Task': status,
      'Assigned To': taskData.assigned_to
    });
    return response;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    console.log(`Attempting to delete task with ID: ${taskId}`);
    
    // Validate task ID
    if (!taskId || isNaN(taskId)) {
      throw new Error(`Invalid task ID: ${taskId}`);
    }
    
    const response = await API.delete(`/delete-task/${taskId}`);
    console.log('Delete task response:', response);
    return response;
  } catch (error) {
    console.error("Error deleting task:", error);
    
    // Enhanced error handling
    if (error.response) {
      const { status, data } = error.response;
      console.error(`Server responded with status: ${status}`, data);
      
      let errorMessage = 'Failed to delete task';
      
      switch (status) {
        case 404:
          errorMessage = `Task with ID ${taskId} not found`;
          break;
        case 500:
          errorMessage = data.message || 'Server error occurred while deleting task';
          break;
        case 403:
          errorMessage = 'You do not have permission to delete this task';
          break;
        default:
          errorMessage = data.message || `Error ${status}: ${data.error || 'Unknown error'}`;
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('Network error: Unable to reach server');
    } else {
      console.error('Request setup error:', error.message);
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};
