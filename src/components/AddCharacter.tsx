import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faUser,faTimesCircle } from "@fortawesome/free-solid-svg-icons"; 
import styles from '../styles/AddCharacterForm.module.css';

const AddCharacter = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [eyeColour, setEyeColour] = useState("");
  const [hairColour, setHairColour] = useState("");
  const [gender, setGender] = useState("male"); 
  const [position, setPosition] = useState("student"); 
  const [house, setHouse] = useState("Gryffindor");
  const [image, setImage] = useState("");
  const [alive, setAlive] = useState(true);
  const [isOpen, setIsOpen] = useState(false); 

  
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const newCharacter = {
      name,
      dateOfBirth,
      eyeColour,
      hairColour,
      gender,
      hogwartsStudent: position === "student",
      hogwartsStaff: position === "staff",
      house,
      image,
      alive,
    };

    try {
      await axios.post("http://localhost:5000/characters", newCharacter);
      alert("Character added!");
      setIsOpen(false); 
    } catch (error) {
      console.error("Error adding character", error);
      alert("Error adding character");
    }
  };

  return (
    <div className={styles.cardContainer}>
      {/* Botón para abrir el modal */}
      <button onClick={() => setIsOpen(true)} className={styles.buttonModal}>Agregar <FontAwesomeIcon icon={faUser} /><FontAwesomeIcon icon={faPlus} /> </button>

      {/* Modal */}
      <Modal 
        isOpen={isOpen} 
        onRequestClose={() => setIsOpen(false)} 
        contentLabel="Add Character" 
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Agrega un personaje</h2>
        {/* Botón de Cerrar */}
        <button onClick={() => setIsOpen(false)} className={styles.closeButton}><FontAwesomeIcon icon={faTimesCircle} /></button>
        <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.gridContainer}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Date of Birth (e.g., 31-07-1980)"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Eye Colour"
              value={eyeColour}
              onChange={(e) => setEyeColour(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Hair Colour"
              value={hairColour}
              onChange={(e) => setHairColour(e.target.value)}
              className={styles.input}
            />
            
            {/* Selector de la casa */}
            <select
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              className={styles.select}
              required
            >
              <option value="Gryffindor">Gryffindor</option>
              <option value="Slytherin">Slytherin</option>
              <option value="Ravenclaw">Ravenclaw</option>
              <option value="Hufflepuff">Hufflepuff</option>
            </select>

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={styles.input}
            />

            <label className={styles.checkboxLabel}>
              Alive:
              <input
                type="checkbox"
                checked={alive}
                onChange={(e) => setAlive(e.target.checked)}
                className={styles.checkbox}
              />
            </label>
          </div>

          <div className={styles.gridContainer}>
            <div className={styles.radioGroup}>
              <label>Gender:</label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className={styles.radio}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>

            <div className={styles.radioGroup}>
              <label>Position:</label>
              <label>
                <input
                  type="radio"
                  name="position"
                  value="student"
                  checked={position === "student"}
                  onChange={(e) => setPosition(e.target.value)}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="position"
                  value="staff"
                  checked={position === "staff"}
                  onChange={(e) => setPosition(e.target.value)}
                />
                Staff
              </label>
            </div>
          </div>

          <button type="submit" className={styles.button}>Guardar</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddCharacter;




