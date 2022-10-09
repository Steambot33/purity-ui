import { getDatabase } from '../lib/notion';
import { databaseId } from '../utils';
import { Box, Text } from '@chakra-ui/react';
import { PostsList } from '../components/PostsList';
import MainLayout from '../components/Layout';

export default function Home({ posts }) {
  return (
    <MainLayout>
      <Box as="section" maxWidth={720} w="full" px={4} py={6} margin="0 auto">
        <Text fontSize="lg" mb={4}>
          Latest posts
        </Text>
        <PostsList posts={posts} />
      </Box>
    </MainLayout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 30,
  };
};
