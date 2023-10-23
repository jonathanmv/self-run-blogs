import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  const recipes = await getCollection("recipes");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: [...posts, ...recipes].map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
