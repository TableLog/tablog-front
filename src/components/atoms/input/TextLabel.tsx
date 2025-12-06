import { PropsWithChildren } from 'react';

import { Text } from '../text/Text';

function TextLabel({ children }: PropsWithChildren) {
  return (
    <Text fontWeight="medium" fontSize={14} color="black03">
      {children}
    </Text>
  );
}

export default TextLabel;
