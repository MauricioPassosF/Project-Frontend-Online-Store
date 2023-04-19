export async function getCategories() {
  const URL_API = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  const URL_API = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
}

export async function getProductById(PRODUCT_ID) {
  const URL_API = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
