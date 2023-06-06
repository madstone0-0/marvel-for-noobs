const writeToCache = (url, characters) => {
    sessionStorage.setItem(url, JSON.stringify(characters));
};

const readFromCache = (url) => JSON.parse(sessionStorage.getItem(url)) || null;

const writeToLocalStore = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const readFromLocalStore = (key) =>
    JSON.parse(localStorage.getItem(key)) || null;

export { readFromCache, readFromLocalStore, writeToCache, writeToLocalStore };
