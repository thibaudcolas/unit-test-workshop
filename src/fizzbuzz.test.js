import fizzbuzz from "./fizzbuzz";

describe("fizzbuzz", () => {
  test("numbers", () => {
    expect(fizzbuzz(1)).toBe("1");
    expect(fizzbuzz(8)).toBe("8");
  });

  test.skip("multiples of 3 return fizz", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
  });

  test.skip("multiples of 5 return buzz", () => {});

  test.skip("multiples of 15 return FizzBuzz", () => {});
});
