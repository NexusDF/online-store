<template>
  <ul>
    <li v-for="group of groups" :key="group.name">
      <h4>{{ group.name }}</h4>
      <ProductList :products="group.products" />
    </li>
  </ul>
</template>

<script>
import ProductList from "@/components/ProductList";

export default {
  name: "group-list",
  props: {
    groups: {
      type: Array,
      require: true,
    },
  },
  components: {
    ProductList,
  },
};
</script>

<style lang="scss" scoped>
h4 {
  padding: 0.5rem;
  background-color: var(--pale);
}
</style>
