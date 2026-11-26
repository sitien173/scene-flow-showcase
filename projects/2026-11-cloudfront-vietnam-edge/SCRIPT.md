Bạn đang ở Việt Nam, nhưng lại truy cập một website có máy chủ đặt tận nước Mỹ.
Hai nơi cách nhau hơn mười nghìn kilomet.
Vậy tại sao website vẫn có thể tải rất nhanh?
Bình thường, dữ liệu phải đi qua nhiều mạng kết nối và những tuyến cáp quang quốc tế.
Khoảng cách càng xa, độ trễ mạng càng có thể tăng lên.
Vậy làm sao giải quyết vấn đề này?
Câu trả lời nằm ở một công nghệ gọi là CDN, hay Content Delivery Network.
AWS có dịch vụ Amazon CloudFront với các Edge Location phân bố trên toàn cầu.
Đặc biệt, AWS đã triển khai CloudFront Edge Location tại cả Hà Nội và Thành phố Hồ Chí Minh.
Khi bạn truy cập website, CloudFront sẽ định tuyến request đến một Edge Location có thể phục vụ bạn tốt, thường là vị trí gần nhất xét theo độ trễ.
Nếu hình ảnh, video hoặc file website đã được lưu trong cache, CloudFront sẽ trả dữ liệu ngay từ đó.
Đó gọi là Cache Hit.
Không cần quay về server ở Mỹ cho lần tải đó!
Nhưng nếu nội dung chưa được lưu thì sao?
Đó gọi là Cache Miss.
Thường thì CloudFront sẽ tìm tiếp ở Regional Edge Cache, một tầng cache lớn hơn.
Nếu vẫn chưa có, nó sẽ gửi request về server gốc tại Mỹ để lấy dữ liệu.
Khi nhận được nội dung, CloudFront có thể lưu lại vào cache.
Những lần truy cập tiếp theo có cơ hội được phục vụ ngay tại Edge Location.
Tất nhiên, không phải mọi dữ liệu đều được cache.
Ảnh sản phẩm, logo hay file JavaScript thường phù hợp để lưu cache.
Nhưng thông tin tài khoản, giỏ hàng và thanh toán lại cần được xử lý theo dữ liệu của từng người dùng, thường phải đi đến backend.
Đó là cách CDN giúp đưa dữ liệu đến gần người dùng hơn, thay vì bắt mọi người phải kết nối trực tiếp đến một server ở bên kia thế giới.
Và đó chính là cách Amazon CloudFront giúp website tải nhanh hơn!
Góc nhìn DEV.
Hẹn gặp bạn ở tập tiếp theo!

# Cấu trúc
- Format: Explainer
- Core promise: hiểu vì sao website đặt máy chủ ở Mỹ vẫn có thể tải nhanh tại Việt Nam nhờ CDN và Amazon CloudFront
- Câu 1-3: Hook, người dùng Việt Nam mở website có máy chủ ở Mỹ, vì sao vẫn nhanh
- Câu 4-6: Vấn đề thực tế, dữ liệu đi qua cáp quang quốc tế, khoảng cách làm tăng độ trễ
- Câu 7-9: Giải pháp AWS, CDN, Amazon CloudFront, Edge Location tại Hà Nội và Thành phố Hồ Chí Minh
- Câu 10-13: Cách hoạt động, Cache Hit, trả dữ liệu ngay tại Edge Location
- Câu 14-19: Cách hoạt động, Cache Miss, Regional Edge Cache, origin tại Mỹ, lưu lại vào cache
- Câu 20-22: Giới hạn, nội dung tĩnh được cache, tài khoản, giỏ hàng, thanh toán đi đến backend
- Câu 23-24: Reveal, payoff ở câu 23, CDN đưa dữ liệu đến gần người dùng hơn
- Câu 25-26: Outro, tên kênh Góc nhìn DEV
