import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidParameters = (weight: any, height: any): boolean => {
    return !isNaN(Number(weight)) && !isNaN(Number(height));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidExerciesParameters = (target: any, days: Array<any>): boolean => {
    if (target === undefined || days === undefined) throw new Error('parameters missing');
    if (isNaN(Number(target))) throw new Error('Provided values were not numbers!');
    
    for (let i = 0; i < days.length; i++) {
        if (isNaN(Number(days[i]))) {
            throw new Error('Provided values were not numbers!');
        }
    }

    return true;
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (request, response) => {
    const days = request.body.daily_exercises;
    const target = request.body.target;
    try {
        if (isValidExerciesParameters(target, days)) {
            response.json(calculateExercises(target, days));
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            response.json({ error: error.message });
        }   
    }
});

app.get('/bmi', (req, res) => {
    if (isValidParameters(req.query.weight, req.query.height)) {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);
        const bmi = calculateBmi(height, weight);
        res.json({ weight: weight, height: height, bmi: bmi });
    } else {
        res.json({  error: 'malformatted parameters' });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});