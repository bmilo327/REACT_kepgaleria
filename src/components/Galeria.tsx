import type { KepTipus } from "../adatok";
import "./galeria.css";
import KisKep from "./KisKep";

interface GaleriaProps{
    lista:KepTipus[],
    kepKivalaszt: (index: number) => void
}

export default function Galeria({lista, kepKivalaszt}:GaleriaProps) {
    return (
        <div className="galeria">
        {
            lista.map((e,i)=> {
                return <KisKep kepem={e} index={i} key={i} kepKivalaszt={kepKivalaszt}/>
            })
        }
        </div>
    )
}