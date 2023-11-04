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

import { run as faqExpander, MAILCHIMP_FAQS } from "./apps/faq-expander.js";
faqExpander({ faqs: MAILCHIMP_FAQS, n: "3" })
  .then(() => console.log("faq expander done"))
  .catch(console.error);
