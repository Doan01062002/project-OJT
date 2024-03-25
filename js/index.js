let sendMessageCustomer = JSON.parse(localStorage.getItem("sendMessageCustomer")) || [];

let contactName = document.getElementById("contact-name").value;
let contactEmail = document.getElementById("contact-email").value;
let contactPhone = document.getElementById("contact-phone").value;
let contactMessage = document.getElementById("contact-message").value;

function sendMessage(){
    
    let obj = {
        id: Math.floor(Math.random() * 1000000000000),
        contactName:`${contactName}`,
        contactEmail:`${contactEmail}`,
        contactPhone:`${contactPhone}`,
        contactMessage:`${contactMessage}`,
    }

    sendMessageCustomer.push(obj);
    localStorage.setItem("sendMessageCustomer", JSON.stringify(sendMessageCustomer));

    document.getElementById("contact-name").value = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-phone").value = "";
    document.getElementById("contact-message").value = "";


    alert("Phản hồi đã được gửi thành công");
}

//