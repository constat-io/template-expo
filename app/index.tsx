import { Text, View } from 'react-native';
import { colour, space, type } from '../lib/design-system';
import { productName } from '../lib/product';

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: colour.background, padding: space.xl }}>
      <Text style={{ fontSize: type.heading, fontWeight: type.strong, color: colour.text }}>{productName()}</Text>
    </View>
  );
}
