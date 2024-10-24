export const shortText = (txt) => {
  return txt.split(" ").splice(0, 3);
};

export const roundNumber = (price) => {
  return price.toFixed(2);
};

export const searchProducts = (products, search) => {
  if (!search) return products;
  return products.filter((item) => item.title.toLowerCase().includes(search));
};

export const categoryProducts = (products, category) => {
  if (category === "all" || !category) return products;
  console.log(category);

  return products.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
};

export const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }

  return { ...currentQuery, ...newQuery };
};

export const countCarts = (products) => {
  return products.reduce((acc, cur) => acc + cur.quantity, 0);
};
