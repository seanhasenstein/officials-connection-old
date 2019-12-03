export const emailFormat = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
