import { TextBlock } from './TextBlock';
import { CodeBlock } from './CodeBlock';
import { Heading, Text, chakra, Image } from '@chakra-ui/react';
import { Fragment } from 'react';

export const RenderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return <TextBlock component={Text} text={value.text} />;

    case 'heading_1':
      return <TextBlock component={Heading} as="h1" text={value.text} />;

    case 'heading_2':
      return <TextBlock component={Heading} as="h2" text={value.text} />;

    case 'heading_3':
      return <TextBlock component={Heading} as="h3" text={value.text} />;

    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <TextBlock text={value.text} />
        </li>
      );

    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <TextBlock text={value.text} />
          </label>
        </div>
      );

    case 'toggle':
      return (
        <details>
          <summary>
            <TextBlock text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{RenderBlock(block)}</Fragment>
          ))}
        </details>
      );

    case 'child_page':
      return <p>{value.title}</p>;

    case 'image': {
      const src =
        value.type === 'external' ? value?.external?.url : value?.file?.url;
      const caption =
        value.caption?.length > 0 ? value?.caption[0]?.plain_text : '';
      return (
        <figure>
          <Image src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }

    case 'code': {
      const [{ plain_text }] = value.text;
      return <CodeBlock language="jsx" codeString={plain_text} />;
    }

    case 'quote': {
      return (
        <chakra.blockquote
          padding="5px 5px 5px 20px"
          m={4}
          borderLeft="3px solid rgba(0,0,0,.1)"
        >
          <TextBlock text={value.text} />
        </chakra.blockquote>
      );
    }

    default: {
      const [{ plain_text }] = value.text;
      return (
        <>
          ❌ Unsupported block
          <br />
          {type === 'unsupported'
            ? ' by Notion API'
            : `Block "${type}": ${plain_text}`}
        </>
      );
    }
  }
};
