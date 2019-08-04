//https://cryptonomic.github.io/ConseilJS/#/
import { ConseilMetadataClient } from 'conseiljs';
import * as util from 'util';

const conseilServerInfo = { url: '', apiKey: '' };
//const cryptoRef = { chain: 'tezos', net: 'aplhanet' };

// List networks
async function listNetworks( cryptoRef ) {
    const platforms = await ConseilMetadataClient.getNetworks(conseilServerInfo, cryptoRef.chain );
    console.log(`${util.inspect(platforms, false, 2, false)}`);
}

// List Entities

async function listEntities( cryptoRef ) {
    const platforms = await ConseilMetadataClient.getEntities(conseilServerInfo, cryptoRef.chain, cryptoRef.net);
    console.log(`${util.inspect(platforms, false, 2, false)}`);
}

// List Entitie Attributes

async function listAttributes( cryptoRef ) {
    const platforms = await ConseilMetadataClient.getAttributes(conseilServerInfo, cryptoRef.chain, cryptoRef.net, 'operations');
    console.log(`${util.inspect(platforms, false, 2, false)}`);
}

// List Attribute Values

async function listAttributeValues( cryptoRef ) {
    const platforms = await ConseilMetadataClient.getAttributeValues(conseilServerInfo, cryptoRef.chain, cryptoRef.net, 'operations', 'kind');
    console.log(`${util.inspect(platforms, false, 2, false)}`);
}

export { listAttributeValues, listAttributes, listEntities, listNetworks };
