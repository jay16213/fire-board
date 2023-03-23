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

export const calculateAvgCost = (shares: number, cost: number): string => {
  return Math.abs(cost / shares).toFixed(2)
}

export const calculateBalancePrice = (cost: number, shares: number, isEtf: boolean) => {
  const ratio = isEtf ? (1 - (feeRatio + etfTaxRatio)) : (1 - (feeRatio + normalTaxRatio))
  return Number(Math.abs(cost) / (shares * ratio)).toFixed(2)
}

export const calculateUnrealizedGainLossRatio = (unrealizedGainLoss: number, cost: number) => {
  return Number((unrealizedGainLoss / Math.abs(cost)) * 100).toFixed(2)
}

export const calculateCashDividendPayable = (shares: number, dividend: number) => {
  return Math.round(shares * dividend)
}

export const calculateStockDividendPayable = (shares: number, dividend: number) => {
  return Math.floor(shares * dividend)
}
