import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const FocusedStatusBar = (props) => {
  const isFocus = useIsFocused();

  return isFocus ? <StatusBar animated={true} {...props} /> : null;
};

export default FocusedStatusBar;
