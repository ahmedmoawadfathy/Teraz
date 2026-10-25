import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '@/components/ui/AppButton';
import { AppTextInput } from '@/components/ui/AppTextInput';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { formatPrice } from '@/features/catalogue/api';
import { ProductImage } from '@/features/catalogue/components/ProductImage';
import { colors } from '@/theme/tokens';
import { useCheckout } from '../hooks/useCheckout';

export default function CheckoutScreen({ navigation }: RootStackScreenProps<'Checkout'>) {
  const checkout = useCheckout();

  if (checkout.items.length === 0) {
    return (
      <StateMessage
        type="empty"
        icon="bag-handle-outline"
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
      <ScrollView contentContainerClassName="gap-5 px-5 pb-12 pt-2" keyboardShouldPersistTaps="handled">
        <View className="gap-4 rounded-[28px] bg-surface p-5 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-gold/15">
              <Ionicons name="location-outline" size={18} color={colors.gold} />
            </View>
            <Text className="font-display text-xl text-ink">Delivery details</Text>
          </View>
          <AppTextInput
            label="Delivery address"
            icon="home-outline"
            value={checkout.address}
            onChangeText={checkout.setAddress}
            placeholder="Street, area, city"
            multiline
            error={checkout.errors.address}
          />
          <AppTextInput
            label="Mobile number"
            icon="call-outline"
            value={checkout.phone}
            onChangeText={checkout.setPhone}
            placeholder="01XXXXXXXXX"
            keyboardType="phone-pad"
            maxLength={11}
            error={checkout.errors.phone}
          />
        </View>

        <View className="gap-4 rounded-[28px] bg-surface p-5 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-gold/15">
              <Ionicons name="receipt-outline" size={18} color={colors.gold} />
            </View>
            <Text className="font-display text-xl text-ink">Order summary</Text>
          </View>
          {checkout.items.map((item) => (
            <View key={item.lineId} className="flex-row items-center gap-3">
              <ProductImage product={item.product} size="thumb" />
              <View className="flex-1">
                <Text numberOfLines={1} className="font-semibold text-ink">
                  {item.product.name}
                </Text>
                <Text className="text-sm text-muted">
                  Qty {item.quantity}
                  {item.size ? ` · Size ${item.size}` : ''}
                </Text>
              </View>
              <Text className="font-semibold text-ink">{formatPrice(item.product.price * item.quantity)}</Text>
            </View>
          ))}
          <View className="h-px bg-line" />
          <View className="flex-row items-end justify-between">
            <Text className="font-display text-xl text-ink">Total</Text>
            <Text className="font-display text-3xl text-ink">{formatPrice(checkout.total)}</Text>
          </View>
        </View>

        <AppButton label={`Place order · ${formatPrice(checkout.total)}`} icon="checkmark-circle-outline" onPress={handlePlaceOrder} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
