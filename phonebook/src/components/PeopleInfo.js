const PeopleInfo =({showPerson, removePerson})=>{
  return(
      <div>
        {showPerson.map(person =>
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => removePerson(person)} >
              delete
            </button>
          </p>
        )}        
      </div>      
  );
}

export default PeopleInfo