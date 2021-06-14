import log from 'loglevel';
import { transactionMatchesNetwork } from '../../shared/modules/transaction.utils';
import { valuesFor } from '../app/helpers/utils/util';

export default function txHelper(
  unapprovedTxs,
  unapprovedMsgs,
  personalMsgs,
  decryptMsgs,
  encryptionPublicKeyMsgs,
  typedMessages,
  network,
  chainId,
) {
  console.log('tx-helper called with params:');
  console.log({
    unapprovedTxs,
    unapprovedMsgs,
    personalMsgs,
    decryptMsgs,
    encryptionPublicKeyMsgs,
    typedMessages,
    network,
    chainId,
  });

  const txValues = network
    ? valuesFor(unapprovedTxs).filter((txMeta) =>
        transactionMatchesNetwork(txMeta, chainId, network),
      )
    : valuesFor(unapprovedTxs);
  console.log(`tx helper found ${txValues.length} unapproved txs`);

  const msgValues = valuesFor(unapprovedMsgs);
  console.log(`tx helper found ${msgValues.length} unsigned messages`);
  let allValues = txValues.concat(msgValues);

  const personalValues = valuesFor(personalMsgs);
  console.log(
    `tx helper found ${personalValues.length} unsigned personal messages`,
  );
  allValues = allValues.concat(personalValues);

  const decryptValues = valuesFor(decryptMsgs);
  console.log(`tx helper found ${decryptValues.length} decrypt requests`);
  allValues = allValues.concat(decryptValues);

  const encryptionPublicKeyValues = valuesFor(encryptionPublicKeyMsgs);
  console.log(
    `tx helper found ${encryptionPublicKeyValues.length} encryptionPublicKey requests`,
  );
  allValues = allValues.concat(encryptionPublicKeyValues);

  const typedValues = valuesFor(typedMessages);
  console.log(`tx helper found ${typedValues.length} unsigned typed messages`);
  allValues = allValues.concat(typedValues);

  allValues = allValues.sort((a, b) => {
    return a.time - b.time;
  });

  return allValues;
}
