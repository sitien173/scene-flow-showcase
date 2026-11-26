# Prompt đã dùng

## Ý tưởng ban đầu

Tập EP02 của kênh, với câu hỏi mở đầu: "Tại sao người ở Việt Nam truy cập website Mỹ vẫn có thể tải trang nhanh?". Brief do tác giả dán vào gồm kịch bản TikTok 9:16 dài khoảng 1:50 đến 2:00 và kịch bản YouTube 16:9. Nội dung nói về Amazon CloudFront, CDN, Edge Location tại Hà Nội và TP.HCM, Cache Hit và Cache Miss.

## Các bước chính và prompt tiêu biểu

1. Dán brief, rồi trả lời các câu hỏi thiết lập: làm cả hai phiên bản, thay "AWS: Behind the Cloud" bằng tên kênh, chọn bộ hashtag.
   > "1. Both 2. Replace with channel name 3. Vieneu-TTS 4. decide for me 5. ok"
2. Giao toàn bộ pipeline cho agent: kịch bản, giọng, căn thời gian, storyboard, dựng cảnh, kiểm tra, render.
   > "hãy quyết định mọi thứ và chạy toàn bộ pipeline workflows, không dừng lại hỏi tôi với bất kỳ quyết định nào"
3. Giọng TikTok dùng Vibi TTS. Theme cleanui.
4. Duyệt frame bản v2, render, rồi viết caption.

## Những lần sửa quan trọng

- Lần review layout đầu tiên phát hiện bản đồ đè lên phụ đề, nhãn CACHE MISS chồng nhau, cảnh ở giây 80 bị chồng chữ, thiếu nhãn. Bản đồ Việt Nam được bổ sung Hoàng Sa và Trường Sa. Phần lớn lỗi được sửa ở lượt 2.
- Outro dùng tên kênh "Góc nhìn DEV" thay cho "AWS: Behind the Cloud", theo quyết định của tác giả.
- Hashtag là bộ cố định của kênh cộng thêm #cloudfront #cdn.

## Bài học

- Colab có thể ngắt giữa chừng khi tạo giọng dài. Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- ASR cần khớp từ 90% trở lên. Nếu model small chưa đạt thì chạy lại bằng model medium. Câu tiếng Anh ngắn như end card có thể bị ASR bỏ sót, khi đó đặt từ bằng tay theo khoảng lặng.
- Chỉ dùng logo chính thức của AWS. Không tự vẽ hay mô phỏng logo.
- Sơ đồ trên khung dọc bị giới hạn bởi cỡ chữ tối thiểu và vùng an toàn, nên mỗi cảnh chỉ nên giữ ít thành phần.
