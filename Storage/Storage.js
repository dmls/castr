import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves the 'collections' record from AsyncStorage.
 *
 * @returns {Promise<Array|boolean>} - A promise that resolves to an array of collections if successful,
 *                                     or `false` if an error occurs.
 */
const getCollections = async () => {
  try {
    const resultString = await AsyncStorage.getItem('collections');
    return resultString ? JSON.parse(resultString) : [];

  } catch (error) {
    console.error('Error loading collections from AsyncStorage:', error);
    return false;
  }
};

/**
 * Creates a new collection.
 * @param object data - Collection data.
 *
 * @returns mixed - Collection data on success, false on error.
 */
const createCollection = async (data) => {
  const { name, image } = data;

  if (!name) return false;

  try {
    const collectionsString = await AsyncStorage.getItem('collections');
    const collectionsArray = collectionsString ? JSON.parse(collectionsString) : [];

    const lastId = parseInt(collectionsArray[collectionsArray.length - 1]?.id);
    const nextId = lastId ? lastId + 1 : 1;

    const optionalAtts = [
      { key: 'image', value: image },
    ];

    const collection = { 
      id: nextId, 
      created: Date.now(), 
      name: name, 
      ...optionalAtts.reduce((acc, { key, value }) => (value != null ? { ...acc, [key]: value } : acc), {}),
    };

    collectionsArray.push(collection); 

    await AsyncStorage.setItem('collections', JSON.stringify(collectionsArray));
    
    return collection;
  } catch (error) {
    console.error('Error saving name to AsyncStorage:', error);
    return false;
  }
};

/**
 * Updates a collection.
 * @param int | 0bject collection - Collection ID or object to update.
 * @param Object data - Data to be updated.
 *
 * @return mixed - Collection data on success, false on error.
 */
const updateCollection = async (collection, data) => {
  if (!['object', 'number'].includes(typeof collection) || typeof data !== 'object') {
    return false;
  }

  const id = typeof collection === 'number' ? collection : collection.id;
  if (!id) {
    return false;
  }

  try {
    const resultString = await AsyncStorage.getItem('collections');
    let resultArray = JSON.parse(resultString || '[]');

    const indexToUpdate = resultArray.findIndex((result) => result.id === id);
    const updated = {...resultArray[indexToUpdate], ...data};
    
    resultArray[indexToUpdate] = updated;
    
    await AsyncStorage.setItem('collections', JSON.stringify(resultArray));

    return updated;
  } catch (error) {
    console.error('Error updating collection:', error);
    return false;
  }
};

/**
 * Delete collections with the specified names.
 * @param array {int[]} ids - An array of ids of collections to delete.
 *
 * @returns boolean {boolean} - True on success, false on error.
 */
const deleteCollections = async (ids) => {
  try {
    const resultString = await AsyncStorage.getItem('collections');
    let resultArray = JSON.parse(resultString || '[]');

    ids.forEach((id) => {
      const indexToDelete = resultArray.findIndex((item) => item.id === id);
      
      if (indexToDelete !== -1) {
        resultArray.splice(indexToDelete, 1);
      }
    });

    await AsyncStorage.setItem('collections', JSON.stringify(resultArray));

    return true;
  } catch (error) {
    console.error('Error deleting collection:', error);
    return false;
  }
};


export { getCollections, createCollection, updateCollection, deleteCollections };
