const { ConseilDataClient, ConseilQueryBuilder, ConseilSortDirection, ConseilOperator } = require('conseiljs');
const util = require('util');

const platform = 'tezos';
const network = 'alphanet';
const entity = 'operations';

const conseilServer = { url: '', apiKey: '' };

async function listAccountTransactions( address ) {
    let sendQuery = ConseilQueryBuilder.blankQuery();
    sendQuery = ConseilQueryBuilder.addFields(sendQuery, 'block_level', 'timestamp', 'source', 'destination', 'amount', 'fee', 'counter');
    sendQuery = ConseilQueryBuilder.addPredicate(sendQuery, 'kind', ConseilOperator.EQ, ['transaction'], false);
    sendQuery = ConseilQueryBuilder.addPredicate(sendQuery, 'source', ConseilOperator.EQ, [ address ], false);
    sendQuery = ConseilQueryBuilder.addPredicate(sendQuery, 'status', ConseilOperator.EQ, ['applied'], false);
    sendQuery = ConseilQueryBuilder.addOrdering(sendQuery, 'block_level', ConseilSortDirection.DESC);
    sendQuery = ConseilQueryBuilder.setLimit(sendQuery, 100);

    let receiveQuery = ConseilQueryBuilder.blankQuery();
    receiveQuery = ConseilQueryBuilder.addFields(receiveQuery, 'block_level', 'timestamp', 'source', 'destination', 'amount', 'fee', 'counter');
    receiveQuery = ConseilQueryBuilder.addPredicate(receiveQuery, 'kind', ConseilOperator.EQ, ['transaction'], false);
    receiveQuery = ConseilQueryBuilder.addPredicate(receiveQuery, 'destination', ConseilOperator.EQ, [ address ], false);
    receiveQuery = ConseilQueryBuilder.addPredicate(receiveQuery, 'status', ConseilOperator.EQ, ['applied'], false);
    receiveQuery = ConseilQueryBuilder.addOrdering(receiveQuery, 'block_level', ConseilSortDirection.DESC);
    receiveQuery = ConseilQueryBuilder.setLimit(receiveQuery, 100);

    const sendResult = await ConseilDataClient.executeEntityQuery(conseilServer, platform, network, entity, sendQuery);
    const receiveResult = await ConseilDataClient.executeEntityQuery(conseilServer, platform, network, entity, receiveQuery);
    const transactions = sendResult.concat(receiveResult).sort(( a, b ) => { return a['timestamp'] - b['timestamp'] });

    console.log(`${util.inspect(transactions, false, 2, false)}`);
}

module.exports = listAccountTransactions;
