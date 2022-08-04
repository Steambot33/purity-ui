import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    //filter: don't show scheduled posts
    filter: {
      property: 'Date',
      date: {
        before: new Date(),
      },
    },
  });
  return response.results;
};

export const getPostsByTag = async (databaseId, tag) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Tags',
          multi_select: {
            contains: tag,
          },
        },
        {
          property: 'Date',
          date: {
            before: new Date(),
          },
        },
      ],
    },
  });
  return response.results;
};

export const getLast5Posts = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 5,
    //filter: don't show scheduled posts
    filter: {
      property: 'Date',
      date: {
        before: new Date(),
      },
    },
    // filter: {
    //   property: 'Tags',
    //   multi_select: {
    //     contains: 'javascript',
    //   },
    // },
  });

  // console.log(response);
  return response.results;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};
