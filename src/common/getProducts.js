import groups from "@/data/names.json";
import data from "@/data/data.json";
import uuidv4 from "@/utils/uuid";

export default function getProducts() {
  const goods = data.Value.Goods;
  const formattedItems = goods.map(_makeFormattedItem);
  return _makeFormattedGroups(formattedItems, []);
}

function _getGroupName(id) {
  return groups[id].G;
}

function _getProductName(productId, groupId) {
  return groups[groupId].B[productId].N;
}

function _makeFormattedItem(item) {
  return {
    name: _getProductName(item.T, item.G),
    uid: uuidv4(),
    groupId: item.G,
    price: item.C,
    count: item.P,
  };
}

function _makeFormattedGroups(items, group) {
  if (!items.length) {
    return group;
  }
  const currentGroupId = items[0].groupId;
  const filteredItems = items.filter((i) => i.groupId === currentGroupId);
  group = [
    ...group,
    {
      name: _getGroupName(currentGroupId),
      products: filteredItems,
    },
  ];

  return _makeFormattedGroups(
    items.filter((i) => i.groupId !== currentGroupId),
    group
  );
}
