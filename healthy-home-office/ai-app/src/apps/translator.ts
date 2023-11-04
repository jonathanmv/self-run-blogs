import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

export const run = async (params: {
  input_language: string;
  output_language: string;
  input_text: string;
}) => {
  const chatModel = new ChatOpenAI();

  const template =
    "You are a helpful assistant that translates {input_language} into {output_language}.";
  const humanTemplate = "{input_text}";

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", template],
    ["human", humanTemplate],
  ]);

  const parser = new StringOutputParser();

  const chain = chatPrompt.pipe(chatModel).pipe(parser);

  console.log(
    `Translating "${params.input_text}" from ${params.input_language} to ${params.output_language}`
  );
  const result = await chain.invoke(params);
  console.log(`Result: ${result}`);
};
