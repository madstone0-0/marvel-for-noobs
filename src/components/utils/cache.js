const writeToCache = (url, characters) => {
    sessionStorage.setItem(url, JSON.stringify(characters));
};

const readFromCache = (url) => JSON.parse(sessionStorage.getItem(url)) || null;

export { writeToCache, readFromCache };
