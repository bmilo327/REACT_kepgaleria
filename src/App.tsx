import './App.css'
import Galeria from './components/Galeria'
import { KEPLISTA } from './adatok'
import NagyKep from './components/NagyKep'
import { useKepContext } from './contexts/KepContext'


export default function App() {
  
  const { aktualisIndex } = useKepContext();

  return (
    <>
      <header>
        <h1>Koenigsegg Jesko</h1>
      </header>
      <article>
        <NagyKep kepem={KEPLISTA[aktualisIndex]} index={aktualisIndex}/>
        <Galeria lista={KEPLISTA}/>
      </article>
      <footer>
        <p>Bernáth Milán</p>
      </footer>
    </>
)}
