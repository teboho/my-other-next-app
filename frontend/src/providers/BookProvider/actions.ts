"use client";
import { createAction } from "redux-actions";
import { BookDataType } from "./context";

export const BookActionEnums = {
    GetBooksRequest: "GET_BOOKS_REQUEST",
    GetBooksSuccess: "GET_BOOKS_SUCCESS",
    GetBooksError: "GET_BOOKS_ERROR",

    GetBookRequest: "GET_BOOK_REQUEST",
    GetBookSuccess: "GET_BOOK_SUCCESS",
    GetBookError: "GET_BOOK_ERROR",

    SetSearchTerm: "SET_SEARCH_TERM"
}

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getBooksRequestAction = createAction(
    BookActionEnums.GetBooksRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, booksObj: [], book: undefined, books: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getBooksSuccessAction = createAction(
    BookActionEnums.GetBooksSuccess,
    (books: BookDataType[]): any => ({ isSuccess: true, isPending: false, isError: false, books, book: undefined})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getBooksErrorAction = createAction(
    BookActionEnums.GetBooksSuccess,
    (): any => ({ isSuccess: false, isPending: false, isError: true, books: undefined, book: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getBookRequestAction = createAction(
    BookActionEnums.GetBookRequest,
    ():any => ({ isSuccess: false, isPending: true, isError: false, book: undefined, books: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getBookSuccessAction = createAction(
    BookActionEnums.GetBookSuccess,
    (book: BookDataType):any => ({ isSuccess: true, isPending: false, isError: false, book, books: [] as BookDataType[] })
);



/**
 * Sets the isError to true but then all else to false
 */
export const getBookErrorAction = createAction(
    BookActionEnums.GetBookSuccess,
    () => ({ isSuccess: false, isPending: false, isError: true, book: undefined, books: undefined, searchTerm: "" })
);

/**
 * Sets the searchTerm
 */
export const setSearchTermAction = createAction(
    BookActionEnums.SetSearchTerm,
    (searchTerm: string): any => ({ searchTerm })
);