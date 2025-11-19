import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LandingPageHeader from "@/components/ui/landingPageHeader";
import {
  BarChart3,
  Dumbbell,
  TrendingUp,
  History,
  BarChart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-black">
        {/* Header */}
        <LandingPageHeader />

        <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-40 text-center">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r text-violet-500 from-primary to-primary-glow bg-clip-text text-transparent">
              Track Your Strength Journey
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              The simplest way to log your workouts, track progress, and crush
              your fitness goals. Beautiful charts, detailed history, all in one
              place
            </p>
            <div className="flex-gap-4 justify-center ">
              <Button className="text-white bg-violet-500">
                <Link to={"/signin"}>Start Logging Free</Link>
              </Button>
            </div>
          </section>

          {/* Features */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-gray-400">
                <CardHeader>
                  <Dumbbell className="h-12 w-12 text-primary text-violet-500 mb-2" />
                  <CardTitle className="text-white">Easy Workout Logging</CardTitle>
                  <CardDescription className="text-gray-400">
                    Quickly log exercises, sets, reps, and weight. Add nots to
                    track how you felt
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-gray-400">
                <CardHeader>
                  <BarChart className="h-12 w-12 text-primary mb-2 text-violet-500" />
                  <CardTitle className="text-white">Visual Progress</CardTitle>
                  <CardDescription className="text-gray-400">
                    Beautiful charts showing workout frequency, volume by muscle
                    group, and exercise progression
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-gray-400">
                <CardHeader>
                  <History className="h-12 w-12 text-primary mb-2 text-violet-500" />
                  <CardTitle className="text-white">Complete History</CardTitle>
                  <CardDescription className="text-gray-400">
                    Never forget a workout. Browse your complete history and
                    track improvements over
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 py-20 text-center ">
            <Card className="bg-violet-500/20 from-primary/10 to-primary-glow/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl mb-4 text-white">
                  Ready to Get Stronger?
                </CardTitle>
                <CardDescription className="text-lg mb-6 text-gray-400">
                  Join thousands of lifters tracking their progress with Lift
                  Logger.
                </CardDescription>
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="text-white bg-violet-500 cursor-pointer"
                >
                  Start Your Journey
                </Button>
              </CardHeader>
            </Card>
          </section>

          {/* Footer */}
          <footer className="container mx-auto px-4 py-8 border-t border-gray-400 border-border mt-20">
            <div className="text-center text-gray-400">
              &copy; {new Date().getFullYear()} Lift Logger. All rights
              reserved.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Landing;
