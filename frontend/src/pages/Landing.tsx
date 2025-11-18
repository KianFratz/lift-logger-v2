import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Dumbbell, TrendingUp, History } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-primary"></Dumbbell>
          <h1 className="text-2xl font-bold">
            <Link to={"/"}>Lift Logger</Link>
          </h1>
        </div>
        <div>
          <Button variant="ghost">
            <Link to={"/auth"}>Sign In</Link>{" "}
          </Button>
          <Button className="ml-2">
            <Link to={"/auth"}>Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Track Your Strength Journey
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The simplest way to log your workouts, track progress, and crush your
          fitness goals. Beautiful charts, detailed history, all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate("/auth")}>
            Start Logging Free
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Dumbbell className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Easy Workout Logging</CardTitle>
              <CardDescription>
                Quickly log exercises, sets, reps, and weight. Add notes to
                track how you felt.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Visual Progress</CardTitle>
              <CardDescription>
                Beautiful charts showing workout frequency, volume by muscle
                group, and exercise progression.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <History className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Complete History</CardTitle>
              <CardDescription>
                Never forget a workout. Browse your complete exercise history
                and track improvements over time.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">
              Ready to Get Stronger?
            </CardTitle>
            <CardDescription className="text-lg mb-6">
              Join thousands of lifters tracking their progress with Lift
              Logger.
            </CardDescription>
            <Button size="lg" onClick={() => navigate("/auth")}>
              Start Your Journey
            </Button>
          </CardHeader>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border mt-20">
        <p className="text-center text-muted-foreground">
          © 2025 Lift Logger. Track smarter, lift stronger.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
