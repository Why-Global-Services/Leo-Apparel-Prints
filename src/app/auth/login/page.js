import AuthPage from "@/app/components/auth/AuthPage";

export const metadata = { title: "Sign In | Leo Cult" };

export default function LoginPage() {
  return <AuthPage defaultMode="login" />;
}