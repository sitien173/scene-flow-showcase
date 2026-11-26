# STORYBOARD: Làm thế nào AWS ngăn hàng nghìn bot tấn công website?

## 1. Concept

- Mục tiêu: giải thích cách AWS WAF, Bot Control, Rate-based Rules, Anti-DDoS Managed Rule Group, AWS Shield Standard và AWS Shield Advanced bảo vệ website khỏi bot.
- Mở đầu bằng một tình huống dễ hình dung: website bán vé concert bị bot tràn vào.
- Thông điệp chính: không phải bot nào cũng bị chặn. Googlebot và bot đáng tin cậy được cho phép. Bot độc hại bị chặn. Bot đáng ngờ bị yêu cầu CAPTCHA hoặc browser challenge.
- Theme: cleanui. Khung dọc 9:16. Vùng an toàn: x 0-918, y 288-1440, khối chính quanh y 860.
- Nguồn nội dung: SCRIPT.md (22 câu, không sửa) và SCRIPT.source.md.

## 2. Bảng cảnh

| Scene | Câu số | Thời gian & Nhịp | Hình ảnh & Camera | Text / UI Overlay | Âm thanh & SFX | Lời thoại |
|---|---|---|---|---|---|---|
| h1 HOOK | 1-3 | 0.00-8.99 s. Mở đầu, không chuyển cảnh. | Thẻ trang bán vé "Mở bán vé concert" với nút "Mua vé". 12 chip bot rơi vào từ phía trên. Nhãn BOT. | Tiêu đề trang; nhãn BOT | Pop tại bot đầu tiên (h1-bots) | 1. Hãy tưởng tượng website của bạn đang mở bán vé concert. 2. Nhưng thay vì hàng nghìn khách hàng thật, website lại bị hàng nghìn bot liên tục gửi request. 3. Chuyện gì sẽ xảy ra? |
| a1 ATTACK | 4-5 | 8.99-19.67 s. Trượt vào (slide). | Bốn thẻ hành vi lần lượt hiện: thử mật khẩu, thu thập dữ liệu, tự động giữ vé, gửi hàng triệu request. Sau đó mã 503 và nhãn "Từ chối dịch vụ". | Thẻ hành vi; mã 503; "Từ chối dịch vụ" | Click tại "triệu" (a1-flood); laser tại mã 503 (a1-deny) | 4. Chúng có thể liên tục thử mật khẩu, thu thập dữ liệu, tự động giữ vé hoặc gửi hàng triệu request khiến server không thể xử lý kịp. 5. Đây là những dạng bot độc hại và tấn công từ chối dịch vụ. |
| s1 SHIELD | 6-7 | 19.67-29.18 s. Cắt (cut). | Khung cạnh mạng. Biểu tượng Amazon CloudFront (biểu tượng chính thức). | "Amazon CloudFront"; "AWS Shield Standard: tự động" | Pop tại "Shield" (s1-std) | 6. Đầu tiên, AWS Shield bảo vệ hệ thống trước nhiều cuộc tấn công DDoS ở tầng mạng và tầng vận chuyển. 7. Shield Standard được AWS tự động cung cấp cho khách hàng mà không tính phí riêng. |
| w1 WAF | 8-10 | 29.18-41.16 s. Trượt vào (slide). | Cổng kiểm tra. Nhãn AWS WAF. Ba dòng quyết định: ALLOW, CHALLENGE, BLOCK. | "AWS WAF"; "Người dùng thật: ALLOW"; "Request đáng ngờ: CHALLENGE"; "Request độc hại: BLOCK" | Pop tại "WAF" (w1-waf); click tại "chặn" (w1-rule) | 8. Nhưng nếu cuộc tấn công sử dụng những request HTTP trông giống truy cập bình thường thì sao? 9. Đây là lúc AWS WAF hoạt động. 10. Nó kiểm tra request và sử dụng các quy tắc để quyết định cho phép, chặn hoặc yêu cầu xác minh. |
| r1 RATE | 11-12 | 41.16-51.97 s. Cắt (cut). | Biểu đồ số request theo thời gian. Đường vượt ngưỡng tại một điểm, điểm nóng hiện. Một IP gửi request liên tục. | "Rate-based Rules"; "Vượt ngưỡng: giới hạn"; "Một IP gửi quá nhiều request" | Laser tại vượt ngưỡng (r1-limit) | 11. Ví dụ, AWS WAF có thể sử dụng Rate-based Rules để đếm số request và giới hạn những nguồn gửi quá nhiều request trong một khoảng thời gian. 12. Giống như một bảo vệ kiểm soát số lượt khách được vào cửa. |
| b1 BOT CONTROL | 13-16 | 51.97-67.85 s. Trượt vào (slide). | Ba dòng phân loại bot: Googlebot ALLOW, bot độc hại BLOCK, bot đáng ngờ CAPTCHA. | "AWS WAF Bot Control"; "Googlebot: ALLOW"; "Bot độc hại: BLOCK"; "Bot đáng ngờ: CAPTCHA" | Pop tại "Search" (b1-search); click tại "giới" (b1-limit) | 13. Nhưng bot không phải lúc nào cũng xấu. 14. Search engine cũng sử dụng bot để thu thập dữ liệu website. 15. Vì thế AWS WAF Bot Control giúp nhận diện và phân loại bot. 16. Những bot đáng tin cậy có thể được cho phép, còn bot đáng ngờ có thể bị giới hạn, yêu cầu CAPTCHA hoặc browser challenge. |
| d1 ANTI-DDOS | 17-19 | 67.85-82.98 s. Cắt (cut). | Biểu đồ HTTP flood tăng vọt. Hệ thống phân tích. Nhãn Anti-DDoS Managed Rule Group. Thẻ AWS Shield Advanced. | "AWS WAF"; "Anti-DDoS Managed Rule Group"; "AWS Shield Advanced" | Pop tại "phân" (d1-analyze); laser tại "Advanced" (d1-adv) | 17. Với những cuộc tấn công HTTP Flood phức tạp hơn, AWS còn có Anti-DDoS Managed Rule Group. 18. Hệ thống phân tích hành vi traffic, phát hiện dấu hiệu tấn công và có thể yêu cầu xác minh hoặc chặn request. 19. Shield Advanced cung cấp thêm các năng lực bảo vệ DDoS nâng cao. |
| e1 RESULT | 20-22 | 82.98-98.72 s. Mờ dần (fade). | Điện thoại hiển thị nút Mua vé. Khách thật được duyệt (dấu tick). Bot bị loại trước backend. Nhãn "Nhiều lớp bảo vệ". | "Nhiều lớp bảo vệ" | Click tại "khách" (e1-real); pop tại "lớp" (e1-layers) | 20. Cuối cùng, khách hàng thật vẫn có thể truy cập website, còn những request độc hại bị phát hiện và xử lý trước khi đến backend. 21. Đó là cách AWS kết hợp nhiều lớp bảo vệ để website chống lại bot và các cuộc tấn công DDoS. 22. Vì trên Internet, không phải ai truy cập website cũng là con người! |
| ec END CARD | sau câu 22 | Từ khoảng 99.0 s. Chỉ hình ảnh, không có lời thoại. | Logo kênh goc-nhin-dev-logo.png, tên thương hiệu, slogan. | "Góc nhìn DEV"; "AWS: Behind the Cloud. Hẹn gặp bạn ở tập tiếp theo!" | Không | (không có) |

## 3. Audio queries

- Voiceover: assets/audio/voiceover.mp3 (ghi âm đã có, không ghi lại). Lời thoại 99.3 s.
- SFX: pop, click, laser (xem cues.json, mục sfx).
- Nhạc nền: Little Things (bgm-little-things.mp3), từ 0:00, khoảng -33 dB, thấp hơn giọng đọc 12 dB. Giữ như video mẫu.
- Nhịp SFX: khoảng 1 cue mỗi 3-4 giây.

## 4. Build notes

- Nguồn beat: cues.json. Mỗi beat neo vào một từ có trong câu tương ứng của SCRIPT.md.
- Logo: không có logo AWS WAF hoặc AWS Shield chính thức trong dự án. Dùng nhãn chữ "AWS WAF" và "AWS Shield". Chưa tạo hoặc vẽ logo. Biểu tượng Amazon CloudFront lấy từ bộ AWS Architecture Icons đã có trong dự án (assets/logos/aws/cloudfront.svg).
- Thông tin chưa kiểm chứng: mốc ngày 26/03/2026 cho Anti-DDoS. Không đưa lên màn hình.
- Không dùng ảnh chụp màn hình AWS console. Dùng thẻ dashboard theo phong cách cleanui.
- Caption: cleanui, dải trên y 300, dải giữa y 980.
- Kết thúc: EC_DUR 5.5 s, chỉ hình ảnh sau câu cuối.
