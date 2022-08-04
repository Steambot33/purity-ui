import { Fragment } from 'react';
import { getDatabase, getPage, getBlocks } from '../../../lib/notion';
import { databaseId, formatDate } from '../../../utils';
import {
  Heading,
  Text,
  Tag,
  Box,
  Link,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { LinkBlock } from '../../../components/LinkBlock';
import { RenderBlock } from '../../../components/RenderBlock';
import NextLink from 'next/link';
import MainLayout from '../../../components/Layout';

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />;
  }

  const { Name, Author, Tags, Snippet, Date: postDate } = page.properties;
  const [{ plain_text: postTitle }] = Name.title;
  const [{ plain_text: postDesc }] = Snippet[Snippet.type];

  return (
    <MainLayout title={postTitle} description={postDesc}>
      <Box as="article" maxWidth={720} w="full" px={4} py={6} margin="0 auto">
        <Heading as="h1" mt={8}>
          {postTitle}
        </Heading>
        <Text fontSize="sm" mb={8} color="gray.500">
          {formatDate(postDate.date?.start || page.created_time)}
        </Text>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{RenderBlock(block)}</Fragment>
          ))}
          {Author && (
            <Text fontWeight="bold" fontSize="xs" mt={4} mb={2}>
              by {Author.people[0].name}
            </Text>
          )}
          <Wrap mt={4}>
            {Tags[Tags.type].map(({ name }, i) => (
              <WrapItem key={i}>
                <NextLink href={`/tag/${name}`} passHref>
                  <Link>
                    <Tag colorScheme="purple" ml={i !== 0 && 2}>
                      {name}
                    </Tag>
                  </Link>
                </NextLink>
              </WrapItem>
            ))}
          </Wrap>
          <Box mt={4}>
            <LinkBlock url="/" text="← Go home" />
          </Box>
        </section>
      </Box>
    </MainLayout>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({
      params: {
        id: page.id,
        slug: page.properties.Name.title[0].plain_text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-'),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  // eslint-disable-next-line no-undef
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 60,
  };
};
