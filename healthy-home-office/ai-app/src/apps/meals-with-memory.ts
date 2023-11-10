import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";

const recipeFormat = `
Answer in the following format:

Meal: The meal of the recipe, e.g. breakfast, lunch, dinner.
Name: The name of the recipe.
Ingredients: The ingredients of the recipe.
Estimated time: The estimated time to cook the recipe.
For You: A personalized message for the customer explaning why this recipe is perfect for them.
Instructions: The instructions for cooking the recipe.
`;

const template = `
You are world-class chef. People come from all over the world to learn from you.
In this ocassion, you are creating a meal for a customer.
The customer trusts you to create the perfect meal for them, based on their dietary restrictions,
food preferences, and other information they provide.

When creating a meal, you need to review the previous meals you have created the customer,
so that you can create a meal that is varied and balanced.
You have a memory of all the meals you have created for the user. You avoid repeating ingredients
and recipes that you have already used.

${recipeFormat}
`;

// https://js.langchain.com/docs/expression_language/cookbook/adding_memory
export const run = async (context: string) => {
  const model = new ChatOpenAI();
  const messagesPlaceholder = new MessagesPlaceholder("history");
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", template],
    ["human", context],
    messagesPlaceholder,
    ["human", "{input}"],
  ]);

  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
  });

  const chain = RunnableSequence.from([
    {
      input: ({ input }) => input,
      memory: () => memory.loadMemoryVariables({}),
    },
    {
      input: ({ input }) => input,
      history: (previousOutput) => previousOutput.memory.history,
    },
    {
      ignored: async (output) => {
        console.log(`This is the prompt:`);
        console.log(await prompt.format(output));
        console.log(`\n\n`);
      },
      input: ({ input }) => input,
      history: ({ history }) => history,
    },
    prompt,
    model,
  ]);

  const generateMeal = async (input: string) => {
    const inputs = {
      input,
    };

    console.log(`Sending ${input}...`);
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
  await generateMeal("How many recipes did you generate?");
};
