export default size => {
  let width, height;

  width = parseInt(size.split('x')[0]);
  height = parseInt(size.split('x')[1]);

  return {
    width,
    height,
  };
};
