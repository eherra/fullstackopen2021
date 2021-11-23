export const calculateBmi = (height: number, kilos: number) => {
    const bmi: number = kilos / (height * height) * 10000;
    switch (true) {
        case bmi <= 22.9 && bmi >= 18.5:
            return 'Normal (healthy weight)';
        case bmi < 18.5:
            return 'Underweight';
        default:
            return 'Overweight';
    }
};

interface BMIValues {
    height: number,
    kilos: number
}

const parseArguments = (args: Array<string>): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        kilos: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

try {
    const { height, kilos } = parseArguments(process.argv);
    console.log(calculateBmi(height, kilos));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
