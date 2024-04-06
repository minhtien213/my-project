const convertVndType = (vnd) => {
  if (!vnd) {
    return '';
  } else {
    let vndArray = vnd.toString().split('');
    if (vndArray.length <= 3) {
      return `${vndArray.join('')}đ`;
    }
    for (let i = vndArray.length - 3; i > 0; i -= 3) {
      vndArray.splice(i, 0, '.');
    }
    return `${vndArray.join('')}đ`;
  }
};

module.exports = convertVndType;
