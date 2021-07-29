export default function formatPrice(price: number) {
  const number = String(price).replace(/[^0-9]/g, '');
  if (!number) return '';

  const converted = Number(number).toLocaleString();

  return converted;
}
