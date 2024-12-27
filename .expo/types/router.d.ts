/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/App` | `/Cart` | `/CatsStore` | `/EditProduct` | `/Login` | `/ProductScreen` | `/Profile` | `/SeeAllProducts` | `/SettingsScreen` | `/Splash` | `/StaffHome` | `/WorkersHome` | `/_sitemap` | `/home`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
