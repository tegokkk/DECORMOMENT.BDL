import test from 'node:test';
import assert from 'node:assert/strict';
import { formatRupiah, getActivePrice } from '../../src/lib/pricing.js';

test('formatRupiah', async (t) => {
  await t.test('formats positive numbers correctly', () => {
    assert.match(formatRupiah(80000), /Rp\s?80\.000/i);
  });
  
  await t.test('handles invalid input gracefully', () => {
    assert.equal(formatRupiah(null), '');
    assert.equal(formatRupiah(NaN), '');
    assert.equal(formatRupiah('100'), '');
  });
});

test('getActivePrice', async (t) => {
  await t.test('returns null if price is not verified', () => {
    assert.equal(getActivePrice({ amount: 100, verified: false }), null);
  });
  
  await t.test('returns amount if price is verified and no validUntil', () => {
    assert.equal(getActivePrice({ amount: 100, verified: true }), 100);
  });
  
  await t.test('returns null if promo is expired', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    assert.equal(getActivePrice({ amount: 100, verified: true, validUntil: pastDate.toISOString() }), null);
  });
});
