const { App, LogLevel } = require("@slack/bolt");
const util = require("util");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const o_token = process.env.SLACK_OAUTH_TOKEN;

class SlackConfig {
  constructor(
    private oauth_token: string|undefined,
    private channel: string, 
    private query: string
  ) {
  }

  envedToken(): string|undefined {
    return this.oauth_token;
  }
  channelName(): string {
    return this.channel;
  }
  queryWord(): string {
    return this.query;
  }
}

class ResponseArray {
  constructor (
    private res: object[],
  ) {
  }

  private responce_array: any; 

  getResponceArray(obj_array: object[]):void {
    this.res = obj_array
    for (const idx in this.res) {
      this.responce_array.push(this.res[idx])
    }
  }
}

app.message(":book:", async ({ message, say }: any) => {
  say("過去の記事を表示します...");
  const i = [];
  if (message) {
    try {
      const slackConfig = new SlackConfig('tes', 'test-bot', 'https://qiita');
      const res = await app.client.search.messages({
        token: process.env.SLACK_OAUTH_TOKEN,
        channel: slackConfig.channelName,
        query: slackConfig.queryWord
        //cursor: message,
        //ts: message.thread_ts,
        //inclusive: true
      });
      console.log(JSON.stringify(res.messages.matches))//[0].previous_2.blocks[0].elements[0].elements[0].url));
      for (const idx in res.messages.matches) {
        i.push(
          res.messages.matches[idx].previous_2.blocks[0].elements[0].elements[0].url
        );
        say(`${i}`);
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    //say(`${message}`)
  }
});

app.message("hello", async ({ message, say }: any) : Promise<any> => {
  say("過去の記事を表示します...");
});

(async () => {
  await app.start(process.env.PORT || 2080);
  console.log("⚡️ Bolt app is running!");
})();
