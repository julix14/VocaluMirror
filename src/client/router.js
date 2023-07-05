import { createRouter, createWebHistory } from "vue-router";
import BattlePage from "./pages/BattlePage.vue";
import MatchingPage from "./pages/MatchingPage.vue";
import FlashCardsPage from "./pages/FlashcardPage.vue";
import HomePage from "./pages/HomePage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: HomePage },
        { path: "/battle", component: BattlePage },
        { path: "/matching", component: MatchingPage },
        { path: "/flash-cards", component: FlashCardsPage },
    ],
});

export default router;