import { LoginForm } from "@/components/LoginForm";
import LandingPageHeader from "@/components/ui/landingPageHeader";

function Login() {
  return (
    <>
      <div className="bg-black">
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
