import { StyleSheet } from "react-native";

export var colors = {
  white: '#fff',
  black: '#000',
  gray_dark: '#3C4043',
  primary: '#4285F4',
  red: '#EA4335',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.white,
    color: colors.gray_dark,
  },
  section: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  button: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    borderColor: colors.primary,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.white,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.primary,
  },
  inputPass: {
    flex: 1,
  },
  registerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorText: {
    color: colors.red,
    textAlign: 'center',
    fontSize: 14,
  },

  // Utils
  mt0: {
    marginTop: 0
  },
  mb5: {
    marginBottom: 5 
  }
});
