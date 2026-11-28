# Tổng hợp bài học

## Nên làm

- Review layout từ frame hoặc snapshot rồi sửa ở lượt 2. Lý do: bắt được phần lớn lỗi chồng chữ, che logo, che chữ. [2026-11-cloudfront-vietnam-edge, 2026-11-flash-sale-100k-users, 2026-11-waf-bot-protection]
- Dựng video dài theo từng chương rồi ghép lại. Lý do: kiểm tra riêng từng phần và giữ phong cách thống nhất giữa các tập. [2026-11-cloudfront-vietnam-edge-long, 2026-11-idempotency-double-payment-long, 2026-11-waf-bot-protection-long]
- Fact-check từng khẳng định trước khi tạo giọng. Lý do: tránh phải tạo lại giọng sau. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Căn thời gian cảnh theo kết quả ASR của giọng thật, không theo tốc độ đọc ước tính. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Dùng một bảng màu cố định cho từng loại thành phần trong cảnh cơ chế. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Nghe lại toàn bộ video trước khi render bản cuối, nhất là thuật ngữ tiếng Anh và chữ viết tắt. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Ghi mọi việc còn nợ vào tệp tiến độ chung khi chạy nhiều tập song song. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Dùng VieNeu-TTS cho bản 16:9 và để đọc thuật ngữ tiếng Anh như viết, không cần bảng phiên âm. [2026-11-cloudfront-vietnam-edge-long, 2026-11-flash-sale-100k-users-long, 2026-11-gta6-cong-nghe]
- Dùng Vibi TTS cho bản TikTok 9:16. [2026-11-cloudfront-vietnam-edge]
- Lấy logo AWS từ bộ AWS Architecture Icons chính thức. Dùng lại bộ icon tập trước, bổ sung icon thiếu từ cùng bộ. [2026-11-flash-sale-100k-users-long, 2026-11-idempotency-double-payment-long]
- Tải icon chính thức cho Shield và WAF rồi dựng lại cảnh thay cho nhãn chữ. [2026-11-waf-bot-protection]
- Hiện logo gốc cho mỗi công cụ được nhắc tới. Công cụ không có logo chính thức thì hiện bằng chữ. [2026-11-gta6-cong-nghe]
- Dùng hình minh họa thay cho quay màn hình thật. [2026-11-flash-sale-100k-users]
- Lấy nhãn kỹ thuật trên màn hình từ đúng giá trị trong mã nguồn, dù lời đọc nói tự nhiên hơn. [2026-11-idempotency-double-payment]
- Rút kịch bản để tổng thời lượng giọng vừa giới hạn 180 giây của YouTube Shorts. [2026-11-gta6-cong-nghe]
- Chạy lại ASR bằng model medium nâng tỉ lệ khớp từ 89,8% lên 94,1%. [2026-11-waf-bot-protection-long]

## Nên tránh

- Tạo giọng dài trong một lần chạy trên Colab. Lý do: Colab có thể ngắt giữa chừng; một dự án gặp lỗi IncompleteRead và bị ngắt sau khoảng 10 phút. [2026-11-cloudfront-vietnam-edge, 2026-11-cloudfront-vietnam-edge-long, 2026-11-flash-sale-100k-users-long, 2026-11-idempotency-double-payment, 2026-11-idempotency-double-payment-long, 2026-11-waf-bot-protection, 2026-11-waf-bot-protection-long]
- Tự vẽ hoặc mô phỏng logo AWS. Chỉ dùng logo chính thức. [2026-11-cloudfront-vietnam-edge, 2026-11-cloudfront-vietnam-edge-long, 2026-11-flash-sale-100k-users, 2026-11-flash-sale-100k-users-long, 2026-11-idempotency-double-payment, 2026-11-idempotency-double-payment-long, 2026-11-waf-bot-protection, 2026-11-waf-bot-protection-long]
- Bỏ qua bước nghe lại toàn bộ video. Lý do: lỗi đồng bộ giọng và hình chỉ nghe mới thấy. [2026-11-giao-dien-nao-may-tinh, 2026-11-may-bom-nhiet, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion]
- Dựng xong mà chưa có tệp SFX. Lý do: các cue âm thanh bị bỏ qua và phải bổ sung sau. [2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Để tên kênh trong brand.json khác cách viết trong AGENTS.md. Lý do: màn hình kết bị lệch cách viết hoa. [2026-11-cap-quang, 2026-11-lidar-xe-tu-lai, 2026-11-may-tinh-luong-tu, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru]
- Để phụ đề quá dày. Lý do: npm run check báo nhiều cảnh báo phụ đề khó đọc. [2026-11-cap-quang, 2026-11-gps-dinh-vi, 2026-11-man-hinh-oled, 2026-11-may-tinh-luong-tu, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru]
- Đặt bản đồ đè lên phụ đề hoặc để nhãn chồng nhau, để logo và chữ bị che. [2026-11-cloudfront-vietnam-edge, 2026-11-flash-sale-100k-users]
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

### toon3d
- Fact-check từng khẳng định trước khi tạo giọng. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Căn thời gian cảnh theo kết quả ASR của giọng thật. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Dùng bảng màu cố định theo loại thành phần trong cảnh cơ chế. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Tạo tệp SFX trước khi dựng để không bỏ sót cue âm thanh. [2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Nghe lại toàn bộ video trước khi render bản cuối. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]
- Giữ tên kênh trong brand.json khớp cách viết trong AGENTS.md. [2026-11-cap-quang, 2026-11-lidar-xe-tu-lai, 2026-11-may-tinh-luong-tu, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru]
- Giữ phụ đề thưa để npm run check không cảnh báo khó đọc. [2026-11-cap-quang, 2026-11-gps-dinh-vi, 2026-11-man-hinh-oled, 2026-11-may-tinh-luong-tu, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru]
- Ghi việc còn nợ vào tệp tiến độ chung khi chạy nhiều tập song song. [2026-11-cap-quang, 2026-11-giao-dien-nao-may-tinh, 2026-11-gps-dinh-vi, 2026-11-lidar-xe-tu-lai, 2026-11-man-hinh-oled, 2026-11-may-bom-nhiet, 2026-11-may-tinh-luong-tu, 2026-11-nhiet-hach, 2026-11-pin-lithium-ion, 2026-11-pin-the-ran, 2026-11-sac-khong-day, 2026-11-ssd-luu-tru, 2026-11-tai-nghe-chong-on, 2026-11-thanh-toan-pos]

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

- Chưa thống nhất engine TTS cho bản 9:16: một dự án dùng Vibi TTS, dự án khác dùng VieNeu-TTS. Cần chốt engine theo khung hình. [2026-11-cloudfront-vietnam-edge, 2026-11-gta6-cong-nghe]

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
- Thêm bước fact-check từng khẳng định trước khi tạo giọng.
- Thêm bước căn thời gian cảnh theo kết quả ASR của giọng thật, không theo tốc độ đọc ước tính.
- Thêm checklist bảng màu cố định cho từng loại thành phần trong cảnh cơ chế.
- Thêm kiểm tra sự tồn tại của tệp SFX trước khi dựng.
- Thêm kiểm tra cách viết tên kênh khớp giữa brand.json và AGENTS.md.
- Thêm kiểm tra mật độ phụ đề và báo cảnh báo khi quá dày.
- Thêm bước nghe lại toàn bộ video trước khi render bản cuối.
