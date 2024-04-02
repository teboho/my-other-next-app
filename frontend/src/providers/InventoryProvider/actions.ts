"use client";
import { createAction } from "redux-actions";
import { InventoryType } from "./context";

export const InventoryActionEnums = {
    GetInventorysRequest: "GET_INVENTORYS_REQUEST",
    GetInventorysSuccess: "GET_INVENTORYS_SUCCESS",
    GetInventorysError: "GET_INVENTORYS_ERROR",

    GetInventoryRequest: "GET_INVENTORY_REQUEST",
    GetInventorySuccess: "GET_INVENTORY_SUCCESS",
    GetInventoryError: "GET_INVENTORY_ERROR",

    PostInventoryRequest: "POST_INVENTORY_REQUEST",
    PostInventorySuccess: "POST_INVENTORY_SUCCESS",
    PostInventoryError: "POST_INVENTORY_ERROR",

    UpdateInventoryRequest: "UPDATE_INVENTORY_REQUEST",
    UpdateInventorySuccess: "UPDATE_INVENTORY_SUCCESS",
    UpdateInventoryError: "UPDATE_INVENTORY_ERROR",

    SetSearchTerm: "SET_SEARCH_TERM"
}

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getInventorysRequestAction = createAction(
    InventoryActionEnums.GetInventorysRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, inventoryItems: [], inventory: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getInventorysSuccessAction = createAction(
    InventoryActionEnums.GetInventorysSuccess,
    (inventoryItems: InventoryType[]): any => ({ isSuccess: true, isPending: false, isError: false, inventoryItems, inventory: undefined})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getInventorysErrorAction = createAction(
    InventoryActionEnums.GetInventorysSuccess,
    (): any => ({ isSuccess: false, isPending: false, isError: true, inventory: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getInventoryRequestAction = createAction(
    InventoryActionEnums.GetInventoryRequest,
    ():any => ({ isSuccess: false, isPending: true, isError: false, inventory: undefined, inventoryItems: [] as InventoryType[]})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getInventorySuccessAction = createAction(
    InventoryActionEnums.GetInventorySuccess,
    (inventory: InventoryType):any => ({ isSuccess: true, isPending: false, isError: false, inventory, inventoryItems: [] as InventoryType[] })
);



/**
 * Sets the isError to true but then all else to false
 */
export const getInventoryErrorAction = createAction(
    InventoryActionEnums.GetInventorySuccess,
    () => ({ isSuccess: false, isPending: false, isError: true, inventory: undefined, inventoryItems: [] as InventoryType[] })
);

/**
 * Sets the searchTerm
 */
export const setSearchTermAction = createAction(
    InventoryActionEnums.SetSearchTerm,
    (searchTerm: string): any => ({ searchTerm })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const postInventoryRequestAction = createAction(
    InventoryActionEnums.PostInventoryRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, inventory: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postInventorySuccessAction = createAction(
    InventoryActionEnums.PostInventorySuccess,
    (inventory: InventoryType): any => ({ isSuccess: true, isPending: false, isError: false, inventory })
);

/**
 * Sets the isError to true but then all else to false
 */
export const postInventoryErrorAction = createAction(
    InventoryActionEnums.PostInventoryError,
    (): any => ({ isSuccess: false, isPending: false, isError: true, inventory: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const updateInventoryRequestAction = createAction(
    InventoryActionEnums.UpdateInventoryRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, inventory: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const updateInventorySuccessAction = createAction(
    InventoryActionEnums.UpdateInventorySuccess,
    (inventory: InventoryType): any => ({ isSuccess: true, isPending: false, isError: false, inventory })
);

/**
 * Sets the isError to true but then all else to false
 */
export const updateInventoryErrorAction = createAction(
    InventoryActionEnums.UpdateInventoryError,
    (): any => ({ isSuccess: false, isPending: false, isError: true, inventory: undefined })
);