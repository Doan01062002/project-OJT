// Lấy tất cả các phần tử menu
const menuItems = Array.from(document.querySelectorAll('.click-scroll'));

// Lặp qua từng phần tử menu và gắn xử lý sự kiện click
menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định khi nhấp chuột vào liên kết

    const targetId = menuItem.getAttribute('href'); // Lấy ID của phần cần cuộn đến
    const targetSection = document.querySelector(targetId); // Lấy phần cần cuộn đến

    // Nếu phần tử được tìm thấy, thực hiện cuộn mượt đến phần tử đó
    if (targetSection) {
      const offset = targetSection.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  });
});

// Xử lý sự kiện cuộn trang
window.addEventListener('scroll', () => {
  const sections = Array.from(document.querySelectorAll('section')); // Lấy tất cả các phần tử section
  const scrollPosition = window.scrollY; // Vị trí cuộn hiện tại của trang

  // Lặp qua từng phần tử section và kiểm tra vị trí cuộn
  sections.forEach((section) => {
    const sectionId = `#${section.id}`;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // Kiểm tra nếu vị trí cuộn thuộc phần tử section hiện tại
    if (
      scrollPosition >= sectionTop - 83 &&
      scrollPosition < sectionTop + sectionHeight - 83
    ) {
      // Loại bỏ lớp active khỏi tất cả các liên kết menu
      menuItems.forEach((menuItem) => {
        menuItem.classList.remove('active');
      });

      // Thêm lớp active vào liên kết menu tương ứng với phần tử section hiện tại
      const activeMenuItem = document.querySelector(`a[href="${sectionId}"]`);
      if (activeMenuItem) {
        activeMenuItem.classList.add('active');
      }
    }
  });
});