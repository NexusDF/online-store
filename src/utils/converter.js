export default function convertToRUB(price, rate) {
  // Конвертирую валюту при помощи встроенного Intl
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(price * rate);
}
