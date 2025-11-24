import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { format, startOfWeek, subWeeks } from "date-fns";

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

interface WorkoutStatsProps {
  workouts: Workout[];
}

const COLORS = ["#3b82f6", "#60a5fa", "#f59e0b", "#6366f1", "#9ca3af", "#8884d8", "#82ca9d"]

export const WorkoutStats = ({ workouts }: WorkoutStatsProps) => {
  const totalWorkouts = workouts.length;

  const totalVolume = useMemo(() => {
    return workouts.reduce((total, workout) => {
      return (
        total +
        workout.exercises.reduce((exerciseTotal, exercise) => {
          return (
            exerciseTotal +
            exercise.sets.reduce(
              (setTotal, set) => setTotal + set.reps * set.weight,
              0
            )
          );
        }, 0)
      );
    }, 0);
  }, [workouts]);

  const weeklyWorkouts = useMemo(() => {
    const weeks: any[] = [];
    for (let i = 7; i >= 0; i--) {
      const weekStart = startOfWeek(subWeeks(new Date(), i));
      weeks.push({
        week: format(weekStart, "MMM d"),
        count: 0,
      });
    }

    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.workout_date);
      const weekStart = startOfWeek(workoutDate); // Find which week this workout belongs to

      weeks.forEach((week) => {
        const weekDate = new Date(week.week + ", " + new Date().getFullYear());
        if (format(weekStart, "MMM d") === format(weekDate, "MMM d")) {
          week.count++; // Increment count if workout matches this week
        }
      });
    });

    return weeks;
  }, [workouts]); // Recalculates only when workouts change

  // Volume by muscle group
  const volumeByCategory = useMemo(() => {
    const categoryMap = new Map<string, number>();

    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        const category = exercise.category || "Other";
        const volume = exercise.sets.reduce(
          (total, set) => total + set.reps * set.weight, 
          0
        );
        categoryMap.set(category, (categoryMap.get(category) || 0) + volume);
      });
    });

    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);
  }, [workouts]);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-medium">
              Total Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white text-3xl font-bold">{totalWorkouts}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-medium">
              Total Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white  text-3xl font-bold">
              {Math.round(totalVolume).toLocaleString()}
            </div>
            <p className="text-sx text-white">lbs</p>
          </CardContent>
        </Card>
      </div>

      {/* Workout frequency chart */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">
            Workout Frequency (Last 8 Weeks)
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyWorkouts}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#333333"
              />
              <XAxis
                dataKey="week"
                stroke="#808588"
                fontSize={12}
              />
              <YAxis stroke="#808588" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1b4b",
                  border: "1px solid #7c3aed",
                  borderRadius: "8px",
                  color: "#e9d5ff"
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Volume by Muscle group */}
      {volumeByCategory.length > 0 && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="text-white font-bold">
            Volume by Muscle Group
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={volumeByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {volumeByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px"
                }}
              />
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
