import { run as translator } from "./apps/translator.js";
import { run as companyName } from "./apps/company-name.js";

translator({
  input_language: "English",
  output_language: "Spanish",
  input_text: "Hello, how are you?",
})
  .then(() => console.log("translator done"))
  .catch(console.error);

companyName("personalized cooking recipes")
  .then(() => console.log("company name done"))
  .catch(console.error);
