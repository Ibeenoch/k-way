// utils/timeFormatter.ts
import moment from 'moment';

// Function to format the createdAt timestamp
export const formatCreatedAt = (createdAt: string): string => {
  const now = moment();
  const createdTime = moment(createdAt);
  const duration = moment.duration(now.diff(createdTime));

  if (duration.asSeconds() < 60) {
    return 'just now';
  } else if (duration.asMinutes() < 60) {
    const minutes = Math.floor(duration.asMinutes());
    return `${minutes} min ago`;
  } else if (duration.asHours() < 24) {
    const hours = Math.floor(duration.asHours());
    return `${hours} hours ago`;
  } else if (duration.asDays() < 7) {
    const days = Math.floor(duration.asDays());
    return `${days} days ago`;
  } else if (duration.asWeeks() < 4) {
    const weeks = Math.floor(duration.asWeeks());
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (duration.asMonths() < 12) {
    const months = Math.floor(duration.asMonths());
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(duration.asYears());
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
};
