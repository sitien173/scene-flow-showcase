# Bài học

## Hiệu quả
- Review layout từ frame rồi sửa ở lượt 2 bắt được phần lớn lỗi chồng chữ.
- Dùng Vibi TTS cho bản TikTok 9:16.

## Tránh
- Tạo giọng dài trong một lần chạy trên Colab. Lý do: Colab có thể ngắt giữa chừng.
- Tự vẽ hoặc mô phỏng logo AWS. Chỉ dùng logo chính thức.
- Đặt bản đồ đè lên phụ đề hoặc để nhãn chồng nhau. Lý do: lượt review đầu phát hiện các lỗi này.

## Gợi ý cho agent lần sau
- Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- Kiểm tra ASR khớp từ 90% trở lên. Nếu model small chưa đạt, chạy lại bằng model medium.
- Kiểm tra câu tiếng Anh ngắn như end card sau ASR. Nếu ASR bỏ sót, đặt từ bằng tay theo khoảng lặng.
- Giữ ít thành phần trong mỗi cảnh trên khung dọc. Lý do: cỡ chữ tối thiểu và vùng an toàn giới hạn sơ đồ.
- Thêm Hoàng Sa và Trường Sa khi vẽ bản đồ Việt Nam.
- Dùng tên kênh "Góc nhìn DEV" ở outro.
