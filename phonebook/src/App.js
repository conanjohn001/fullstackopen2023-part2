import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PeopleInfo from "./components/PeopleInfo";
import Notice from "./components/Notice";

import personService from "./services/persons"

const App=()=> {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [info, setInfo] = useState({message: null})

  useEffect(()=>{
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const notifyMessage = (message, type='info' )=>{
    setInfo({message, type})
    setTimeout(()=>{
      setInfo({message: null})
    }, 5000)
  }

  const updatePerson = (person)=>{
    const nameExist = window.confirm(newName + 'is already added to phonebook, replace number ?')
    if (nameExist) {
      personService.update(person.id, {...person, number: newNumber})
        .then(updated => {
          setPersons(persons.map(p => p.id !== person.id ? p : updated))
          notifyMessage(`phone number of ${person.name} updated`)
        })
        .catch(()=>{
          notifyMessage(`${person.name} has already removed`, 'error')
          setPersons(persons.filter(p =>p.id !== person.id))
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const addPerson =(event)=>{
    event.preventDefault();
    const nameMatch = persons.find(p => p.name === newName)

    if (nameMatch) {
      updatePerson(nameMatch)
      return
    }
    personService.create({
      name: newName,
      number: newNumber
    }).then(created => {
      setPersons(persons.concat(created))
      notifyMessage(`${created.name} added`)
      setNewName('')
      setNewNumber('')
    })    
  }

  const showPerson = filterName ? persons.filter(
    p => p.name.toLowerCase() === filterName.toLowerCase()
  ) : persons

  const removePerson =(person)=>{
    const removeConfirm = window.confirm(`remove ${person.name} from phonebook ?`)
    if (removeConfirm) {
      personService.remove(person.id).then(()=>{
        setPersons(persons.filter(p => p.id !== person.id))
        notifyMessage(`number of ${person.name} deleted`)
      })
    }
  }  

  return (
    <div>
        <Notice info={info} />

      <h2>Phonebook</h2>
        <Filter filterName={filterName} setFilterName={setFilterName} />

      <h2>Add a new</h2>
        <PersonForm 
          addPerson={addPerson}
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
        />
      
      <h2>Shown people and phone numbers</h2>
        <PeopleInfo 
          showPerson={showPerson}
          removePerson={removePerson}
        />
      
    </div>
  );
}

export default App;
