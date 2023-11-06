import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

export const buildChain = () => {
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      meal: z
        .string()
        .describe(
          "The meal of the day the recipe was created for: breakfast, lunch, or dinner."
        ),
      name: z.string().describe("The name of the recipe."),
      ingredients: z
        .array(z.string())
        .describe("The list of ingredients to use in the recipe."),
      estimated_time: z
        .string()
        .describe("The estimated time to cook the recipe."),
      for_you: z
        .string()
        .describe(
          "A personalized message for the customer explaning why this {meal} recipe is perfect for them."
        ),
      instructions: z
        .string()
        .describe("The instructions for cooking the recipe."),
      sources: z
        .array(z.string())
        .describe(
          "The sources used to create the recipe. It should include the real source of the recipe. If not source was used, it should be empty."
        ),
    })
  );

  const prompt = new PromptTemplate({
    template: `
            As a seasoned chef, create a recipe for {meal} considering the context given in """ below.

            """
            {context}
            """

            {formatInstructions}
        `,
    inputVariables: ["meal", "context"],
    partialVariables: {
      formatInstructions: parser.getFormatInstructions(),
    },
  });

  return prompt
    .pipe(new OpenAI({ modelName: "gpt-3.5-turbo", temperature: 0.9 }))
    .pipe(parser);
};

export const run = async (
  context: string,
  meal: "breakfast" | "lunch" | "dinner"
) => {
  const chef = buildChain();
  console.log(`Creating a recipe for ${meal} using context:\n${context}`);
  const recipe = await chef.invoke({ meal, context });
  console.log(`Recipe for ${meal}:`, recipe);
  return recipe;
};
