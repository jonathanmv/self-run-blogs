import { StringOutputParser } from "langchain/schema/output_parser";
import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import {
  RunnableBranch,
  RunnableMap,
  RunnableSequence,
} from "langchain/schema/runnable";

import { buildChain as buildCompanyNameGenerator } from "./company-name.js";
import { buildChain as buildCsvGenerator } from "./csv-generator.js";

const buildDeciderChain = () => {
  const model = new OpenAI({});

  const prompt = PromptTemplate.fromTemplate(`
        Given the user question below, classify it as either being about \`Company\`, \`Csv\`, or \`Other\`.
        Respond with \`Company\` when you think the user needs help coming up with a company name.
        Respond with \`Csv\` when you think the user needs examples, lists, ranks, or categories.
        Respond with \`Other\` otherwise.

        Do not respond with more than one word.

        <question>
        {question}
        </question>

        Classification:
    `);

  return prompt.pipe(model);
};

const buildGeneralChain = () =>
  PromptTemplate.fromTemplate(
    `
    Respond to the user question below.
    <question>
    {question}
    </question>
`
  )
    .pipe(new OpenAI())
    .pipe(new StringOutputParser());

export const buildChain = () => {
  const companyNameGenerator = buildCompanyNameGenerator();
  const csvGenerator = buildCsvGenerator();
  const general = buildGeneralChain();
  const decider = buildDeciderChain();

  const branch = RunnableBranch.from([
    [
      (x) => {
        console.log("evaluating company name...", x);
        return x.classification.toLowerCase().includes("company");
      },
      companyNameGenerator,
    ],
    [
      (x) => {
        console.log("evaluating csv generator...", x);
        return x.classification.toLowerCase().includes("csv");
      },
      csvGenerator,
    ],
    general,
  ]);

  const fullChain = RunnableSequence.from([
    {
      classification: (input) => {
        console.log("running for classification", input);
        return decider;
      },
      product: (input: { question: string }) => {
        console.log("running for product", input);
        return input.question;
      },
      topic: (input: { question: string }) => {
        console.log("running for topic", input);
        return input.question;
      },
    },
    branch,
  ]);

  return fullChain;
};

export const run = async (question: string) => {
  const chain = buildChain();

  console.log("running chain with question", question);
  const result = await chain.invoke({ question });
  console.log(result);
};
