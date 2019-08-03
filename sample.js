const { default: Sotez } = require('sotez');

/**
 * Deployed Contract: KT1JRpDEXMxGMaJgeJgEULkYYSynfLHG4Hzb
 *
 * Retrieve Contract Storage:
 * https://alphanet-node.tzscan.io/chains/main/blocks/head/context/contracts/KT1DMBFZ4f6PUHoG3Du5VXEW4XqKfBfoeWJs/storage
 *
 */

const KEY = {
  sk: 'edsk2j1eR46vQFZ1bJBCKYjAwXTANgavsf24E9FVcwo9apULz9epZK',
  pkh: 'tz1do3fDR8HB9cuUXu6m2zYH9qgudt1fqZQW',
};

const KEY2 = {
  sk: 'edsk46atr795NStaxX7mv7fNwJJ3edfpNdMeqMBBr8kKwbmdVpTiHQ',
  pkh: 'tz1iwPSJSQzcGqUfGR8GELxckpUNQfJYw3Wd',
}

const tez = new Sotez('https://alphanet-node.tzscan.io', 'main', 'alpha');

const depositOperation = {
  "kind": "transaction",
  "source": "tz1do3fDR8HB9cuUXu6m2zYH9qgudt1fqZQW",
  "fee": "1000000",
  "gas_limit": "800000",
  "storage_limit": "60000",
  "amount": "10000000",
  "destination": "KT1JRpDEXMxGMaJgeJgEULkYYSynfLHG4Hzb",
  "parameters": {
    "prim": "Left",
    "args": [
      { "prim": "Unit" }
    ]
  }
};

const depositCredits = async () => {
  await tez.importKey(KEY2.sk);

  const { hash } = await tez.sendOperation({ operation: depositOperation });
  console.log(`Injected Operation Hash: ${hash}`);

  const block = await tez.awaitOperation(hash);
  console.log(`Operation found in block ${block}`);
};

const debitOperation = {
  "kind": "transaction",
  "source": "tz1do3fDR8HB9cuUXu6m2zYH9qgudt1fqZQW",
  "fee": "1000000",
  "gas_limit": "800000",
  "storage_limit": "60000",
  "amount": "0",
  "destination": "KT1DMBFZ4f6PUHoG3Du5VXEW4XqKfBfoeWJs",
  "parameters": {
    "prim": "Right",
    "args": [
      [
        {
          "prim": "Elt",
          "args": [
            { "string": "tz1do3fDR8HB9cuUXu6m2zYH9qgudt1fqZQW" },
            { "int": "50" }
          ]
        },
        {
          "prim": "Elt",
          "args": [
            { "string": "tz1iwPSJSQzcGqUfGR8GELxckpUNQfJYw3Wd" },
            { "int": "50" }
          ]
        }
      ]
    ]
  }
};

const debitCredits = async () => {
  await tez.importKey(KEY.sk);

  const { hash } = await tez.sendOperation({ operation: debitOperation });
  console.log(`Injected Operation Hash: ${hash}`);

  const block = await tez.awaitOperation(hash);
  console.log(`Operation found in block ${block}`);
};

// depositCredits();
// debitCredits();
