import { text } from "body-parser";

const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('hello', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`Hey there <@${message.user}>!`);
  say(send(test));
});

interface Text {
  text: string;
}

function send(text: Text){
  return text.text;
}

let test = { text: "this is tes"};

(async () => {
  // Start your app
  await app.start(process.env.PORT || 2080);

  console.log('⚡️ Bolt app is running!');
})();