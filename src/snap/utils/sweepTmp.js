import { remove } from 'fs-extra';
import { TMP } from 'Snap/constants';

export default () => {
  return remove(TMP);
};
