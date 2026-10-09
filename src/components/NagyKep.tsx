import type { KepTipus } from "../adatok";
import "./galeria.css";
import { useKepContext } from "../contexts/KepContext";

interface NagyKepProps {
    kepem:KepTipus,
    index:number
}

export default function NagyKep({ kepem, index }: NagyKepProps) {    
    const { elozoKepKivalaszt, kovetkezoKepKivalaszt } = useKepContext();
    
    return (
        <div className="tarolo">
            <button onClick={()=>{elozoKepKivalaszt(index)}}>◀</button>
            <div className="nagykep">
                <div className="kep">
                    <img src={kepem.kep} alt={kepem.kep}/>
                </div>
                <p>{kepem.leiras}</p>
            </div>
            <button onClick={()=>{kovetkezoKepKivalaszt(index)}}>▶</button>
        </div>
        
    )
}