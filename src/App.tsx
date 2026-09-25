import { useState } from 'react'
import './App.css'
import Galeria from './components/Galeria'
import { KEPLISTA, type KepTipus } from './adatok'
import NagyKep from './components/NagyKep'


export default function App() {
  const [aktualisKep, setAktualisKep ] = useState<KepTipus>(KEPLISTA[0])
  
  function kepKivalaszt(index:number){
    console.log(index);
    const ujNagyKep:KepTipus = {...KEPLISTA[index]};
   
    setAktualisKep(ujNagyKep);
  }

  return (
    <>
      <header>
        <h1>Koenigsegg Jesko</h1>
      </header>
      <article>
        <NagyKep kepem={aktualisKep}/>
        <Galeria lista={KEPLISTA} kepKivalaszt={kepKivalaszt}/>
      </article>
      <footer>
        <p>Bernáth Milán</p>
      </footer>
    </>
)}
