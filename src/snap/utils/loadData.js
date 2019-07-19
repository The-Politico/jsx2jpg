import path from 'path';

export default fp => {
  let data;
  try {
    data = require(path.join(process.cwd(), fp));
  } catch (e) {
    return null;
  }

  if (typeof data === 'function') {
    return Promise.resolve(data());
  } else {
    return data;
  }
};
