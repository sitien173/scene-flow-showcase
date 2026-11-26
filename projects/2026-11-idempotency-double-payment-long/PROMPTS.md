# Prompt đã dùng

## Ý tưởng ban đầu

Bản YouTube 16:9 khoảng 11 đến 12 phút của EP04: "Bấm thanh toán hai lần, tại sao không bị trừ tiền hai lần?". Video chia 12 chương, đi từ vấn đề thanh toán trùng đến idempotency key, lưu trạng thái trong DynamoDB và cách backend kiểm tra nội dung request.

## Các bước chính và prompt tiêu biểu

1. Dán brief EP04 gồm cả kịch bản TikTok và YouTube.
2. Giao toàn bộ pipeline cho agent và bỏ qua fact-check.
   > "hãy quyết định mọi thứ và chạy toàn bộ pipeline workflows, không dừng lại hỏi tôi với bất kỳ quyết định nào. Bỏ qua fact check"
3. Giọng VieNeu-TTS giọng Hải Đăng trên Colab, ASR, căn thời gian, dựng cảnh theo từng chương, theo mẫu của bản dài tập Flash Sale, kiểm tra, render.

## Những lần sửa quan trọng

- Nhãn trạng thái DynamoDB hiện `INPROGRESS` và `COMPLETED`, không dùng `COMPLETE`, vì đây là giá trị thật trong `STATUS_CONSTANTS` của Powertools.
- Câu 66 "Ngoài ra, backend cần xác thực nội dung request." bị ASR bỏ sót, nên 9 từ được đặt bằng tay theo khoảng lặng.
- Logo AWS dùng lại bộ icon chính thức từ tập trước, bổ sung các icon còn thiếu từ cùng bộ.

## Bài học

- Colab có thể ngắt giữa chừng khi tạo giọng dài. Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- ASR cần khớp từ 90% trở lên. Nếu model small chưa đạt thì chạy lại bằng model medium. Câu tiếng Anh ngắn như end card có thể bị ASR bỏ sót, khi đó đặt từ bằng tay theo khoảng lặng.
- Chỉ dùng logo chính thức của AWS. Không tự vẽ hay mô phỏng logo.
- Tạo giọng dài trên Colab cần vòng lặp tự khởi động lại server và chạy tiếp từ cache.
