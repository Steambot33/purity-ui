import { chakra, Divider, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  GITHUB_PROFILE,
  LINKEDIN_PROFILE,
  navLinks,
  TWITTER_PROFILE,
} from '../constants';

const secondGroup = [
  {
    href: TWITTER_PROFILE,
    label: 'Twitter',
  },
  {
    href: GITHUB_PROFILE,
    label: 'GitHub',
  },
  {
    href: LINKEDIN_PROFILE,
    label: 'LinkedIn',
  },
];

const thirdGroup = [
  // {
  //   href: '/uses',
  //   label: 'Uses',
  // },
  {
    href: '/bookmarks',
    label: 'Bookmarks',
  },
];

export const Footer = () => {
  const { pathname } = useRouter();

  return (
    <VStack as="footer" pb={4} alignItems="center" mt="auto">
      <Divider borderColor="purple.100" />
      <Stack
        direction="row"
        justifyContent="space-between"
        w="full"
        spacing={{ base: 2, md: 8 }}
        maxWidth={720}
        px={4}
        pb={4}
        margin="0 auto"
      >
        <VStack alignItems="flex-start">
          {navLinks.map(({ href, anchor, id }) => (
            <NextLink key={id} href={href} passHref>
              <Link
                isExternal={href.startsWith('http')}
                color={pathname === href ? 'purple.500' : 'gray.500'}
              >
                {anchor}
              </Link>
            </NextLink>
          ))}
        </VStack>
        <VStack alignItems="flex-start">
          {secondGroup.map(({ href, label }) => (
            <NextLink key={href} href={href} passHref>
              <Link
                isExternal={href.startsWith('http')}
                target="_blank"
                color="gray.500"
              >
                {label}
              </Link>
            </NextLink>
          ))}
        </VStack>
        <VStack alignItems="flex-start">
          {thirdGroup.map(({ href, label }) => (
            <NextLink key={href} href={href} passHref>
              <Link
                isExternal={href.startsWith('http')}
                color={pathname === href ? 'purple.500' : 'gray.500'}
              >
                {label}
              </Link>
            </NextLink>
          ))}
        </VStack>
      </Stack>
      <Stack w="full" alignItems="center" justifyContent="center" px={4}>
        <Text color="gray.500" fontSize="sm">
          ©<chakra.span as="time">2021-{new Date().getFullYear()}</chakra.span>{' '}
          purity-ui.com by Anton Kuptsov
        </Text>
      </Stack>
    </VStack>
  );
};
