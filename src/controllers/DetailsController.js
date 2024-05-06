export const getItemDetails = itemName => {
  const items = JSON.parse(localStorage.getItem('items'));
  return items.find(item => item.name === itemName);
};
