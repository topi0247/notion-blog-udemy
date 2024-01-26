import { Client } from "@notionhq/client";
import { get } from "http";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getAllPosts = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID || "";
  const posts = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
    // return post;
  });
};

const getPageMetaData = (post: any) => {
  return {
    title: post.properties.Name.title[0].plain_text,
    tags: getTags(post),
    date: post.properties.Day.date.start,
    slug: getSlug(post),
  };
};

const getTags = (post: any) => {
  return post.properties.Tags.multi_select.map((tag: any) => {
    return {
      name: tag.name,
      id: tag.id,
    };
  });
};

const getSlug = (post: any) => {
  if (post.public_url === null) return null;
  return post.public_url.split("/").pop();
};
