import * as argon2 from "argon2";

const options = {
  timeCost: 3,
  memoryCost: 9,
  parallelism: 2,
  type: argon2.argon2id
};

const solve = async (input, complexity) => {
  let nonce = 0;

  console.log(input);
  console.log(complexity);
  for (;;) {
    nonce++;
    const hash = await argon2.hash(input, options);
    if (checkcomplexity(hash.split("$")[5], complexity)) {
      return hash;
    }
  }
};

const checkcomplexity = (hash, complexity) => {
  let off = 0;
  let i;

  for (i = 0; i <= complexity - 8; i += 8, off++) {
    if (hash[off] !== "0") return false;
  }

  console.log("continued");

  console.log(i);
  console.log(hash[off]);
  const mask = 0xff << (8 + i - complexity);
  console.log(hash[off] & mask);
  return (hash[off] & mask) === 0;
};

const hello = async () => {
  const nonce = await solve("hello", 19);
  console.log(nonce);
};

hello();
