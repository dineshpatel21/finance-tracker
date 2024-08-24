export const currencyFormator = (amount) => {
  const formator = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });
  return formator.format(amount);
};
