# Teraz — Smart Tie & Belt Shopping and Styling App

Mobile Application Development (26CSCI38H) — team project, Phase 1 UI prototype.

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go. Any valid email and an 8+ character password logs you in (Phase 1 has no real accounts yet).

## Stack

Expo + TypeScript · NativeWind (`className`) · React Navigation (typed native stack + bottom tabs) · `@/` alias → `src/`

## Structure (feature-based MVVM)

```
src/
  app/navigation/      RootNavigator.tsx, types.ts (typed routes and params)
  components/ui/       AppButton, AppTextInput, Chip, StateMessage (shared, feature-free)
  theme/tokens.ts      colours, spacing, radius
  features/
    auth/        screens: Login, Register              hooks: useLogin, useRegister
    catalogue/   screens: Catalogue, Search, ProductDetails
                 hooks: useCatalogue, useProductSearch, useProductDetails
                 components: ProductCard, ProductImage   api.ts  data.ts  types.ts
    styling/     screens: StylingInput, StylingResults  hooks: useStyling, useStylingResults
                 stylingRules.ts (rule-based matching)
    favourites/  screens: Favourites                    hooks: useFavourites (provider)
    cart/        screens: Cart, Checkout                hooks: useCart (provider), useCheckout
    orders/      screens: OrderHistory, OrderDetails    hooks: useOrders (provider)
    profile/     screens: Profile, EditProfile          hooks: useProfile (provider), useEditProfile
```

- **View** = `screens/` and `components/` (render state, forward events)
- **ViewModel** = `hooks/` (state, validation, actions)
- **Model** = `api.ts`, `types.ts`, `data.ts`, `stylingRules.ts`

## Screens (12, excluding Login/Register)

Catalogue · Search · Product details · Styling input · Styling results · Favourites · Cart · Checkout · Profile · Edit profile · Order history · Order details

## Sprint 01 — Architecture decisions

_To be written by the team: why these navigators, this folder structure and these tokens._
