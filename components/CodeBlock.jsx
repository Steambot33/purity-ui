import { Box, chakra } from '@chakra-ui/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

export const CodeBlock = ({ language, codeString, ...props }) => {
  return (
    <Box padding="5" rounded="8px" my="8" bg="#011627">
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
        {...props}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            style={{
              fontSize: 14,
              overflowX: 'auto',
              fontFamily: 'SF Mono, Menlo, monospace',
            }}
            data-language={language}
          >
            <pre className={className} style={style}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <chakra.div key={i} px="5" {...lineProps}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </chakra.div>
                );
              })}
            </pre>
          </div>
        )}
      </Highlight>
    </Box>
  );
};
