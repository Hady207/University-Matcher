const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const serviceAccount = require("./chatbot-master-v1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatbot-master-v1.firebaseio.com",
});

const { SessionClient } = require("dialogflow");

exports.dialogflowGateway = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { queryInput, sessionId } = request.body;
    const SessionClient = await SessionClient({ credential: serviceAccount });
    const session = SessionClient.sessionPath("chatbot-master", sessionId);

    const response = await SessionClient.detectIntent({ session, queryInput });
    const result = response[0].queryResult;

    response.send(result);
  });
});
