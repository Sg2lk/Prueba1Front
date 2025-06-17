import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact";
import { Spell } from "./Hola.tsx";

const ShowSpells:FunctionalComponent = () => {

    const [spells, setSpells] = useState<Spell[]>([]);


    useEffect(() => {
        const myCookie = document.cookie.split("; ");
        const fav = myCookie.find((e) => e.startsWith("favourites="));
        if(fav){
            const aux = JSON.parse(fav.split("=")[1]);
            setSpells(aux);
        } else {
            console.log(spells);
        }
        
    }, [])

    return (
        <div>
          {spells.map((spell) => (
            <div key={spell.id}>
              <h2>{spell.name}</h2>
              <p>{spell.description}</p>
            </div>
          ))}
        </div>
      );      
}

export default ShowSpells;