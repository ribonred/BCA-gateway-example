export const serializerError = error => error;
export const invalidBody = key => `${key} tidak valid`;
export const incompleteKey = (key, placement) => `Missing required key in ${placement}: ${key}`;
export const incompleteValue = (key, placement) => `Missing required value in ${placement}: ${key}`;
export const invalidEmailOrPassword = _ => 'Email atau kata sandi salah';
export const invalidType = key => `Value is invalid data type: ${key}`;
export const invalidFileType = (key, message) => `Value of ${key} must be in format: ${message}`;
export const maxFileSize = key => `File ${key} melebihi ukuran`;
export const notFoundResource = key => `${key} tidak ditemukan`;
export const errorFindResource = key => `Failed find resource: ${key}`;
export const errorCreateResource = key => `Failed create resource: ${key}`;
export const errorUpdateResource = key => `Failed update resource: ${key}`;
export const errorDeleteResource = key => `Failed delete resource: ${key}`;
export const invalidFormat = key => `Format tidak valid: ${key}`;
export const alreadyUsed = key => `Isian sudah digunakan: ${key}`;
export const invalidOption = key => `Isian diluar opsi: ${key}`;
export const loginError = _ => 'Gagal masuk';
export const unauthorized = _ => 'Failed to authorized';
export const expired = key => `${key} telah kadaluarsa`;
export const invalidMaxLength = (key, value) => `Length of ${key} shall not be more than ${value}`;
export const invalidMinLength = (key, value) => `Length of ${key} shall not be less than ${value}`;
export const invalidMaxValue = (key, value) => `Value of ${key} shall not be more than ${value}`;
export const invalidMinValue = (key, value) => `Value of ${key} shall not be less than ${value}`;
export const forbidden = () => 'Forbiden access';
export const unavailableStock = key => `Stok tidak mencukupi. Mohon kurangi jumlah produk ${key} di keranjang belanja anda`;
export const generalRequestErrors = key => `${key}`;
export const voucherCantBeMix = () => 'Tidak dapat mencampur produk dengan tipe berbeda (digital/fisik) dalam '
    + 'keranjang belanja. Jika anda ingin membeli tipe berbeda, kosongkan keranjang belanja anda terlebih dahulu';
export const underQty = key => `${key} dibawah kuantitas`;
export const invalidProcess = message => `Proses tidak valid: ${message}`;
export const somethingWentWrong = 'Terjadi kesalahan, silakan hubungi layanan aduan pelanggan kami';

export const expiredVoucher = expiredDate => `Voucher sudah tidak berlaku sejak tanggal ${expiredDate}`;
export const alreadyRedeemed = data => `Voucher ${data.voucher_id} sudah diredeem tanggal ${data.redeemed_at}`;
export const invalidVoucherCode = () => 'Kode voucher tidak valid';

// start promo messages

export const dailyLimit = transaction => `maksimal ${transaction} transaksi dalam satu hari`;
export const transactionLimit = transaction => `maksimal ${transaction} transaksi`;
export const quantityLimit = quantity => `maksimal ${quantity} buah`;

export const promoLimit = additionalMessage => `Anda sudah melebihi kuota pembelian produk promo: ${additionalMessage}`;
export const promoEnded = () => 'Promo sudah berakhir';
export const doublePromoPaymentMethod = () => 'Promo ini tidak dapat digabung dengan promo lain yang ada di keranjang anda';

// end promo messages
