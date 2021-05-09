import { connect } from 'react-redux';
import { getOnboardingInitiator } from '../../../selectors';
import { setCompletedOnboarding } from '../../../store/actions';
import EndOfFlow from './end-of-flow.component';

const firstTimeFlowTypeNameMap = {
  create: 'New Wallet Created',
  import: 'New Wallet Imported',
};

const mapStateToProps = (state) => {
  console.log({ state });
  const {
    metamask: { firstTimeFlowType, wallets },
  } = state;

  return {
    completionMetaMetricsName: firstTimeFlowTypeNameMap[firstTimeFlowType],
    onboardingInitiator: getOnboardingInitiator(state),
    wallets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCompletedOnboarding: () => dispatch(setCompletedOnboarding()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EndOfFlow);
