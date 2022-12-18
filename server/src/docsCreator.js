exports.createRandomDoc = function (i) {
  const names = ['Телевизор', 'Телефон', 'Наушники', 'Ноутбук', 'Клавиатура', 'Мышь', 'Стол', 'Стул', 'Кровать', 'Диван'];
  const random = Math.random();
  return {
    id: 'id_' + i,
    status: random > 0.5 ? 'active' : 'archive',
    sum: Math.round(random * 10000),
    qty: Math.round(random * 100),
    volume: +String(random).slice(-2),
    name: names[Math.floor(random * 10)],
    delivery_date: new Date(2023, 0, 9 + +String(random).slice(-1)).toLocaleDateString(),
    currency: 'руб.'
  }
}
