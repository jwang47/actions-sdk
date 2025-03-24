import { WebClient } from "@slack/web-api";
import {
  slackSummarizeChannelFunction,
  slackSummarizeChannelOutputType,
  slackSummarizeChannelParamsType,
  AuthParamsType,
} from "../../autogen/types";
import { getSlackChannels } from "./helpers";
import OpenAI from "openai";

const summarizeChannel: slackSummarizeChannelFunction = async ({
  params,
  authParams,
}: {
  params: slackSummarizeChannelParamsType;
  authParams: AuthParamsType;
}): Promise<slackSummarizeChannelOutputType> => {
  const client = new WebClient(authParams.authToken!);
  const { channelName } = params;

  const allChannels = await getSlackChannels(client);
  const channel = allChannels.find(channel => channel.name === channelName && channel.is_private === false);

  if (!channel || !channel.id) {
    throw Error(`Channel with name ${channelName} not found`);
  }

  // summarize last 50 messages
  const messages = await client.conversations.history({
    channel: channel.id,
    limit: 50,
  });
  if (!messages.ok) {
    throw Error(`Failed to fetch messages from channel ${channel.name}`);
  }

  const history = messages.messages?.reverse().map(message => message.user + ":" + message.text).join("\n") || "";
  const oai = new OpenAI();
  const completion = await oai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: "Summarize the following messages in the Slack channel:\n" + history,
    }],
  });

  const summary = completion.choices[0].message.content || "";
  return {
    summary: summary,
  };
};

export default summarizeChannel;
