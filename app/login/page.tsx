import LeftSideInfo from "@/components/left-side-info";
import { infoDetails } from "@/const";
import LoginForm from "@/components/forms/login";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration/Info */}
        <LeftSideInfo
          title="Bienvenido de vuelta"
          details={infoDetails.slice(3, 6)}
          description="Accede a tu cuenta para continuar evaluando y mejorando tus currículums con nuestra tecnología de IA."
        />

        {/* Right side - Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}
