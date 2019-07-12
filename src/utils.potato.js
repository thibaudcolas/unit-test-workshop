import moment from "moment";

import { isSameDay } from "./utils";

const today = moment();
const tomorrow = moment().add(1, "days");

describe("isSameDay", () => {
  it("returns true if args are the same day", () => {
    expect(isSameDay(today, today)).toBe(true);
  });

  it("returns false if args are not the same day", () => {
    expect(isSameDay(today, tomorrow)).toBe(false);
  });

  it("returns false for same days of week", () => {
    // Flags accidentally use of moment's day() function, which returns index
    // within the week.
    expect(isSameDay(moment("2000-01-01"), moment("2000-01-08"))).toBe(false);
  });

  describe("non-moment object arguments", () => {
    it("is false if first argument is not a moment object", () => {
      expect(isSameDay(null, today)).toBe(false);
    });

    it("is false if second argument is not a moment object", () => {
      expect(isSameDay(today, "foo")).toBe(false);
    });
  });
});
