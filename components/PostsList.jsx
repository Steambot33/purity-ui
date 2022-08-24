import {
  Box,
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  Tag,
  Text,
  VStack,
  chakra,
  Flex,
} from '@chakra-ui/react';
import { formatDate } from '../utils';
import { TextBlock } from './TextBlock';

export const PostsList = ({ posts }) => {
  return (
    <List spacing={8}>
      {(posts || []).map((post) => {
        const {
          Name,
          Image: previewImage,
          Date: postDate,
          Tags,
          Snippet,
        } = post.properties;

        const postImage =
          previewImage.files[0]?.file?.url ||
          previewImage.files[0]?.external?.url;

        const postSnippet = Snippet[Snippet.type][0]?.plain_text || '';

        const [{ plain_text: postTitle }] = Name.title;
        const slug = postTitle.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');

        return (
          <ListItem key={post.id}>
            <LinkBox
              as="article"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              sx={{
                _hover: { img: { opacity: 1 } },
              }}
            >
              <HStack pos={'relative'} h={['auto', 160]}>
                <Image
                  src={postImage}
                  alt={postTitle}
                  minW="30%"
                  w="30%"
                  maxW={200}
                  h="100%"
                  objectFit="cover"
                  htmlHeight="160px"
                  htmlWidth="160px"
                  display={['none', 'block']}
                  opacity={0.7}
                  transition="all 0.25s ease-in-out"
                />
                <Flex
                  alignItems="flex-start"
                  justifyContent="space-between"
                  direction="column"
                  px="3"
                  py="1"
                  h="100%"
                  overflow="hidden"
                >
                  <Box width="100%">
                    <LinkOverlay href={`/blog/${post.id}/${slug}`}>
                      <TextBlock
                        component={Heading}
                        as="h3"
                        size="md"
                        // mt="2"
                        text={Name.title}
                      />
                    </LinkOverlay>
                    <Text color="gray.500" isTruncated mt={0}>
                      {postSnippet}
                    </Text>
                  </Box>
                  <chakra.p
                    display="flex"
                    sx={{ gap: '4px', flexWrap: 'wrap' }}
                  >
                    {Tags[Tags.type].map(({ name }, i) => (
                      <Tag key={i} colorScheme="purple">
                        {name}
                      </Tag>
                    ))}
                  </chakra.p>

                  {/* <Text as="p" opacity={0.65} fontSize="xs">
                    {formatDate(postDate.date?.start || post.created_time)}
                  </Text> */}
                </Flex>
              </HStack>
            </LinkBox>
          </ListItem>
        );
      })}
    </List>
  );
};
