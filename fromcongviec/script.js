// Lấy các phần tử cần thiết từ HTML
const taskForm = document.getElementById('taskForm');
const taskName = document.getElementById('taskName');
const taskDescription = document.getElementById('taskDescription');
const taskDeadline = document.getElementById('taskDeadline');
const taskStatus = document.getElementById('taskStatus');
const tasksTable = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];

// Lấy danh sách công việc từ LocalStorage (nếu có)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Hàm hiển thị công việc lên bảng
function displayTasks() {
    tasksTable.innerHTML = ''; // Xóa bảng hiện tại
    tasks.forEach((task, index) => {
        const row = tasksTable.insertRow();
        const statusClass = getStatusClass(task.status);
        const taskDate = new Date(task.createdAt).toLocaleString(); // Hiển thị ngày giờ

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td>${taskDate}</td>
            <td class="status"><span class="${statusClass}">${task.status}</span></td>
            <td>
                <button class="edit-button" onclick="editStatus(${index})">Sửa</button>
                <button class="delete-button" onclick="deleteTask(${index})">Xóa</button>
            </td>
        `;
    });
}

// Hàm lấy lớp CSS tương ứng với trạng thái công việc
function getStatusClass(status) {
    switch (status) {
        case 'Chưa bắt đầu':
            return 'chua-bat-dau';
        case 'Đang thực hiện':
            return 'dang-thuc-hien';
        case 'Hoàn thành':
            return 'hoan-thanh';
        case 'Chờ duyệt':
            return 'cho-duyet';
        case 'Đã hủy':
            return 'da-huy';
        case 'Đang xem xét':
            return 'dang-xem-xet';
        default:
            return '';
    }
}

// Hàm lưu công việc vào LocalStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Xử lý sự kiện khi form được gửi
taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngừng gửi form theo mặc định

    // Lấy thời gian hiện tại khi công việc được thêm vào
    const createdAt = new Date().toISOString();

    // Tạo đối tượng công việc mới
    const newTask = {
        name: taskName.value,
        description: taskDescription.value,
        deadline: taskDeadline.value,
        status: taskStatus.value,
        createdAt: createdAt
    };

    // Thêm công việc vào danh sách
    tasks.push(newTask);

    // Lưu lại vào LocalStorage
    saveTasks();

    // Hiển thị lại bảng công việc
    displayTasks();

    // Xóa dữ liệu trong form
    taskForm.reset();
});

// Hàm chỉnh sửa trạng thái công việc
function editStatus(index) {
    const newStatus = prompt('Nhập trạng thái mới:', tasks[index].status);
    if (newStatus) {
        tasks[index].status = newStatus; // Cập nhật trạng thái
        saveTasks(); // Lưu lại vào LocalStorage
        displayTasks(); // Hiển thị lại bảng công việc
    }
}

// Hàm xóa công việc
function deleteTask(index) {
    if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
        tasks.splice(index, 1); // Xóa công việc khỏi danh sách
        saveTasks(); // Lưu lại vào LocalStorage
        displayTasks(); // Hiển thị lại bảng công việc
    }
}

// Hiển thị công việc khi trang được tải
displayTasks();
