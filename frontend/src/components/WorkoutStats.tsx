import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
    workouts: Workout[]
}

export const WorkoutStats = ( { workouts }: WorkoutStatsProps ) => {

    const totalWorkouts = workouts.length;
    const totalVolume = useMemo(() => {
        return workouts.reduce((total, workout) => {
            return (total + workout.exercises.reduce((exerciseTotal, exercise) => {
                return (
                    exerciseTotal +
                    exercise.sets.reduce(
                        (setTotal, set) => setTotal + set.reps * set.weight, 0
                    )
                );
            }, 0)
        );
        }, 0);
    }, [workouts])

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
                        <CardTitle className="text-white text-sm font-medium">Total Volume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-white  text-3xl font-bold">
                            {Math.round(totalVolume).toLocaleString()}
                        </div>
                        <p className="text-sx text-white">lbs</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}