import React from 'react';
import { RiEditFill, RiCloseLine } from 'react-icons/ri';

import { Container } from './styles';

export interface ITool {
  id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

interface ToolProps {
  data: ITool;
  handleRemove(): void;
  handleEdit(): void;
}

const Tool: React.FC<ToolProps> = ({ data, handleRemove, handleEdit }) => {
  const { id, title, link, description, tags } = data;

  return (
    <Container>
      <h4>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h4>
      <button type="button" onClick={handleEdit}>
        <RiEditFill size={20} />
        Edit
      </button>
      <button type="button" onClick={handleRemove}>
        <RiCloseLine size={22} />
        Remove
      </button>
      <div>
        <p>{description}</p>
        <ul>
          {tags.map(tag => (
            <li key={`${id}${tag}`}>#{tag}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Tool;
