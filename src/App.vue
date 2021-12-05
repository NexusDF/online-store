<template>
  <div id="app">
    <!--Для демострации некоторые задачи решил при помощи Vuex -->
    <GroupList class="group-list" :groups="productsGroups" />
    <CartList class="cart-list" />
  </div>
</template>

<script>
import GroupList from "@/components/GroupList";
import CartList from "@/components/CartList";
import getProducts from "@/common/getProducts";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  created() {
    const timeToUpdateRate = 15 * 1000;
    // Достаю данные из файла data.json и names.json
    this.productsGroups = getProducts();

    // Получаю текущий курс валюты
    this.synchronizeRate(timeToUpdateRate);
  },
  components: {
    GroupList,
    CartList,
  },
  data() {
    return {
      productsGroups: [],
    };
  },
  methods: {
    // Достаю мутация для изменения курса
    ...mapMutations(["changeRate"]),
    ...mapActions(["synchronizeRate"]),
  },
};
</script>

<style lang="scss">
@media screen and (max-width: 768px) {
  #app {
    flex-direction: column;
  }

  .group-list {
    flex: 1;
  }
}
:root {
  --contrast: #123;
  --pale: #ddd;
}

#app {
  display: flex;
  column-gap: 8px;
  justify-content: space-between;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

.group-list {
  flex: 0 0 45%;
}

.cart-list {
  height: 100%;
  flex: 1;
}
</style>
