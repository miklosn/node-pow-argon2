import { Benchmark, Suite } from "sandra";
import * as pow from "./index";

const pushSolve = (suite, input, t, m, p, c) => {
  suite.push(`[t=${t}, m=${m}, p=${2}, c=${8}]`, pow.solve, input, {
    timeCost: t,
    memoryCost: m,
    parallelism: p,
    complexity: c
  });
};

const main = async () => {
  const input = "0123456789ABCDEF";

  const suite = new Suite("pow");

  pushSolve(suite, input, 1, 15, 2, 8);
  pushSolve(suite, input, 1, 16, 2, 8);
  pushSolve(suite, input, 1, 17, 2, 8);
  pushSolve(suite, input, 1, 18, 2, 8);
  pushSolve(suite, input, 1, 19, 2, 8);

  suite.on("cycle", event => {
    console.log(event.toString());
  });

  await suite.run({
    timeout: 120000
  });
};

main();
