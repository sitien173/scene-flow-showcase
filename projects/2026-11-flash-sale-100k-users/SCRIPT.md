Đúng mười hai giờ trưa!
Một website thương mại điện tử bắt đầu Flash Sale.
Chỉ trong vài giây, một trăm nghìn người cùng truy cập để săn một món hàng.
Liệu website có sập không?
Nếu toàn bộ request đổ dồn vào một server, CPU có thể quá tải, bộ nhớ cạn kiệt, kết nối database bị nghẽn.
Và cuối cùng, người dùng chỉ nhìn thấy một màn hình báo lỗi.
Nhưng vấn đề không đơn giản là số lượng người dùng.
Một trăm nghìn người online không có nghĩa là một trăm nghìn request mỗi giây.
Điều quan trọng là hệ thống phải biết cách phân phối và xử lý từng loại request.
Đầu tiên, Amazon CloudFront giúp đưa nội dung đến gần người dùng hơn.
Những dữ liệu tĩnh như hình ảnh, CSS hay JavaScript có thể được cache.
Amazon S3 có thể lưu trữ các file này, giúp giảm request phải quay về hệ thống chính.
Các request cần xử lý tiếp tục đi qua Application Load Balancer.
Nó phân phối traffic đến những server khỏe mạnh, thay vì bắt một máy chủ gánh toàn bộ công việc.
Tiếp theo là EC2 Auto Scaling.
Khi hệ thống cần thêm năng lực xử lý, Auto Scaling có thể tự động khởi chạy thêm server.
Khi lượng truy cập giảm, nó thu hẹp số lượng server để tối ưu chi phí.
Nhưng có những công việc không cần hoàn thành ngay lập tức.
Ví dụ như gửi email xác nhận hay tạo hóa đơn.
Amazon SQS đưa chúng vào hàng đợi để các worker xử lý theo khả năng của mình, thay vì khiến request của người dùng phải chờ tất cả.
Để database không trở thành nút thắt cổ chai, hệ thống có thể sử dụng Amazon ElastiCache cho những dữ liệu được đọc thường xuyên.
Trong khi đó, CloudWatch liên tục theo dõi các chỉ số và cảnh báo khi có bất thường.
Vậy bí quyết không phải là mua một server thật mạnh.
Đó là phân phối traffic, cache dữ liệu, mở rộng tài nguyên và tách những công việc có thể xử lý bất đồng bộ.
AWS cung cấp công cụ, nhưng kiến trúc và kiểm thử mới quyết định hệ thống chịu tải được bao nhiêu.
Đó là cách AWS giúp hệ thống sẵn sàng cho những đợt traffic khổng lồ.
