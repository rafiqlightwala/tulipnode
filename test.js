// The Tulip Indicators C code already has extensive tests. This test is really
// only to prove that the code compiled properly and is interfacing with node.

const tulind = require("./index");
const l = require("minctest");

console.log("Tulip Node Test Suite\nTulip Indicators version:" + tulind.version);

// Modified equal function: Simply calls l.fequal for each element
const equal = function(a, b) {
  if (a.length !== b.length) {
    console.log("Array length mismatch.");
    return false;
  }

  a.forEach((value, index) => {
    l.fequal(value, b[index], `Mismatch at index ${index}: ${value} !== ${b[index]}`);
  });

  return true;
};

l.run("array dema", function(done) {
  // atoz page 123
  const a = [122.906, 126.500, 140.406, 174.000, 159.812, 170.000, 176.750, 175.531, 166.562, 163.750, 170.500, 175.000, 184.750, 202.781];
  const b = [172.0780, 168.5718, 170.2278, 173.4940, 180.5297, 194.1428];

  tulind.indicators.dema.indicator([a], [5], function(err, results) {
    if (err) {
      console.error("Error in dema indicator:", err);
      l.ok(false, "DEMA indicator failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], b), "DEMA indicator output mismatch.");
    done();
  });
});

l.run("array sma", function(done) {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  tulind.indicators.sma.indicator([a], [2], function(err, results) {
    if (err) {
      console.error("Error in SMA indicator with period 2:", err);
      l.ok(false, "SMA period 2 failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5]), "SMA period 2 output mismatch.");
    done();
  });

  tulind.indicators.sma.indicator([a], [3], function(err, results) {
    if (err) {
      console.error("Error in SMA indicator with period 3:", err);
      l.ok(false, "SMA period 3 failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], [2, 3, 4, 5, 6, 7, 8, 9]), "SMA period 3 output mismatch.");
    done();
  });

  tulind.indicators.sma.indicator([a], [4], function(err, results) {
    if (err) {
      console.error("Error in SMA indicator with period 4:", err);
      l.ok(false, "SMA period 4 failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], [2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5]), "SMA period 4 output mismatch.");
    done();
  });

  tulind.indicators.sma.indicator([a], [4]).then(function(results) {
    l.ok(equal(results[0], [2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5]), "SMA period 4 (Promise) output mismatch.");
    done();
  }).catch(function(err) {
    console.error("Error in SMA indicator with period 4 (Promise):", err);
    l.ok(false, "SMA period 4 (Promise) failed due to error.");
    done();
  });

  tulind.indicators.sma.indicator([a], [10], function(err, results) {
    if (err) {
      console.error("Error in SMA indicator with period 10:", err);
      l.ok(false, "SMA period 10 failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], [5.5]), "SMA period 10 output mismatch.");
    done();
  });

  tulind.indicators.sma.indicator([a], [10]).then(function(results) {
    l.ok(equal(results[0], [5.5]), "SMA period 10 (Promise) output mismatch.");
    done();
  }).catch(function(err) {
    console.error("Error in SMA indicator with period 10 (Promise):", err);
    l.ok(false, "SMA period 10 (Promise) failed due to error.");
    done();
  });

  tulind.indicators.sma.indicator([a], [11], function(err, results) {
    if (err) {
      console.error("Error in SMA indicator with period 11:", err);
      l.ok(false, "SMA period 11 failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], []), "SMA period 11 output mismatch.");
    done();
  });

  // atoz page 207
  const c = [25, 24.875, 24.781, 24.594, 24.5, 24.625, 25.219, 27.25];
  const b_sma_c = [24.75, 24.675, 24.744, 25.238];
  tulind.indicators.sma.indicator([c], [5], function(err, results) {
    if (err) {
      console.error("Error in SMA indicator with period 5 (second case):", err);
      l.ok(false, "SMA period 5 (second case) failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], b_sma_c), "SMA period 5 (second case) output mismatch.");
    done();
  });
});

l.run("array ema", function(done) {
  // atoz page 209
  const a = [25, 24.875, 24.781, 24.594, 24.5, 24.625, 25.219, 27.25];
  const b = [25, 24.958, 24.899, 24.797, 24.698, 24.674, 24.856, 25.654];
  tulind.indicators.ema.indicator([a], [5], function(err, results) {
    if (err) {
      console.error("Error in EMA indicator:", err);
      l.ok(false, "EMA indicator failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], b), "EMA indicator output mismatch.");
    done();
  });
});

l.run("array tema", function(done) {
  // atoz page 123
  const a = [122.906, 126.500, 140.406, 174.000, 159.812, 170.000, 176.750, 175.531, 166.562, 163.750, 170.500, 175.000, 184.750, 202.781, 209.656, 201.312];
  const b = [182.8312, 198.5565, 209.4760, 207.2200];
  tulind.indicators.tema.indicator([a], [5], function(err, results) {
    if (err) {
      console.error("Error in TEMA indicator:", err);
      l.ok(false, "TEMA indicator failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], b), "TEMA indicator output mismatch.");
    done();
  });
});

l.run("array wilders", function(done) {
  // atoz page 366
  const a = [62.125, 61.125, 62.3438, 65.3125, 63.9688, 63.4375, 63, 63.7812, 63.4062, 63.4062, 62.4375, 61.8438];
  const b = [62.975, 63.0675, 63.054, 63.1995, 63.2408, 63.2739, 63.1066, 62.8540];
  tulind.indicators.wilders.indicator([a], [5], function(err, results) {
    if (err) {
      console.error("Error in Wilders indicator:", err);
      l.ok(false, "Wilders indicator failed due to error.");
      done();
      return;
    }
    l.ok(equal(results[0], b), "Wilders indicator output mismatch.");
    done();
  });
});

// Exit with appropriate code: 0 if all tests passed, 1 otherwise
process.exit(l.results() ? 0 : 1);
