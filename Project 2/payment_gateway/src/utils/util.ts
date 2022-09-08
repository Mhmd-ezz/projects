export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export const intAmountToFloat = (amount: number): string => {
  try {

    let amount_ = parseFloat((amount / 100).toFixed(2));
    return new Intl.NumberFormat('latn', { style: 'decimal', minimumFractionDigits: 2 }).format(amount_);

  } catch (error) {
    console.error(error)
  }
};

export const generateObjectId = (): string => {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};