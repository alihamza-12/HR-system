// src/services/employeeService.js
import API from "./api";

const employeeService = {
  //  Updated to /list-users
  async getAllEmployees(params = {}) {
    return API.get("/list-users", { params });
  },

  async getEmployeeById(id) {
    return API.get(`/employees/${id}`);
  },

  async createEmployee(employeeData) {
    return API.post("/employees", employeeData);
  },

  async updateEmployee(id, employeeData) {
    return API.put(`/employees/${id}`, employeeData);
  },

  async deleteEmployee(id) {
    return API.delete(`/employees/${id}`);
  },

  async searchEmployees(query) {
    return API.get("/employees/search", { params: { q: query } });
  },

  async getEmployeesByDepartment(department) {
    return API.get(`/employees/department/${department}`);
  },

  async uploadProfilePicture(id, formData) {
    return API.post(`/employees/${id}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default employeeService;
