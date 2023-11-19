import { StyleSheet } from "react-native";
import { utils } from './Utils';

export var colors = {
  white: '#fff',
  black: '#000',
  gray: '#9AA0A6',
  gray_dark: '#3C4043',
  primary: '#4285F4',
  red: '#EA4335',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: colors.gray,
    color: colors.gray_dark,
  },
  section: {
    flexDirection: 'column',
    alignContent: 'center',
    margin: 4,
    backgroundColor: colors.white,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 10,
    marginHorizontal: 4,
    paddingHorizontal: 10,
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
  inputLabel: {
    marginLeft: 15,
    fontSize: 18,
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
    marginLeft: 15,
    fontSize: 14,
  },

  ...utils,
});
