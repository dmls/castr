import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves the 'collections' record from AsyncStorage.
 *
 * @async
 * @function
 * @returns {Promise<Array|boolean>} - A promise that resolves to an array of collections if successful,
 *                                     or `false` if an error occurs.
 * @throws {Error} - Throws an error if there is an issue loading collections from AsyncStorage.
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

export { getCollections };
