"use client"
import { useContext, useEffect, useReducer, useState } from "react";
import { bookReducer } from "./reducer";
import BookContext, { BOOK_CONTEXT_INITIAL_STATE } from "./context";
import axios from "axios";
import { baseURL } from "../authProvider";
import { getBooksErrorAction, getBooksRequestAction, getBooksSuccessAction,
    getBookErrorAction, getBookRequestAction, getBookSuccessAction, 
    setSearchTermAction,
    getSearchBooksRequestAction,
    getSearchBooksSuccessAction,
    getSearchBooksErrorAction,
    postBookRequestAction,
    postBookSuccessAction,
    postBookErrorAction
} from "./actions";
import AuthContext from "../authProvider/context";
import { Preferences } from "@/app/(authorized)/patron/preferences-survey/page";
import { CreateBookType } from "./types";
import { message } from "antd";

export default function BookProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [bookState, dispatch] = useReducer(bookReducer, BOOK_CONTEXT_INITIAL_STATE);
    const { authObj } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        // check the AuthProvider for the accesToken
        if (accessToken) {
            getAll();
        }
        console.log("Book Provider is mounted for first time.")
    }, []);

    // Axios instance
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });

    /**
     * Searching the Google API
     * @param term search term
     */
    function search(term: string): void {
        const endpoint = "/api/services/app/AskGoogle/SearchVolumes";
        console.log(endpoint);
        console.log(term);
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(getSearchBooksRequestAction());
        dispatch(setSearchTermAction(term));
        setLoading(true);
        // the we make the call
        instance.get(`${endpoint}?query=${term}`)
            .then(res => {
                setLoading(false);
                console.log("query results", res.data.result)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getSearchBooksSuccessAction({
                            result: res.data.result
                        }))
                    }
                } else {
                    setLoading(false);
                    // dispatch for erroe
                    dispatch(getSearchBooksErrorAction());
                }
            })
    }

   function searchDB(term: string): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "api/services/app/Book/GetSearchBooks";
        console.log(endpoint);
        console.log(term);

        // before we make the http request, we set pending to true via dispatch
        dispatch(getBooksRequestAction());
        // the we make the call
        instance.get(`${endpoint}?name=${term}`)
            .then(res => {
                console.log("results", res.data)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getBooksSuccessAction(res.data.result))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getBooksErrorAction());
                }
            });
   }

    /**
     * get all books (we need to do by category)
     */
    function getAll(): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "api/services/app/Book/GetAll?maxResultCount=10000";
        console.log(endpoint);
        // console.log(term);
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(getBooksRequestAction());
        // the we make the call
        instance.get(`${endpoint}`)
            .then(res => {
                // console.log("all books", res.data)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getBooksSuccessAction(res.data.result.items))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getBooksErrorAction());
                }
            })
    }

    /**
     * 
     * @param bookId book id
     */
    function getBook(bookId: string): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "api/services/app/Book/Get?Id=" + bookId;
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(getBookRequestAction());
        // the we make the call
        instance.get(`${endpoint}`)
            .then(res => {
                console.log("book result", res.data.result)
                if (res.data.success) {
                    // disptach for success
                    dispatch(getBookSuccessAction(res.data.result))
                } else {
                    // dispatch for erroe
                    dispatch(getBookErrorAction());
                }
            })
    }

    function savePreferences(prefs: Preferences): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "/api/services/app/Preference/Create";
        console.log(endpoint);
        console.log(prefs);
        
        dispatch(getBooksRequestAction());
        // the we make the call
        instance.post(`${endpoint}`, prefs)
            .then(res => {
                console.log("results", res.data)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getBooksSuccessAction(res.data.result))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getBooksErrorAction());
                }
                    dispatch(getBooksErrorAction());
            }).catch(err =>  dispatch(getBooksErrorAction()));
    }

    /**
     * send book to the backend
     *
     */
    function sendBook(book: CreateBookType): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "/api/services/app/Book/PostCreateBook";
        console.log(endpoint);
        console.log(book);
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(postBookRequestAction());
        // the we make the call
        instance.post(`${endpoint}`, book)
            .then(res => {
                console.log("results", res.data)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(postBookSuccessAction(res.data.result));
                        success();
                    }
                } else {
                    // dispatch for error
                    dispatch(postBookErrorAction());
                }
            })
    }

    

    const success = () => {
        messageApi.success('Book added successfully!');
    }

    const error = () => {
        messageApi.error('An error occurred. Please try again.');
    }

    function getLocalBook(bookId: string) {
        const book = bookState.books?.find(b => b.id === bookId);
        return book;
    }

    return (
        <BookContext.Provider value={{
            books: bookState.books,
            book: bookState.book, 
            searchTerm: bookState.searchTerm, 
            search, savePreferences, getBook, getAll, searchDB, sendBook, getLocalBook,
            searchBooks: bookState.searchBooks,
            loading: loading
        }}>
            {contextHolder}
            {children}
        </BookContext.Provider>
    );
}