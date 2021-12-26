import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

const validateQueryParameters = (param1: number, param2: number): boolean => {
  return (isNaN(param1) || isNaN(param2) || !param1 || !param2);
};

const validateArrayParameters = (args: Array<string>): boolean => {
  for (let i = 0; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
        return false;
    }
  }
  return true;
};

const isParamsValid = (dailyExercises: Array<string>, target: number) => {
  return (dailyExercises && validateArrayParameters(dailyExercises) && !isNaN(target) && target);
};

const getTraniningValuesAsNumber = (args: Array<string>): Array<number> => {
  const toReturnArray = [];
  for (let i = 0; i < args.length; i++) {
      toReturnArray.push(Number(args[i]));
  }
  return toReturnArray;
};

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const queryHeight = Number(req.query.height);
  const queryWeight = Number(req.query.weight);

  if (validateQueryParameters(queryHeight, queryWeight)) {
    res.send({ error: "malformatted parameters" });
  } else {
    res.send({
      heigth: queryHeight,
      weight: queryWeight,
      bmi: calculateBmi(queryHeight, queryWeight)
    });
  }
});

app.post('/exercises', (req, res) => {
  const dailyExercises = req.body.daily_exercises;
  const target = Number(req.body.target);

  if (isParamsValid(dailyExercises, target)) {
    res.json(calculateExercises(target, getTraniningValuesAsNumber(dailyExercises)));
  } else {
    if (!target || !dailyExercises) {
      res.json({ error: "parameters missing" });
    } else {
      res.json({ error: "malformatted parameters" });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});