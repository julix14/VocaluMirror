import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./pages/App.vue"),
        },

        {
            path: "/battle",
            component: () => import("./pages/BattlePage.vue"),
        },
        {
            path: "/matching",
            component: () => import("./pages/MatchingPage.vue"),
        },
        {
            path: "/flash-cards",
            component: () => import("./pages/FlashcardPage.vue"),
        },
    ],
});

export default router;