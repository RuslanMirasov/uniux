export const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomBytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');

  return (timestamp + randomBytes.substring(0, 16)).substring(0, 24);
};
