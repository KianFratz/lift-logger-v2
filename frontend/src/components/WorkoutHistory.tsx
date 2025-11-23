import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface WorkoutSet {
  setNumber: number;
  reps: number;
  weight: number;
}

interface Exercise {
  id: string;
  name: string;
  category: string | null;
  sets: WorkoutSet[];
}

interface Workout {
  id: string;
  workout_date: string;
  notes: string | null;
  exercises: Exercise[];
}

interface WorkoutHistoryProps {
  workouts: Workout[];
  onEdit?: (workoutId: string) => void;
  onDelete?: (workoutId: string) => void;
}

export const WorkoutHistory = ({
  workouts,
  onEdit,
  onDelete,
}: WorkoutHistoryProps) => {
  if (workouts.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="pt-6 text-center text-white">
          No workouts yet. Start logging your lifts!
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card key={workout.id} className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white text-lg">
                  {format(new Date(workout.workout_date), "EEEE, MMMM d, yyyy")}
                </CardTitle>
                {workout.notes && (
                  <p className="text-sm text-foreground text-white">
                    {workout.notes}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {onEdit && (
                  <Button
                    size="sm"
                    onClick={() => onEdit(workout.id)}
                    className="hover:bg-violet-300 bg-violet-700 text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    onClick={() => onDelete(workout.id)}
                    size="sm"
                    className="hover:bg-red-300 text-red-700 bg-red-500"
                  >
                    <Trash2 className="h-4 w-4 text-white" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {workout.exercises.map((exercise) => (
              <div key={exercise.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-white">{exercise.name}</h4>
                  {exercise.category && (
                    <Badge className=" text-white bg-gray-700">
                      {exercise.category}
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-white font-medium">Set</div>
                  <div className="text-white font-medium">Reps</div>
                  <div className="text-white font-medium">Weight</div>
                  {exercise.sets.map((set) => (
                    <>
                      <div key={`${set.setNumber}-num`} className="text-white">{set.setNumber}</div>
                      <div key={`${set.reps}-reps`} className="text-white">{set.reps}</div>
                      <div key={`${set.weight}-weight`} className="text-white">{set.weight} lbs</div>
                    </>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
