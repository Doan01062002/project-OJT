let users = JSON.parse(localStorage.getItem("users")) || [];

function test(e) {
    e.preventDefault();
    let fullName = document.getElementById("ticket-form-name").value;
    let email = document.getElementById("ticket-form-email").value;
    let phone = document.getElementById("form-control").value;
    let ticketNumber = document.getElementById("ticket-form-number").value;
    let formMessage = document.getElementById("ticket-form-message").value;
    let ticketType = document.getElementsByName("TicketForm");
    let chooseTicketName = document.getElementById("chooseTicket").value;

    let valueTicketType = null;
    for(let i=0; i<ticketType.length; i++){
        if(ticketType[i].checked === true){
            valueTicketType = ticketType[i].value;
        };
    };

    let quantityTicket = 0;

    for(let k=0; k<products.length; k++){
        if(chooseTicketName == products[k].name){
            quantityTicket = products[k].quantity;
        }
    }

    if(quantityTicket < ticketNumber && quantityTicket <=0){
        alert("vé đã bán hết hoặc bạn mua quá số lượng vé hiện có vui lòng kiểm tra lại!")
    }else{
        let obj = { 
        id: Math.floor(Math.random() * 1000000000),
        fullName:`${fullName}`,
        email:`${email}`,
        phone:`${phone}`,
        ticketNumber:`${ticketNumber}`,
        formMessage:`${formMessage}`,
        ticketType:`${valueTicketType}`,
        chooseTicketName:`${chooseTicketName}`
    }
    
        users.unshift(obj);
        localStorage.setItem("users", JSON.stringify(users));

        //giảm số lượng vé khi người dùng mua vé

        for(let j=0;j<products.length;j++){
            if(chooseTicketName == products[j].name){
                let ticketQuantity = products[j].quantity - ticketNumber;

                products[j].quantity = ticketQuantity;
                localStorage.setItem("products", JSON.stringify(products));
            }
        }

        alert("Mua vé thành công thành công!");
        window.location.replace("index.html");
    }

};


let products = JSON.parse(localStorage.getItem("products"));

function render(){
    let element = "";

    for(let i=0;i<products.length;i++){
        element +=
        `
        <option value="${products[i].name}">${products[i].name}, ${products[i].date}, ${products[i].time}</option>
        `
    }

    document.getElementById("chooseTicket").innerHTML = element;

}

render();

