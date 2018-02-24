import * as argon2 from "argon2";

const solve = async (
  input,
  { timeCost = 3, memoryCost = 9, parallelism = 1, complexity = 19 } = {}
) => {
  const options = {
    timeCost,
    memoryCost,
    parallelism,
    type: argon2.argon2d
  };

  if (complexity < 8) {
    throw new Error("complexity must be at least 8");
  }

  try {
    for (;;) {
      const hash = await argon2.hash(input, options);
      if (await checkcomplexity(hash.split("$")[5], complexity)) {
        return hash;
      }
    }
  } catch (error) {
    throw error;
  }
};

const verify = async (
  input,
  hash,
  { timeCost = 3, memoryCost = 9, parallelism = 1, complexity = 19 } = {}
) => {
  const parsed = hash.split("$");
  const regexp = /m=([0-9]+),t=([0-9]+),p=([0-9]+)/;

  if (parsed[3] === undefined) {
    throw new Error("Invalid hash");
  }

  const matches = parsed[3].match(regexp);

  if (!matches) {
    throw new Error("Invalid hash");
  }

  if (matches[1] < Math.pow(2, memoryCost)) {
    return false;
  }

  if (matches[2] < timeCost) {
    return false;
  }

  if (matches[3] != parallelism) {
    return false;
  }

  if (!checkcomplexity(parsed[5], complexity)) {
    return false;
  }

  const result = await argon2.verify(hash, input);

  return result;
};

const checkcomplexity = (hash, complexity) => {
  if (complexity < 8) {
    throw new Error("complexity must be at least 8");
  }

  let off = 0;
  let i;

  for (i = 0; i <= complexity - 8; i += 8, off++) {
    if (hash[off] !== "0") return false;
  }

  const mask = 0xff << (8 + i - complexity);
  return (hash[off] & mask) === 0;
};

module.exports = {
  checkcomplexity,
  solve,
  verify
};
