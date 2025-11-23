import { PropsWithChildren } from 'react';

import { Text } from '../text/Text';

interface TextInfoProps extends PropsWithChildren {
  isError?: boolean;
}

function TextInfo({ children, isError = false }: TextInfoProps) {
  return (
    <Text
      className="validator-hint whitespace-pre-line"
      fontWeight="regular"
      fontSize={12}
      color={isError ? 'red01' : 'grey03'}
    >
      {children}
    </Text>
  );
}

export default TextInfo;
