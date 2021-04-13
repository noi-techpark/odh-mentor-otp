"use strict";

var _time = require("../../../../test-utils/time");

var _time2 = require("../time");

describe("time", () => {
  afterEach(_time.restoreDateNowBehavior);
  describe("getCurrentDate", () => {
    it("should return current date at specified timezone", () => {
      (0, _time.setDefaultTestTime)();
      expect((0, _time2.getCurrentDate)("America/New_York")).toMatchSnapshot();
    });
  });
  describe("getCurrentTime", () => {
    it("should return time at specified timezone", () => {
      (0, _time.setDefaultTestTime)();
      expect((0, _time2.getCurrentTime)("America/New_York")).toMatchSnapshot();
    });
  });
});

//# sourceMappingURL=time.js