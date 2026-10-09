import type { KepTipus } from "../adatok";
import { useKepContext } from "../contexts/KepContext";
import "./galeria.css";

interface KisKepProps {
    kepem:KepTipus,
    index:number,
}

export default function KisKep({kepem, index}:KisKepProps) {    
    const { kepKivalaszt } = useKepContext();
    
    return (
        <div className="kiskep" onClick={()=>{kepKivalaszt(index)}}>
            <img src={kepem.kep} alt={kepem.kep}/>
            <p className="kiskep-leiras">{kepem.leiras}</p>
        </div>
    )
}