/* eslint-disable react/no-unknown-property */
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Link,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/Icons';
import {
  GITHUB_PROFILE,
  LINKEDIN_PROFILE,
  TWITTER_PROFILE,
} from '../constants';
import MainLayout from '../components/Layout';

const socialLinks = [
  {
    href: LINKEDIN_PROFILE,
    label: 'LinkedIn',
    icon: (
      <LinkedinIcon
        fill="purple.500"
        width="1.5em"
        height="1.5em"
        alt="LinkedIn"
      />
    ),
  },
  {
    href: TWITTER_PROFILE,
    label: 'Twitter',
    icon: (
      <TwitterIcon
        fill="purple.500"
        width="1.5em"
        height="1.5em"
        alt="Twitter"
      />
    ),
  },
  {
    href: GITHUB_PROFILE,
    label: 'GitHub',
    icon: (
      <GithubIcon fill="purple.500" width="1.5em" height="1.5em" alt="GitHub" />
    ),
  },
];

export default function About() {
  return (
    <MainLayout title="About website author & contacts">
      <Box as="section" maxWidth={720} px={4} py={6} margin="0 auto">
        <Box mb={6}>
          <Flex direction={['column', 'row']} alignItems="baseline">
            <Text as="span" fontSize="2xl">
              Hi, my name is
            </Text>
            <Heading as="h1" ml={['auto', 2]}>
              Anton Kuptsov
            </Heading>
          </Flex>

          <Box mt={4}>
            I&apos;m front-end developer (JavaScript, HTML, CSS/SASS, React.js,
            React-Redux, Next.js)
            <HStack>
              {socialLinks.map(({ href, label, icon }) => (
                <IconButton
                  key={href}
                  as={Link}
                  variant="ghost"
                  href={href}
                  target="_blank"
                  title={label}
                  isExternal
                >
                  {icon}
                </IconButton>
              ))}
            </HStack>
            <Text fontStyle="italic" color="purple.300" mt={8}>
              If you don&apos;t fail, you don&apos;t learn.
            </Text>
          </Box>
        </Box>
        <Box>
          <Text fontWeight={700} fontSize="xl">
            Send your questions, ideas or proposals for cooperation:
          </Text>
          <form
            action="/about"
            name="PurityUI"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="PurityUI" />
            <Box mb={2} mt={4}>
              <Input
                type="text"
                name="name"
                isRequired
                focusBorderColor="purple.400"
                placeholder="Name*"
              />
            </Box>
            <Box mb={2} mt={4}>
              <Input
                type="email"
                name="email"
                isRequired
                focusBorderColor="purple.400"
                placeholder="Email*"
              />
            </Box>
            <Box mb={2} mt={4}>
              <Input
                type="text"
                name="subject"
                isRequired
                focusBorderColor="purple.400"
                placeholder="Subject*"
              />
            </Box>
            <Box mb={2} mt={4}>
              <Textarea
                name="message"
                isRequired
                focusBorderColor="purple.400"
                placeholder="Message*"
              />
            </Box>
            <Flex justifyContent="flex-end">
              <Button className="button" type="submit" mt={8}>
                Send Message
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </MainLayout>
  );
}
