const API_AI_TOKEN = `093872f40bce4bc3b2d6be4321953f38`;
const apiAiClient = require(`apiai`)(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = `EAADQjMUcvdoBAEPG5ZCsN17SfPDFslWM4VUwKukN7uWTmELKiDWq3RaNcY2DQcOZAuKSR5uVwenRkR62CovbPZCBAwZClFNc3midwIhlUS2B0ZBtP29oYBbJXBXt2SZBWvVJSHaZACUHN3S92IXqSpINjLKCWLYjW5OzC2aEOp8CgZDZD`;
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: `https://graph.facebook.com/v2.6/me/messages`,
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: `POST`,
        json: {
          recipient: { id: senderId },
          message: { text },
        }
      });
    };

  module.exports = (event) => {
      const senderId = event.sender.id;
      const message = event.message.text;

      const apiaiSession = apiAiClient.textRequest(message, {sessionId: `firstbot_bot`});

      apiaiSession.on(`response`, (response) => {
          const result = response.result.fulfillment.speech;

          sendTextMessage(senderId, result);
      });

    apiaiSession.on(`error`, error => console.log(error));
    apiaiSession.end();
  };
