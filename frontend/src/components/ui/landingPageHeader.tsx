import React from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";

const LandingPageHeader = () => {
  return (
    <div>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-primary text-violet-500"></Dumbbell>
          <h1 className="text-2xl font-bold text-white">
            <Link to={"/"}>Lift Logger</Link>
          </h1>
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
}

export default LandingPageHeader;
