import React from 'react';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as SuccessIcon } from '../../assets/icons/success.svg';
import { ReactComponent as WarnIcon } from '../../assets/icons/warn.svg';

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  switch (name) {
    case 'close':
      return <CloseIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'info':
      return <InfoIcon />;
    case 'search':
      return <SearchIcon />;
    case 'success':
      return <SuccessIcon />;
    case 'warn':
      return <WarnIcon />;
    default:
      return <div />;
  }
};

export default Icon;
