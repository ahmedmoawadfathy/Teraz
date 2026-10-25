import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { AppTextInput } from '@/components/ui/AppTextInput';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { formatPrice } from '@/features/catalogue/api';
import { useCheckout } from '../hooks/useCheckout';

export default function CheckoutScreen({ navigation }: RootStackScreenProps<'Checkout'>) {
  const checkout = useCheckout();

  if (checkout.items.length === 0) {
    return (
      <StateMessage
        type="empty"
        icon="bag-outline"
        title="Nothing to check out"
        message="Your cart is empty."
        actionLabel="Back to shop"
        onAction={() => navigation.navigate('Main', { screen: 'Home' })}
      />
    );
  }

  function handlePlaceOrder() {
    const orderId = checkout.confirmOrder();
    // replace: Back from the confirmation must not return to checkout.
    if (orderId) navigation.replace('OrderDetails', { orderId, justPlaced: true });
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-cream" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="gap-5 p-4 pb-10" keyboardShouldPersistTaps="handled">
        <View className="gap-3 rounded-2xl bg-surface p-4">
          <Text className="text-lg font-bold text-ink">Order summary</Text>
          {checkout.items.map((item) => (
            <View key={item.product.id} className="flex-row justify-between gap-3">
              <Text className="flex-1 text-ink">
                {item.quantity} × {item.product.name}
              </Text>
              <Text className="text-ink">{formatPrice(item.product.price * item.quantity)}</Text>
            </View>
          ))}
          <View className="flex-row justify-between border-t border-line pt-3">
            <Text className="text-lg font-bold text-ink">Total</Text>
            <Text className="text-lg font-bold text-ink">{formatPrice(checkout.total)}</Text>
          </View>
        </View>

        <View className="gap-4">
          <Text className="text-lg font-bold text-ink">Delivery details</Text>
          <AppTextInput
            label="Delivery address"
            value={checkout.address}
            onChangeText={checkout.setAddress}
            placeholder="Street, area, city"
            multiline
            error={checkout.errors.address}
          />
          <AppTextInput
            label="Mobile number"
            value={checkout.phone}
            onChangeText={checkout.setPhone}
            placeholder="01XXXXXXXXX"
            keyboardType="phone-pad"
            maxLength={11}
            error={checkout.errors.phone}
          />
        </View>

        <AppButton label={`Place order · ${formatPrice(checkout.total)}`} onPress={handlePlaceOrder} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
