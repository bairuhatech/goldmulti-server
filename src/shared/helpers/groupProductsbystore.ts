export const groupProductsByStore = (data: any[]) => {
  if (Array.isArray(data) && data.length) {
    const groupedData = data.reduce((acc, item) => {
      const storeId = item.storeId;
      const existingStore = acc.find((store: any) => store.storeId === storeId);

      if (existingStore) {
        existingStore.totalPrice += item?.totalPrice;
        existingStore.totalCount += 1;
        existingStore.products.push({
          ...item,
        });
      } else {
        acc.push({
          storeId: storeId,
          totalPrice: item?.totalPrice,
          totalCount: 1,
          products: [
            {
              ...item,
            },
          ],
        });
      }

      return acc;
    }, []);
    return groupedData;
  }
  return [];
};
