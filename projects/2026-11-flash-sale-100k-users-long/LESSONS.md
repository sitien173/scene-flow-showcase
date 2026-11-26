# Bài học

## Hiệu quả
- Lấy logo AWS từ bộ AWS Architecture Icons chính thức.
- Để VieNeu-TTS đọc thuật ngữ tiếng Anh như viết, không cần bảng phiên âm.

## Tránh
- Tạo giọng dài trong một lần chạy trên Colab. Lý do: Colab có thể ngắt giữa chừng.
- Tự vẽ hoặc mô phỏng logo AWS. Chỉ dùng logo chính thức.

## Gợi ý cho agent lần sau
- Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- Kiểm tra ASR khớp từ 90% trở lên. Nếu model small chưa đạt, chạy lại bằng model medium.
- Kiểm tra câu tiếng Anh ngắn như end card sau ASR. Nếu ASR bỏ sót, đặt từ bằng tay theo khoảng lặng.
- Dùng trình duyệt để lấy link tải bộ icon AWS. Lý do: trang tải dựng link bằng JavaScript.
