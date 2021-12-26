import React from 'react';
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ course }: {course: CoursePart}) => {
    switch (course.type) {
        case 'submission':
            return (
                <div>
                    <b>{course.name} {course.exerciseCount}</b><br/>
                    <i>{course.description}</i><br/>
                    submit to {course.exerciseSubmissionLink}<br/><br/>
                </div>
            )
        case 'groupProject':
            return (
                <div>
                   <b>{course.name} {course.exerciseCount}</b><br/>
                    project exercises {course.groupProjectCount}<br/><br/>
                </div>
            )
        case 'normal':
            return (
                <div>
                    <b>{course.name} {course.exerciseCount}</b><br/>
                    <i>{course.description}</i><br/><br/>
                </div>
            )
        case 'description':
            return (
                <div>
                    <b>{course.name} {course.exerciseCount}</b><br/>
                    <i>{course.description}</i><br/><br/>
                </div>
            )
        case 'special':
            return (
                <div>
                    <b>{course.name} {course.exerciseCount}</b><br/>
                    <i>{course.description}</i><br/>
                    required skills: {course.requirements.join(", ")}<br/><br/>
                </div>
            )
        default:
            return assertNever(course)
    }
}

export default Part