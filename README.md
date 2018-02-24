# node-pow-argon2

An Argon2-based proof of work library for Node

[![Greenkeeper badge](https://badges.greenkeeper.io/miklosn/node-pow-argon2.svg)](https://greenkeeper.io/) 
[![npm version](https://badge.fury.io/js/node-pow-argon2.svg)](https://badge.fury.io/js/node-pow-argon2)

## Functions

### solve

Syntax:

`hash = solve (input, options)`

Example:

```javascript
import * as pow from 'node-pow-argon2'

...

const proof = await pow.solve(input, { complexity: 20 });
```

Options:

The following options are available, along with their defaults:

```javascript
{
    timeCost: 1
    memoryCost: 14,   // MUST be at least 3
    parallelism: 2,
    complexity: 8     // MUST be at least 8
}
```

### verify

Syntax:

`verify (input, proof, options)`

Example:

```javascript
import * as pow from 'node-pow-argon2'

...
const proof = '$argon2d$v=19$m=512,t=3,p=1$x+qyCc4ZcX79+lATSyhEhQ$00056gSabWkJXAlsWK+QRJ3coP5aM8WhtQqP0Ci9VLA';
const input = 'x';
const result = await pow.verify(input, proof, { complexity: 20 });
```

Options:

The following options are available, along with their defaults:

```javascript
{
    timeCost: 1       // Proof must have been created with AT LEAST this value to not fail
    memoryCost: 14,   // Proof must have been created with AT LEAST this value to not fail
    parallelism: 2,   // Proof must have been created with EXACTLY this value to not fail
    complexity: 8     // At least 8. Proof MUST have AT LEAST this complexity.
}
```

## Benchmark

```
pow#[t=1, m=15, p=2, c=8] x 0.88 ops/sec ±0.93% (106 runs sampled)
pow#[t=1, m=16, p=2, c=8] x 0.38 ops/sec ±1.02% (46 runs sampled)
pow#[t=1, m=17, p=2, c=8] x 0.20 ops/sec ±0.78% (24 runs sampled)
pow#[t=1, m=18, p=2, c=8] x 0.07 ops/sec ±1.52% (12 runs sampled)
pow#[t=1, m=19, p=2, c=8] x 0.03 ops/sec ±0.62% (4 runs sampled)
verify#verify x 950.02 ops/sec ±0.09% (1899 runs sampled)
```
