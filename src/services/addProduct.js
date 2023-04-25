const verifyQuantity = () => {
  const productsLocalStorage = JSON.parse(localStorage.getItem('productsList')) || [];
  const totalAmount = productsLocalStorage
    .reduce((total, { quantity }) => total + quantity, 0);
  localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
};

const addProduct = (product) => {
  const filteredProduct = {
    ...product,
    quantity: 1,
  };
  // Se existe productsList no localStorage
  if (localStorage.productsList) {
    const productsLocalStorage = JSON.parse(localStorage.productsList);
    //  Verifica se o produto já existe na lista
    if (productsLocalStorage.some((item) => item.id.includes(product.id))) {
      const arrayForChangeQuantity = productsLocalStorage.map((item) => {
        // Identifiquei o produto repitido e atualizei sua quantidade
        if (item.id.includes(product.id)) {
          item.quantity += 1;
        }
        return item;
      });
      localStorage.setItem('productsList', JSON.stringify(arrayForChangeQuantity));
      verifyQuantity();
    } else {
      // Quando é adicionado pela primeira vez na lista
      const takelocal = JSON.parse(localStorage.getItem('productsList'));
      const otherProductsList = [...takelocal, filteredProduct];
      localStorage.setItem('productsList', JSON.stringify(otherProductsList));
    }
  } else {
    // Quando o localStorage ainda não existe
    localStorage.setItem('productsList', JSON.stringify([filteredProduct]));
    verifyQuantity();
  }
};

export default addProduct;
