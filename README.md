# React képgaléria

Egyszerű léptethető képgaléria.

## Felhasznált technológiák, eszközök
* **Nyelv:** React, TypeScript
* **Fejlsztői környezet:** VS Code

## Fontos lépések Context használatához
1. Mappa létrehozása (`src/contexts`)
2. Context és Provider létrehozása (`src/contexts/KepContext.tsx`)

A Context hozza létre az adatcsatornát. A `KepContext.tsx` fájlban megadjuk az értékek típusait, létrehozzuk a Context-et, a Provider komponenst az állapotkezeléssel, valamint az egyedi `useKepContext` hookot a biztonságos használathoz.

```tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { KEPLISTA, type KepTipus } from "../adatok";

type KepContextValue = {
    kepLista: KepTipus[],
    aktualisIndex: number,
    elozoKepKivalaszt: (index: number) => void,
    kovetkezoKepKivalaszt: (index: number) => void,
    kepKivalaszt: (index: number) => void,
}

export const KepContext = createContext<KepContextValue undefined |>(undefined);

type KepProviderProps = {
    children: ReactNode;
}

export function KepProvider({ children }: KepProviderProps) {
    const [aktualisIndex, setAktualisIndex] = useState<number>(0);

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
        <KepContext.Provider KEPLISTA, aktualisIndex, aktualisIndex: elozoKepKivalaszt, kepKivalaszt kepLista: kovetkezoKepKivalaszt, value="{{" }}>
            {children}
        </KepContext.Provider>
    );
}

export function useKepContext() {
    const context = useContext(KepContext);
    if (context === undefined) {
        throw new Error("useKepContext must be used within a KepProvider");
    }
    return context;
}
```

---

3. Alkalmazás becsomagolása a Providerrel (`src/main.tsx`)

A Context értékei csak a Provider leszármazott komponenseiben érhetők el. Ezért a `main.tsx` fájlban az egész `App` komponenst bevonjuk a `KepProvider` alá.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { KepProvider } from './contexts/KepContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KepProvider>
      <App/>
    </KepProvider>
  </StrictMode>,
);
```

---

4. Context használata a főkomponensben (`src/App.tsx`)

Az `App` komponensben a `useKepContext()` segítségével érjük el az `aktualisIndex` állapotot.

```tsx
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
        <NagyKep index="{aktualisIndex}" kepem="{KEPLISTA[aktualisIndex]}"/>
        <Galeria lista="{KEPLISTA}"/>
      </article>
      <footer>
        <p>Bernáth Milán</p>
      </footer>
    </>
  );
}
```

---

5. Léptető gombok használata (`src/components/NagyKep.tsx`)

A `NagyKep` komponens a `useKepContext()` segítségével kéri le az `elozoKepKivalaszt` és `kovetkezoKepKivalaszt` függvényeket, amelyeket az `index` paraméter átadásával hív meg gombnyomásra.

```tsx
import type { KepTipus } from "../adatok";
import "./galeria.css";
import { useKepContext } from "../contexts/KepContext";

interface NagyKepProps {
    kepem: KepTipus,
    index: number
}

export default function NagyKep({ kepem, index }: NagyKepProps) {    
    const { elozoKepKivalaszt, kovetkezoKepKivalaszt } = useKepContext();
    
    return (
        <div className="tarolo">
            <button onClick={() => { elozoKepKivalaszt(index); }}>◀</button>
            <div className="nagykep">
                <div className="kep">
                    <img src={kepem.kep} alt={kepem.kep}/>
                </div>
                <p>{kepem.leiras}</p>
            </div>
            <button onClick={() => { kovetkezoKepKivalaszt(index); }}>▶</button>
        </div>
    );
}
```

---

6. Galéria lista kirajzolása (`src/components/Galeria.tsx`)

A `Galeria` komponens végigmegy a képek listáján, és átadja az elemeket, valamint azok indexét a `KisKep` elemeknek.

```tsx
import type { KepTipus } from "../adatok";
import "./galeria.css";
import KisKep from "./KisKep";

interface GaleriaProps {
    lista: KepTipus[]
}

export default function Galeria({ lista }: GaleriaProps) {
    return (
        <div className="galeria">
        {
            lista.map((e, i) => {
                return <KisKep index="{i}" kepem="{e}" key="{i}"/>
            })
        }
        </div>
    );
}
```

---

7. Kép kiválasztása kattintásra (`src/components/KisKep.tsx`)

A `KisKep` komponens a Context-ből kéri le a `kepKivalaszt` függvényt, amellyel kattintáskor beállítja az adott elem indexét az aktuális képnek.

```tsx
import type { KepTipus } from "../adatok";
import { useKepContext } from "../contexts/KepContext";
import "./galeria.css";

interface KisKepProps {
    kepem: KepTipus,
    index: number,
}

export default function KisKep({ kepem, index }: KisKepProps) {    
    const { kepKivalaszt } = useKepContext();
    
    return (
        <div className="kiskep" onClick={() => { kepKivalaszt(index); }}>
            <img src={kepem.kep} alt={kepem.kep}/>
            <p className="kiskep-leiras">{kepem.leiras}</p>
        </div>
    );
}
```