const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

import { listAccountTransactions } from './utilsAnalytics';
// Already initialized admin SDK instance
const admin = require("services/admin.js");

//Document data structure might look like thsi:
// Collection Name => tezGatewayUsers
// documentID => user Hash
// { 2jnr4k: { value: 100 , createAt: 122414235423, lastRequest: 122445 }, 
//   3jnr5k: { value: 50 , createAt: 152414235423, lastRequest: 12234234 } }
// functions.firestore.document("tezGatewayUsers/{userHash}");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
app.use(myMiddleware);

// build multiple CRUD interfaces:
// curl -X GET -H "Content-Type:application/json" -H "X-TezRequest: tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z" 
// HTTP_TRIGGER_ENDPOINT/tezosGateway/?tezAddress=tz1aCy8b6Ls4Gz7m5SbANjtMPiH6dZr9nnS2'
app.get('/:tezAddress', (req, res) => {
    console.log(req)
    //TODO: @Andrew how can I create this as a function with a couple of if statements?
    let requestAccount = req.get('x-tezrequest');
    const gatewayAccountValue = await admin.firestore.collection('tezGatewayUsers').doc(requestAccount).get().data();
    if ( gatewayAccountValue.value > 0 ) {
        res.status(200).send(listAccountTransactions(req.params.tezAddress))
        admin.firestore.collection('tezGatewayUsers').document(requestAccount).updateData(
            [
                "value": FieldValue.increment(-1),
                "lastRequest": FieldValue.serverTimestamp()
        ])
    }
    return res.status(200).send(`Oh sorry, but no more credits available for account ${requestAccount}`)
    );
}
// Expose Express API as a single Cloud Function:
exports.tezosGateway = functions.https.onRequest(app);



// app.get('/:id', (req, res) => res.status(200).send(Widgets.getById(req.params.id)));
// app.post('/', (req, res) => res.status(200).send(Widgets.create()));
// app.put('/:id', (req, res) => res.status(200).send(Widgets.update(req.params.id, req.body)));

// app.get('/', (req, res) => res.status(200).send(Widgets.list()));
