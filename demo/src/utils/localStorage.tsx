
const NAMESPACE = "XtraVisionDemoApp"; // Replace this with your desired namespace

// Function to save data to localStorage with an expiration time
export function saveToLocalStorageWithExpiration(key, data, expirationInMinutes = 60000, namespace = NAMESPACE){
    const now = new Date();
  const expirationTime = now.getTime() + expirationInMinutes;
  const item = { data, expirationTime };
  localStorage.setItem(`${namespace}:${key}`, JSON.stringify(item));
}
  
// Function to get data from localStorage
export function getFromLocalStorage(key, namespace = NAMESPACE) {
    const item = localStorage.getItem(`${namespace}:${key}`);
    if (!item) return null;
  
    const parsedItem = JSON.parse(item);
    const now = new Date();
    if (now.getTime() > parsedItem.expirationTime) {
      localStorage.removeItem(`${namespace}:${key}`);
      return null;
    }
  
    return parsedItem.data;
}
  
  

