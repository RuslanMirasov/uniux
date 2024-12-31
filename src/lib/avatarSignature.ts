export const avatarSignature = (name: string): string => {
  const words = name.split(' ');
  const firstLetters = words.map(word => word[0]).join('');

  return firstLetters;
};
