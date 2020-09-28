type Item = { value: string; selected: boolean };

export const itemsSelector = (
  clickedItem: Item,
  items: Item[],
  setSelectedItems: Function,
  allowMultipleSelection: boolean
): Item[] => {
  if (allowMultipleSelection) {
    const newItems = items.map((item) => {
      if (item.value === clickedItem.value) {
        item.selected = !item.selected;
        return item;
      }
      return item;
    });
    setSelectedItems(newItems);
    return newItems;
  }
  const newItems = items.map((item) => {
    if (item.value === clickedItem.value) {
      item.selected = true;
      return item;
    }
    item.selected = false;
    return item;
  });
  setSelectedItems(newItems);
  return newItems;
};
