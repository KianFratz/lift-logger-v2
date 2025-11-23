import { Button } from "@/components/ui/button";
import WorkoutForm from "@/components/WorkoutForm";
import { WorkoutHistory } from "@/components/WorkoutHistory";
import { supabase } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import type { Session } from "@supabase/supabase-js";
import { BarChart3, Dumbbell, History, LogOut, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number;
}

interface Exercise {
  id: string;
  name: string;
  category: string | null;
  sets: ExerciseSet[];
}

interface Workout {
  id: string;
  workout_date: string;
  notes: string | null;
  exercises: Exercise[];
}

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);


  
  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (session) {
      fetchWorkouts();
    }
  }, [session]);

  const fetchWorkouts = async () => {
    try {
      // Fetch workouts
      const { data: workoutsData, error: workoutsError } = await supabase
        .from("workouts")
        .select("*")
        .order("workout_date", { ascending: false });

      if (workoutsError) throw workoutsError;

      // Fetch exercises for each workout
      const workoutsWithExercises = await Promise.all(
        (workoutsData || []).map(async (workout) => {
          const { data: exercisesData, error: exercisesError } = await supabase
            .from("exercises")
            .select("*")
            .eq("workout_id", workout.id);

          if (exercisesError) throw exercisesError;

          // Fetch sets for each exercise
          const exercisesWithSets = await Promise.all(
            (exercisesData || []).map(async (exercise) => {
              const { data: setsData, error: setsError } = await supabase
                .from("exercise_sets")
                .select("*")
                .eq("exercise_id", exercise.id)
                .order("set_number");

              if (setsError) throw setsError;

              return {
                id: exercise.id,
                name: exercise.exercise_name,
                category: exercise.exercise_category,
                sets:
                  setsData?.map((set) => ({
                    setNumber: set.set_number,
                    reps: set.reps,
                    weight: Number(set.weight),
                  })) || [],
              };
            })
          );

          return {
            id: workout.id,
            workout_date: workout.workout_date,
            notes: workout.notes,
            exercises: exercisesWithSets,
          };
        })
      );

      setWorkouts(workoutsWithExercises);
    } catch (error: any) {
      console.log("Failed to load workouts");
      console.error(error);
    }
  };


  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSubmitWorkout = async (
    exercises: Array<{
      name: string;
      category: string;
      sets: Array<{ setNumber: number; reps: number; weight: number }>;
    }>,
    notes: string
  ) => {
    if (!session?.user) return;

    setLoading(true);
    try {
      // Create workout
      const { data: workout, error: workoutError } = await supabase
        .from("workouts")
        .insert({
          user_id: session.user.id,
          notes: notes || null,
        })
        .select()
        .single();

      if (workoutError) throw workoutError;

      // Create exercises and sets
      for (const exercise of exercises) {
        const { data: exerciseData, error: exerciseError } = await supabase
          .from("exercises")
          .insert({
            workout_id: workout.id,
            exercise_name: exercise.name,
            exercise_category: exercise.category || null,
          })
          .select()
          .single();

        if (exerciseError) throw exerciseError;

        // Create sets
        const setsToInsert = exercise.sets.map((set) => ({
          exercise_id: exerciseData.id,
          set_number: set.setNumber,
          reps: set.reps,
          weight: set.weight,
        }));

        const { error: setsError } = await supabase.from("exercise_sets").insert(setsToInsert);

        if (setsError) throw setsError;
      }

      console.log("Workout saved!");
      fetchWorkouts();
      setActiveTab("history");
    } catch (error: any) {
      console.error(error.message || "Failed to save workout");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorkout = async (workoutId: string) => {
    try {
      const { error } = await supabase.from("workouts").delete().eq("id", workoutId);

      if (error) throw error;

      console.log("Workout deleted");
      fetchWorkouts();
    } catch (error: any) {
      console.error("Failed to delete workout");
    }
  };

  // Get exercise history for a specific exercise name
  const getExerciseHistory = (exerciseName: string) => {
    return workouts
      .filter((w) => w.exercises.some((e) => e.name.toLowerCase() === exerciseName.toLowerCase()))
      .map((w) => ({
        workout_date: w.workout_date,
        sets:
          w.exercises.find((e) => e.name.toLowerCase() === exerciseName.toLowerCase())?.sets || [],
      }));
  };

  if (!session) {
    return null;
  }

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
                  ? "bg-violet-600 text-white shadow"
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
                  ? "bg-violet-600 text-white shadow"
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
                  ? "bg-violet-600 text-white shadow"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-6">
            <WorkoutForm onSubmit={handleSubmitWorkout} loading={loading} />
          </TabsContent>

          <TabsContent value="history">
            <WorkoutHistory workouts={workouts} onDelete={handleDeleteWorkout}/>
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
