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


/**
 * Parsing a signed transaction hex is done by performing the following:
 *
 * POST https://alphanet-node.tzscan.io/chains/main/blocks/head/helpers/parse/operations
 * Request:
 * {
 *   "operations": [
 *     {
 *       "data": "0800002122d44d997e158c36c60649d198c4175dad425efa09d2a405f44e00f6f0b40201420eaa410ac21addf427211cddd6115cba385a94000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
 *       "branch": "BLpcXF8ADJbGuyUKNv7TypXRd5rqnoPn3PMqJLNBeRSr4VFeUuK"
 *     }
 *   ]
 * }
 *
 * Response:
 * [
 *   {
 *     "branch": "BLpcXF8ADJbGuyUKNv7TypXRd5rqnoPn3PMqJLNBeRSr4VFeUuK",
 *     "contents": [
 *       {
 *         "kind": "transaction",
 *         "source": "tz1NfEiS2uJsX43vowNjau5pdqg3Nvy8whvc",
 *         "fee": "1274",
 *         "counter": "86610",
 *         "gas_limit": "10100",
 *         "storage_limit": "0",
 *         "amount": "5060726",
 *         "destination": "KT1Ec3jNXyxyA54nezwcjGDRoutECJCQjpya"
 *       }
 *     ],
 *     "signature": "edsigtXomBKi5CTRf5cjATJWSyaRvhfYNHqSUGrn4SdbYRcGwQrUGjzEfQDTuqHhuA8b2d8NarZjz8TRf65WkpQmo423BtomS8Q"
 *   }
 * ]
 *
 * The length of 'contents' key will determine the number of transactions the user wants to perform.
 *
 * Reference: https://tezos.stackexchange.com/questions/1199/how-to-use-rpc-parse-operations-endpoint/1210#1210
 */
