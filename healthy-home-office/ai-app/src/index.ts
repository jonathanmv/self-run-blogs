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

import { run as companyAndNameGenerator } from "./apps/company-and-name-generator.js";
// companyAndNameGenerator("Which countries have the most people?")
companyAndNameGenerator("What can I call a business selling shoes?")
  .then(() => console.log("company name and csv generator done"))
  .catch(console.error);
