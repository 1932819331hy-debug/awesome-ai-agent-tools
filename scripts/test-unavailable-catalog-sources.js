#!/usr/bin/env node
// Offline regression for the 13 public-unavailable sources listed in issue #102.
// GitHub lookups returned 404 on 2026-10-29; that does not prove deletion.
// This verifies the catalog cleanup, not current remote availability.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const removed = [
  ["skills","skills","bounty-guard","doomsday-network/bounty-guard"],
  ["skills","skills","web3-agent-skills","doomsday-network/web3-agent-skills"],
  ["skills","skills","doom-pay","doomsday-network/doom-pay"],
  ["mcps","servers","whale-coupons","whalecoupons/whale-coupons-mcp"],
  ["mcps","servers","bounty-guard","doomsday-network/bounty-guard"],
  ["mcps","servers","doomsday-network","doomsday-network/doomsday"],
  ["subagents","subagents","web3-agent-skills-subagents","doomsday-network/web3-agent-skills"],
  ["hooks","hooks","bounty-guard-pre-audit","doomsday-network/bounty-guard"],
  ["plugins","plugins","bounty-guard-plugin","doomsday-network/bounty-guard"],
  ["prompts","prompts","bounty-guard-security-prompts","doomsday-network/bounty-guard"],
  ["tools","tools","github-bounty-scanner","doomsday-network/github-bounty-scanner"],
  ["tools","tools","cuda-gpu-miner","doomsday-network/cuda-gpu-miner"],
  ["tools","tools","doom-pay","doomsday-network/doom-pay"],
];

for (const [folder, key, id, repo] of removed) {
  test(`catalog no longer advertises unavailable source: ${folder}/${id}`, () => {
    const data = JSON.parse(fs.readFileSync(path.join(root, folder, 'catalog.json'), 'utf8'));
    assert.ok(Array.isArray(data[key]), `Expected the ${folder} catalog array`);
    assert.equal(data[key].filter(entry => entry.id === id).length, 0,
      `Issue #102 entry ${folder}/${id} still advertises ${repo}`);
  });
}
