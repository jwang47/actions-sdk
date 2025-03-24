import assert from "node:assert";
import { runAction } from "../src/app";

async function runTest() {
    const params = {
        channelName: "insert-channel-name",
    };
    const authParams = {
        authToken: "insert-oauth-access-token",
    };

    try {
        // Run the action
        const result = await runAction(
            "summarizeChannel",
            "slack",
            authParams,
            params
        );

        // Validate the response
        assert(result, "Response should not be null");
        assert(result.summary, "Response should contain a summary");
        console.log("Test passed! with summary: " + result.summary);
    } catch (error) {
        console.error("Test failed:", error);
        process.exit(1);
    }
}

// Uncomment the test you want to run
runTest().catch((error) => {
    console.error("Test failed:", error);
    if (error.response) {
        console.error("API response:", error.response.data);
        console.error("Status code:", error.response.status);
    }
    process.exit(1);
});
