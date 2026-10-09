import type { KepTipus } from "../adatok";
import "./galeria.css";
import KisKep from "./KisKep";

interface GaleriaProps{
    lista:KepTipus[]
}

export default function Galeria({ lista }:GaleriaProps) {
    return (
        <div className="galeria">
        {
            lista.map((e,i)=> {
                return <KisKep kepem={e} index={i} key={i}/>
            })
        }
        </div>
    )
}