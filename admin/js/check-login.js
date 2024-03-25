// Element của trang 
const formLogin = document.getElementById("formLogin");
const emailElement = document.getElementById("login-email");
const passwordElement = document.getElementById("login-pass");

formLogin.addEventListener("submit", function(e){
    //ngăn chặn load lại trang
    e.preventDefault();

    //validate dữ liệu đầu vào

    //lấy dữ liệu từ local
    const accountAdmin = JSON.parse(localStorage.getItem("accountAdmin"));


    //tìm kiếm email và mật khẩu trên local
    const findAdmin = accountAdmin.find((admin) => admin.email === emailElement.value && admin.password === passwordElement.value);

    if(!findAdmin){
        alert("Email hoặc mật khẩu không chính xác");
    }else{
        setTimeout(function(){
            window.location.href = "admin.html";
        }, 1000)
    }
    //nếu có đăng nhập thành công trở về trang admin

});

//lưu tài khoản của admin lên local

// const accountAdmin = [
//     admin = {
//         email: "doanmit01062002@gmail.com",
//         password: "01062002",
//     },
// ];

// localStorage.setItem("accountAdmin", JSON.stringify(accountAdmin));