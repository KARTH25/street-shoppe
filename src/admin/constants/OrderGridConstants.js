export const orderGridConstants = [
    { id : 'id', name : 'Id' },
    { id : 'sellerName', name : 'Seller Name' },
    { id : 'productName', name : 'Product Name' },
    { id : 'price', name : 'Price' },
    { id : 'quantity', name : 'Quantity' },
    { id : 'ordered', name : 'Ordered'},
    { id : 'shipped', name : 'Shipped', cellRenderer : (data) => { if(data == 'true'){ return '<i class="ri-checkbox-circle-fill h5 text-success"></i>' }else{ return '' } ; } },
    { id : 'delivered', name : 'Delivered', cellRenderer : (data) => { if(data == 'true'){ return '<i class="ri-checkbox-circle-fill h5 text-success"></i>' }else{ return '' } ; } },
]