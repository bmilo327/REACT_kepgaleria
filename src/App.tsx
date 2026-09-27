import { useState } from 'react'
import './App.css'
import Galeria from './components/Galeria'
import { KEPLISTA } from './adatok'
import NagyKep from './components/NagyKep'


export default function App() {
const [aktualisIndex, setAktualisIndex] = useState<number>(0);
const aktualisKep = KEPLISTA[aktualisIndex];

function elozoKepKivalaszt() {
  setAktualisIndex((regiIndex) => {
    return regiIndex > 0 ? regiIndex - 1 : KEPLISTA.length - 1;
  });
}

function kovetkezoKepKivalaszt() {
  setAktualisIndex((regiIndex) => {
    return regiIndex < KEPLISTA.length - 1 ? regiIndex + 1 : 0;
  });
}

function kepKivalaszt(index: number) {
  setAktualisIndex(index);
}

  return (
    <>
      <header>
        <h1>Koenigsegg Jesko</h1>
      </header>
      <article>
        <NagyKep kepem={aktualisKep} elozoKepKivalaszt={elozoKepKivalaszt} kovetkezoKepKivalaszt={kovetkezoKepKivalaszt} index={aktualisIndex}/>
        <Galeria lista={KEPLISTA} kepKivalaszt={kepKivalaszt}/>
      </article>
      <footer>
        <p>Bernáth Milán</p>
      </footer>
    </>
)}
