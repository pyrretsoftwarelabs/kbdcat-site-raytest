function escape(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
}

products.forEach(product => {
    const element = document.querySelector('#prod-template').cloneNode(true)
    element.setAttribute('id' , '')
    
    Object.entries(product).forEach(([field, value]) => {
        element.innerHTML = element.innerHTML.replaceAll('{' + field + '}', escape(value))
    })
    
    element.style.visibility = 'visible'
    element.style.position = 'unset'
    document.querySelector('.product-list').appendChild(element)
});