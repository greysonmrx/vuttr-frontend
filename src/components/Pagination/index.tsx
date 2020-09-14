import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { Container, PageButton } from './styles';

export interface PaginationData {
  current_page: number;
  total_pages: number;
}

interface PaginationProps {
  data: PaginationData;
  handleGoToPage(page: number): void;
}

const Pagination: React.FC<PaginationProps> = ({ data, handleGoToPage }) => {
  const { current_page, total_pages } = data;

  function renderPageButton() {
    const pageButtons = [];

    for (let i = 1; i <= total_pages; i += 1) {
      pageButtons.push(
        <li key={i}>
          <PageButton
            disabled={current_page === i}
            onClick={() => handleGoToPage(i)}
          >
            {i}
          </PageButton>
        </li>,
      );
    }

    return pageButtons;
  }

  return (
    <Container>
      <button
        type="button"
        disabled={current_page === 1}
        onClick={() => handleGoToPage(current_page - 1)}
      >
        <MdKeyboardArrowLeft size={23} />
        Previous
      </button>
      <ul>{renderPageButton()}</ul>
      <button
        type="button"
        disabled={total_pages <= current_page}
        onClick={() => handleGoToPage(current_page + 1)}
      >
        Next
        <MdKeyboardArrowRight size={23} />
      </button>
    </Container>
  );
};

export default Pagination;
