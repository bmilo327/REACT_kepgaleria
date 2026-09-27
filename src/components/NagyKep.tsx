import type { KepTipus } from "../adatok";
import "./galeria.css";

interface NagyKepProps {
    kepem:KepTipus,
    index:number,
    elozoKepKivalaszt:(index:number)=>void,
    kovetkezoKepKivalaszt:(index:number)=>void,
}

export default function NagyKep({ kepem, index, elozoKepKivalaszt, kovetkezoKepKivalaszt }: NagyKepProps) {
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