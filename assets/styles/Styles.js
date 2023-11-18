import { StyleSheet } from "react-native";
import { utils } from './Utils';

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
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 10,
    marginHorizontal: 35
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  button: {
    flex: 1,
    backgroundColor: colors.primary,
    borderWidth: 0,
    borderColor: colors.primary,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
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
    paddingLeft: 15,
    paddingRight: 15,
    height: 35,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.red,
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
  sectionErrorText: {
    justifyContent: 'center',
  },
  errorText: {
    color: colors.red,
    textAlign: 'center',
    fontSize: 14,
  },

  ...utils,
});
