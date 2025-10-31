export function findArray<T>(arr: T[], key: keyof T, value: T[keyof T]): T | undefined {
  const found = arr.find((item) => item[key] === value);
  return found;
}
