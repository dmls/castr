import { StyleSheet } from "react-native";
import { utils } from './Utils';

export var colors = {
  primary: '#0d6efd',
  secondary: '#adb5bd',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  section: '#fff',
  sectionText: '#202529',
  background: '#f8f9fa',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: colors.background,
    color: colors.sectionText,
  },
  section: {
    flexDirection: 'column',
    alignContent: 'center',
    margin: 4,
    backgroundColor: colors.section,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 10,
    marginHorizontal: 4,
    paddingHorizontal: 10,
  },
  sectionText: {
    color: colors.sectionText,
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
    color: colors.section,
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
    borderColor: colors.danger,
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
    color: colors.danger,
    marginLeft: 15,
    fontSize: 14,
  },

  ...utils,
});
