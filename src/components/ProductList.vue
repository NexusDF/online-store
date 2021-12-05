<template>
  <ul class="list">
    <ProductItem
      v-for="product of products"
      :key="product.uid"
      :product="product"
    />
  </ul>
</template>

<script>
import ProductItem from "./ProductItem";

export default {
  name: "product-list",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  components: {
    ProductItem,
  },
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
}
</style>
