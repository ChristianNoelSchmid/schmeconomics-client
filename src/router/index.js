import { createRouter, createWebHistory } from "vue-router";
import BalanceView from "../views/BalanceView.vue";
import RefillView from "../views/RefillView.vue";
import TransactionsView from "../views/TransactionsView.vue";
import SignInView from "../views/SignInView.vue";

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
    }
  ],
});

export default router;
