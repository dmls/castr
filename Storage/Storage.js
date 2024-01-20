import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Executes the callback within a try-catch block.
 *
 * @param callback
 *
 * @returns mixed
 */
const storageExec = async (callback) => {
  try {
    return callback();
  } catch (error) {
    console.error('Error performing storage operation: ', error);
    return false;
  }
}

/**
 * Retrieves the 'collections' record from AsyncStorage.
 *
 * @returns {Promise<Array|boolean>} - A promise that resolves to an array of collections if successful,
 *                                     or `false` if an error occurs.
 */
const getCollections = async () => {
  return storageExec(async () => {
    const resultString = await AsyncStorage.getItem('collections');
    return resultString ? JSON.parse(resultString) : [];
  });
};

/**
 * Retrieves a 'collection' record from AsyncStorage.
 *
 * @param int id Collection id.
 * @return {Promise<object|boolean>} 
 */
const getCollection = async (id) => {
  return storageExec(async () => {
    const collections = await getCollections();
    const collection = collections.find((item) => item.id === id);
    return collection || false;
  });
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

  return storageExec(async () => {
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
  });
};

/**
 * Create a character and add it to a collection.
 *
 * @param object data - Data for new record.
 * @param object collection - Collection to add character to.
 *
 * @returns mixed
 */
const createCharacter = async (data, collection) => {
  return storageExec(async () => {
    !collection.characters ? collection.characters = [] : null;

    // Add the character data to the 'characters' array
    collection.characters.push({
      ...data,
      id: collection.characters.length + 1, 
      created: Date.now(),
    });

    const collectionsString = await AsyncStorage.getItem('collections');
    const collectionsArray = collectionsString ? JSON.parse(collectionsString) : [];

    // Find the index of the current collection in the array
    const indexToUpdate = collectionsArray.findIndex((c) => c.id === collection.id);

    collectionsArray[indexToUpdate] = collection;

    // Save the updated data back to AsyncStorage
    await AsyncStorage.setItem('collections', JSON.stringify(collectionsArray));

    return collection;
  });
};

/**
  * Delete a character.
  *
  * @param object collection Collection to delete from.
  * @param object character Character to delete.
  *
  * @returns object|bool
  * */
const deleteCharacter = async (collection, character) => {
  return storageExec(async () => {
    // Check if the collection has a 'characters' array
    if (!collection.characters) {
      return false; // Collection doesn't have characters to delete
    }

    // Find the index of the character to be deleted in the 'characters' array
    const indexToDelete = collection.characters.findIndex((char) => char.id === character.id);

    if (indexToDelete === -1) {
      return false; // Character not found in the 'characters' array
    }

    // Remove the character from the 'characters' array
    collection.characters.splice(indexToDelete, 1);

    // Update the collection in AsyncStorage
    const collectionsString = await AsyncStorage.getItem('collections');
    const collectionsArray = collectionsString ? JSON.parse(collectionsString) : [];

    const indexToUpdate = collectionsArray.findIndex((c) => c.id === collection.id);

    if (indexToUpdate !== -1) {
      collectionsArray[indexToUpdate] = collection;

      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem('collections', JSON.stringify(collectionsArray));

      return collection; // Character successfully deleted
    }
  });
};


/**
 * Update a collection.
 * @param int | Object collection - Collection ID or object to update.
 * @param Object data - Data to be updated.
 *
 * @returns mixed - Collection data on success, false on error.
 */
const updateCollection = async (collection, data) => {
  return storageExec(async () => {
    if (!['object', 'number'].includes(typeof collection) || typeof data !== 'object') {
      return false;
    }

    const id = typeof collection === 'number' ? collection : collection.id;
    if (!id) {
      return false;
    }

    const resultString = await AsyncStorage.getItem('collections');
    let resultArray = JSON.parse(resultString || '[]');

    const indexToUpdate = resultArray.findIndex((result) => result.id === id);
    const updated = {...resultArray[indexToUpdate], ...data};
    
    resultArray[indexToUpdate] = updated;
    
    await AsyncStorage.setItem('collections', JSON.stringify(resultArray));

    return updated;
  });
};

/**
 * Update a character.
 *
 * @param int | Object character - Character ID or object to update.
 * @param int | Object collection - Collection ID or object to update.
 * @param Object data - Data to be updated.
 *
 * @returns mixed - Character data on success, false on error.
 */
const updateCharacter = async (character, collection, data) => {
  const isObjectOrNum = (...args) => args.every(arg => ['object', 'number'].includes(typeof arg));
  
  if (!isObjectOrNum(character, collection) || typeof data !== 'object') {
    console.error('Error updating: wrong data type passed.');
    return false;
  }

  const getId = (record) => typeof record === 'number' ? record : record.id;
  const charId = getId(character);
  const collId = getId(collection);

  if (!charId || !collId) {
    console.error('Error updating: Missing char or collection id.');
    return false;
  }

  return storageExec(async () => {
    const resultString = await AsyncStorage.getItem('collections');
    let resultArray = JSON.parse(resultString || '[]');

    const collectionIdx = resultArray.findIndex((result) => result.id === collId);

    const charIdx = resultArray[collectionIdx].characters ? 
      resultArray[collectionIdx].characters.findIndex((result) => result.id === charId) : 
      null;

    if (charIdx < 0) {
      console.error('Error updating: Missing char index.');
      return false;
    }

    const updated = {...resultArray[collectionIdx].characters[charIdx], ...data}
    resultArray[collectionIdx].characters[charIdx] = updated;

    await AsyncStorage.setItem('collections', JSON.stringify(resultArray));

    return resultArray[collectionIdx];
  });
};

/**
 * Delete collections with the specified names.
 * @param array {int[]} ids - An array of ids of collections to delete.
 *
 * @returns boolean {boolean} - True on success, false on error.
 */
const deleteCollections = async (ids) => {
  return storageExec(async () => {
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
  });
};

export { 
  getCollections, 
  getCollection,
  createCollection, 
  updateCollection, 
  updateCharacter, 
  deleteCollections, 
  createCharacter, 
  deleteCharacter 
};
