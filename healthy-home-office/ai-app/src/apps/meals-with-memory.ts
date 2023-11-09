import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";

const template = `
You are world-class chef that generates a recipes for a given meal of the day.
This time, you will be creating a recipe for {meal}. You need to take into account
your customer's dietary restrictions, food preferences, and other information about them.
This information is given to you enclosed between """ below.

Meals need to be varied and balanced. They need to be healthy and nutritious.

"""
{context}
"""

Answer in the following format:

Meal: {meal}
Name: The name of the recipe.
Ingredients: The ingredients of the recipe.
Estimated time: The estimated time to cook the recipe.
For You: A personalized message for the customer explaning why this {meal} recipe is perfect for them.
Instructions: The instructions for cooking the recipe.
`;

// https://js.langchain.com/docs/expression_language/cookbook/adding_memory
export const run = async (context: string) => {
  const model = new ChatOpenAI();
  const messagesPlaceholder = new MessagesPlaceholder("history");
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", template],
    messagesPlaceholder,
    ["human", "{context}"],
  ]);

  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
  });

  const chain = RunnableSequence.from([
    {
      meal: (input) => input.meal,
      memory: () => memory.loadMemoryVariables({}),
    },
    {
      meal: (previousOutput) => previousOutput.meal,
      context: () => context,
      history: (previousOutput) => previousOutput.memory.history,
    },
    prompt,
    model,
  ]);

  const generateMeal = async (meal: string) => {
    const inputs = {
      meal,
    };

    console.log(`Generating ${meal}...`);
    const response = await chain.invoke(inputs);

    console.log(response);

    await memory.saveContext(inputs, {
      output: response.content,
    });

    console.log(`Memory variables:`);
    console.log(await memory.loadMemoryVariables({}));
  };

  await generateMeal("breakfast");
  await generateMeal("lunch");
  await generateMeal("dinner");
};
