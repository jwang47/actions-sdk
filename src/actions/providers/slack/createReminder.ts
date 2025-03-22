import { WebClient } from "@slack/web-api";
import {
  slackCreateReminderFunction,
  slackCreateReminderOutputType,
  slackCreateReminderParamsType,
  AuthParamsType,
} from "../../autogen/types";

const createReminder: slackCreateReminderFunction = async ({
  params,
  authParams,
}: {
  params: slackCreateReminderParamsType;
  authParams: AuthParamsType;
}): Promise<slackCreateReminderOutputType> => {
  const client = new WebClient(authParams.authToken!);
  const { text, time } = params;

  await client.reminders.add({
    text,
    time,
  });
  return;
};

export default createReminder;
