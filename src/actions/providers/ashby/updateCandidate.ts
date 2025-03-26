import {
  ashbyUpdateCandidateFunction,
  ashbyUpdateCandidateOutputType,
  ashbyUpdateCandidateParamsType,
  AuthParamsType,
} from "../../autogen/types";

import { axiosClient } from "../../util/axiosClient";
const updateCandidate: ashbyUpdateCandidateFunction = async ({
  params,
  authParams,
}: {
  params: ashbyUpdateCandidateParamsType;
  authParams: AuthParamsType;
}): Promise<ashbyUpdateCandidateOutputType> => {
  const { authToken } = authParams;

  if (!authToken) {
    throw new Error("Auth token is required");
  }
  if (!params.candidateId) {
    throw new Error("Candidate ID is required");
  }

  const body: Record<string, any> = {
    candidateId: params.candidateId,
  };
  // populate body with fields that are not null or undefined
  const fields: (keyof ashbyUpdateCandidateParamsType)[] = [
    "name", "email", "phoneNumber", "linkedInUrl", "githubUrl",
    "websiteUrl", "alternateEmail", "socialLinks", "sourceId",
    "creditedToUserId", "location", "createdAt", "sendNotifications"
  ];
  fields.forEach((field) => {
    if (params[field] !== undefined && params[field] !== null) {
      body[field] = params[field];
    }
  });

  const response = await axiosClient.post(`https://api.ashbyhq.com/candidate.update`, body, {
    auth: {
      username: authToken,
      password: "",
    },
  });
  if (!response.data.success) {
    console.error(response.data);
    throw new Error(response.data.errors.join("; "));
  }
};

export default updateCandidate;
