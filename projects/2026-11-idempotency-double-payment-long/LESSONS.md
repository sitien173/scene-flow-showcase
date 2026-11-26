# Bài học

## Hiệu quả
- Dựng từng chương theo mẫu bản dài tập Flash Sale.
- Dùng lại bộ icon AWS chính thức từ tập trước, bổ sung icon thiếu từ cùng bộ.

## Tránh
- Tạo giọng dài trong một lần chạy trên Colab. Lý do: Colab có thể ngắt giữa chừng.
- Tự vẽ hoặc mô phỏng logo AWS. Chỉ dùng logo chính thức.
- Viết nhãn trạng thái `COMPLETE`. Lý do: giá trị thật trong `STATUS_CONSTANTS` của Powertools là `INPROGRESS` và `COMPLETED`.

## Gợi ý cho agent lần sau
- Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- Kiểm tra ASR khớp từ 90% trở lên. Nếu model small chưa đạt, chạy lại bằng model medium.
- Kiểm tra câu tiếng Anh ngắn như end card sau ASR. Nếu ASR bỏ sót, đặt từ bằng tay theo khoảng lặng.
- Thêm vòng lặp tự khởi động lại server và chạy tiếp từ cache khi tạo giọng dài trên Colab.
- Ghi lại từ đặt bằng tay vào FEEDBACK. Lý do: chạy lại asr.py sẽ xóa chúng.
