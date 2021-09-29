bagProducts = [];
orderItems = [];
sum = 0;

function showShopBag() {
    bagProducts = JSON.parse(sessionStorage.getItem('BagProducts'));
    document.getElementById("itemCount").innerHTML = bagProducts.length;
    bagProducts.forEach((p) => {
        sum += p[0].price * p[1];
        drawOrdItem(p);

    });
    document.getElementById("totalAmount").innerHTML = sum;
}

function drawOrdItem(product) {
    temp = document.getElementById("temp-row");
    var cloneProduct = temp.content.cloneNode(true);
    cloneProduct.querySelector(".image").style.backgroundImage = "url(images/" + product[0].image + ")";;
    cloneProduct.querySelector(".itemName").innerHTML = product[0].name;
    cloneProduct.querySelector(".price").innerHTML = product[0].price;
    cloneProduct.querySelector(".onStack").innerHTML = product[1];
    cloneProduct.getElementById("deleteItem").addEventListener("click", () => { removeProduct(product) });
    document.querySelector("tbody").appendChild(cloneProduct);
}

function removeProduct(product) {
    flag = 0;
    if (product[1] > 1) {
        bagProducts.forEach(prod => {
            if (prod[0]._id == product[0]._id && !flag) {
                prod[1] = prod[1] - 1;
                flag = 1;
            }
        })
    }
    else {
        bagProducts = bagProducts.filter(p => p[0]._id != product[0]._id);
    }
    sessionStorage.setItem('BagProducts', JSON.stringify(bagProducts));
    document.querySelector("tbody").innerHTML = "";
    sum = 0;
    showShopBag();
}

function placeOrder() {
    bagProducts.forEach((item) => {
        let orderItem = {
            productId: item[0]._id,
            quantity: item[1],
        };
        orderItems.push(orderItem);
    })
    let user = JSON.parse(sessionStorage.getItem('user'));
    let order = {
        date: new Date(),
        sum: sum,
        userId: user.userId,
        orderItem: orderItems
    };
    fetch("api/order/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(order),
    })
        .then(response => {
        if (response.ok)
            alert('הזמנתך בוצעה בהצלחה :)');
        else
            alert('תקלה בביצו ההזמנה :(');
    }).catch(error => { alert(error); });
}
showShopBag();