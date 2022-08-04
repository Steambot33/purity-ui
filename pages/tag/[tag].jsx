import { databaseId } from '../../utils';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { PostsList } from '../../components/PostsList';
import { getDatabase, getPostsByTag } from '../../lib/notion';
import { useRouter } from 'next/router';
import MainLayout from '../../components/Layout';

export default function Home({ posts, tag }) {
  const router = useRouter();

  return (
    <MainLayout>
      <Box as="section" maxWidth={720} px={4} py={6} margin="0 auto">
        {router.isFallback ? (
          <Flex
            width="full"
            height="100vh"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner
              thickness="4px"
              speed="0.8s"
              emptyColor="purple.100"
              color="purple.500"
              size="xl"
            />
          </Flex>
        ) : (
          <>
            <Text
              fontSize="xl"
              borderBottom={'1px solid'}
              borderBottomColor="purple.100"
              color="purple.500"
              pt={5}
              mb={5}
            >
              {`Blog posts with tag "${tag}"`}
            </Text>
            {posts && posts.length ? <PostsList posts={posts} /> : '0 results'}
          </>
        )}
      </Box>
    </MainLayout>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  const tags = [];
  database.forEach((page) => {
    const { Tags } = page.properties;
    Tags[Tags.type].forEach((item) => tags.push(item.name));
  });

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { tag } }) => {
  const database = await getPostsByTag(databaseId, tag);

  return {
    props: {
      posts: database,
      tag,
    },
    revalidate: 60,
  };
};
