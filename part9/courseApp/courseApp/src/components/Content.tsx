import React from 'react';
import { CoursePart } from "../types";
import Part from './Part'

interface ContentProps {
    courses: Array<CoursePart>;
}

const Content = (props : ContentProps) => {
    return (
        <div>
            {props.courses.map(course =>
                <Part key={course.name} course={course}/>
            )}
        </div>
    )
}

export default Content