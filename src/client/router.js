import { createRouter, createWebHistory } from "vue-router";
import BattlePage from "./pages/BattlePage.vue";
import MatchingPage from "./pages/MatchingPage.vue";
import FlashCardsPage from "./pages/FlashcardPage.vue";
import HomePage from "./pages/HomePage.vue";
import axios from "axios";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: HomePage,
            meta: {
                title: "Home",
            },
        },

        {
            path: "/battle",
            component: BattlePage,
            meta: {
                title: "Battle",
            },
        },
        {
            path: "/matching",
            component: MatchingPage,
            beforeEnter: (to, from, next) => {
                axios
                    .get(`${import.meta.env.VITE_APP_URL}/matchingwords`)
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

            meta: {
                title: "Matching",
            },
        },
        {
            path: "/flashcards",
            component: FlashCardsPage,
            beforeEnter: (to, from, next) => {
                axios
                    .get(
                        `${import.meta.env.VITE_APP_URL}/user/${
                            import.meta.env.VITE_APP_USER_ID
                        }/flashcard`
                    )
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

            meta: {
                title: "Flashcards",
            },
        },
    ],
});

router.beforeEach((to) => {
    document.title = "Vocalu - " + to.meta?.title ?? "Vocalu";
});

export default router;
