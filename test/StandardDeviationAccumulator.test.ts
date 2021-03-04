import { describe, it } from "mocha";
import { expect, use } from "chai";
import chaiAlmost from "chai-almost";
import { StatsAccumulator } from "../src";

use(chaiAlmost(1e-9));

describe("StandardDeviationAccumulator", () => {
  it("zero values", () => {
    const acc = new StatsAccumulator();
    expect(acc.getCount()).to.eql(0);
    expect(() => {
      acc.getAverage();
    }).to.throw();
    expect(() => {
      acc.getVariation();
    }).to.throw();
  });

  it("one value", () => {
    const acc = new StatsAccumulator();
    acc.insert(1);
    expect(acc.getCount()).to.eql(1);
    expect(acc.getAverage()).to.eql(1);
    expect(() => {
      acc.getVariation();
    }).to.throw();
  });

  it("two values", () => {
    const acc = new StatsAccumulator();
    acc.insert(1);
    acc.insert(2);
    expect(acc.getCount()).to.eql(2);
    expect(acc.getAverage()).to.eql(1.5);
    expect(acc.getVariation()).to.eql(0.5);
    expect(acc.getStandardDeviation()).to.almost.equal(Math.sqrt(0.5));
  });

  describe("randomized tests", () => {
    // I'm just kinda trusting that these two functions
    // are correct because they're really simple.
    function average(xs: number[]) {
      let sum = 0;
      for (const v of xs) {
        sum += v;
      }
      return sum / xs.length;
    }
    function variation(xs: number[]) {
      const u = average(xs);
      let sum = 0;
      for (const x of xs) {
        const delta = x - u;
        sum += delta * delta;
      }
      return sum / (xs.length - 1);
    }

    for (let i = 0; i < 100; i++) {
      const size = 2 + Math.floor(20 * Math.random());
      const values = new Array(size);
      for (let j = 0; j < size; j++) {
        values[j] = 1000 * (Math.random() - 0.5);
      }
      it(`${values}`, () => {
        const acc = new StatsAccumulator();
        for (const v of values) {
          acc.insert(v);
        }
        expect(acc.getAverage()).to.almost.equal(average(values));
        expect(acc.getVariation()).to.almost.equal(variation(values));
      });
    }
  });
});
