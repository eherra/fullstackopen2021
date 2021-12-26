interface TrainingData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const validateInputs = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  for (let i = 2; i < args.length; i++) {
      if (isNaN(Number(args[i]))) {
          throw new Error('Provided values were not numbers!');
      }
  }
};

export const getTraniningValuesAsNumber = (args: Array<string>): Array<number> => {
  const toReturnArray = [];
  for (let i = 3; i < args.length; i++) {
      toReturnArray.push(Number(args[i]));
  }
  return toReturnArray;
};

export const calculateExercises = (target: number, values: Array<number>): TrainingData => {
  const valuesWithoutZeroes = values.filter(n => n != 0);
  const average = valuesWithoutZeroes.reduce((a,b) => a + b, 0) / values.length;
  let rating; 
  let ratingDesc;

  switch (true) {
      case average < 2:
          rating = 1;
          ratingDesc = 'quite bad';
          break;
      case average > 4:
          rating = 3;
          ratingDesc = 'really good job';
          break;
      default:
          rating = 2;
          ratingDesc = 'not too bad but could be better';
  }

  return {
      periodLength: values.length,
      trainingDays: valuesWithoutZeroes.length,
      success: average >= target,
      rating: rating, 
      ratingDescription: ratingDesc,
      target: target,
      average: average
  };
};

try {
  validateInputs(process.argv);
  const target = Number(process.argv[2]);
  const values = getTraniningValuesAsNumber(process.argv);
  console.log(calculateExercises(target, values));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}