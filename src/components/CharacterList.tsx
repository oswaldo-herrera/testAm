import { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/CharacterCard.module.css';



const CharacterList = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        
        const response = await axios.get("http://localhost:5000/characters");
        setCharacters(response.data);
      } catch (error) {
        console.error("Error fetching characters", error);
      }
    };

    fetchCharacters();
  }, []);

  const fetchCharacterById = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching character by id", error);
    }
  };

  const getHouseClass = (house: any) => {
    switch (house) {
      case 'Gryffindor':
        return styles.gryffindor;
      case 'Slytherin':
        return styles.slytherin;
      case 'Ravenclaw':
        return styles.ravenclaw;
      case 'Hufflepuff':
        return styles.hufflepuff;
      default:
        return ''; 
    }
  };

  const filteredCharacters = characters.filter(character => {
    if (filter === "students") return character.hogwartsStudent;
    if (filter === "staff") return character.hogwartsStaff;
    return true; 
  });

  return (
    <div className={styles.characterList}>
      <img 
        src="/harry_potter.png" 
        alt="Character Filter" 
        className={styles.headerImage} 
      />
      <h2>Selecciona tu filtro</h2>
      <br></br>

      {/* Botones de filtro */}
      <div className={styles.filterButtons}>
        <button onClick={() => setFilter("all")}>Todos</button>
        <button onClick={() => setFilter("students")}>Estudiantes</button>
        <button onClick={() => setFilter("staff")}>Staff</button>
      </div>


      <div className={styles.cardContainer}>
        {filteredCharacters.map((character) => (
          <div key={character.id} className={`${styles.card} ${getHouseClass(character.house)}`}>
          <img src={character.image} alt={character.name} className={styles.image} />
          <div className={styles.details}>
            <h3 className={styles.name}>{character.name}</h3>
            <p className={styles.status}>{character.alive ? "Vivo" : "Fallecido"} / {character.hogwartsStudent ? "Estudiante" : "Staff"}</p>
            <p>Cumpleaños: {character.dateOfBirth}</p>
            <p>Género: {character.gender}</p>
            <p>Color de ojos: {character.eyeColour}</p>
            <p>Color de pelo: {character.hairColour}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
    
  );
};

export default CharacterList;
