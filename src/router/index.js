import { createRouter, createWebHistory } from "vue-router";
import BalanceView from "../views/BalanceView.vue";
import RefillView from "../views/RefillView.vue";
import TransactionsView from "../views/TransactionsView.vue";
import SignInView from "../views/SignInView.vue";
import BirthdayView from "../views/BirthdayView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "balance",
      component: BalanceView,
    },
    {
      path: "/transactions",
      name: "transactions",
      component: TransactionsView
    },
    {
      path: "/refill",
      name: "refill",
      component: RefillView
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignInView
    },
    {
      path: "/6a3a1c5f-5d84-494b-a84f-ab874e46ed65",
      name: "bday",
      component: BirthdayView
    }
  ],
});

export default router;
