function escape(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
}

let currencyFormatter = new Intl.NumberFormat('en-' + formatCountry, { style: 'currency', currency: currency })

products.forEach(product => {
    const element = document.querySelector('#prod-template').cloneNode(true)
    element.setAttribute('id' , '')
    
    let _product = product
    _product['price'] = (currencyFormatter.format((product['EURprice'] * conversionRate).toFixed(2)))
    _product['morelink'] = '/view/' + _product.id 
    _product['buylink'] = '/etsy/purchase?id=' + _product.id
    element.setAttribute('href', _product['morelink'])
    Object.entries(_product).forEach(([field, value]) => {
        element.innerHTML = element.innerHTML.replaceAll('{' + field + '}', escape(value.toString()))
    })
    
    element.style.visibility = 'visible'
    element.style.position = 'unset'
    document.querySelector('.product-list').appendChild(element)
});