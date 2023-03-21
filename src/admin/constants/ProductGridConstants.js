export const productGridConstants = [
    { id : 'id', name : 'Id' },
    { id : 'sellerName', name : 'Seller Name' },
    { id : 'productName', name : 'Product Name' },
    { id : 'price', name : 'Price' },
    { id : 'quantity', name : 'Quantity' },
    { id : 'inStock', name : 'In Stock' },
    { id : 'updatedBy', name : 'Updated By' },
    { id : 'pod', name : 'POD', cellRenderer : (data) => { if(data == 'true'){ return '<i class="ri-heart-fill h5 text-danger"></i>' }else{ return '<i class="ri-heart-fill h5 text-dark"></i>' } ; } }
]