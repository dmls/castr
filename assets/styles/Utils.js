import { StyleSheet } from "react-native";

export const utils = StyleSheet.create({
  // Utils

  // Alignment
  jcCenter: {
    justifyContent: 'center',
  },
  jcFlexStart: {
    justifyContent: 'flex-start',
  },

  // Margin
  mt0: {
    marginTop: 0
  },
  mb5: {
    marginBottom: 5 
  },
  mb15: {
    marginBottom: 15,
  },

  imageFullWidth: {
    flex: 1, 
    aspectRatio: 4/3
  }
});
