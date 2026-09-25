import type { KepTipus } from "../adatok";
import "./galeria.css";

interface KisKepProps {
    kepem:KepTipus,
    index:number,
    kepKivalaszt:(index:number)=>void,
}

export default function KisKep({kepem, index, kepKivalaszt}:KisKepProps) {
    return (
        <div className="kiskep" onClick={()=>{kepKivalaszt(index)}}>
            <img src={kepem.kep} alt={kepem.kep} />
        </div>
    )
}