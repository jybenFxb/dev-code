import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const userInfo = ref({ name: "\u7BA1\u7406\u5458", role: "admin", avatar: "" });
  const isLoggedIn = computed(() => !!token.value);
  function initFromStorage() {
  }
  function login(username, password) {
    if (username && password) {
      token.value = "mock-token-" + Date.now();
      return true;
    }
    return false;
  }
  function logout() {
    token.value = "";
  }
  return { token, userInfo, isLoggedIn, initFromStorage, login, logout };
});

export { useAuthStore as u };
//# sourceMappingURL=auth-BOcGrzbx.mjs.map
