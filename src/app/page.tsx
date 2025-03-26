'use client';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';

export default function Page() {
  return (
    <div>
      <Text fontSize={20} color="primary01">
        test
      </Text>

      <BoxIcon
        onClick={() => console.log('testing icon click event')}
        name="home-smile"
        color="blue"
        size="50px"
      />
    </div>
  );
}
