export const formatDate = (dateStr: string) => {
  const date = new Date(+dateStr);
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const displayDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    date
  );

  return displayDate;
};
