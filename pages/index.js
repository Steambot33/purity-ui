import { getLast5Posts } from '../lib/notion';
import { databaseId } from '../utils';
import { Box, LightMode, Text } from '@chakra-ui/react';
import { HeroSection } from '../components/HeroSection';
import { PostsList } from '../components/PostsList';
import MainLayout from '../components/Layout';

export default function Home({ posts }) {
  return (
    <LightMode>
      <MainLayout>
        <Box
          as="section"
          maxWidth={720}
          px={4}
          py={6}
          margin="0 auto"
          width="full"
        >
          <HeroSection />
          <Text
            fontSize="xl"
            borderBottom={'1px solid'}
            borderBottomColor="purple.100"
            color="purple.500"
            pt={5}
            mb={5}
          >
            Recent 5 blog posts
          </Text>
          <PostsList posts={posts} />
        </Box>
      </MainLayout>
    </LightMode>
  );
}

export const getStaticProps = async () => {
  const database = await getLast5Posts(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 60,
  };
};
