import React, { Dispatch, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum CONSTANTS {
  TOGGLE_TO_LIST = 0,
}

export interface IAppState {
  favoriteList: string[];
}

export interface IAppActions {
  type: number;
  symbol?: string;
}

export interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<IAppActions>;
}

export interface IAppContextProvider {
  children: JSX.Element;
}

const contextDefaultValue = {
  state: {
    favoriteList: [],
  },
  dispatch: () => {},
};

export const AppContext = React.createContext<IAppContext>(contextDefaultValue);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context ?? {};
};

const reducer = (state: IAppState, action: IAppActions) => {
  switch (action.type) {
    case CONSTANTS.TOGGLE_TO_LIST: {
      if (state.favoriteList.indexOf(action?.symbol!) !== -1) {
        return {
          ...state,
          favoriteList: state.favoriteList.filter(
            (s: string) => s !== action.symbol,
          ),
        };
      } else {
        const newList = state.favoriteList;
        newList.push(action?.symbol!);
        return {
          ...state,
          favoriteList: newList,
        };
      }
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
};

export const AppContextProvider = ({ children }: IAppContextProvider) => {
  let [initialFavoriteList, setInitialFavoriteList] = useState<string[]>([]);

  useEffect(() => {
    try {
      AsyncStorage.getItem('@favorites').then(value => {
        if (value) {
          setInitialFavoriteList(JSON.parse(value));
        }
      });
    } catch (e) {}
  }, []);

  const [state, dispatch] = React.useReducer(reducer, {
    favoriteList: initialFavoriteList,
  });

  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
