import Vue from "vue";
import Vuex from "vuex";
import convertToRUB from "@/utils/converter";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: {
      totalAmount: 0,
      items: [],
    },
    rate: 74.4,
    rateState: "equal",
  },
  getters: {
    // Получаю общую сумму товаров
    getTotalAmount(state) {
      if (!state.cart.items.length) return 0;
      return state.cart.items
        .map((p) => p.totalAmountToBuy * p.price)
        .reduce((total, p) => total + p);
    },
    // Конвертирую доллары в рубли
    getTotalAmountOnRUB(state, getters) {
      return convertToRUB(getters.getTotalAmount, state.rate);
    },
  },
  mutations: {
    addProductToCart(state, product) {
      // Ищу уже готовый у покупке товар в списке покупок
      const productIsReady = state.cart.items.find(
        (p) => p.uid === product.uid
      );
      if (productIsReady) {
        if (product.count <= productIsReady.totalAmountToBuy) return;
        productIsReady.totalAmountToBuy += 1;
      } else {
        state.cart.items.push({
          totalAmountToBuy: 1,
          ...product,
        });
      }
    },
    removeProduct(state, uid) {
      const productIsReady = state.cart.items.find((p) => p.uid === uid);
      if (productIsReady?.totalAmountToBuy > 1) {
        productIsReady.totalAmountToBuy -= 1;
      } else {
        state.cart.items = state.cart.items.filter((p) => p.uid !== uid) || [];
      }
    },
    changeRate(state, newRate) {
      if (typeof newRate === "string") {
        newRate = newRate.replaceAll(/[a-zA-Z]/g, "");
      }
      // Изменяю текущий статус валюты (поднялась или опустилась)
      if (state.rate === newRate) {
        state.rateState = "equal";
      } else if (state.rate > newRate) {
        state.rateState = "less";
      } else {
        state.rateState = "great";
      }
      state.rate = parseFloat(newRate) || state.rate;
    },
  },
  actions: {},
  modules: {},
});
