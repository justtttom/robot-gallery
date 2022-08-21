import React, { useState } from "react";

type Props = {
  children?: React.ReactNode
};


interface AppStateValue {
  username: string,
  shoppingCart: { items: { id: number, name: string }[] }
}

const defaultContextValue: AppStateValue = {
  username: "汤姆",
  shoppingCart: { items: [] }
};

export const appContext = React.createContext(defaultContextValue);
export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined);

export const AppStateProvider: React.FC<Props> = (props) => {
  const [state, setState] = useState(defaultContextValue);
  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
        {props.children}
      </appSetStateContext.Provider>

    </appContext.Provider>
  )
}