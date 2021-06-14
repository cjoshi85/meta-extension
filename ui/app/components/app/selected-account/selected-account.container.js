import { connect } from 'react-redux';
import { getSelectedIdentity, getSelectedYezAccount } from '../../../selectors';
import SelectedAccount from './selected-account.component';

const mapStateToProps = (state) => {
  return {
    selectedIdentity: getSelectedIdentity(state),
    selectedAccount: getSelectedYezAccount(state)
  };
};

export default connect(mapStateToProps)(SelectedAccount);
