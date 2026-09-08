export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Menos de uma hora
  if (diffInSeconds < 3600) {
    return "< one hour ago";
  }

  // Horas
  const diffInHours = Math.floor(diffInSeconds / 3600);
  if (diffInHours === 1) {
    return "one hour ago";
  }
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  // Dias
  const diffInDays = Math.floor(diffInSeconds / (3600 * 24));
  if (diffInDays === 1) {
    return "1 day ago";
  }
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  // Meses
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) {
    return "1 month ago";
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  // Anos
  const diffInYears = Math.floor(diffInDays / 365);
  if (diffInYears === 1) {
    return "1 year ago";
  }
  return `${diffInYears} years ago`;
}
