import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";

// https://js.langchain.com/docs/expression_language/cookbook/adding_memory
export const run = async (context: string) => {
  const model = new ChatOpenAI();
  const messagesPlaceholder = new MessagesPlaceholder("history");
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful chatbot"],
    messagesPlaceholder,
    ["human", "{input}"],
  ]);

  console.log(messagesPlaceholder);

  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
  });

  const chain = RunnableSequence.from([
    {
      input: (initialInput) => initialInput.input,
      memory: () => memory.loadMemoryVariables({}),
    },
    {
      input: (previousOutput) => previousOutput.input,
      history: (previousOutput) => previousOutput.memory.history,
    },
    prompt,
    model,
  ]);

  const inputs = {
    input: "Hey, I'm Bob!",
  };

  const response = await chain.invoke(inputs);

  console.log(response);

  await memory.saveContext(inputs, {
    output: response.content,
  });

  console.log(await memory.loadMemoryVariables({}));

  const inputs2 = {
    input: "What's my name?",
  };

  const response2 = await chain.invoke(inputs2);

  console.log(response2);

  await memory.saveContext(inputs2, {
    output: response2.content,
  });

  console.log(await memory.loadMemoryVariables({}));
};
