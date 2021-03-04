# Running Stats Calculator

## Overview

This package can be used to efficiently calculate running statistics. This would be useful if you want to keep taking samples until the standard deviation is below some acceptable threshold.

The main export of this package is the `StatsAccumulator` class. It uses [online algorithms](https://en.wikipedia.org/wiki/Online_algorithm) which means the class:

- uses constant memory
- inserts new values in constant time
- calculates statistics in constant time

This is the dream trifecta for efficiency.

## Example

Using the accumulator is pretty simple.

```tsx
import { StatsAccumulator } from "running-stats-calculator";

const acc = new StatsAccumulator();
acc.insert(1.234);
acc.insert(5.678);

console.log(acc.getAverage());
console.log(acc.getVariation());
console.log(acc.getStandardDeviation());
```

And if you want to run until the standard deviation is sufficiently low:

```tsx
while (acc.getCount() < 2 || acc.getStandardDeviation() < 123) {
  const sample = getSample();
  acc.insert(sample);
}
```

## Testing

`yarn test`

All tests are located in `/test/` and a combination of manual tests and randomized tests are used to make sure the calculator is correct.

## Building

`yarn build`

This library uses the typescript compiler to produce `/dist/` which contains compiled .js and .d.ts files. It targets `ES2015`.
