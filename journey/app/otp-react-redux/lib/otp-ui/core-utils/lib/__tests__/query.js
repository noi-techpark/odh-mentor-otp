"use strict";

var _time = require("../../../../test-utils/time");

var _query = require("../query");

describe("query", () => {
  afterEach(_time.restoreDateNowBehavior);
  describe("planParamsToQuery", () => {
    it("should parse a depart at query", async () => {
      expect(await (0, _query.planParamsToQuery)({
        arriveBy: "false",
        bannedRoutes: "897ABC",
        companies: "",
        date: "2019-10-31",
        fromPlace: "Guide Dogs for the Blind, Portland, OR, USA::45.517373,-122.675601",
        ignoreRealtimeUpdates: "true",
        maxWalkDistance: "1207",
        mode: "BUS,TRAM,RAIL,GONDOLA,WALK",
        optimize: "QUICK",
        showIntermediateStops: "true",
        time: "17:45",
        toPlace: "Weather Machine, Portland, OR, USA::45.519015,-122.679321",
        ui_activeItinerary: "0",
        ui_activeSearch: "irc7h4rb8",
        walkSpeed: "1.34"
      })).toMatchSnapshot();
    });
  });
  describe("getDefaultQuery", () => {
    it("should return default query", () => {
      (0, _time.setDefaultTestTime)();
      expect((0, _query.getDefaultQuery)()).toMatchSnapshot();
    });
  });
  describe("parseLocationString", () => {
    it("should return null for null input", () => {
      expect((0, _query.parseLocationString)(null)).toMatchSnapshot();
    });
    it("should return location for valid input", () => {
      expect((0, _query.parseLocationString)("123 Main St::33.983929829,-87.3892387982")).toMatchSnapshot();
    });
    it("should return location with coordinates as name for coordinates-only input", () => {
      expect((0, _query.parseLocationString)("33.983929829,-87.3892387982")).toMatchSnapshot();
    });
  });
});