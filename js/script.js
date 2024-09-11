    document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // รับค่าจากฟอร์ม
    const userId = document.getElementById("userid").value;
    const name = document.getElementById("name").value;
    const birthday = document.getElementById("birthday").value;

    // โหลดข้อมูลผู้ใช้ที่มีอยู่จาก localStorage หรือสร้าง array ว่างหากยังไม่มีข้อมูล
    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];

    // ตรวจสอบว่ามี userId นี้อยู่แล้วหรือไม่
    const existingUserIndex = users.findIndex(user => user.userid === userId);

    if (existingUserIndex !== -1) {
        // ถ้ามี userId อยู่แล้ว ทำการอัพเดตข้อมูล
        users[existingUserIndex] = { userid: userId, name: name, birthday: birthday };
        document.getElementById("message").textContent = "User ID exists, data updated!";
    } else {
        // ถ้าไม่มี userId เพิ่มข้อมูลใหม่
        users.push({ userid: userId, name: name, birthday: birthday });
        document.getElementById("message").textContent = "New user added!";
    }

    // บันทึกข้อมูลลง localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // สร้างไฟล์ JSON ให้ดาวน์โหลด
    const userJson = JSON.stringify(users, null, 2);
    const blob = new Blob([userJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // สร้างลิงค์สำหรับดาวน์โหลดไฟล์
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_data.json";
    a.textContent = "Download JSON File";
    document.body.appendChild(a);
});

document.getElementById("showData").addEventListener("click", function () {
    // โหลดข้อมูลผู้ใช้จาก localStorage
    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];

    // ล้างข้อมูลในตารางก่อนแสดงข้อมูลใหม่
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    // แสดงข้อมูลในตาราง
    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${user.userid}</td><td>${user.name}</td><td>${user.birthday}</td>`;
        tableBody.appendChild(row);
    });
});
