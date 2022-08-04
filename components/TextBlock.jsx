import { chakra } from '@chakra-ui/react';
import clsx from 'clsx';
import { LinkBlock } from './LinkBlock';

export const TextBlock = ({
  component: Component = 'span',
  text,
  ...props
}) => {
  if (!text) {
    return null;
  }
  return (
    <Component {...props} my={2}>
      {text.map((value, i) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value;
        return (
          <chakra.span
            key={i}
            background={code && 'purple.50'}
            className={clsx(code && 'code')}
            color={(color !== 'default' && color, code && 'purple.500')}
            fontStyle={italic && 'italic'}
            fontWeight={bold && 'bold'}
            textDecoration={
              (underline && 'underline', strikethrough && 'line-through')
            }
          >
            {text.link ? (
              <LinkBlock url={text.link.url} text={text.content} />
            ) : (
              text.content
            )}
          </chakra.span>
        );
      })}
    </Component>
  );
};
