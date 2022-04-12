import { createContext } from "react";

const NFTContext=createContext();

const NFTContextProvider=({children})=>{

    return <NFTContext.Provider>
        {children}
    </NFTContext.Provider>
}

export default NFTContextProvider;