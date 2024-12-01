function escape(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
}

let currencyFormatter = new Intl.NumberFormat('en-' + formatCountry, { style: 'currency', currency: currency })

let _product = product
_product['price'] = (currencyFormatter.format((_product['EURprice'] * conversionRate).toFixed(2)))
_product['buylink'] = '/etsy/purchase?id=' + _product.id
let element = document.querySelector('.c13')
Object.entries(_product).forEach(([field, value]) => {
    element.innerHTML = element.innerHTML.replaceAll('{' + field + '}', value.toString())
})

