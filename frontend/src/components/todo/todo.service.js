const angular = require('angular');

angular.module('todoApp').factory('TodoService', function($http, $q) {
  const API_URL = 'http://localhost:3000/api/todos';

  return {
    // ดึงข้อมูลทั้งหมด
    getTodos: function() {
      return $http.get(API_URL).then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.error('Error fetching todos:', error);
        return $q.reject(error);
      });
    },

    // เพิ่มข้อมูลใหม่
    addTodo: function(text) {
      return $http.post(API_URL, { text: text }).then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.error('Error adding todo:', error);
        return $q.reject(error);
      });
    },

    // อัปเดตข้อมูล (เช่น toggle checkbox)
    updateTodo: function(id, done, text) {
      return $http.put(`${API_URL}/${id}`, { done: done, text: text }).then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.error('Error updating todo:', error);
        return $q.reject(error);
      });
    },

    // ลบข้อมูลที่เสร็จแล้วทั้งหมด
    clearDone: function() {
      return $http.delete(`${API_URL}/done`).then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.error('Error clearing done todos:', error);
        return $q.reject(error);
      });
    },

    // ลบข้อมูล 1 ตัว (เผื่อใช้ในอนาคต)
    deleteTodo: function(id) {
      return $http.delete(`${API_URL}/${id}`).then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.error('Error deleting todo:', error);
        return $q.reject(error);
      });
    }
  };
});
