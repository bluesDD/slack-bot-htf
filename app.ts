const { App } = require('@slack/bolt');
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const option = {
  channel: 'test-bot'
}
// Listens to incoming messages that contain "hello"
app.message('hello', ({ message, say, context }) :void => {
  // say() sends a message to the channel where the event was triggered
  say(`Hey there <@${message.user}>!`);
});

app.message('test', ({ message, say, context}) :void=> {
  console.log(context.id);
  say(context.id);
});

app.message(':book:', async ({ message, say}) => {
  say('過去の記事を表示します...')
  //client.conversations.history(option)
  if (message.thread_ts){
    try {
      const res = await app.client.conversations.replies({
        token: process.env.SLACK_OAUTH_TOKEN,
        channel: message.channel,
        oldest: 1000,
      });
      for (const idx in res.messages) {
        say (`${res.messages[idx].text}`)
      }
    }
    finally {}
  }
  say(`${message.text}`)

});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 2080);

  console.log('⚡️ Bolt app is running!');
})();
