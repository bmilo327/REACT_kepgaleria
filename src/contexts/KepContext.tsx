import { createContext, useContext, useState, type ReactNode } from "react";
import { KEPLISTA, type KepTipus } from "../adatok";

type KepContextValue = {
    kepLista: KepTipus[],
    aktualisIndex: number,
    elozoKepKivalaszt: (index: number) => void,
    kovetkezoKepKivalaszt: (index: number) => void,
    kepKivalaszt: (index: number) => void,
}

export const KepContext = createContext<KepContextValue | undefined>(undefined);

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
        <KepContext.Provider
            value={{ 
                kepLista: KEPLISTA,
                aktualisIndex: aktualisIndex,
                elozoKepKivalaszt, 
                kovetkezoKepKivalaszt, 
                kepKivalaszt 
            }}>
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
