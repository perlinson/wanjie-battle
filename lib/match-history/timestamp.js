import { prefixWithZero } from 'lib/utils/number-helpers';

const timestamp = () => {
  const dateObj = new Date();
  const hours = prefixWithZero(dateObj.getHours());
  const minutes = prefixWithZero(dateObj.getMinutes());
  const seconds = prefixWithZero(dateObj.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};

export default timestamp;
