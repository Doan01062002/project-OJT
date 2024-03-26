let users = JSON.parse(localStorage.getItem("users")) || [];

function test(e) {
    e.preventDefault();
    let fullName = document.getElementById("ticket-form-name").value;
    let email = document.getElementById("ticket-form-email").value;
    let phone = document.getElementById("form-control").value;
    let ticketNumber = document.getElementById("ticket-form-number").value;
    let formMessage = document.getElementById("ticket-form-message").value;
    let ticketType = document.getElementsByName("TicketForm");

    let valueTicketType = null;
    for(let i=0; i<ticketType.length; i++){
        if(ticketType[i].checked === true){
            valueTicketType = ticketType[i].value;
        };
    };

    let obj = { 
        cart:[],
        id: Math.floor(Math.random() * 1000000000),
        fullName:`${fullName}`,
        email:`${email}`,
        phone:`${phone}`,
        ticketNumber:`${ticketNumber}`,
        formMessage:`${formMessage}`,
        ticketType:`${valueTicketType}`,
    }

    let flag = true;
    for(let i=0; i< users.length; i++){
        if(email == users[i].email || phone == users[i].phone){
            alert("email hoặc số điện thoại đã được sử dụng");
            flag = false;
            break;
        }
    }
    if(flag == true){
        users.push(obj);
        alert("Mua vé thành công thành công!");
        localStorage.setItem("users", JSON.stringify(users));
        window.location.replace("index.html");   
    }
};


let products = JSON.parse(localStorage.getItem("products"));

function render(){
    let element = "";

    for(let i=0;i<products.length;i++){
        element +=
        `
        <div class="col-lg-6 col-md-6 col-12">
            <div class="form-check form-control">
                <input class="form-check-input" value = 120 type="checkbox" name="TicketForm" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                    <p>${products[i].name}, ${products[i].time} PM</p>
                    <input class="numberTicket form-check-input" type="number" min="1" placeholder="number" value="1">
                </label>
            </div>
        </div>
        `
    }

    document.getElementById("chooseTicket").innerHTML = element;

}

render();