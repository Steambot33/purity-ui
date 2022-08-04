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

        const [{ plain_text: postSnippet }] = Snippet[Snippet.type];

        const [{ plain_text: postTitle }] = Name.title;
        const slug = postTitle.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');

        return (
          <ListItem key={post.id}>
            <LinkBox
              as="article"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <HStack pos={'relative'} h={['auto', 130]}>
                <Image
                  src={postImage}
                  alt={postTitle}
                  minW="30%"
                  w="30%"
                  maxW={200}
                  h="100%"
                  objectFit="cover"
                  htmlHeight="130px"
                  htmlWidth="130px"
                  display={['none', 'block']}
                />
                <VStack
                  alignItems="flex-start"
                  justifyContent="space-between"
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
                        mt="2"
                        text={Name.title}
                      />
                    </LinkOverlay>
                    <Text color="gray.500" isTruncated mb={1}>
                      {postSnippet}
                    </Text>
                    <chakra.p
                      display="flex"
                      sx={{ gap: '4px', flexWrap: 'wrap' }}
                    >
                      {Tags[Tags.type].map(({ name }, i) => (
                        <Tag key={i} colorScheme="purple" ml={i !== 0 && 2}>
                          {name}
                        </Tag>
                      ))}
                    </chakra.p>
                  </Box>
                  <Text as="p" opacity={0.65} fontSize="xs">
                    {formatDate(postDate.date?.start || post.created_time)}
                  </Text>
                </VStack>
              </HStack>
            </LinkBox>
          </ListItem>
        );
      })}
    </List>
  );
};
