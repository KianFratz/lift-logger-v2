import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number;
}

interface Exercise {
  name: string;
  category: string;
  sets: ExerciseSet[];
}

interface WorkoutFormProps {
  onSubmit: (exercises: Exercise[], notes: string) => void;
  loading?: boolean;
}

function WorkoutForm({ onSubmit, loading }: WorkoutFormProps) {
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", category: "", sets: [{ setNumber: 1, reps: 0, weight: 0 }] },
  ]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(exercises, notes);
  };

  const removeExercise = (index: number) => {
    // Create a new list of exercises that contains everything except the item at this index
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (
    index: number,
    field: keyof Exercise,
    value: string
  ) => {
    // Copy the current exercises. Change one field of one exercise. Save the updated list back to state
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  // Copy the exercises array. Find the specific exercise.
  //  Find the specific set inside that exercise. Update one field of that set.
  // Save the updated exercises back to state
  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof ExerciseSet,
    value: number
  ) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets[setIndex] = {
      ...updated[exerciseIndex].sets[setIndex],
      [field]: value,
    };
    setExercises(updated);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets = updated[exerciseIndex].sets.filter(
      (_, i) => i !== setIndex
    );
    // Renumber sets
    updated[exerciseIndex].sets.forEach((set, i) => {
      set.setNumber = i + 1;
    });
    setExercises(updated);
  };

  const addSet = (exerciseIndex: number) => {
    const updated = [...exercises];
    const newSetNumber = updated[exerciseIndex].sets.length + 1;
    updated[exerciseIndex].sets.push({
      setNumber: newSetNumber,
      reps: 0,
      weight: 0,
    });
    setExercises(updated);
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: "", category: "", sets: [{ setNumber: 1, reps: 0, weight: 0 }] },
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {exercises.map((exercise, exerciseIndex) => (
        <Card
          key={exerciseIndex}
          className="bg-card border-border shadow-[var(--shadow-card)]"
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Exercise {exerciseIndex + 1}
              </CardTitle>
              {exercises.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExercise(exerciseIndex)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`exercise-name-${exerciseIndex}`}>
                  Exercise Name
                </Label>
                <Input
                  id={`exercise-name-${exerciseIndex}`}
                  value={exercise.name}
                  onChange={(e) =>
                    updateExercise(exerciseIndex, "name", e.target.value)
                  }
                  placeholder="Bench Press"
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exercise-category-${exerciseIndex}`}>
                  Category
                </Label>
                <Select
                  value={exercise.category}
                  onValueChange={(value) =>
                    updateExercise(exerciseIndex, "category", value)
                  }
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chest">Chest</SelectItem>
                    <SelectItem value="Back">Back</SelectItem>
                    <SelectItem value="Legs">Legs</SelectItem>
                    <SelectItem value="Shoulders">Shoulders</SelectItem>
                    <SelectItem value="Arms">Arms</SelectItem>
                    <SelectItem value="Core">Core</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Sets</Label>
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex gap-3 items-end">
                  <div className="flex-1 space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Set {set.setNumber}
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        type="number"
                        value={set.reps || ""}
                        onChange={(e) =>
                          updateSet(
                            exerciseIndex,
                            setIndex,
                            "reps",
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="Reps"
                        required
                        min="0"
                        className="bg-secondary border-border"
                      />
                      <Input
                        type="number"
                        step="0.01"
                        value={set.weight || ""}
                        onChange={(e) =>
                          updateSet(
                            exerciseIndex,
                            setIndex,
                            "weight",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        placeholder="Weight (lbs)"
                        required
                        min="0"
                        className="bg-secondary border-border"
                      />
                    </div>
                  </div>
                  {exercise.sets.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSet(exerciseIndex, setIndex)}
                      className="hover:bg-destructive/10 hover:text-destructive mb-[2px]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSet(exerciseIndex)}
                className="w-full border-border hover:bg-secondary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Set
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addExercise}
        className="w-full border-border hover:bg-secondary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Exercise
      </Button>

      <div className="space-y-2">
        <Label htmlFor="notes">Workout Notes (Optional)</Label>
        <Input
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Felt strong today..."
          className="bg-secondary border-border"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary-glow"
      >
        {loading ? "Saving..." : "Save Workout"}
      </Button>
    </form>
  );
}

export default WorkoutForm;
