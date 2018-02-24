import * as argon2 from "argon2";
import { checkcomplexity, solve, verify } from "../index";

jest.mock("argon2");

const static23 =
  "$argon2id$v=19$m=512,t=3,p=1$vTysnpkBUZ5JOw1plLzOlA$00y0PL/OgyLRCvsO+ovLjgBCrmOb+HTqXpvvc2GWZNw";

argon2.hash.mockImplementation(async () => Promise.resolve(static23));

beforeAll(() => {
  argon2.hash.mockClear();
});

describe("checkcomplexity", () => {
  it("should throw with complexity below 8", () => {
    expect(() => {
      checkcomplexity("asd123", 7);
    }).toThrow();
  });

  it("should return false for too low complexity", () => {
    expect(
      checkcomplexity("00c6xgIw0/SeFs7jn/iraBUmWmJAa+6+atdVYPaOJ+o", 29)
    ).toBe(false);
  });

  it("should return true for equal complexity", () => {
    expect(
      checkcomplexity("00c6xgIw0/SeFs7jn/iraBUmWmJAa+6+atdVYPaOJ+o", 23)
    ).toBe(true);
  });

  it("should return true for higher complexity", () => {
    expect(
      checkcomplexity("00c6xgIw0/SeFs7jn/iraBUmWmJAa+6+atdVYPaOJ+o", 12)
    ).toBe(true);
  });
});

describe("solve", () => {
  it("should throw with complexity below 8", async () => {
    try {
      let err = await solve("alma", { complexity: 7 });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      return;
    }
    expect(true).toBeFalsy();
  });

  it("should call argon2 hash with the correct default options", async () => {
    const options = {
      timeCost: 3,
      memoryCost: 9,
      parallelism: 1,
      type: argon2.argon2id
    };
    const solution = await solve("alma", { complexity: 9 });
    expect(argon2.hash).toHaveBeenCalledWith("alma", options);
  });

  it("should call argon2 hash with the correct options", async () => {
    const options = {
      timeCost: 4,
      memoryCost: 8,
      parallelism: 2,
      type: argon2.argon2id
    };
    const solution = await solve("alma", { ...options, complexity: 9 });
    expect(argon2.hash).toHaveBeenCalledWith("alma", options);
  });

  it("should return a hash with good complexity", async () => {
    const solution = await solve("alma", { complexity: 23 });
    expect(solution).toBe(static23);
  });
});

describe("verify", () => {
  it("should throw error with an unparsable hash", async () => {
    try {
      let err = await verify("alma", "BADHASH");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      return;
    }
    expect(true).toBeFalsy();
  });

  it("should return false when memory cost is less than configured constraint", async () => {
    const result = await verify("alma", static23, { memoryCost: 13 });
    expect(result).toBe(false);
  });

  it("should return false when cpu cost is less than configured constraint", async () => {
    const result = await verify("alma", static23, { timeCost: 4 });
    expect(result).toBe(false);
  });

  it("should return false when parallelism is different to configured", async () => {
    const result = await verify("alma", static23, { parallelism: 2 });
    expect(result).toBe(false);
  });

  it("should return false when actual complexity is less than configured", async () => {
    const result = await verify("alma", static23, { complexity: 29 });
    expect(result).toBe(false);
  });

  it("should call argon2 verify with the correct parameters", async () => {
    argon2.verify.mockImplementation(async () => Promise.resolve(true));
    const result = await verify("alma", static23, { complexity: 11 });
    expect(argon2.verify).toHaveBeenCalledWith(static23, "alma");
  });

  it("should return false when argon2 verification fails", async () => {
    argon2.verify.mockImplementation(async () => Promise.resolve(false));
    const result = await verify("alma", static23, { complexity: 11 });
    expect(result).toBe(false);
  });

  it("should return true when argon2 verification succeeds", async () => {
    argon2.verify.mockImplementation(async () => Promise.resolve(true));
    const result = await verify("alma", static23, { complexity: 11 });
    expect(result).toBe(true);
  });
});
