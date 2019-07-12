import fizzbuzz from "./fizzbuzz";

describe("fizzbuzz", () => {
  it("exists", () => {
    expect(fizzbuzz).toBeDefined();
  });

  it("numbers", () => {
    expect(fizzbuzz(1)).toBe("1");
    expect(fizzbuzz(1)).toEqual("1");
  });

  test("numbers", () => {
    expect(fizzbuzz(1)).toBe("1");
    expect(fizzbuzz(1)).toEqual("1");
  });

  it.skip("fizzes", () => {});
  it.skip("buzzes", () => {});
  it.skip("fizzbuzzes", () => {});
});

it("fizzbuzz numbers", () => {
  expect(fizzbuzz(1)).toBe("1");
  expect(fizzbuzz(1)).toEqual("1");
});
