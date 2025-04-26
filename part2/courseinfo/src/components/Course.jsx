const Header = (props) => <h1>{props.course}</h1>



const Part = ({ part }) => {
  return (
  <p>
    {part.name} {part.exercises}
  </p>
  )
}

const Content = ({ parts }) => {
  
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0, )
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}

      <Total total={total} />
    </div>
  )
}

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course