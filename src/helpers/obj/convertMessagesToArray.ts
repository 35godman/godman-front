export const convertMessagesToArray = (messages: string) => {
  if (!messages || !messages.length) return [];
  return messages.split('\n');
};
