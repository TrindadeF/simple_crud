export const sum = (a: number, b: number): number => a + b;

test("should return the correct sum of two numbers", () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(-1, -2)).toBe(-3);
});
