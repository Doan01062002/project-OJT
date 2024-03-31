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

// function renderTable(){
//   let element = "";

//   for(let i=0; i<users.length; i++){
//     element += 
//     `
//     <tr>
//       <td>${users[i].id}</td>
//       <td>${users[i].fullName}</td>
//       <td>${users[i].chooseTicketName}</td>
//       <td>${users[i].ticketNumber}</td>
//       <td>$${users[i].ticketType}</td>
//       <td>
//         <button type="button" onclick="fix(${users[i].id})" class="btn btn-primary">Sửa</button>
//         <button type="button" onclick="deleteCustomer(${users[i].id})" class="btn btn-danger">Xóa</button>
//         <button type="button" onclick="information(${users[i].id})" class="btn btn-infor">Chi tiết</button>
//       </td>
//     </tr>
//     `
//   }
  
//   document.getElementById("myTable").innerHTML = element;

//   var table = document.getElementById("myTable");
//   var rows = table.getElementsByTagName("tr");

//   for (var j = 0; j < rows.length; j++) {
//     var cell = document.createElement("td");
//     cell.textContent = j+1;
//     rows[j].insertBefore(cell, rows[j].firstChild);
//   }
// }

// renderTable();

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

  swal({
    title: "Bạn có muốn xóa khách hàng này? ",
    text: "Dữ liệu sẽ được chuyển vào thùng rác.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      // Xóa môn khỏi mảng
      for(let i=0; i<users.length; i++){
        if(id == users[i].id){
          let bin = users.splice(i,1);
          binCustomers.unshift({...bin[0]});
          localStorage.setItem("binCustomers", JSON.stringify(binCustomers))
          localStorage.setItem("users", JSON.stringify(users));
        }
      }

      swal({
        title: "Đã được thêm vào thùng rác!",
        icon: "success",
      });
      renderUsersPage();
      dashbroad();
    } else {
      swal("Xác nhận không xóa.");
    }
  });

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

  renderUsersPage();

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

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRegex = /^(0|\+84)\d{9,10}$/;
  var isEmailValid = emailRegex.test(email);
  var isPhoneValid = phoneRegex.test(phone);

  let valueTicketType = null;
  for(let i=0; i<ticketType.length; i++){
      if(ticketType[i].checked === true){
          valueTicketType = ticketType[i].value;
      };
  };

  if(fullName == "" || email == "" || phone == "" || ticketNumber == ""){
    alert("vui lòng không để trống")
  }else if(!isEmailValid){
    alert("Email không hợp lệ")
  }else if(!isPhoneValid){
    alert("Số điện thoại không hợp lệ")
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

  users.push(obj);
  alert("Thêm khách hàng thành công thành công!");
  localStorage.setItem("users", JSON.stringify(users));

  closeBtnnn();

  renderUsersPage();

  dashbroad();
  }
  
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

//Hiển thị phần phản hồi

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
      <p>Time: ${sendMessageCustomer[i].dateTimeMessage}</p>
      <br>
      <button onclick="feedbackMessage()">Feedback</button>
      <br>
    </div>
    `;
  }

  document.getElementById("messageCustomer").innerHTML = element;

  messageContainer.style.display = "inline-flex";

  closeDashboards();

  closeProducts();
}

let feedback = document.getElementById("feedbackMessage");

function feedbackMessage(){

  let element ="";

  element +=
  `
  <span onclick="closeFeedback()" class="material-symbols-outlined">close</span>
  <h2>Phản hồi khách hàng</h2>
  <br>
  <textarea name="" id="" cols="30" rows="10"></textarea>
  <button onclick = "closeFeedback()">Phản hồi</button>
  `

  feedback.innerHTML = element;

  feedback.style.display = "block";
}

function closeFeedback(){
  feedback.style.display = "none";
}


let showProduct = document.getElementById("products");

function closeProducts(){
  showProduct.style.display = "none";
}

//Hiện thị mục Products

function showProducts(){

  let renderProduct = document.getElementById("products");
  
  renderProduct.style.display = "inline-flex";

  closeDashboards();
  closeMessage();
}

//select theo từng thể loại

function renderOption() {
  let element = "";

  let categories = [];

  for (let j = 0; j < products.length; j++) {
      if (categories.indexOf(products[j].category) === -1) {
          categories.push(products[j].category);
      }
  }
  console.log(categories);

  for (let i = 0; i < categories.length; i++) {
      element += `
          <option value="${categories[i]}">${categories[i]} ↓</option>
      `;
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

          <td>
          <button type="button" onclick="fixProductss(${category[j].id})" class="btn btn-primary">Sửa</button>
          <button type="button" onclick="deleteProducts(${category[j].id})" class="btn btn-danger">Xóa</button>
          </td>

      </tr>

      `
  }
  
  document.getElementById("ProductTable").innerHTML = element;

  var table = document.getElementById("ProductTable");
  var rows = table.getElementsByTagName("tr");

  for (var k = 0; k < rows.length; k++) {
      var cell = document.createElement("td");
      cell.textContent = k+1;
      rows[k].insertBefore(cell, rows[k].firstChild);
  }
}

//Phân trang Products
function renderProductsPage(){
  var itemPerPage = 5;
  var currentPage = 1;

  // Lấy danh sách sản phẩm từ localStorage
  var products = JSON.parse(localStorage.getItem("products"));

  //render danh sách dữ liệu trên trang hiện tại
  function renderData(){
      var dataContainer = document.getElementById("ProductTable");
      dataContainer.innerHTML = "";
  
      var starIndex = (currentPage -1) * itemPerPage;
      var endIndex = starIndex + itemPerPage;
  
      var itemsOnpage = products.slice(starIndex,endIndex);
  
      // Tạo các hàng và cột dữ liệu
      for(let i=0; i<itemsOnpage.length; i++){
          var tr = document.createElement("tr");

          // Chèn số thứ tự vào cột đầu tiên
          var indexTd = document.createElement("td");
          indexTd.textContent = i + 1;
          tr.appendChild(indexTd);
  
          // Truy cập và hiển thị giá trị các thuộc tính
          var nameTd = document.createElement("td");
          nameTd.textContent = itemsOnpage[i].name;
          tr.appendChild(nameTd);

          var categoryTd = document.createElement("td");
          categoryTd.textContent = itemsOnpage[i].category;
          tr.appendChild(categoryTd);

          var authorTd = document.createElement("td");
          authorTd.textContent = itemsOnpage[i].author;
          tr.appendChild(authorTd);

          var dateTd = document.createElement("td");
          dateTd.textContent = itemsOnpage[i].date +" <-> "+ itemsOnpage[i].time;
          tr.appendChild(dateTd);
  
          var quantityTd = document.createElement("td");
          quantityTd.textContent = itemsOnpage[i].quantity;
          tr.appendChild(quantityTd);

          var buttonTd = document.createElement("td");
          buttonTd.innerHTML = `<button type="button" onclick="fixProductss(${itemsOnpage[i].id})" class="btn btn-primary">Sửa</button>
          <button type="button" onclick="deleteProducts(${itemsOnpage[i].id})" class="btn btn-danger">Xóa</button>`;
          tr.appendChild(buttonTd);
  
          dataContainer.appendChild(tr);
      }
  }

  //render Phân trang
  function renderPagination(){
      var paginationContainer = document.getElementById("paginationProduct");

      paginationContainer.innerHTML = "";

      var totalPage = Math.ceil(products.length / itemPerPage);

      var ul = document.createElement("ul");
      ul.classList.add("pagination");

      for(let i=1; i<= totalPage; i++){
          var li = document.createElement("li");
          li.textContent = i;
          li.addEventListener("click", function(){
              currentPage = parseInt(this.textContent);
              renderData();
              renderPagination();
          });

          if(i === currentPage){
              li.classList.add("active");
          }

          ul.appendChild(li);
      }
      
      paginationContainer.appendChild(ul);
  }
  
  renderData();
  renderPagination();
  
}
document.addEventListener("DOMContentLoaded", renderProductsPage());

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

// phân trang cho Recent Oder của Dashboard
function renderUsersPage(){
  var itemPerPage = 5;
  var currentPage = 1;

  // Lấy danh sách sản phẩm từ localStorage
  var users = JSON.parse(localStorage.getItem("users"));

  //render danh sách dữ liệu trên trang hiện tại
  function renderData(){
      var dataContainer = document.getElementById("myTable");
      dataContainer.innerHTML = "";
  
      var starIndex = (currentPage -1) * itemPerPage;
      var endIndex = starIndex + itemPerPage;
  
      var itemsOnpage = users.slice(starIndex,endIndex);
  
      // Tạo các hàng và cột dữ liệu
      for(let i=0; i<itemsOnpage.length; i++){
          var tr = document.createElement("tr");

          // Chèn số thứ tự vào cột đầu tiên
          var indexTd = document.createElement("td");
          indexTd.textContent = i + 1;
          tr.appendChild(indexTd);
  
          // Truy cập và hiển thị giá trị các thuộc tính
          var nameTd = document.createElement("td");
          nameTd.textContent = itemsOnpage[i].id;
          tr.appendChild(nameTd);

          var categoryTd = document.createElement("td");
          categoryTd.textContent = itemsOnpage[i].fullName;
          tr.appendChild(categoryTd);

          var authorTd = document.createElement("td");
          authorTd.textContent = itemsOnpage[i].chooseTicketName;
          tr.appendChild(authorTd);

          var dateTd = document.createElement("td");
          dateTd.textContent = itemsOnpage[i].ticketNumber;
          tr.appendChild(dateTd);
  
          var quantityTd = document.createElement("td");
          quantityTd.textContent = itemsOnpage[i].ticketType;
          tr.appendChild(quantityTd);

          var buttonTd = document.createElement("td");
          buttonTd.innerHTML = `<button type="button" onclick="fix(${users[i].id})" class="btn btn-primary">Sửa</button>
          <button type="button" onclick="deleteCustomer(${users[i].id})" class="btn btn-danger">Xóa</button>
          <button type="button" onclick="information(${users[i].id})" class="btn btn-infor">Chi tiết</button>`;
          tr.appendChild(buttonTd);
  
          dataContainer.appendChild(tr);
      }
  }

  //render Phân trang
  function renderPagination(){
      var paginationContainer = document.getElementById("pagination");

      paginationContainer.innerHTML = "";

      var totalPage = Math.ceil(products.length / itemPerPage);

      var ul = document.createElement("ul");
      ul.classList.add("pagination");

      for(let i=1; i<= totalPage; i++){
          var li = document.createElement("li");
          li.textContent = i;
          li.addEventListener("click", function(){
              currentPage = parseInt(this.textContent);
              renderData();
              renderPagination();
          });

          if(i === currentPage){
              li.classList.add("active");
          }

          ul.appendChild(li);
      }
      
      paginationContainer.appendChild(ul);
  }
  
  renderData();
  renderPagination();
  
}
document.addEventListener("DOMContentLoaded", renderUsersPage());


// Chỉnh sửa thông tin sản phẩm

// Xóa thông tin sản phẩm

function deleteProducts(id){

  swal({
    title: "Bạn có muốn xóa sản phẩm này? ",
    text: "Dữ liệu sẽ được xóa vĩnh viễn.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      // Xóa môn khỏi mảng
      for(let i=0; i<products.length; i++){
        if(id == products[i].id){
          products.splice(i,1);
          localStorage.setItem("products", JSON.stringify(products));
        }
      }
      
      swal({
        title: "Dữ liệu đã được xóa!",
        icon: "success",
      });
      
      renderProductsPage();
    } else {
      swal("Xác nhận không xóa.");
    }
  });
  
}

//Thêm sản phẩm

var addProducts = document.getElementById("addProducts");

function showAddProducts(){
  let element = "";

      element +=
        `
      <span onclick="closeAddProduct()" class="material-symbols-outlined">close</span>
      <h2>Thêm Vé</h2>
      <div class="nameAndAddress" style="margin-bottom: 10px;">
          <input id="productDate" type="date" placeholder="Date" value="">
          <input id="productTime" type="text" placeholder="Time" value="">
      </div>
      <input id="productName" placeholder = "Name" class="phoneNumber" type="text" style="margin-bottom: 10px;" value="">
      <h4 style="margin-bottom: 10px;">Category and Author</h4>
      <div class="nameAndAddress" style="margin-bottom: 10px;">
          <input id="productCategory" type="text" placeholder="Category" value="">
          <input id="productAuthor" type="text" placeholder="Author" value="">
      </div>
      <input id="productNumber" class="numberTicket" type="number" placeholder="Number of Ticket" style="margin-bottom: 10px;" value="">
      <button onclick="confirmProductss()">Xác nhận</button>
      `;

  addProducts.innerHTML = element;

  addProducts.style.display = "block";
}

function closeAddProduct(){
  addProducts.style.display = "none";
}

function confirmProductss(){

  let productDate = document.getElementById("productDate").value;
  let productTime = document.getElementById("productTime").value;
  let productName = document.getElementById("productName").value;
  let productCategory = document.getElementById("productCategory").value;
  let productAuthor = document.getElementById("productAuthor").value;
  let productNumber = document.getElementById("productNumber").value;

  if(productDate =="" || productTime =="" || productName =="" || productCategory == "" || productAuthor =="" || productNumber ==""){
    alert("vui lòng không để trống")
  }else{
    let obj = {
        id: Math.floor(Math.random() * 1000000000),
        date: productDate,
        time: productTime,
        name: productName,
        category: productCategory,
        author: productAuthor,
        quantity: productNumber,
      }

  products.push(obj);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Thêm thành công");

  closeAddProduct()

  renderProductsPage();
  }

}

// Sửa thông tin sản phẩm

let fixProducts = document.getElementById("fixProducts");

function fixProductss(id) {
  let element = "";

  for (let i = 0; i < products.length; i++) {
    if (id == products[i].id) {

      element +=
        `
      <span onclick="closeFixProducts()" class="material-symbols-outlined">close</span>
      <h2>Chỉnh sửa thông tin sản phẩm</h2>
      <div class="nameAndAddress" style="margin-bottom: 10px;">
          <input id="productDate" type="text" placeholder="Date" value="${products[i].date}">
          <input id="productTime" type="text" placeholder="Time" value="${products[i].time}">
      </div>
      <input id="productName" class="phoneNumber" type="text" style="margin-bottom: 10px;" value="${products[i].name}">
      <h4 style="margin-bottom: 10px;">Category and Author</h4>
      <div class="nameAndAddress" style="margin-bottom: 10px;">
          <input id="productCategory" type="text" placeholder="Date" value="${products[i].category}">
          <input id="productAuthor" type="text" placeholder="Time" value="${products[i].author}">
      </div>
      <input id="productNumber" class="numberTicket" type="number" placeholder="Number of Ticket" style="margin-bottom: 10px;" value="${products[i].quantity}">
      <button onclick="confirmProducts(${products[i].id})">Xác nhận</button>
      `;
    }
  }

  fixProducts.innerHTML = element;

  closeAddProduct();
  
  fixProducts.style.display = "block";

}

function confirmProducts(id){

  let productDate = document.getElementById("productDate").value;
  let productTime = document.getElementById("productTime").value;
  let productName = document.getElementById("productName").value;
  let productCategory = document.getElementById("productCategory").value;
  let productAuthor = document.getElementById("productAuthor").value;
  let productNumber = document.getElementById("productNumber").value;

  for (let i = 0; i < users.length; i++) {
    if (id == products[i].id) {

      let obj = {
        id: Math.floor(Math.random() * 1000000000),
        date: productDate,
        time: productTime,
        name: productName,
        category: productCategory,
        author: productAuthor,
        quantity: productNumber,
      }

      products.splice(i, 1, obj);
      localStorage.setItem("products", JSON.stringify(products));

      break;
    }
  }

  alert("Thay đổi thành công");

  renderProductsPage();

  closeFixProducts();

}

function closeFixProducts(){
  fixProducts.style.display = "none";
}

//Thùng rác Customers

let binCustomers = JSON.parse(localStorage.getItem("binCustomers")) || [];

//Ẩn hiện thùng rác
function addBinCustomers() {
  document.getElementById("overlay").style.display = "flex";

  renderUsersPageBin();
}

function hideOverlay() {
  document.getElementById("overlay").style.display = "none";
}

//Render BinCustomer

function renderUsersPageBin(){
  var itemPerPage = 5;
  var currentPage = 1;

  // Lấy danh sách sản phẩm từ localStorage
  var binCustomers = JSON.parse(localStorage.getItem("binCustomers"));

  //render danh sách dữ liệu trên trang hiện tại
  function renderData(){
      var dataContainer = document.getElementById("binTableCustomers");
      dataContainer.innerHTML = "";
  
      var starIndex = (currentPage -1) * itemPerPage;
      var endIndex = starIndex + itemPerPage;
  
      var itemsOnpage = binCustomers.slice(starIndex,endIndex);
  
      // Tạo các hàng và cột dữ liệu
      for(let i=0; i<itemsOnpage.length; i++){
          var tr = document.createElement("tr");

          // Chèn số thứ tự vào cột đầu tiên
          var indexTd = document.createElement("td");
          indexTd.textContent = i + 1;
          tr.appendChild(indexTd);
  
          // Truy cập và hiển thị giá trị các thuộc tính
          var nameTd = document.createElement("td");
          nameTd.textContent = itemsOnpage[i].id;
          tr.appendChild(nameTd);

          var categoryTd = document.createElement("td");
          categoryTd.textContent = itemsOnpage[i].fullName;
          tr.appendChild(categoryTd);

          var authorTd = document.createElement("td");
          authorTd.textContent = itemsOnpage[i].chooseTicketName;
          tr.appendChild(authorTd);

          var dateTd = document.createElement("td");
          dateTd.textContent = itemsOnpage[i].ticketNumber;
          tr.appendChild(dateTd);
  
          var quantityTd = document.createElement("td");
          quantityTd.textContent = itemsOnpage[i].ticketType;
          tr.appendChild(quantityTd);

          var buttonTd = document.createElement("td");
          buttonTd.innerHTML = `<button type="button" onclick="undo(${itemsOnpage[i].id})" class="btn btn-primary">Hoàn tác</button>`;
          tr.appendChild(buttonTd);
  
          dataContainer.appendChild(tr);
      }
  }

  //render Phân trang
  function renderPagination(){
      var paginationContainer = document.getElementById("paginationBinCustomers");

      paginationContainer.innerHTML = "";

      var totalPage = Math.ceil(products.length / itemPerPage);

      var ul = document.createElement("ul");
      ul.classList.add("pagination");

      for(let i=1; i<= totalPage; i++){
          var li = document.createElement("li");
          li.textContent = i;
          li.addEventListener("click", function(){
              currentPage = parseInt(this.textContent);
              renderData();
              renderPagination();
          });

          if(i === currentPage){
              li.classList.add("active");
          }

          ul.appendChild(li);
      }
      
      paginationContainer.appendChild(ul);
  }
  
  renderData();
  renderPagination();
  
}
document.addEventListener("DOMContentLoaded", renderUsersPageBin());

function undo(id){
  for(let i=0;i<binCustomers.length;i++){
    if(id == binCustomers[i].id){
      let bin = binCustomers.splice(i,1);
      users.unshift({...bin[0]});
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("binCustomers", JSON.stringify(binCustomers));
    }
  }

  renderUsersPageBin();

  renderUsersPage();
}