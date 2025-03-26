import { runAction } from "../../src/app";

async function runTest() {
  const result = await runAction(
    "listCandidates",
    "ashby",
    { authToken: "insert-during-testing" },
    {}
  );
  console.log(result);
}

runTest().catch(console.error);
