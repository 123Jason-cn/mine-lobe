import { isServerMode } from '@/const/version';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';

import ClientMode from './ClientMode';
import ServerMode from './ServerMode';

const Upload = () => {
  const { enableKnowledgeBase } = useServerConfigStore(featureFlagsSelectors);
  console.log('isServerMode ', isServerMode)
  console.log('enableKnowledgeBase ', enableKnowledgeBase)
  return isServerMode && enableKnowledgeBase ? <ServerMode /> : <ClientMode />;
};

export default Upload;
