import React from 'react';

interface ContentArrayProp {
  name: string;
  exerciseCount: number;
}

const Total = ({ courses }: { courses: Array<ContentArrayProp> }) => {
    return (
      <p>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
}

export default Total