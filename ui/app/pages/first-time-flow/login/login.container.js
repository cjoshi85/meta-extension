import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { setFirstTimeFlowType, loginWithYez } from '../../../store/actions';
import { getFirstTimeFlowTypeRoute } from '../../../selectors';
import LoginComponent from './login.component';

const mapStateToProps = (state) => {
  console.log({state});
  return {
    nextRoute: getFirstTimeFlowTypeRoute(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFirstTimeFlowType: (type) => dispatch(setFirstTimeFlowType(type)),
    loginWithYez: (email, password) => dispatch(loginWithYez(email, password)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(LoginComponent);
