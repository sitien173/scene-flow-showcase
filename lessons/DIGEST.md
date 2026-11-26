# Tổng hợp bài học

## Nên làm

- Review layout từ frame hoặc snapshot rồi sửa ở lượt 2. Lý do: bắt được phần lớn lỗi chồng chữ, che logo và che chữ. [2026-11-cloudfront-vietnam-edge, 2026-11-flash-sale-100k-users]
- Dựng video dài theo từng chương rồi ghép lại. Lý do: kiểm tra riêng từng phần và giữ phong cách thống nhất giữa các tập. [2026-11-cloudfront-vietnam-edge-long, 2026-11-idempotency-double-payment-long, 2026-11-waf-bot-protection-long]
- Dùng VieNeu-TTS cho bản YouTube 16:9. [2026-11-cloudfront-vietnam-edge-long]
- Dùng Vibi TTS cho bản TikTok 9:16. [2026-11-cloudfront-vietnam-edge]
- Để VieNeu-TTS đọc thuật ngữ tiếng Anh như viết, không cần bảng phiên âm. [2026-11-flash-sale-100k-users-long, 2026-11-gta6-cong-nghe]
- Lấy logo AWS từ bộ AWS Architecture Icons chính thức. [2026-11-flash-sale-100k-users-long]
- Dùng lại bộ icon AWS chính thức từ tập trước, bổ sung icon thiếu từ cùng bộ. [2026-11-idempotency-double-payment-long]
- Tải icon chính thức cho Shield và WAF rồi dựng lại cảnh thay cho nhãn chữ. [2026-11-waf-bot-protection]
- Hiện logo gốc cho mỗi công cụ được nhắc tới. Công cụ không có logo chính thức, như RAGE, thì hiện bằng chữ. [2026-11-gta6-cong-nghe]
- Dùng hình minh họa thay cho quay màn hình CloudWatch thật. [2026-11-flash-sale-100k-users]
- Lấy nhãn kỹ thuật trên màn hình từ đúng giá trị trong mã nguồn, dù lời đọc nói tự nhiên hơn. [2026-11-idempotency-double-payment]
- Rút kịch bản để tổng thời lượng giọng vừa giới hạn 180 giây của YouTube Shorts. [2026-11-gta6-cong-nghe]
- Chạy lại ASR bằng model medium nâng tỉ lệ khớp từ 89,8% lên 94,1%. [2026-11-waf-bot-protection-long]

## Nên tránh

- Tạo giọng dài trong một lần chạy trên Colab. Lý do: Colab có thể ngắt giữa chừng; một dự án gặp lỗi IncompleteRead và bị ngắt sau khoảng 10 phút. [2026-11-cloudfront-vietnam-edge, 2026-11-cloudfront-vietnam-edge-long, 2026-11-flash-sale-100k-users-long, 2026-11-idempotency-double-payment, 2026-11-idempotency-double-payment-long, 2026-11-waf-bot-protection, 2026-11-waf-bot-protection-long]
- Tự vẽ hoặc mô phỏng logo AWS. Chỉ dùng logo chính thức. [2026-11-cloudfront-vietnam-edge, 2026-11-cloudfront-vietnam-edge-long, 2026-11-flash-sale-100k-users, 2026-11-flash-sale-100k-users-long, 2026-11-idempotency-double-payment, 2026-11-idempotency-double-payment-long, 2026-11-waf-bot-protection, 2026-11-waf-bot-protection-long]
- Đặt bản đồ đè lên phụ đề. [2026-11-cloudfront-vietnam-edge]
- Để nhãn chồng nhau hoặc để logo, chữ bị che. [2026-11-cloudfront-vietnam-edge, 2026-11-flash-sale-100k-users]
- Để end card trống hoặc phụ đề bị cắt. [2026-11-idempotency-double-payment]
- Viết nhãn trạng thái sai với giá trị thật trong mã nguồn. Lý do: Powertools dùng INPROGRESS và COMPLETED, không phải COMPLETE. [2026-11-idempotency-double-payment-long]
- Chỉ khai báo cảnh cho vài câu đầu trong kịch bản. Lý do: bước căn thời gian bị lỗi. [2026-11-waf-bot-protection]
- Gắn công cụ với sản phẩm khi không có nguồn. Lý do: không nguồn nào gắn Maya, Houdini và Perforce trực tiếp với GTA 6. [2026-11-gta6-cong-nghe]
- Giữ câu kêu gọi follow ở cuối. Lý do: quy tắc không CTA của kênh. [2026-11-gta6-cong-nghe]

## Theo theme

### cleanui
- Đặt vùng an toàn cho khung dọc ngay từ đầu. Lý do: giảm số lần sửa layout. [2026-11-flash-sale-100k-users]
- Giữ mọi thành phần trong vùng x 0 đến 918 và y 288 đến 1440, căn khối nội dung quanh y 860. [2026-11-flash-sale-100k-users]
- Giữ ít thành phần trong mỗi cảnh trên khung dọc. Lý do: cỡ chữ tối thiểu và vùng an toàn giới hạn sơ đồ. [2026-11-cloudfront-vietnam-edge]
- Ưu tiên logo và icon chính thức thay cho nhãn chữ hoặc hình tự vẽ. [2026-11-waf-bot-protection, 2026-11-flash-sale-100k-users-long, 2026-11-idempotency-double-payment-long]
- Đối chiếu nhãn kỹ thuật trên màn hình với đúng giá trị trong mã nguồn. [2026-11-idempotency-double-payment]
- Thêm Hoàng Sa và Trường Sa khi vẽ bản đồ Việt Nam. [2026-11-cloudfront-vietnam-edge, 2026-11-cloudfront-vietnam-edge-long]
- Dùng tên kênh "Góc nhìn DEV" ở outro. [2026-11-cloudfront-vietnam-edge, 2026-11-cloudfront-vietnam-edge-long]

## Theo khung hình

### 16:9
- Dựng từng chương theo mẫu bản dài đã hoàn thành rồi ghép lại, để giữ phong cách thống nhất giữa các tập. [2026-11-cloudfront-vietnam-edge-long, 2026-11-idempotency-double-payment-long, 2026-11-waf-bot-protection-long]
- Dùng VieNeu-TTS và để đọc thuật ngữ tiếng Anh như viết, không cần bảng phiên âm. [2026-11-cloudfront-vietnam-edge-long, 2026-11-flash-sale-100k-users-long]

### 9:16
- Đặt vùng an toàn ngay từ đầu và giữ ít thành phần mỗi cảnh. Lý do: cỡ chữ tối thiểu và vùng an toàn giới hạn sơ đồ. [2026-11-flash-sale-100k-users, 2026-11-cloudfront-vietnam-edge]
- Rút kịch bản để giọng vừa giới hạn 180 giây của YouTube Shorts. [2026-11-gta6-cong-nghe]
- Không đặt bản đồ đè lên phụ đề, không để nhãn chồng nhau. [2026-11-cloudfront-vietnam-edge]
- Dùng hình minh họa thay cho quay màn hình thật. [2026-11-flash-sale-100k-users]

## Mâu thuẫn cần người xem lại

- Chưa thống nhất engine TTS cho bản 9:16: một dự án dùng Vibi TTS, một dự án khác dùng VieNeu-TTS. Cần chốt engine theo khung hình. [2026-11-cloudfront-vietnam-edge, 2026-11-gta6-cong-nghe]

## Đề xuất cải thiện cho agent và skill scene-flow

- Thêm kiểm tra bắt buộc: mọi câu trong kịch bản phải có khai báo cảnh trước khi căn thời gian.
- Thêm chế độ tạo giọng theo từng câu hoặc từng chương, kèm cache và vòng lặp tự khởi động lại server.
- Thêm kiểm tra ASR đạt ngưỡng 90% và tự động chạy lại bằng model medium khi chưa đạt.
- Thêm cơ chế ghi từ đặt bằng tay vào FEEDBACK và đọc lại khi chạy asr.py.
- Thêm kiểm tra câu tiếng Anh ngắn như end card sau ASR; nếu ASR bỏ sót thì đặt từ bằng tay theo khoảng lặng.
- Thêm checklist vùng an toàn mặc định cho 9:16 và cảnh báo khi thành phần vượt vùng.
- Thêm bước đối chiếu nhãn trên màn hình với hằng số trong mã nguồn.
- Thêm kiểm tra thời lượng so với giới hạn nền tảng trước khi xuất bản.
- Thêm kiểm tra mốc thời gian sau khi rút giọng: dời mốc theo từng nhóm câu, và báo các hình còn quá ngắn hoặc bằng không.
- Thêm kiểm tra quy tắc kênh, gồm quy tắc không CTA, trước khi xuất bản.
- Thêm bước chỉ dùng logo và icon chính thức, chặn hình tự vẽ hoặc mô phỏng.
- Thêm bước lấy link tải bộ icon AWS bằng trình duyệt. Lý do: trang tải dựng link bằng JavaScript.
