
export const fromString = (value: string) => {
  const [integerPart, floatingPart] = value.split('.');
  return Number([integerPart, floatingPart].join(''));
};

export const toString = (value: number) => {
  const valueArray = String(value).split('');
  const floatingPart = valueArray.slice(-2);
  const integerPart = valueArray.slice(0, -2);
  return [integerPart, '.', floatingPart].join('');
};
