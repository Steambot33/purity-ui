export const formatDate = date => {
  const formatedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
  return formatedDate;
};

export const databaseId = process.env.NOTION_DATABASE_ID;
