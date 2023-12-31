import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

export const buildChain = () => {
  const model = new OpenAI({
    temperature: 0.9,
  });

  const prompt = PromptTemplate.fromTemplate(
    "What would be a good company name for a company that makes {product}?"
  );

  return prompt.pipe(model).pipe(new StringOutputParser());
};

export const run = async (product: string) => {
  const chain = buildChain();
  const result = await chain.invoke({ product });

  console.log(result);
};
