import AsyncStorage from "@react-native-async-storage/async-storage";

const getCollections = async () => {
  try {
    const collectionsString = await AsyncStorage.getItem('collections');
    return collectionsString ? JSON.parse(collectionsString) : [];
  } catch (error) {
    console.error('Error loading collections from AsyncStorage:', error);
    return null;
  }
};

export { getCollections };
