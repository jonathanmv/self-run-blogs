import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

export const run = async (params: { faqs: string; n: string }) => {
  const template = `
You are a helpful content writer assistant.
Your task is to expand the number of questions in the FAQs section delimited by """.
You will create {n} new questions and answers based on the existing ones.
Read through the questions and answers in the section.
Think of other questions a reader might have.
Write the new questions and their answers in the same format of the FAQs section.
Validate your work by reading the new questions and answers.
Make sure there are {n} new questions and answers.
Return only the {n} new questions and their answers. Nothing else.

FAQs section:
"""
{faqs}
"""
`;

  const model = new OpenAI({
    temperature: 0,
  });

  const prompt = PromptTemplate.fromTemplate(template);

  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  console.log(`Expanding FAQs...`);
  const result = await chain.invoke(params);

  console.log(result);
};

export const MAILCHIMP_FAQS = `
FAQs

Can I use a landing page instead of a website? Marketers often use landing pages to help users “land” on specific web pages linked on an email, social media post, or ad. While they may not be an adequate replacement for a website, landing pages are valuable to reach short-term marketing objectives. For example, you can allow users to order pre-sale items or sign-up for limited edition products with a landing page.

How do I create a landing page without a domain? You can create a landing page without a domain using Mailchimp. Whether you don’t have your shop up and running yet or sell on an online marketplace, we can help you create a URL for your landing page.

How to create a landing page in Mailchimp? Creating a beautiful landing page design on Mailchimp is easy. Here’s how to get started:

Head over to our landing page builder and choose a template you like. Customize the template to fit your brand’s aesthetic. Write a descriptive page title. Create and add a URL. Select your audience and tags. Add tracking. Save and publish. That’s it! In addition to providing you with the tools to create a quality landing page website, we can also help you promote it, send out retargeting ads to visitors, and more.

How to design a landing page? Our landing page builder is similar to our easy-to-use email designer, allowing you to drag and drop design elements that fit your marketing needs. We have several pre-built landing pages that can help you get your message across, highlight new products, offer a special download, and more.

How to edit a landing page in Mailchimp? If you need to edit your landing page once it’s published, go to Campaigns and select All campaigns. From there, look for the landing page you want to edit and click the drop-down menu next to it. You have several editing options, allowing you to update the URL, design, tags, and tracking settings.

What is a landing page in Mailchimp? Mailchimp landing pages can help you showcase specific products or services, increase conversions, and boost customer loyalty. Not only does our landing page software provide you with the tools to create attractive pages, but you’ll also be able to receive comprehensive page analytics and share the page with existing segments in your contacts.

What is a landing page on a website? Landing pages are standalone web pages that can help you turn prospects into customers. In general, these types of pages aren’t included in your website’s navigation. Instead, they’re accessible via links from ads, newsletters, and so forth.

What is the difference between a website and a landing page? Landing pages are more focused on completing short-term marketing goals and are typically created to complement other campaigns. You’ll also find fewer links and specific CTAs on a landing page. On the other hand, a website provides visitors with several pages to explore the different products or services available, a company’s mission and vision, shipping policies, and more. Websites are also used for shoppers to finalize purchases.
`;
