import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return format(date, 'MMM dd, yyyy');
};

export const formatRelativeDate = (date: Date | null): string => {
  if (!date) return '';
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatFullDate = (date: Date | null): string => {
  if (!date) return '';
  return format(date, 'MMMM dd, yyyy');
};

export const estimateReadTime = (content: string): number => {
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(wordCount / 200);
};
