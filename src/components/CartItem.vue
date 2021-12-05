<template>
  <tr class="item">
    <td>{{ product.name }}</td>
    <td>
      <label>
        <input
          type="text"
          class="item__input"
          v-model.lazy="product.totalAmountToBuy"
        />
        шт.
      </label>
    </td>
    <td>{{ USDToRUB }}</td>
    <td style="text-align: center">
      <button @click="removeProduct(product.uid)" class="btn" type="button">
        Удалить
      </button>
    </td>
  </tr>
</template>

<script>
import { mapMutations } from "vuex";
import convertToRUB from "@/utils/converter";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations(["removeProduct"]),
  },
  computed: {
    USDToRUB() {
      return convertToRUB(this.product.price, this.$store.state.rate);
    },
  },
  watch: {
    // Слежу за изменениями общей суммы на покупку
    "product.totalAmountToBuy"(newValue) {
      const result = newValue.replaceAll(/[a-zA-Z]/g, "") || 1;
      this.product.totalAmountToBuy = Math.max(
        1,
        Math.min(this.product.count, parseFloat(result))
      );
    },
  },
};
</script>

<style lang="scss">
.item {
  td {
    padding: 8px;
  }

  &__input {
    padding: 2px 4px;
    width: 60px;
  }
}

.btn {
  background: none;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;

  &:hover {
    background-color: red;
    color: #fff;
  }
}
</style>
