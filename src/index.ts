export class StatsAccumulator {
  private count: number = 0;
  private sum: number = 0;
  private sum2: number = 0;

  insert(value: number) {
    this.sum += value;
    this.sum2 += value * value;
    this.count++;
  }

  getCount() {
    return this.count;
  }

  getAverage() {
    if (this.count < 1) {
      throw new Error(
        "there must be at least one sample to calculate the average"
      );
    }
    return this.sum / this.count;
  }

  getVariation() {
    if (this.count < 2) {
      throw new Error(
        "there must be at least two samples to calculate the variation"
      );
    }
    const average = this.getAverage();
    const average2 = average * average;
    return (
      (this.sum2 - 2 * average * this.sum + this.count * average2) /
      (this.count - 1)
    );
  }

  getStandardDeviation() {
    return Math.sqrt(this.getVariation());
  }
}
