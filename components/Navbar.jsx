import { Button, chakra, DarkMode, Flex, HStack, Link } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import { navLinks } from '../constants';

export const Navbar = () => {
  const router = useRouter();

  return (
    <header>
      <DarkMode>
        <Flex
          p="1.5rem 1rem"
          bg="gray.800"
          color="white"
          w="100%"
          pos="sticky"
          top={0}
          left={0}
          justifyContent="space-between"
          as="nav"
        >
          <Link
            href="/"
            className="logo_font"
            fontSize={{ base: '1.75rem', sm: '6vw', md: '3rem' }}
            letterSpacing={['1px', '2px']}
            color="purple.300"
          >
            Purity UI
          </Link>
          <HStack as="ul" css={{ listStyle: 'none' }} spacing={[2, 4]}>
            {navLinks.map(({ id, anchor, href }) => {
              const isActiveLink = router.pathname === href || false;
              return (
                <chakra.li key={id}>
                  <NextLink href={href} passHref>
                    <Button
                      as={Link}
                      size="sm"
                      variant="ghost"
                      isActive={isActiveLink}
                    >
                      {anchor}
                    </Button>
                  </NextLink>
                </chakra.li>
              );
            })}
          </HStack>
        </Flex>
      </DarkMode>
    </header>
  );
};
