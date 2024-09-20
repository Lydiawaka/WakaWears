function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
}

function placeOrder() {
    alert('Order placed successfully!');
    // Add logic to process the order
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3').textContent;
        const cartItems = document.getElementById('cart-items');
        const li = document.createElement('li');
        li.textContent = productName;
        cartItems.appendChild(li);
    });
});

var MenuItems=document.getElementById("MenuItems");

MenuItems.style.maxHeight = "0px";
function menutoggle(){
    if(MenuItems.style.maxHeight == "0px")
{
    MenuItems.style.maxHeight = "200px"
}
else
{
    MenuItems.style.maxHeight = "0px"
}
}

