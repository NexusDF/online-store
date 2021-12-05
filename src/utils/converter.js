export default function convertToRUB(price, rate) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(price * rate);
}
