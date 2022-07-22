export {};

declare global {
  interface Window {
    QiSession: any; // 👈️ turn off type checking
  }
}