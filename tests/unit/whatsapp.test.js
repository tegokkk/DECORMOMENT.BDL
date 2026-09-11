import test from 'node:test';
import assert from 'node:assert/strict';
import { createWhatsAppUrl } from '../../src/lib/whatsapp.js';

test('createWhatsAppUrl', async (t) => {
  await t.test('returns valid url for valid contact', () => {
    const contact = { number: '628123456789', verified: true };
    const url = createWhatsAppUrl(contact, 'Hello');
    assert.equal(url, 'https://wa.me/628123456789?text=Hello');
  });

  await t.test('returns null for unverified contact', () => {
    const contact = { number: '628123456789', verified: false };
    assert.equal(createWhatsAppUrl(contact, 'Hello'), null);
  });

  await t.test('returns null for invalid number format', () => {
    const contact = { number: '08123456789', verified: true }; // tidak mulai dengan 62
    assert.equal(createWhatsAppUrl(contact, 'Hello'), null);
  });
});
