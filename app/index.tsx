import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>{productName()}</Text>
    </View>
  );
}

/** The product's own name. Changing this is the first witnessed change. */
export function productName(): string {
  return 'A new app';
}
