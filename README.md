# node-pow-argon2

An Argon2-based proof of work library for Node

[![Greenkeeper badge](https://badges.greenkeeper.io/miklosn/node-pow-argon2.svg)](https://greenkeeper.io/) 
[![npm version](https://badge.fury.io/js/node-pow-argon2.svg)](https://badge.fury.io/js/node-pow-argon2)

## Functions

### solve

Syntax:

`solve (input, options)`

### verify

`verify (input, proof, options)`

## Benchmark

```
pow#[t=1, m=15, p=2, c=8] x 0.88 ops/sec ±0.93% (106 runs sampled)
pow#[t=1, m=16, p=2, c=8] x 0.38 ops/sec ±1.02% (46 runs sampled)
pow#[t=1, m=17, p=2, c=8] x 0.20 ops/sec ±0.78% (24 runs sampled)
pow#[t=1, m=18, p=2, c=8] x 0.07 ops/sec ±1.52% (12 runs sampled)
pow#[t=1, m=19, p=2, c=8] x 0.03 ops/sec ±0.62% (4 runs sampled)
verify#verify x 950.02 ops/sec ±0.09% (1899 runs sampled)
```
