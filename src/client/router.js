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
                title: "Home Page",
            }, 
        },

        { 
            path: "/battle", 
            component: BattlePage,
            meta: {
                title: "Battle Page",
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
                title: "Matching Page",
            },
        },
        { 
            path: "/flash-cards", 
            component: FlashCardsPage, 
            meta: {
                title: "Flashcards Page",
            },
        },
    ],
});

router.beforeEach((to) => {
    document.title = to.meta?.title ?? "Default Title";
});

export default router;
