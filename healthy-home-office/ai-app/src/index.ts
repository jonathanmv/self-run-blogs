// import { run as translator } from "./apps/translator.js";
// translator({
//   input_language: "English",
//   output_language: "Spanish",
//   input_text: "Hello, how are you?",
// })
//   .then(() => console.log("translator done"))
//   .catch(console.error);

// import { run as companyName } from "./apps/company-name.js";
// companyName("personalized cooking recipes")
//   .then(() => console.log("company name done"))
//   .catch(console.error);

// import { run as faqExpander, MAILCHIMP_FAQS } from "./apps/faq-expander.js";
// faqExpander({ faqs: MAILCHIMP_FAQS, n: "3" })
//   .then(() => console.log("faq expander done"))
//   .catch(console.error);

// import { run as companyAndNameGenerator } from "./apps/company-and-name-generator.js";
// // companyAndNameGenerator("Which countries have the most people?")
// companyAndNameGenerator("What can I call a business selling shoes?")
//   .then(() => console.log("company name and csv generator done"))
//   .catch(console.error);

import { run as mealsForDayGenerator } from "./apps/meals-for-day-generator.js";
mealsForDayGenerator(`
I'm looking for a low-carb diet. I'm a 40 years old woman doing sports once or twice a week.
I don't eat meat, but I eat fish. I don't eat dairy products. I eat eggs and I love feta cheese and avocado.
`)
  .then(() => console.log("meals for day generator done"))
  .catch(console.error);
