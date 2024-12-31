<template>
  <div class="main-content">
    <header>
      <div class="button-container">
        <NavButton v-for="(button, index) in NavButtons" :key="index" :text="button.text" :tooltip="button.tooltip"
          :route="button.route" :routes="button.routes" :icon="button.icon" :isDropDown="button.isDropDown" />
      </div>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import NavButton from '@/components/NavButton.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconPlus from '@/components/icons/IconPlus.vue';

const authUser = ref(null);
let NavButtons = ref([]);
const auth = getAuth();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    authUser.value = user;

    if (user) { // if user is logged in
      NavButtons.value = [
        { text: 'Home', tooltip: 'Home', route: '/', icon: IconHome },
        { text: 'Create Room', tooltip: 'Create Room', icon: IconPlus },
        { text: 'Logout', tooltip: 'Logout', route: '/logout', icon: IconSettings },
      ];
    } else { // if user is not logged in
      NavButtons.value = [
        { text: 'Home', tooltip: 'Home', route: '/', icon: IconHome },
        { text: 'Login', tooltip: 'Login', route: '/login', icon: IconSettings },
      ];
    }
  });
});
</script>

<style scoped>
.main-content {
  min-width: 100%;
  width: fit-content;
  min-height: 100vh;
  height: 100%;

  background: #000000;
  --gap: 5em;
  --line: 1px;
  --color: rgba(255, 255, 255, 0.2);

  background-image: linear-gradient(-90deg,
      transparent calc(var(--gap) - var(--line)),
      var(--color) calc(var(--gap) - var(--line) + 1px),
      var(--color) var(--gap)),
    linear-gradient(0deg,
      transparent calc(var(--gap) - var(--line)),
      var(--color) calc(var(--gap) - var(--line) + 1px),
      var(--color) var(--gap));
  background-size: var(--gap) var(--gap);
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.button-container {
  margin-top: 20px;
  display: flex;
  background-color: rgba(0, 73, 144);
  width: 300px;
  height: auto;
  padding: 5px;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
    rgba(0, 73, 144, 0.5) 5px 10px 15px;
  transition: all 0.5s;
}

.button-container:hover {
  width: 350px;
  transition: all 0.5s;
}
</style>
