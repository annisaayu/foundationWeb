function toRupiah (money) {
  return 'Rp. ' + money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = toRupiah;