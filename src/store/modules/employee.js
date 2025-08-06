// store/modules/employee.js

import axios from "@/services/api";

const state = {
  employees: [],
  deletedEmployees: [],
};

const mutations = {
  SET_EMPLOYEES(state, employees) {
    state.employees = employees;
  },
  SET_DELETED_EMPLOYEES(state, deletedEmployees) {
    state.deletedEmployees = deletedEmployees;
  },
};

const actions = {
  async loadEmployees({ commit }) {
    try {
      const response = await axios.get("/list-users");

      let employeesData = [];
      if (response.data?.data?.data) {
        employeesData = response.data.data.data;
      } else if (Array.isArray(response.data)) {
        employeesData = response.data;
      } else if (Array.isArray(response.data?.data)) {
        employeesData = response.data.data;
      } else if (response.data?.employees) {
        employeesData = response.data.employees;
      }

      const activeEmployees = employeesData
        .filter((emp) => emp.status !== "deleted")
        .map((emp) => ({
          id: emp.id,
          name:
            emp.name ||
            `${emp.first_name || ""} ${emp.last_name || ""}`.trim() ||
            "Unknown",
          phone: emp.phone || emp.phone_number || "",
          email: emp.email || "",
          role: emp.role || emp.position || "",
          skills: emp.skills || "",
          is_active: emp.status === "active",
        }));

      const deletedEmployees = employeesData
        .filter((emp) => emp.status === "deleted")
        .map((emp) => ({
          id: emp.id,
          name:
            emp.name ||
            `${emp.first_name || ""} ${emp.last_name || ""}`.trim() ||
            "Unknown",
          phone: emp.phone || emp.phone_number || "",
          email: emp.email || "",
          role: emp.role || emp.position || "",
          skills: emp.skills || "",
          is_active: false,
        }));

      commit("SET_EMPLOYEES", activeEmployees);
      commit("SET_DELETED_EMPLOYEES", deletedEmployees);
    } catch (error) {
      console.error("Failed to load employees:", error);
      commit("SET_EMPLOYEES", []);
      commit("SET_DELETED_EMPLOYEES", []);
    }
  },

  async updateEmployee({ dispatch }, { id, data }) {
    try {
      // Ensure data is FormData and contains all required fields
      const formData = data instanceof FormData ? data : new FormData();

      // Only append fields if they exist and aren't already in FormData
      if (!(data instanceof FormData)) {
        Object.keys(data).forEach((key) => {
          if (data[key] !== null && data[key] !== undefined) {
            formData.append(key, data[key]);
          }
        });
      }

      // Ensure required fields are present
      const requiredFields = ["name", "email", "phone", "role", "is_active"];
      requiredFields.forEach((field) => {
        if (!formData.has(field)) {
          formData.append(field, field === "is_active" ? "1" : "");
        }
      });

      console.log(
        "Sending update request with fields:",
        Array.from(formData.keys())
      );

      const response = await axios.post(`/update-user/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Update successful:", response.data);
      await dispatch("loadEmployees");
      return response.data;
    } catch (error) {
      console.error("Failed to update employee:", error);

      // Log detailed error information
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      }

      throw error;
    }
  },

  async addEmployee({ dispatch }, employeeData) {
    try {
      // Ensure data is FormData and contains all required fields
      const formData =
        employeeData instanceof FormData ? employeeData : new FormData();

      // Only append fields if they exist and aren't already in FormData
      if (!(employeeData instanceof FormData)) {
        Object.keys(employeeData).forEach((key) => {
          if (employeeData[key] !== null && employeeData[key] !== undefined) {
            formData.append(key, employeeData[key]);
          }
        });
      }

      // Ensure required fields are present
      const requiredFields = ["name", "email", "phone", "role", "is_active"];
      requiredFields.forEach((field) => {
        if (!formData.has(field)) {
          formData.append(field, field === "is_active" ? "1" : "");
        }
      });

      console.log(
        "Sending add request with fields:",
        Array.from(formData.keys())
      );

      const response = await axios.post("/add-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Add successful:", response.data);
      await dispatch("loadEmployees");
      return response.data;
    } catch (error) {
      console.error("Failed to add employee:", error);

      // Log detailed error information
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      }

      throw error;
    }
  },

  async deleteEmployee({ dispatch }, employeeId) {
    try {
      await axios.post(`/delete-user/${employeeId}`);
      await dispatch("loadEmployees");
    } catch (error) {
      console.error("Failed to delete employee:", error);
      throw error;
    }
  },
};

const getters = {
  employees: (state) => state.employees,
  deletedEmployees: (state) => state.deletedEmployees,
  getEmployeeById: (state) => (id) =>
    state.employees.find((emp) => emp.id == id),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
