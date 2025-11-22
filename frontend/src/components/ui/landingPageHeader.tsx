import React from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";

const LandingPageHeader = () => {
  return (
    <div>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex gap-1">
          <Dumbbell className="h-10 w-10 text-white bg-violet-500/60 rounded-xl p-2" />
          <h1 className="text-2xl font-bold text-white pl-2 mt-1">Lift Logger</h1>
        </div>
        <div>
          <Button variant="ghost" className="text-white hover:bg-violet-500">
            <Link to={"/auth"}>Sign In</Link>{" "}
          </Button>
          <Button className="ml-2 text-white bg-violet-500">
            <Link to={"/auth"}>Get Started</Link>
          </Button>
        </div>
      </header>
    </div>
  );
};

export default LandingPageHeader;
