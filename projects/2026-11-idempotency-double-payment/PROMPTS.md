# Prompt đã dùng

## Ý tưởng ban đầu

Tập EP04: "Bấm thanh toán hai lần, tại sao không bị trừ tiền hai lần?". Video mở bằng cảnh một người thanh toán hai mươi triệu đồng, màn hình loading mãi nên bấm lại lần nữa. Sau đó video giải thích idempotency và cách lưu trạng thái request bằng DynamoDB.

## Các bước chính và prompt tiêu biểu

1. Dán brief EP04 gồm kịch bản TikTok và YouTube, tài nguyên, kiến trúc, ghi chú về độ chính xác, caption và tài liệu tham khảo.
2. Giao toàn bộ pipeline cho agent và bỏ qua fact-check.
   > "hãy quyết định mọi thứ và chạy toàn bộ pipeline workflows, không dừng lại hỏi tôi với bất kỳ quyết định nào. Bỏ qua fact check"
3. Giọng Vibi TTS, ASR, căn thời gian, dựng cảnh cleanui 9:16, kiểm tra, render, viết caption.

## Những lần sửa quan trọng

- Nhãn trạng thái DynamoDB hiện `INPROGRESS` và `COMPLETED`, không dùng `COMPLETE`, vì đây là giá trị thật trong `STATUS_CONSTANTS` của Powertools.
- Câu end card tiếng Anh bị ASR bỏ sót, nên 7 từ được đặt bằng tay theo khoảng lặng.
- End card ban đầu bị trống, phụ đề bị cắt ở giây 71,6 và số "1" không hiện ở giây 79. Các lỗi này đã được sửa.

## Bài học

- Colab có thể ngắt giữa chừng khi tạo giọng dài. Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- ASR cần khớp từ 90% trở lên. Nếu model small chưa đạt thì chạy lại bằng model medium. Câu tiếng Anh ngắn như end card có thể bị ASR bỏ sót, khi đó đặt từ bằng tay theo khoảng lặng.
- Chỉ dùng logo chính thức của AWS. Không tự vẽ hay mô phỏng logo.
- Nhãn kỹ thuật trên màn hình nên lấy đúng giá trị trong mã nguồn, dù lời đọc có thể nói tự nhiên hơn.
