// root-layout.server.js (or similar)
import { metadata } from "./metadata";
import SubLayout from "./SubLayout"; // Import the client component

export { metadata }; // Export metadata from a server component

export default function ServerRootLayout({ children }) {
  return <SubLayout>{children}</SubLayout>;
}
