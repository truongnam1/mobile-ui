import { createContext } from "react";

const CacheImageContext = createContext({ a: 'asdasda' });

function CacheImageProvider({ children, ...props }) {
    console.log(`prop context`, props);
  
    return (
        <CacheImageContext.Provider value={{...props }}>
            {children}
        </CacheImageContext.Provider>
    );
}

export { CacheImageContext, CacheImageProvider };