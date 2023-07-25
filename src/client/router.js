import { createRouter, createWebHistory } from "vue-router";
import BattlePage from "./pages/BattlePage.vue";
import MatchingPage from "./pages/MatchingPage.vue";
import FlashCardsPage from "./pages/FlashcardPage.vue";
import HomePage from "./pages/HomePage.vue";
import axios from "axios";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: HomePage },
        { path: "/battle", component: BattlePage },
        {
            path: "/matching",
            component: MatchingPage,
            beforeEnter: (to, from, next) => {
                axios
                    .get(`${import.meta.env.VITE_APP_URL}/vocabulary`)
                    .then((response) => {
                        to.params.data = response.data;
                        next();
                    })
                    .catch((error) => {
                        console.log(error);
                        next();
                    });
            },
            props: true,
        },
        { path: "/flash-cards", component: FlashCardsPage },
    ],
});

export default router;
