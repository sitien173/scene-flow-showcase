# Bài học

## Hiệu quả
- Dựng từng chương theo mẫu của một bản dài đã hoàn thành. Lý do: giữ phong cách thống nhất giữa các tập.
- Chạy lại ASR bằng model medium nâng tỉ lệ khớp từ 89,8% lên 94,1%.

## Tránh
- Tạo giọng dài trong một lần chạy trên Colab. Lý do: Colab có thể ngắt giữa chừng.
- Tự vẽ hoặc mô phỏng logo AWS. Chỉ dùng logo chính thức.
- Tạo cả giọng dài trong một lần. Lý do: lỗi `IncompleteRead` và Colab ngắt sau khoảng 10 phút.

## Gợi ý cho agent lần sau
- Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- Kiểm tra ASR khớp từ 90% trở lên. Nếu model small chưa đạt, chạy lại bằng model medium.
- Kiểm tra câu tiếng Anh ngắn như end card sau ASR. Nếu ASR bỏ sót, đặt từ bằng tay theo khoảng lặng.
- Tạo giọng theo từng chương với vòng lặp kiểm tra và khởi động lại server.
