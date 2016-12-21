module.exports = function(basketItemId, productId, optionId){
  return {
    id: basketItemId,
    productId: productId,
    optionId: optionId,
    quantity: 1
  }
}
