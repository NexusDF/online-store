<template>
  <li class="item" @click="addProductToCart(product)">
    <span class="item__name">{{ productInfo }}</span>
    <span class="item__price">{{ USDToRUB }}</span>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import convertToRUB from "@/utils/converter";

export default {
  name: "product-item",
  props: {
    product: {
      type: Object,
      require: true,
    },
  },
  methods: {
    ...mapMutations(["addProductToCart"]),
  },
  computed: {
    productInfo() {
      return `${this.product.name}(${this.product.count})`;
    },
    USDToRUB() {
      return convertToRUB(this.product.price, this.$store.state.rate);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  padding: 10px 12px;
  border: 1px solid var(--contrast);
  cursor: pointer;
  display: flex;

  &__price {
    margin-left: auto;
  }

  & + & {
    border-top: none;
  }

  &:hover {
    background-color: #eee;
  }
}
</style>
