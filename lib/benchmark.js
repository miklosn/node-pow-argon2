import { Benchmark, Suite } from "sandra";
import * as pow from "./index";

const pushSolve = (suite, input, t, m, p, c) => {
  suite.push(`solve[t=${t}, m=${m}, p=${2}, c=${8}]`, pow.solve, input, {
    timeCost: t,
    memoryCost: m,
    parallelism: p,
    complexity: c
  });
};

const logEvent = event => {
  console.log(event.toString());
};

const main = async () => {
  const input = "0123456789ABCDEF";

  const solveSuite = new Suite("solve");
  const verifySuite = new Suite("verify");
  console.log(await pow.solve("x", "x"));

  pushSolve(solveSuite, input, 1, 15, 2, 8);
  pushSolve(solveSuite, input, 1, 16, 2, 8);
  pushSolve(solveSuite, input, 1, 17, 2, 8);
  pushSolve(solveSuite, input, 1, 18, 2, 8);
  pushSolve(solveSuite, input, 1, 19, 2, 8);

  verifySuite.push(
    "verify",
    pow.verify,
    "x",
    "$argon2d$v=19$m=512,t=3,p=1$x+qyCc4ZcX79+lATSyhEhQ$00056gSabWkJXAlsWK+QRJ3coP5aM8WhtQqP0Ci9VLA"
  );

  verifySuite.on("cycle", event => logEvent(event));

  await verifySuite.run({
    timeout: 2000
  });
};

main();
