import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Executes the callback within a try-catch block.
 *
 * @param callback
 *
 * @returns mixed
 */
export const storageExec = async (callback) => {
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
export const getCollections = async () => {
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
export const getCollection = async (id) => {
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
export const createCollection = async (data) => {
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
export const createCharacter = async (data, collection) => {
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
  * Delete an array of characters passed to the function.
  *
  * @param object collection Collection to delete from.
  * @param object characters Characters to delete.
  *
  * @returns object|bool
  */
export const deleteCharacters = async (collection, characters) => {
  return storageExec(async () => {
    // Check if the collection has a 'characters' array
    if (!collection.characters) {
      return false; // Collection doesn't have characters to delete
    }

    if (!Array.isArray(characters)) {
      characters = [characters];
    }

    // Find the indices of the characters to be deleted in the 'characters' array
    const indicesToDelete = characters.map((char) =>
      collection.characters.findIndex((c) => c.id === char.id)
    );

    // Remove the characters from the 'characters' array
    indicesToDelete.forEach((index) => {
      if (index !== -1) {
        collection.characters.splice(index, 1);
      }
    });

    // Update the collection in AsyncStorage
    const collectionsString = await AsyncStorage.getItem('collections');
    const collectionsArray = collectionsString ? JSON.parse(collectionsString) : [];

    const indexToUpdate = collectionsArray.findIndex((c) => c.id === collection.id);

    if (indexToUpdate !== -1) {
      collectionsArray[indexToUpdate] = collection;

      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem('collections', JSON.stringify(collectionsArray));

      return collection; // Characters successfully deleted
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
export const updateCollection = async (collection, data) => {
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
export const updateCharacter = async (character, collection, data) => {
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
export const deleteCollections = async (ids) => {
  return storageExec(async () => {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

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
