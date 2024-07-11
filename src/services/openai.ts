import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai-edge";

const configuration = new Configuration({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	basePath: import.meta.env.VITE_OPENAI_BASE_PATH,
});

const openai = new OpenAIApi(configuration);

export const getChatCompletion = async (messages: { role: ChatCompletionRequestMessage["role"]; content: string }[]) => {
	try {
		const completion = await openai.createChatCompletion({
			messages,
			model: "gemini-pro",
		});

		const message = (await completion.json()).choices[0].message.content as string;

		return message;
	} catch (error) {
		console.error("Error fetching chat completion:", error);
		throw new Error("Failed to fetch chat completion");
	}
};
