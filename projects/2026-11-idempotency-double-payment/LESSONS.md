# Bài học

## Hiệu quả
- Lấy nhãn kỹ thuật trên màn hình từ đúng giá trị trong mã nguồn, dù lời đọc nói tự nhiên hơn.

## Tránh
- Tạo giọng dài trong một lần chạy trên Colab. Lý do: Colab có thể ngắt giữa chừng.
- Tự vẽ hoặc mô phỏng logo AWS. Chỉ dùng logo chính thức.
- Để end card trống hoặc phụ đề bị cắt. Lý do: bản đầu gặp các lỗi này ở end card, giây 71,6 và giây 79.

## Gợi ý cho agent lần sau
- Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- Kiểm tra ASR khớp từ 90% trở lên. Nếu model small chưa đạt, chạy lại bằng model medium.
- Kiểm tra câu tiếng Anh ngắn như end card sau ASR. Nếu ASR bỏ sót, đặt từ bằng tay theo khoảng lặng.
- Ghi lại từ đặt bằng tay vào FEEDBACK. Lý do: chạy lại asr.py sẽ xóa chúng.
