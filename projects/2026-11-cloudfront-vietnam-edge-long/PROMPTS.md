# Prompt đã dùng

## Ý tưởng ban đầu

Bản YouTube 16:9 của tập EP02: "Tại sao người ở Việt Nam truy cập website Mỹ vẫn có thể tải trang nhanh?". Video giải thích khoảng cách mạng, độ trễ, Amazon CloudFront, Edge Location tại Hà Nội và TP.HCM, Cache Hit và Cache Miss. Video chia thành nhiều chương, bắt đầu từ "The Distance Problem".

## Các bước chính và prompt tiêu biểu

1. Dán brief EP02 gồm cả kịch bản TikTok và YouTube, rồi chọn làm cả hai bản.
   > "1. Both 2. Replace with channel name 3. Vieneu-TTS 4. decide for me 5. ok"
2. Giao toàn bộ pipeline cho agent.
   > "hãy quyết định mọi thứ và chạy toàn bộ pipeline workflows, không dừng lại hỏi tôi với bất kỳ quyết định nào"
3. Giọng VieNeu-TTS chạy trên Colab, sau đó ASR, căn thời gian, dựng cảnh theo từng chương, kiểm tra, chụp snapshot, render.

## Những lần sửa quan trọng

- Giọng YouTube dùng VieNeu-TTS thay cho Vibi, theo quyết định của tác giả.
- Outro dùng tên kênh "Góc nhìn DEV" thay cho "AWS: Behind the Cloud".
- Bản đồ có thêm cụm Hoàng Sa và Trường Sa.
- Hashtag là bộ cố định của kênh cộng thêm #cloudfront #cdn.

## Bài học

- Colab có thể ngắt giữa chừng khi tạo giọng dài. Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- ASR cần khớp từ 90% trở lên. Nếu model small chưa đạt thì chạy lại bằng model medium. Câu tiếng Anh ngắn như end card có thể bị ASR bỏ sót, khi đó đặt từ bằng tay theo khoảng lặng.
- Chỉ dùng logo chính thức của AWS. Không tự vẽ hay mô phỏng logo.
- Video dài nên dựng theo từng chương rồi ghép lại, để mỗi phần kiểm tra được riêng.
