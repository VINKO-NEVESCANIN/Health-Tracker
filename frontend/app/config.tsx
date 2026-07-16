import { Redirect } from "expo-router";

export default function ConfigRedirect() {
  return <Redirect href="/(protected)/config" />;
}
