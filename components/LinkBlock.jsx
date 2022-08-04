import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

export const LinkBlock = ({ url, text, ...props }) => {
  return (
    <NextLink href={url} passHref>
      <Link {...props}>{text}</Link>
    </NextLink>
  );
};
