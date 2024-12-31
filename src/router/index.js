import { createRouter, createWebHistory } from 'vue-router';
import Signup from '../views/Signup.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Signup,
      meta: { requiresGuest: true } // Add meta field for guest only
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/room/:id',
      name: 'Room',
      component: () => import('../views/Room.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../views/Logout.vue'),
      meta: { requiresAuth: true }
    }
  ]
});

let isInitialized = false;

router.beforeEach(async (to, from, next) => {
  document.title = import.meta.env.VITE_WEB_NAME + ' - ' + to.name || 'Poker Planning' + ' - ' + to.name;

  if (!isInitialized) {
    await new Promise(resolve => {
      onAuthStateChanged(auth, user => {
        isInitialized = true;
        resolve(user);
      });
    });
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (requiresGuest && isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
