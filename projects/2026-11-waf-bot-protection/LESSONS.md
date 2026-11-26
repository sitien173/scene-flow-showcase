# Bài học

## Hiệu quả
- Tải icon chính thức cho Shield và WAF rồi dựng lại cảnh thay cho nhãn chữ.

## Tránh
- Tạo giọng dài trong một lần chạy trên Colab. Lý do: Colab có thể ngắt giữa chừng.
- Tự vẽ hoặc mô phỏng logo AWS. Chỉ dùng logo chính thức.
- Chỉ khai báo cảnh cho vài câu đầu trong kịch bản. Lý do: bước căn thời gian bị lỗi.

## Gợi ý cho agent lần sau
- Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- Kiểm tra ASR khớp từ 90% trở lên. Nếu model small chưa đạt, chạy lại bằng model medium.
- Kiểm tra câu tiếng Anh ngắn như end card sau ASR. Nếu ASR bỏ sót, đặt từ bằng tay theo khoảng lặng.
- Kiểm tra kịch bản có khai báo cảnh cho mọi câu trước khi căn thời gian.
