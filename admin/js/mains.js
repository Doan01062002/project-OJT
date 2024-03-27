// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//in thông tin tổng số lượng và thu nhập

let users = JSON.parse(localStorage.getItem("users"));

function dashbroad(){
  let sales = 0;
  let comments = 0;
  let earning = 0;

  if (users && Array.isArray(users)) {
    for(let i = 0; i < users.length; i++){
      sales += parseInt(users[i].ticketNumber);
      earning += (users[i].ticketNumber * users[i].ticketType);
      for(let j = 0; j < users[i].formMessage.length; j++){
        if(users[i].formMessage.charAt(j) !== ""){
          comments++;
          break;
        }
      }
    }
  }

  let salesNumber = document.getElementById("salesNumber");
  let commentsNumber = document.getElementById("commentsNumber");
  let earningNumber = document.getElementById("earningNumber");

  salesNumber.innerText = sales;
  commentsNumber.innerText = comments;
  earningNumber.innerText = "$"+earning;

}

dashbroad();

//Render dữ liệu

function renderTable(){
  let element = "";

  for(let i=0; i<users.length; i++){
    element += 
    `
    <tr>
      <td>${users[i].id}</td>
      <td>${users[i].fullName}</td>
      <td>${users[i].chooseTicketName}</td>
      <td>${users[i].ticketNumber}</td>
      <td>$${users[i].ticketType}</td>
      <td>
        <button type="button" onclick="fix(${users[i].id})" class="btn btn-primary">Sửa</button>
        <button type="button" onclick="deleteCustomer(${users[i].id})" class="btn btn-danger">Xóa</button>
        <button type="button" onclick="information(${users[i].id})" class="btn btn-infor">Chi tiết</button>
      </td>
    </tr>
    `
  }
  
  document.getElementById("myTable").innerHTML = element;

  var table = document.getElementById("myTable");
  var rows = table.getElementsByTagName("tr");

  for (var j = 0; j < rows.length; j++) {
    var cell = document.createElement("td");
    cell.textContent = j+1;
    rows[j].insertBefore(cell, rows[j].firstChild);
  }
}

renderTable();

//xem thông tin chi tiết khách hàng

var modal = document.getElementById("myModal");

function information(id){

  let element = "";

  for(let i=0;i<users.length;i++){
    if(id == users[i].id){
      element +=
      `
      <span onclick="closeBtn()" class="material-symbols-outlined">close</span>
      <h2>Thông tin chi tiết khách hàng</h2>
      <span><b>Full Name: </b><p>${users[i].fullName}</p></span><br>
      <span><b>Email Address: </b><p>${users[i].email}</p></span><br>
      <span><b>Phone number: </b><p>${users[i].phone}</p></span><br>
      <span><b>Ticket Name: </b><p>${users[i].chooseTicketName}</p></span><br>
      <span><b>Ticket Type: </b><p>$${users[i].ticketType}</p></span><br>
      <span><b>Number Ticket: </b><p>${users[i].ticketNumber}</p></span><br>
      <span><b>Feedback: </b><p>${users[i].formMessage}</p></span><br>
      `
    }
  }

  modal.innerHTML = element;

  modal.style.display = "block";

  closeBtnn();
}

function closeBtn(){
  modal.style.display = "none";
}

// Xóa thông tin khách hàng

function deleteCustomer(id){
  for(let i=0; i<users.length; i++){
    if(id == users[i].id){
      localStorage.setItem("users", JSON.stringify(users.splice(i,1)));
    }
  }

  renderTable();

  dashbroad();
}

// Sửa thông tin khách hàng

let fixCustomer = document.getElementById("fixCustomer");

function fix(id) {
  let element = "";
  let ticketStandard = null;
  let ticketEarly = null;

  for (let i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      if (users[i].ticketType === 240) {
        ticketStandard = true;
      } else {
        ticketEarly = true;
      }

      element +=
        `
      <span onclick="closeBtnn()" class="material-symbols-outlined">close</span>
      <h2>Chỉnh sửa thông tin khách hàng</h2>
      <div class="nameAndAddress" style="margin-bottom: 10px;">
          <input id="fullName" type="text" placeholder="Full Name" value="${users[i].fullName}">
          <input id="email" type="email" placeholder="Email address" value="${users[i].email}">
      </div>
      <input id="phoneNumber" class="phoneNumber" type="tel" placeholder="phone" style="margin-bottom: 10px;" value="${users[i].phone}">
      <h4>Choose Ticket Name</h4>
      <div class="row">
        <select name="" id="chooseTicket" class="numberTicket" aria-placeholder="choose Ticket">
          
        </select>
      </div>
      <h4 style="margin-bottom: 10px;">Choose Ticket type</h4>
      <div class="ticket" style="margin-bottom: 10px;">
          <input type="radio" name="ticket" value="120" ${ticketEarly ? "checked" : ""}>Eary bird $120
          <input type="radio" name="ticket" value="240" ${ticketStandard ? "checked" : ""}>Standard $240
      </div>
      <input id="numberTicket" class="numberTicket" type="number" placeholder="Number of Ticket" style="margin-bottom: 10px;" value="${users[i].ticketNumber}">
      <textarea name="" id="formMessage" cols="30" rows="5" placeholder="Additional Request" style="margin-bottom: 10px;">${users[i].formMessage}</textarea>
      <button onclick="confirm(${users[i].id})">Xác nhận</button>
      `;
    }
  }

  fixCustomer.innerHTML = element;

  let elementOption = "";

  for(let i=0;i<products.length;i++){
    elementOption +=
    `
    <option value="${products[i].name}">${products[i].name}, ${products[i].date}, ${products[i].time}</option>
    `
  }
  
  document.getElementById("chooseTicket").innerHTML = elementOption;

  fixCustomer.style.display = "block";

  closeBtn();

  closeBtnnn();
}

function confirm(id){

  let fullName = document.getElementById("fullName").value;
  let email = document.getElementById("email").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let numberTicket = document.getElementById("numberTicket").value;
  let formMessage = document.getElementById("formMessage").value;
  let ticket = document.getElementsByName("ticket");

  for (let i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      let valueTicket = null;
      for (let j = 0; j < ticket.length; j++) {
        if (ticket[j].checked === true) {
          valueTicket = ticket[j].value;
        }
      }

      let obj = {
        id: Math.floor(Math.random() * 1000000000),
        fullName: fullName,
        email: email,
        phone: phoneNumber,
        ticketNumber: numberTicket,
        formMessage: formMessage,
        ticketType: valueTicket,
      }

      users.splice(i, 1, obj);
      localStorage.setItem("users", JSON.stringify(users));

      break;
    }
  }

  alert("Thay đổi thành công");

  renderTable();

  closeBtn();

  dashbroad();

}

function closeBtnn(){
  fixCustomer.style.display = "none";
}

// Thêm khách hàng

var addCustomer = document.getElementById("addCustomer");

let products = JSON.parse(localStorage.getItem("products"));

function addCustomers(){
  let element = "";

  element +=
        `
      <span onclick="closeBtnnn()" class="material-symbols-outlined">close</span>
      <h2>Thêm khách hàng mua vé</h2>
      <div class="nameAndAddress" style="margin-bottom: 10px;">
          <input id="fullName" type="text" placeholder="Full Name" value="">
          <input id="email" type="email" placeholder="Email address" value="">
      </div>
      <input id="phoneNumber" class="phoneNumber" type="tel" placeholder="phone" style="margin-bottom: 10px;" value="">
      <h4>Choose Ticket Name</h4>
      <div class="row">
        <select name="" id="chooseTicket" class="numberTicket" aria-placeholder="choose Ticket">
          
        </select>
      </div>
      <h4 style="margin-bottom: 10px;">Choose Ticket type</h4>
      <div class="ticket" style="margin-bottom: 10px;">
          <input type="radio" name="ticket" value="120" >Eary bird $120
          <input type="radio" name="ticket" value="240" >Standard $240
      </div>
      <input id="numberTicket" class="numberTicket" type="number" placeholder="Number of Ticket" style="margin-bottom: 10px;" value="">
      <textarea name="" id="formMessage" cols="30" rows="5" placeholder="Additional Request" style="margin-bottom: 10px;"></textarea>
      <button onclick="confirmCustomer()">Thêm (+)</button>
      `;

    
  addCustomer.innerHTML = element;

  let elementOption = "";

  for(let i=0;i<products.length;i++){
    elementOption +=
    `
    <option value="${products[i].name}">${products[i].name}, ${products[i].date}, ${products[i].time}</option>
    `
  }
  
  document.getElementById("chooseTicket").innerHTML = elementOption;

  addCustomer.style.display = "block";

  closeBtn();

  closeBtnn();

}

function confirmCustomer(){
  let fullName = document.getElementById("fullName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phoneNumber").value;
  let ticketNumber = document.getElementById("numberTicket").value;
  let formMessage = document.getElementById("formMessage").value;
  let ticketType = document.getElementsByName("ticket");
  let chooseTicketName = document.getElementById("chooseTicket").value;

  let valueTicketType = null;
  for(let i=0; i<ticketType.length; i++){
      if(ticketType[i].checked === true){
          valueTicketType = ticketType[i].value;
      };
  };

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

  users.push(obj);
  alert("Thêm khách hàng thành công thành công!");
  localStorage.setItem("users", JSON.stringify(users));

  closeBtnnn();

  renderTable();

  dashbroad();
}

function closeBtnnn(){
  addCustomer.style.display = "none";
}

//ẩn hiện các danh mục

let sendMessageCustomer = JSON.parse(localStorage.getItem("sendMessageCustomer"));

let details = document.getElementById("details");

function showDashboards() {
  details.style.display = "inline-flex";

  closeMessage();

  closeProducts();
}

function closeDashboards(){
  details.style.display = "none";
}

let messageContainer = document.getElementById("message");

function closeMessage(){
  messageContainer.style.display = "none";
}

function showMessage(){

  let element = "";

  for(let i = 0; i < sendMessageCustomer.length; i++){
    element +=
    `
    <div class="messageCustomer">
      <h4>${sendMessageCustomer[i].contactName}</h4>
      <br>
      <h5>Email: ${sendMessageCustomer[i].contactEmail}</h5>
      <br>
      <h5>Phone: ${sendMessageCustomer[i].contactPhone}</h5>
      <br>
      <p>Message: ${sendMessageCustomer[i].contactMessage}</p>
      <br>
      <button>Feedback</button>
      <br>
    </div>
    `;
  }

  document.getElementById("messageCustomer").innerHTML = element;

  messageContainer.style.display = "inline-flex";

  closeDashboards();

  closeProducts();
}


let showProduct = document.getElementById("products");

function closeProducts(){
  showProduct.style.display = "none";
}

function showProducts(){

  closeDashboards();
  closeMessage();
}

//search tìm kiếm khách hàng theo tên

function searchCustomer(){

  let customer = [];

  let searchValue = document.getElementById("searchValue").value.toLowerCase();

  for(let i=0;i<users.length;i++){
    let customerName = users[i].fullName.toLowerCase();

    if(customerName.includes(searchValue)){
      console.log(searchValue);
      customer.push(users[i]);
    }
  }

  let element = "";

  for(let j=0; j<customer.length; j++){
    element += 
    `
    <tr>
      <td>${customer[j].id}</td>
      <td>${customer[j].fullName}</td>
      <td>${customer[j].chooseTicketName}</td>
      <td>${customer[j].ticketNumber}</td>
      <td>$${customer[j].ticketType}</td>
      <td>
        <button type="button" onclick="fix(${customer[j].id})" class="btn btn-primary">Sửa</button>
        <button type="button" onclick="deleteCustomer(${customer[j].id})" class="btn btn-danger">Xóa</button>
        <button type="button" onclick="information(${customer[j].id})" class="btn btn-infor">Chi tiết</button>
      </td>
    </tr>
    `
  }
  
  document.getElementById("myTable").innerHTML = element;

  var table = document.getElementById("myTable");
  var rows = table.getElementsByTagName("tr");

  for (var k = 0; k < rows.length; k++) {
    var cell = document.createElement("td");
    cell.textContent = k+1;
    rows[k].insertBefore(cell, rows[k].firstChild);
  }
}

