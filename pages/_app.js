import { ChakraProvider, theme as base } from '@chakra-ui/react';
import '../styles/globals.css';
// import '../styles/prizm-custom.css';
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  {
    fonts: {
      heading: `Inter,${base.fonts.heading}`,
      body: `Poppins,${base.fonts.body}`,
    },
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  withDefaultColorScheme({ colorScheme: 'purple' })
);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
