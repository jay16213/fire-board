
const feeRatio: number = 0.001425;

const normalTaxRatio: number = 0.003;

const etfTaxRatio: number = 0.001;

export const calculateStockTransactionFee = (
  shares: number,
  price: number,
  discount: number,
  minFee: number): { fee: number, feeAfterDiscount: number } => {

  let fee = Math.max(Math.floor(shares * price * feeRatio), minFee);
  let feeAfterDiscount = Math.max(Math.round(fee * discount), minFee);

  return { fee, feeAfterDiscount }
}

export const calculateFeeByAmount = (amount: number, discount: number, minFee: number) => {
  let fee = Math.max(Math.floor(amount * feeRatio), minFee);
  let feeAfterDiscount = Math.max(Math.round(fee * discount), minFee);

  return { fee, feeAfterDiscount }
}

export const calculateTax = (shares: number, price: number, isEtf: boolean): number => {
  if (isEtf) {
    return Math.round(shares * price * etfTaxRatio)
  } else {
    return Math.round(shares * price * normalTaxRatio)
  }
}
