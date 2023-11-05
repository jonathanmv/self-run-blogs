import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

export const buildChain = () => {
  const model = new OpenAI({
    temperature: 0,
  });

  const prompt = PromptTemplate.fromTemplate(`
    You are a helpful assistant that generates 5 words about a {topic} and separates them with commas.
    Return only the 5 words separated by commas. Nothing else.
  `);

  return prompt.pipe(model).pipe(new StringOutputParser());
};

export const run = async (topic: string) => {
  const chain = buildChain();

  const result = await chain.invoke({ topic });
  console.log(result);
};
