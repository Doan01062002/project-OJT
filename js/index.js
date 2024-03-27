let sendMessageCustomer = JSON.parse(localStorage.getItem("sendMessageCustomer")) || [];

function sendMessage(){

    let contactName = document.getElementById("contact-name").value;
    let contactEmail = document.getElementById("contact-email").value;
    let contactPhone = document.getElementById("contact-phone").value;
    let contactMessage = document.getElementById("contact-message").value;
    
    let obj = {
        id: Math.floor(Math.random() * 1000000000000),
        contactName:`${contactName}`,
        contactEmail:`${contactEmail}`,
        contactPhone:`${contactPhone}`,
        contactMessage:`${contactMessage}`,
    }

    sendMessageCustomer.push(obj);
    localStorage.setItem("sendMessageCustomer", JSON.stringify(sendMessageCustomer));
    
    alert("Phản hồi đã được gửi thành công");

    document.getElementById("contact-name").value = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-phone").value = "";
    document.getElementById("contact-message").value = "";


}

//Sản phẩm vé 

// let products = [
//     {
//         id: Math.floor(Math.random() * 1000000),
//         date:"30/04/2024",
//         category: "pop",
//         quantity: 100,
//         name: "Pop Night",
//         time: "5:00-7:00",
//         author: "By Adele"
//     },
//     {
//         id: Math.floor(Math.random() * 1000000),
//         date: "20/10/2024",
//         category: "DJ",
//         quantity: 120,
//         name: "DJ Night",
//         time: "6:30-9:30",
//         author: "By Rihana"
//     },
//     {
//         id: Math.floor(Math.random() * 1000000),
//         date: "01/06/2024",
//         category: "rock",
//         quantity: 100,
//         name: "Rock & Roll",
//         time: "7:00-11:00",
//         author: "By Rihana"
//     },
//     {
//         id: Math.floor(Math.random() * 1000000),
//         date:"20/11/2024",
//         category: "edm",
//         quantity: 50,
//         name: "Country Music",
//         time: "4:30-7:30",
//         author: "By Rihana"
//     },
//     {
//         id: Math.floor(Math.random() * 1000000),
//         date:"10/03/2024",
//         category: "free",
//         quantity: 80,
//         name: "Free Style",
//         time: "6:00-10:00",
//         author: "By Members"
//     },
// ];

// localStorage.setItem("products", JSON.stringify(products));

// render dữ liệu của products

let products = JSON.parse(localStorage.getItem("products"));

function render(){

    let element = "";

    for(let i=0; i<products.length; i++){
        element +=
        `
        <tr>
            <td>
                <h3>${products[i].name}</h3>
            </td>

            <td>
                <p>${products[i].category}</p>
            </td>
                                            
            <td>
                <p>${products[i].author}</p>
            </td>

            <td>
                <p>${products[i].time} PM</p>
                <p>${products[i].date}</p>
            </td>

            <td>
                <p>${products[i].quantity}</p>
            </td>

        </tr>

        `
    }
    
    document.getElementById("tableTicket").innerHTML = element;

    var table = document.getElementById("tableTicket");
    var rows = table.getElementsByTagName("tr");

    for (var j = 0; j < rows.length; j++) {
        var cell = document.createElement("td");
        cell.textContent = j+1;
        rows[j].insertBefore(cell, rows[j].firstChild);
    }
    
}

render();

// chuyển đổi google map và messageForm

function showMessage() {
    // Hiển thị tab biểu mẫu liên hệ
    document.getElementById("nav-ContactForm-tab").classList.add("active");
    document.getElementById("nav-ContactMap-tab").classList.remove("active");
  
    document.getElementById("nav-ContactForm").classList.add("show", "active");
    document.getElementById("nav-ContactMap").classList.remove("show", "active");
}
  
function showMap() {
    // Hiển thị tab Google Maps
    document.getElementById("nav-ContactForm-tab").classList.remove("active");
    document.getElementById("nav-ContactMap-tab").classList.add("active");
  
    document.getElementById("nav-ContactForm").classList.remove("show", "active");
    document.getElementById("nav-ContactMap").classList.add("show", "active");
}

//select theo từng thể loại

function renderOption(){
    let element = "";

    for(let i=0;i<products.length;i++){
        element +=
        `
        <option value="${products[i].category}">${products[i].category} ↓</option>
        `
    }

    document.getElementById("chooseTicket").innerHTML = element;

}

renderOption();

// sắp xếp theo thể loại nhạc

function renderCategory(){
    let categoryTicket = document.getElementById("chooseTicket").value;

    let category = [];

    for(let i=0;i<products.length;i++){
        if(products[i].category == categoryTicket){
            category.push(products[i]);
        }
    }

    let element = "";

    for(let j=0; j<category.length; j++){
        element +=
        `
        <tr>
            <td>
                <h3>${category[j].name}</h3>
            </td>

            <td>
                <p>${category[j].category}</p>
            </td>
                                            
            <td>
                <p>${category[j].author}</p>
            </td>

            <td>
                <p>${category[j].time} PM</p>
                <p>${category[j].date}</p>
            </td>

            <td>
                <p>${category[j].quantity}</p>
            </td>

        </tr>

        `
    }
    
    document.getElementById("tableTicket").innerHTML = element;

    var table = document.getElementById("tableTicket");
    var rows = table.getElementsByTagName("tr");

    for (var k = 0; k < rows.length; k++) {
        var cell = document.createElement("td");
        cell.textContent = k+1;
        rows[k].insertBefore(cell, rows[k].firstChild);
    }
}

