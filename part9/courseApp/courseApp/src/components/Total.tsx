import React from 'react';
import { CoursePart } from "../types";

interface TotalProps {
    courses: Array<CoursePart>;
}

const Content = (props : TotalProps) => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    )
}

export default Content