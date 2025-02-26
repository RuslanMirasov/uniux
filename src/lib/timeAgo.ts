export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff: number = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const count = Math.floor(diff / seconds);
    if (count >= 1) {
      return `Edited ${count} ${unit}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'Edited just now';
};
