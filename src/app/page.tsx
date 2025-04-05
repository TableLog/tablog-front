'use client';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';
import Navigation from '@/components/organisms/navigation/Navigation';

export default function Page() {
  return (
    <div>
      <Navigation />

      <Button size="mini" buttonColor="primary">
        <Text>dddd</Text>
      </Button>

      <Button size="small" buttonColor="grey04">
        <Text>dddd</Text>

        <BoxIcon name="bell" />
      </Button>

      <Button size="medium" buttonColor="grey06" full>
        <Text>dddd</Text>
      </Button>

      <Button size="large" buttonColor="white">
        <Text>dddd</Text>
      </Button>
    </div>
  );
}
