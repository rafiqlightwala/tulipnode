// The Tulip Indicators C code already has extensive tests. This test is really
// only to prove that the code compiled properly and is interfacing with node.

var tulind = require("./index");
var l = require("minctest");

console.log("Tulip Node Test Suite\nTulip Indicators version:" + tulind.version);

var equal = function(a, b) {
  // Check if two arrays are equal.

  if (a.length != b.length) {
    console.log("Array length mismatch.");
    return false;
  }

  for (var i = 0; i < a.length; ++i) {
    l.fequal(a[i], b[i]);
  }

  return true;
};

l.run("array dema", function() {
  var a = [122.906,126.500,140.406,174.000,159.812,170.000,176.750,175.531,166.562,163.750,170.500,175.000,184.750,202.781];
  var b = [172.0780,168.5718,170.2278,173.4940,180.5297,194.1428];

  tulind.indicators.dema.indicator([a], [5], function(err, results) {
    l.ok(equal(results[0], b));
  });
});

// Additional test cases here (array sma, ema, tema, wilders)...

// Check Node.js version
const nodeVersion = process.versions.node;
const majorVersion = parseInt(nodeVersion.split('.')[0]);

// Handle Node.js version 18 and above
if (majorVersion >= 20) {
  // Node.js 18 and above expect a numeric exit code
  process.exitCode = l.results() ? 0 : 1;
} else {
  // Node.js below version 18 can use process.exit()
  process.exit(l.results() ? 0 : 1);
}
