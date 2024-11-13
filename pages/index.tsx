import { useState, useEffect } from 'react';
import AddCharacter from '@/components/AddCharacter';
import CharacterList from '@/components/CharacterList';



interface Character {
  name: string;
  house: string;
  image: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    
    document.body.style.backgroundImage = 'url("../public/back_harry.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.height = '100vh';
  }, []); 

  const handleAddCharacter = (name: string, house: string, image: string) => {
    const newCharacter = { name, house, image };
    setCharacters([...characters, newCharacter]);
  };

  return (
    <div id="root"  >
      
      <AddCharacter />
      <CharacterList />
      
    </div>
  );
}