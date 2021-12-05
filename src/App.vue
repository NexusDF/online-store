<template>
  <div id="app">
    <GroupList class="group-list" :groups="productsGroups" />
    <CartList class="cart-list" />
  </div>
</template>

<script>
import GroupList from "@/components/GroupList";
import CartList from "@/components/CartList";
import getProducts from "@/common/getProducts";
import getActualRate from "@/common/getCurrentRate";
import { mapMutations } from "vuex";

export default {
  name: "App",
  created() {
    this.productsGroups = getProducts();

    setInterval(async () => {
      const rate = await getActualRate();
      this.changeRate(rate.Value);
    }, 15 * 1000);
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
    ...mapMutations(["changeRate"]),
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
