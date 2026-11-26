# Prompt đã dùng

## Ý tưởng ban đầu

Tập EP03: "Làm thế nào AWS ngăn hàng nghìn bot tấn công website?". Video mở bằng cảnh website mở bán vé concert bị hàng nghìn bot gửi request. Kiến trúc gồm Route 53, Shield, CloudFront, WAF với Bot Control, Rate-based Rules và Anti-DDoS Managed Rule Group, ALB, backend và CloudWatch.

## Các bước chính và prompt tiêu biểu

1. Dán kế hoạch sản xuất EP03, rồi chọn làm cả hai bản, đặt slug `waf-bot-protection`.
2. Viết kịch bản.
   > "next"
3. Bỏ qua fact-check.
   > "not needed"
4. Giao toàn bộ pipeline cho agent.
   > "hãy quyết định mọi thứ và chạy toàn bộ pipeline workflows, không dừng lại hỏi tôi với bất kỳ quyết định nào"

## Những lần sửa quan trọng

- Bản dựng đầu tiên dùng nhãn chữ cho Shield và WAF. Sau đó các icon chính thức được tải về và cảnh được dựng lại.
- Kịch bản ban đầu chỉ khai báo cảnh cho 5 câu đầu, làm bước căn thời gian lỗi. Danh sách cảnh được bổ sung đủ.

## Bài học

- Colab có thể ngắt giữa chừng khi tạo giọng dài. Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- ASR cần khớp từ 90% trở lên. Nếu model small chưa đạt thì chạy lại bằng model medium. Câu tiếng Anh ngắn như end card có thể bị ASR bỏ sót, khi đó đặt từ bằng tay theo khoảng lặng.
- Chỉ dùng logo chính thức của AWS. Không tự vẽ hay mô phỏng logo.
