import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves the 'collections' record from AsyncStorage.
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
 * Delete collections with the specified names.
 * @param array {string[]} names - An array of strings representing the names of collections to delete.
 * @returns boolean {boolean} - Returns true on success, false on error.
 */
const deleteCollections = async (names) => {
  try {
    const resultString = await AsyncStorage.getItem('collections');
    let resultArray = JSON.parse(resultString || '[]');

    names.forEach((name) => {
      const indexToDelete = resultArray.findIndex((item) => item.name === name);

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


export { getCollections, deleteCollections };
