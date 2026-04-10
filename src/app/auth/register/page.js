import AuthPage from "@/app/components/auth/AuthPage";

export const metadata = { title: "Create Account | Leo Cult" };

export default function RegisterPage() {
  return <AuthPage defaultMode="register" />;
}