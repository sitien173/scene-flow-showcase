# Prompt đã dùng

## Ý tưởng ban đầu

Bản YouTube 16:9 dài 11 đến 13 phút của EP03: "Làm thế nào AWS ngăn hàng nghìn bot tấn công website?". Video chia 11 chương, bắt đầu từ "The Attack Begins", rồi đi qua Route 53, Shield, CloudFront, WAF với Bot Control, Rate-based Rules và Anti-DDoS Managed Rule Group, ALB, backend và CloudWatch.

## Các bước chính và prompt tiêu biểu

1. Dán kế hoạch sản xuất EP03, chọn làm cả hai bản.
2. Bỏ qua fact-check và giao toàn bộ pipeline cho agent.
   > "hãy quyết định mọi thứ và chạy toàn bộ pipeline workflows, không dừng lại hỏi tôi với bất kỳ quyết định nào"
3. Tạo giọng VieNeu-TTS theo từng chương trên Colab, ASR, căn thời gian, rồi dựng từng chương.
   > "Resume at step (a): read the sibling ch01 files fully (scenes.html, timeline.js, cues.json) and STORYBOARD.md rows c1a-c1d, then write ... ch01.scenes.html, ch01.timeline.js, ch01.cues.json using only allowed assets, then continue chapters 02-11 ..."

## Những lần sửa quan trọng

- Tạo giọng bị lỗi `IncompleteRead` và Colab ngắt sau khoảng 10 phút. Giọng được tạo theo từng chương với vòng lặp kiểm tra và khởi động lại server. Cả 11 chương đều hoàn tất.
- ASR model small chỉ khớp 89,8%, dưới ngưỡng 90%. Chạy lại bằng model medium đạt 94,1%.

## Bài học

- Colab có thể ngắt giữa chừng khi tạo giọng dài. Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- ASR cần khớp từ 90% trở lên. Nếu model small chưa đạt thì chạy lại bằng model medium. Câu tiếng Anh ngắn như end card có thể bị ASR bỏ sót, khi đó đặt từ bằng tay theo khoảng lặng.
- Chỉ dùng logo chính thức của AWS. Không tự vẽ hay mô phỏng logo.
- Dựng từng chương theo mẫu của một bản dài đã hoàn thành giúp giữ phong cách thống nhất giữa các tập.
