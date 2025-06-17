import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact";
import axios from "npm:axios";

export type Spell = {
    id: string,
    name: string,
    description: string,
}

const Hola:FunctionalComponent = () => {

    const [list, setList] = useState<Spell[]>([]);
    const [language, setLanguage] = useState<string>("es");
    const [spells, setSpells] = useState<Spell[]>([]);

    async function fetch() {
        const res = await axios.get<Spell[]>("https://hp-api.onrender.com/api/spells");
        if(res.status !== 200){
            console.error("Peticion sin exito!");
        }
        setList(res.data);
    }

    useEffect(() => {
        fetch()

        const myCookie = document.cookie.split("; ");

        const lang = myCookie.find((e) => e.startsWith("lang="));
        if(!lang){
            document.cookie = `lang=es; path=/;`;
        } else {
            const aux = lang.split("=")[1];
            setLanguage(aux);
        }

        const fav = myCookie.find((e) => e.startsWith("favourites="));
        if(!fav){
            document.cookie = `favourites=${JSON.stringify([])}; path=/;`;
        } else {
            // const aux = fav.split("=")[1];
            const aux = JSON.parse(fav.split("=")[1]);
            setSpells(aux);
        }

    }, [])

    const change = () => {
        const myCookie = document.cookie.split("; ");
        const lang = myCookie.find((e) => e.startsWith("lang="));
        if(!lang){
            console.error("Deberia existir la cookie");
        } else {
            const aux = language;
            if(aux === "es"){
                document.cookie = `lang=en; path=/;`;
                console.log(document.cookie);
                setLanguage("en")
            } else if(aux === "en"){
                document.cookie = `lang=es; path=/;`;
                console.log(document.cookie);
                setLanguage("es")
            }
        }
    }

    function favourites(elem: Spell) {
        if (!spells.find(s => s.id === elem.id)) {
          const newFav = [...spells, elem];
          setSpells(newFav);
          document.cookie = `favourites=${JSON.stringify(newFav)}; path=/;`;
        }
      }

    return(
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; gap:40px;">
            <h1>
                {(language === "es") ? (<div>Language: Español</div>):(<div>Language: English</div>)}
            </h1>
            <button type="button" onClick={change}>Cambiar language</button>
            <a href={`/spells`}>Lista de hechizos</a>
            {list.map((e) => (
                <div>
                    <h2>{e.name}</h2>
                    <p>{e.description}</p>
                    <button type="button" onClick={() => {favourites(e)}}>Añadir</button>
                </div>
            ))}
        </div>
    )
}

export default Hola;