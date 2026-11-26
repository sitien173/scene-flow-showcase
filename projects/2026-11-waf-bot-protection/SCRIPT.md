Hãy tưởng tượng website của bạn đang mở bán vé concert.
Nhưng thay vì hàng nghìn khách hàng thật, website lại bị hàng nghìn bot liên tục gửi request.
Chuyện gì sẽ xảy ra?
Chúng có thể liên tục thử mật khẩu, thu thập dữ liệu, tự động giữ vé hoặc gửi hàng triệu request khiến server không thể xử lý kịp.
Đây là những dạng bot độc hại và tấn công từ chối dịch vụ.
Đầu tiên, AWS Shield bảo vệ hệ thống trước nhiều cuộc tấn công DDoS ở tầng mạng và tầng vận chuyển.
Shield Standard được AWS tự động cung cấp cho khách hàng mà không tính phí riêng.
Nhưng nếu cuộc tấn công sử dụng những request HTTP trông giống truy cập bình thường thì sao?
Đây là lúc AWS WAF hoạt động.
Nó kiểm tra request và sử dụng các quy tắc để quyết định cho phép, chặn hoặc yêu cầu xác minh.
Ví dụ, AWS WAF có thể sử dụng Rate-based Rules để đếm số request và giới hạn những nguồn gửi quá nhiều request trong một khoảng thời gian.
Giống như một bảo vệ kiểm soát số lượt khách được vào cửa.
Nhưng bot không phải lúc nào cũng xấu.
Search engine cũng sử dụng bot để thu thập dữ liệu website.
Vì thế AWS WAF Bot Control giúp nhận diện và phân loại bot.
Những bot đáng tin cậy có thể được cho phép, còn bot đáng ngờ có thể bị giới hạn, yêu cầu CAPTCHA hoặc browser challenge.
Với những cuộc tấn công HTTP Flood phức tạp hơn, AWS còn có Anti-DDoS Managed Rule Group.
Hệ thống phân tích hành vi traffic, phát hiện dấu hiệu tấn công và có thể yêu cầu xác minh hoặc chặn request.
Shield Advanced cung cấp thêm các năng lực bảo vệ DDoS nâng cao.
Cuối cùng, khách hàng thật vẫn có thể truy cập website, còn những request độc hại bị phát hiện và xử lý trước khi đến backend.
Đó là cách AWS kết hợp nhiều lớp bảo vệ để website chống lại bot và các cuộc tấn công DDoS.
Vì trên Internet, không phải ai truy cập website cũng là con người!
