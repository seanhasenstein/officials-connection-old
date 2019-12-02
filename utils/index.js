export const phoneFormat = (value, previousValue) => {
  if (!value) return value;
  // only allow 0-9
  const currentValue = value.replace(/[^\d]/g, '');

  if (previousValue === '' || value.length > previousValue.length) {
    if (currentValue.length <= 3) return currentValue;
    if (currentValue.length === 3) return `(${currentValue})`;
    if (currentValue.length <= 6)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    if (currentValue.length === 6)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}-`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }
};

export const emailFormat = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
