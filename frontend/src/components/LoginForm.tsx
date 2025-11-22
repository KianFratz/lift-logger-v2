import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dumbbell } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;

      navigate("/dashboard");
    });
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
          return
        }

        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}`,
          },
        });

        if (error) {
          setError(error.message);
          return
        }
        
        toast.success("Account created! You can now login.");
        setIsLogin(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="bg-gray-400/10 border-gray-400/20">
        <CardHeader>
          <CardTitle className="text-white">
            {isLogin ? "Welcome Back, Login to your account" : "Get Started"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isLogin
              ? "Login to track your lifts"
              : "Create an account to start tracking"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-white">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-400"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-white"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-400"

                />
              </Field>
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
              <Field>
                <Button
                  type="submit"
                  className=" text-white bg-violet-500"
                  disabled={loading}
                >
                  {loading ? "Loading..." : isLogin ? "Login" : "Sign up"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="mt-4">
            <FieldDescription className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-accent hover:underline text-white"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Log in"}
              </button>
            </FieldDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
