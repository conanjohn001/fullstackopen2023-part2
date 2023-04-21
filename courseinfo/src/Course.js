const Header = ({name})=>{
  return <h2>{name}</h2>
}

const Content = ({parts})=>{
  return(
    <div>
      {parts.map(i => 
        <p key={i.id}>
          {i.name}, {i.exercises}
        </p>
      )}
    </div>
  );
}

const Total = ({parts})=>{
  let sum = parts.reduce((accum, i) => accum + i.exercises, 0)

  return(
    <p>Total exercises: {sum}</p>
  );
}

const Course =({course})=>{
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default Course;