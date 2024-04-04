"use client"
import { Provider, useReducer } from "react";
import { HISTORY_CONTEXT_INITIAL_STATE, History_REQUEST_TYPE, HistoryContext, History_Type } from "./context";
import { historyReducer } from "./reducer";
import { getHistoryRequestAction, getHistoryErrorAction, getHistorySuccessAction } from "./actions";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function HistoryProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [HistoryState, dispatch] = useReducer(historyReducer, HISTORY_CONTEXT_INITIAL_STATE);

    /**
     * 
     * @param loginObj login object
     */
    function login(loginObj: History_REQUEST_TYPE): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = apiURL + "api/TokenHistory/Historyenticate";
        console.log(endpoint);
        console.log(loginObj);
        
        fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(loginObj),
            mode: "cors"
        }).then(res => res.json())
        .then(data => {
            console.log(data.result);
            if (data.result.success) {
                const res: History_Type = data.result;
                dispatch(getHistorySuccessAction(res));
                
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(getHistoryErrorAction());
        })
    }
    function logout(): void {

    }
    function refreshToken() {

    }

    return (
        <HistoryContext.Provider value={{HistoryObj: HistoryState.HistoryObj, login, logout, refreshToken}}>
            {children}
        </HistoryContext.Provider>
    );
}