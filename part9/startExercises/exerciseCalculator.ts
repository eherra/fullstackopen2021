interface LabeledValue {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const getRatingValue = (average: number): number => {
    switch (true) {
        case average < 1:
            return 1;
        case average > 5:
            return 3;
        default: 
            return 2;
    }
};

const getRatingDescription = (ratingValue: number): string => {
    switch (ratingValue) {
        case 1:
            return 'really bad';
        case 2:
            return 'not too bad but could be better';
        default: 
            return 'you rock';
    }
};

export const calculateExercises = (orginalTarget: number, values: Array<number>): LabeledValue => {
    const trainDays: number = values.filter(x => x === 0).length;
    const averageHours: number = values.reduce((a, b) => a + b, 0) / values.length;
    const ratingValue: number = getRatingValue(averageHours);
    const ratingDescriptionValue: string = getRatingDescription(ratingValue);
    
    return {
        periodLength: values.length,
        trainingDays: trainDays,
        success: averageHours >= orginalTarget,
        rating: ratingValue,
        ratingDescription: ratingDescriptionValue,
        target: orginalTarget,
        average: averageHours
    };
};

interface calculatorValues {
    target: number,
    values: Array<number>
}

const parseCalculatorArguments = (args: Array<string>): calculatorValues => {
    if (args.length < 3) throw new Error('Not enough arguments');

    const arrayValues: Array<number> = [];
    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }
        arrayValues.push(Number(args[i]));
    }

    // checking the target value
    if (isNaN(Number(args[2]))) {
        throw new Error('Provided values were not numbers!');
    }

    return {
        target: Number(args[2]),
        values: arrayValues
    };
};

try {
    const {target, values} = parseCalculatorArguments(process.argv);
    console.log(calculateExercises(target,  values));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }   
    console.log(errorMessage);
}