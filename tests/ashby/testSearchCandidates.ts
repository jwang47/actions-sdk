import { runAction } from "../../src/app";

async function runTest() {
  const result = await runAction(
    "searchCandidates",
    "ashby",
    { authToken: "insert-during-testing" },
    {
      name: "Test",
    }
  );
  console.log(result);
}

runTest().catch(console.error);
