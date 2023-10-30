import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

function Login(props) {
  const context = useContext(AuthGlobal);

  console.log(context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate('User Profile');
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = { email, password };
    if (email.trim() === '' || password.trim() === '') {
      return setError('Please ,fill in your credentials');
    } else {
      return loginUser(user, context.dispatch);
    }
  };
  return (
    <FormContainer title={'Login'}>
      <Input
        placeholder={'Enter Email'}
        name={'email'}
        id={'email'}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={'Enter Password'}
        name={'password'}
        id={'password'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: 'white' }}>Login</Text>
        </EasyButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <EasyButton
          large
          secondary
          onPress={() => props.navigation.navigate('Register')}
        >
          <Text style={{ color: 'white' }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
}

export default Login;

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
});
