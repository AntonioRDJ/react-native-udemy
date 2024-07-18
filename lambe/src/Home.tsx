import { connect } from 'react-redux';
import { setMessage } from './store/actions/message';
import { Navigator } from "./Navigator";
import { useEffect } from 'react';
import { Alert } from 'react-native';

export const HomeComponent = (props: any) => {

  useEffect(() => {
    if(props.text && props.text.trim()) {
      Alert.alert(props.title || "Mensagem", props.text.toString());
      props.clearMessage();
    }
  });

  return (
    <Navigator />
  );
}

const mapStateToProps = ({message}: any) => {
  return {
    title: message.title,
    text: message.text,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearMessage: () => dispatch(setMessage({title: "", text: ""})),
  }
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);