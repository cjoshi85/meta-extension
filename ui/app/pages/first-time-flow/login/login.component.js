import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '../../../components/ui/text-field';
import Button from '../../../components/ui/button';
import { INITIALIZE_END_OF_FLOW_ROUTE } from '../../../helpers/constants/routes';

export default class LoginComponent extends Component {
  static propTypes = {
    history: PropTypes.object,
    isInitialized: PropTypes.bool,
    loginWithYez: PropTypes.func,
    nextRoute: PropTypes.string,
  };
  static contextTypes = {
    t: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isValid: false,
    };
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { loginWithYez,history } = this.props;
    console.log({ email, password });
    await loginWithYez(email, password);
    history.push(INITIALIZE_END_OF_FLOW_ROUTE);
  };

  handleInput = (key, value) => {
    this.setState({
      [key]: value,
    }, this.checkState);
  };

  checkState = () => {
    const { email, password } = this.state;
    const { t } = this.context;
    let [emailError, passwordError, isValid] = ['', '', true];
    if (!email) {
      isValid = false;
      emailError = t('invalidEmail');
    }
    if (!password) {
      isValid = false;
      passwordError = t('invalidPassword');
    }
    this.setState({
      isValid,
      emailError,
      passwordError,
    });
  };

  render() {
    const { t } = this.context;
    const { email, password, emailError, passwordError, isValid } = this.state;
    return (
      <form className="login-flow__form" onSubmit={this.handleLogin}>
        <div className="login-flow__header">{t('loginYEZHeader')}</div>
        <TextField
          id="email"
          label={t('emailInput')}
          type="text"
          className="login-flow__input"
          value={email}
          onChange={(event) => this.handleInput('email', event.target.value)}
          error={emailError}
          margin="normal"
          largeLabel
        />
        <TextField
          id="password"
          label={t('passwordInput')}
          type="password"
          className="login-flow__input"
          value={password}
          onChange={(event) => this.handleInput('password', event.target.value)}
          error={passwordError}
          margin="normal"
          largeLabel
        />
        <Button
          type="primary"
          submit
          className="login-flow__button"
          disabled={!isValid}
        >
          {t('login')}
        </Button>
      </form>
    );
  }
}
