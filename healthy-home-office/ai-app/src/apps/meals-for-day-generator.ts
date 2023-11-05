import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnableMap, RunnableSequence } from "langchain/schema/runnable";

export const buildChain = () => {
  const model = new OpenAI({
    temperature: 0.7,
  });

  const prompt = PromptTemplate.fromTemplate(`
  You are world-class chef that generates a recipes for a given meal of the day.
  This time, you will be creating a recipe for {meal}. You need to take into account
  your customer's dietary restrictions, food preferences, and other information about them.
  This information is given to you enclosed between """ below.

  Meals need to be varied and balanced. They need to be healthy and nutritious.
  To make sure this recipe is new and unique, I included the list of previous recipes. They are enclosed between *** below.
  If no previous recipes are given, you can assume that this is the first recipe you are creating for this customer.

  """
  {context}
  """

  ***
  {previous_recipes}
  ***

  Answer in the following format:

  Meal: {meal}
  Name: The name of the recipe.
  Ingredients: The ingredients of the recipe.
  Estimated time: The estimated time to cook the recipe.
  For You: A personalized message for the customer explaning why this {meal} recipe is perfect for them.
  Instructions: The instructions for cooking the recipe.
  `);

  return prompt.pipe(model).pipe(new StringOutputParser());
};

export const run = async (context: string) => {
  const chef = buildChain();
  const meals = {
    breakfast: undefined,
    lunch: undefined,
    dinner: undefined,
  };

  const sequence = RunnableSequence.from([
    {
      meal: (x) => {
        console.log("breakfast", x);
        return "breakfast";
      },
      previous_recipes: () => "",
      context: () => context,
    },
    chef,
    {
      meal: (x) => {
        meals.breakfast = x;
        console.log("lunch", x);
        return "lunch";
      },
      previous_recipes: () => `${meals.breakfast}`,
      context: () => context,
    },
    chef,
    {
      meal: (x) => {
        meals.lunch = x;
        console.log("dinner", x);
        return "dinner";
      },
      previous_recipes: () => `${meals.breakfast}\n${meals.lunch}`,
      context: () => context,
    },
    chef,
    {
      breakfast: () => meals.breakfast,
      lunch: () => meals.lunch,
      dinner: (input) => {
        meals.dinner = input;
        return meals.dinner;
      },
    },
  ]);

  console.log(`Generating recipes. Context:\n${context}`);
  const result = await sequence.invoke({ context });
  console.log(result);
};
