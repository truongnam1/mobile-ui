import { createContext, useMemo } from "react";
const BaseContext = createContext({})


function BaseProvider({ children }) {
    


    return (
        <BaseContext.Provider >
            {children}
        </BaseContext.Provider>
    );
}

export { BaseProvider, BaseContext };