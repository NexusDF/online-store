<template>
  <div>
    <table class="table">
      <thead class="table__head">
        <tr style="text-align: left">
          <th>Наименование товара</th>
          <th>Количество</th>
          <th>Цена / шт.</th>
          <th width="70"></th>
        </tr>
      </thead>
      <tbody>
        <CartItem
          v-for="product of removedDuplicates"
          :key="product.uid"
          :product="product"
        />
        <tr style="font-weight: 600">
          <td colspan="2">Общая сумма</td>
          <td>
            {{ getTotalAmountOnRUB }}
          </td>
        </tr>
        <tr>
          <td>
            <label class="rate">
              Курс рубля
              <input type="text" style="width: 60px" v-model="currentRate" />
              <svg
                width="24"
                class="equal"
                height="24"
                viewBox="0 0 24 24"
                v-if="rateState === 'equal'"
              >
                <path d="M19 13H5V11H19V13Z" fill="currentColor" />
              </svg>
              <svg
                v-else
                :class="rateState"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M1 21H23L12 2" fill="currentColor" />
              </svg>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script scoped>
import { mapState, mapGetters, mapMutations } from "vuex";
import CartItem from "./CartItem";

export default {
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters(["getTotalAmountOnRUB"]),
    ...mapState(["cart", "rate", "rateState"]),
    removedDuplicates() {
      return new Set(this.cart.items);
    },
    currentRate: {
      get() {
        return this.rate;
      },
      set(v) {
        this.changeRate(v);
      },
    },
  },
  methods: {
    ...mapMutations(["changeRate"]),
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
  }

  &__head {
    background-color: var(--pale);
  }
}

.great {
  width: 1em;
  height: 1em;
  color: red;
}

.less {
  width: 1em;
  height: 1em;
  color: greenyellow;
  transform: rotateZ(180deg);
}

.equal {
  width: 1em;
  height: 1em;
}

.rate {
  display: flex;
  align-items: center;
  column-gap: 4px;
}
</style>
