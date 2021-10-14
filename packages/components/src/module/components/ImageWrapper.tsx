import React, { useContext, useMemo, useReducer } from 'react';
import { PanResponder } from 'react-native';

const StoreContext = React.createContext();

const initialState = {
    width: 0,
    height: 0,
};

export function ImageWrapper({ children }) {
    const [state, dispatch] = useReducer(imageSizeReducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
}

const useState = () => {
    const { state } = useContext(StoreContext);
    return state;
};

const useDispatch = () => {
    const { dispatch } = useContext(StoreContext);
    return dispatch;
};

export const useImageSize = () => {
    const dispatch = useDispatch();
    const state = useState();
    return {
        setImageSizes: (width: any, height: any) => {
            dispatch({
                type: 'set',
                payload: {
                    width,
                    height,
                },
            });
        },
        width: state.width,
        height: state.height,
    };
};

const imageSizeReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'set':
            return {
                width: action.payload.width,
                height: action.payload.height,
            };
        default:
            return state;
    }
};
