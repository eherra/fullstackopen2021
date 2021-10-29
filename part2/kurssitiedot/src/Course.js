import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
      return (
        <div>
          {props.parts.map(part => 
            <Part key={part.id} part={part.name} exercises={part.exercises} />
          )}
        </div>
      )
  }
  
  const Part = (props) => {
    return (
    <div>
        <p>
          {props.part} {props.exercises}
        </p>
    </div>
    )
  }
  
  const Total = (props) => {
    return (
      <div>
        <p><b>Total of {Object.values(props.parts).reduce((t, {exercises}) => t + exercises, 0)} exercises</b></p>
      </div>  
    )
  }

const Course = (props) => {
    return (
        <div>
          {props.courses.map(course => 
            <div>
              <Header course={course.name}/>
              <Content parts={course.parts}/>
              <Total parts={course.parts}/>
            </div>
          )}
        </div>
      )
}

export default Course