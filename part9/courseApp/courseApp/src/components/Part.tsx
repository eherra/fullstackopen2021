import React from 'react';
import { CoursePart } from "../types";

interface PartProps {
    course: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (props : PartProps) => {
    switch (props.course.type) {
        case 'submission':
            return (
                <div>
                    <b>{props.course.name} {props.course.exerciseCount}</b><br/>
                    <i>{props.course.description}</i><br/>
                    submit to {props.course.exerciseSubmissionLink}<br/><br/>
                </div>
            )
        case 'groupProject':
            return (
                <div>
                   <b>{props.course.name} {props.course.exerciseCount}</b><br/>
                    project exercises {props.course.groupProjectCount}<br/><br/>
                </div>
            )
        case 'normal':
            return (
                <div>
                    <b>{props.course.name} {props.course.exerciseCount}</b><br/>
                    <i>{props.course.description}</i><br/><br/>
                </div>
            )
        case 'description':
            return (
                <div>
                    <b>{props.course.name} {props.course.exerciseCount}</b><br/>
                    <i>{props.course.description}</i><br/><br/>
                </div>
            )
        case 'special':
            return (
                <div>
                    <b>{props.course.name} {props.course.exerciseCount}</b><br/>
                    <i>{props.course.description}</i><br/>
                    required skills: {props.course.requirements.join(", ")}<br/><br/>
                </div>
            )
        default:
            return assertNever(props.course)
    }
}

export default Part