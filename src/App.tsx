import { useState } from 'react'
import './App.css'
import Galeria from './components/Galeria'
import { KEPLISTA, type KepTipus } from './adatok'
import NagyKep from './components/NagyKep'


export default function App() {

  function kepKivalaszt(index:number){
    console.log(index);
  }

  return (
    <>
      <header>
        <h1>Koenigsegg Jesko</h1>
      </header>
      <article>
        <NagyKep kepem={KEPLISTA[0]}/>
        <Galeria lista={KEPLISTA} kepKivalaszt={kepKivalaszt}/>
      </article>
      <footer>
        <p>Bernáth Milán</p>
      </footer>
    </>
)}
