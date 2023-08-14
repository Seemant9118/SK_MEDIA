import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

// Save to localStorage
function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch (e) {
        console.log(e);
    }
}

// LoadFromLocalStorage : retrieving data from db to UI
function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if (serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

// It also uses the composeEnhancers function to enhance the store with Redux DevTools extension support.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage(); //  get a initialState from LocalStorage

const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;