import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";

export const run = async (product: string) => {
  const llm = new OpenAI({
    temperature: 0.9,
  });

  const chatModel = new ChatOpenAI();

  const companyNamePrompt = PromptTemplate.fromTemplate(
    "What would be a good company name for a company that makes {product}?"
  );
  const companyNameText = await companyNamePrompt.format({
    product,
  });

  const llmResult = await llm.predict(companyNameText);
  console.log("llmResult", llmResult);
  const chatModelResult = await chatModel.predict(companyNameText);
  console.log("chatModelResult", chatModelResult);

  const messages = [new HumanMessage({ content: companyNameText })];
  const llmMessagesResult = await llm.predictMessages(messages);
  const chatModelMessagesResult = await chatModel.predictMessages(messages);
  console.log("llmMessagesResult", llmMessagesResult);
  console.log("chatModelMessagesResult", chatModelMessagesResult);
};
