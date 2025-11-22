import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BarChart3, Dumbbell, History, LogOut, Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="bg-black min-h-screen pb-8">
      {/* Header */}
      <header className="border-b border-gray-700 backdrop-blur-sm sticky top-0 z-10 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow bg-violet-500">
              <Dumbbell className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Lift Logger</h1>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="hover:text-red-500 hover:bg-text-500/80"
          >
            <LogOut className="h-5 w-5 mr-2 " />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl ">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 rounded-lg bg-gray-900 p-1 border border-gray-700">
            <TabsTrigger
              value="new"
              className={`text-white flex items-center justify-center py-1 px-2 rounded-md transition-all ${
                activeTab === "new"
                  ? "bg-violet-600 text-white- shadow"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Workout
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className={`text-white flex items-center justify-center py-1 px-2 rounded-md transition-all ${
                activeTab === "history"
                  ? "bg-violet-600 text-white- shadow"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className={`text-white flex items-center justify-center py-1 px-2 rounded-md transition-all ${
                activeTab === "stats"
                  ? "bg-violet-600 text-white- shadow"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-6">
            {/* <WorkoutForm onSubmit={handleSubmitWorkout} loading={loading} /> */}
          </TabsContent>

          <TabsContent value="history">
            {/* <WorkoutHistory
              workouts={workouts}
              onDelete={handleDeleteWorkout}
            /> */}
          </TabsContent>

          <TabsContent value="stats">
            {/* <WorkoutStats workouts={workouts} /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
