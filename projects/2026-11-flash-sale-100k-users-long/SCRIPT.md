# CHAPTER 01 – THE BIG TRAFFIC SPIKE
[calm] Hãy tưởng tượng bạn đang vận hành một website thương mại điện tử.
[calm] Hằng ngày, website chỉ có vài nghìn người truy cập.
[calm] Mọi thứ hoạt động bình thường.
[calm] Server không quá tải, database phản hồi nhanh và khách hàng có thể mua hàng mà không gặp vấn đề gì.
[tense] Nhưng hôm nay là một ngày đặc biệt.
[tense] Bạn chuẩn bị tổ chức Flash Sale vào đúng mười hai giờ trưa, với một chương trình giảm giá cực lớn.
[tense] Mười giây trước giờ mở bán, hàng nghìn người đã đứng chờ trước màn hình điện thoại.
[tense] Và đúng mười hai giờ, tất cả cùng nhấn nút mua hàng.
[tense] Trong vài giây, lượng request đổ về website tăng vọt.
[tense] CPU bắt đầu quá tải.
[tense] Database phản hồi chậm.
[tense] Một số request timeout.
[tense] Những người khác bắt đầu nhìn thấy lỗi năm không ba [thở dài].
[pause:0.6s]
[normal] Và câu hỏi đặt ra là: Làm thế nào những hệ thống lớn có thể phục vụ một lượng người dùng khổng lồ mà không bị sập?
[normal] Hãy xem AWS giải quyết bài toán này như thế nào.
[pause:0.9s]

# CHAPTER 02 – 100,000 USERS ACTUALLY MEANS WHAT?
[calm] [hắng giọng] Trước tiên, chúng ta cần hiểu một điều.
[calm] Một trăm nghìn người truy cập cùng lúc không có nghĩa là một trăm nghìn request được gửi đến server trong cùng một giây.
[calm] Một người dùng có thể chỉ đang đọc trang sản phẩm.
[calm] Người khác lại liên tục tìm kiếm, tải hình ảnh hoặc gửi request đặt hàng.
[calm] Vì vậy, khi thiết kế một hệ thống có khả năng chịu tải lớn, các kỹ sư cần quan tâm đến nhiều chỉ số khác nhau.
[calm] Đầu tiên là Concurrent Users, số lượng người đang sử dụng hệ thống đồng thời.
[calm] Tiếp theo là Requests Per Second, số request server phải xử lý trong mỗi giây.
[calm] Ngoài ra còn có Response Time, tức thời gian phản hồi, Error Rate, tỷ lệ request bị lỗi và Database Throughput, khả năng xử lý truy vấn của database.
[calm] Ví dụ, một trăm nghìn người chỉ xem một trang chứa những hình ảnh đã được cache sẽ khác hoàn toàn với một trăm nghìn người cùng thực hiện các giao dịch cần ghi dữ liệu vào database.
[calm] Đây chính là lý do không thể chỉ nhìn vào số lượng người dùng để kết luận một hệ thống có chịu tải được hay không.
[pause:0.9s]

# CHAPTER 03 – WHY A SINGLE SERVER FAILS
[calm] Hãy bắt đầu với kiến trúc đơn giản nhất.
[calm] Website của bạn chạy trên một server duy nhất.
[calm] Mọi người dùng đều phải gửi request đến server này.
[calm] Khi traffic tăng lên, server phải xử lý nhiều công việc hơn: chạy code, thực hiện truy vấn database, đọc dữ liệu và trả về kết quả.
[calm] CPU phải hoạt động liên tục.
[calm] RAM có thể không còn đủ.
[calm] Các kết nối đến database cũng có giới hạn.
[calm] Bạn có thể giải quyết bằng cách nâng cấp server, chẳng hạn tăng CPU và RAM.
[calm] Đây được gọi là Vertical Scaling.
[calm] Nhưng phương pháp này có giới hạn.
[calm] Một server dù mạnh đến đâu cũng chỉ có khả năng xử lý nhất định.
[calm] [thở dài] Và nếu server duy nhất đó bị lỗi, toàn bộ website có thể ngừng hoạt động.
[calm] Một giải pháp khác là Horizontal Scaling.
[calm] Thay vì phụ thuộc vào một server thật mạnh, chúng ta tạo nhiều server cùng chạy ứng dụng và phân phối công việc cho chúng.
[calm] Và đây chính là một trong những nền tảng quan trọng khi xây dựng hệ thống trên AWS.
[pause:0.9s]

# CHAPTER 04 – FIRST LAYER: CLOUDFRONT AND S3
[calm] Trước khi đưa tất cả request đến các server ứng dụng, chúng ta có thể giảm đáng kể lượng công việc phải xử lý ngay từ đầu.
[calm] Hãy lấy ví dụ một website thương mại điện tử.
[calm] Khi bạn mở trang sản phẩm, website phải tải rất nhiều thứ: hình ảnh, logo, file CSS, JavaScript và các nội dung khác.
[calm] Những dữ liệu này thường không cần được tạo mới mỗi lần có người truy cập.
[calm] Đó là lúc Amazon CloudFront phát huy tác dụng.
[calm] CloudFront là một dịch vụ Content Delivery Network, hay CDN.
[calm] Nó có thể lưu bản sao của những nội dung được phép cache tại các điểm phân phối trên toàn cầu.
[calm] Khi người dùng truy cập, nội dung có thể được trả về từ một điểm gần họ thay vì phải quay về server gốc ở một khu vực xa hơn.
[calm] Các file tĩnh có thể được lưu trên Amazon S3 và phân phối thông qua CloudFront.
[calm] Điều này giúp giảm độ trễ cho người dùng và giảm số lượng request phải xử lý tại hệ thống backend.
[calm] Tuy nhiên, không phải dữ liệu nào cũng được cache.
[calm] Những nội dung cá nhân hóa hay giao dịch như thông tin đơn hàng phải được xử lý theo các quy tắc phù hợp.
[pause:0.9s]

# CHAPTER 05 – SECOND LAYER: LOAD BALANCING
[calm] Sau khi giảm được những request không cần thiết, chúng ta cần giải quyết một vấn đề khác.
[calm] Làm thế nào phân phối những request thực sự cần xử lý đến nhiều server?
[calm] AWS cung cấp Elastic Load Balancing.
[calm] Trong ví dụ này, chúng ta sử dụng Application Load Balancer, thường được gọi là ALB.
[calm] Hãy tưởng tượng ALB giống như một người điều phối giao thông.
[calm] Thay vì để mọi request đi vào một server duy nhất, ALB phân phối chúng đến nhiều máy chủ ứng dụng đã đăng ký.
[calm] Những server này có thể chạy trên các EC2 Instances và được triển khai ở nhiều Availability Zones.
[calm] Một tính năng quan trọng là Health Check.
[calm] Load Balancer liên tục kiểm tra trạng thái của các server.
[calm] Nếu một server không còn khỏe mạnh, nó sẽ ngừng chuyển request đến server đó theo trạng thái health check.
[calm] Nhờ vậy, hệ thống có thể tiếp tục phục vụ người dùng bằng những server còn hoạt động.
[calm] Load Balancing giúp cải thiện khả năng phân phối tải và tính sẵn sàng của ứng dụng.
[normal] Nhưng vẫn còn một câu hỏi: Nếu lượng truy cập tiếp tục tăng và các server hiện tại không còn đủ năng lực xử lý thì sao?
[pause:0.9s]

# CHAPTER 06 – THIRD LAYER: EC2 AUTO SCALING
[calm] Đây là lúc Amazon EC2 Auto Scaling xuất hiện.
[calm] Thay vì phải ngồi theo dõi và tạo server mới bằng tay mỗi khi traffic tăng, chúng ta có thể cấu hình một Auto Scaling Group.
[calm] Ví dụ, bình thường ứng dụng chỉ cần ba EC2 Instances.
[normal] Nhưng khi bắt đầu Flash Sale, lượng request tăng mạnh và các chỉ số hoạt động vượt mức mục tiêu đã thiết lập.
[calm] EC2 Auto Scaling có thể tự động khởi chạy thêm instances để tăng năng lực xử lý.
[calm] Vậy hệ thống biết khi nào cần thêm server bằng cách nào?
[calm] Đó là nhờ các metrics được thu thập và giám sát thông qua Amazon CloudWatch.
[calm] Chẳng hạn, chúng ta có thể theo dõi mức sử dụng CPU trung bình hoặc số lượng request trên mỗi target của Load Balancer.
[calm] Sau đó, một Target Tracking Scaling Policy sẽ giúp duy trì chỉ số quanh giá trị mục tiêu đã cấu hình.
[calm] Khi mức sử dụng tăng, hệ thống mở rộng.
[calm] Khi nhu cầu giảm, hệ thống có thể thu hẹp số lượng máy chủ để tránh lãng phí tài nguyên.
[calm] Tuy nhiên, Auto Scaling không có nghĩa là server xuất hiện ngay lập tức.
[calm] Một EC2 Instance vẫn cần thời gian để khởi chạy, khởi động ứng dụng và sẵn sàng nhận traffic.
[calm] Đối với sự kiện Flash Sale đã biết trước thời điểm, doanh nghiệp nên chuẩn bị capacity từ trước bằng Scheduled Scaling, kết hợp kiểm thử tải và những chính sách scaling phù hợp.
[pause:0.9s]

# CHAPTER 07 – THE HIDDEN BOTTLENECK: DATABASE
[calm] Đến đây, có thể bạn nghĩ rằng bài toán đã được giải quyết [cười].
[calm] Chúng ta đã có nhiều server, một Load Balancer và khả năng tự động mở rộng.
[calm] Nhưng vẫn còn một thành phần có thể khiến toàn bộ hệ thống chậm lại.
[normal] Đó chính là database.
[calm] Hãy tưởng tượng mười server ứng dụng cùng truy vấn một database.
[calm] Khi lượng người dùng tăng cao, số lượng truy vấn cũng tăng theo.
[calm] Database có thể trở thành nút thắt cổ chai.
[calm] Để giảm tải, một giải pháp là sử dụng caching.
[calm] Ví dụ, thông tin sản phẩm, danh mục hoặc những dữ liệu được đọc thường xuyên có thể được lưu trong Amazon ElastiCache.
[calm] Khi người dùng yêu cầu dữ liệu, ứng dụng kiểm tra cache trước.
[calm] Nếu dữ liệu còn hợp lệ trong cache, ứng dụng có thể trả kết quả mà không cần truy vấn database.
[calm] Điều này giúp giảm số lượng truy vấn đọc và cải thiện tốc độ phản hồi.
[calm] Tuy nhiên, cache không thể thay thế database.
[calm] Những giao dịch như thanh toán, cập nhật tồn kho hoặc ghi nhận đơn hàng vẫn cần được xử lý bằng các cơ chế giao dịch và kiểm soát đồng thời phù hợp.
[calm] Và một điểm quan trọng: Multi-AZ chủ yếu hỗ trợ tính sẵn sàng cao, không đồng nghĩa database tự động có khả năng ghi nhanh hơn vô hạn.
[pause:0.9s]

# CHAPTER 08 – FOURTH LAYER: AMAZON SQS
[calm] Bây giờ, hãy xem một tình huống thực tế.
[calm] Bạn vừa đặt một đơn hàng thành công.
[calm] Sau đó, hệ thống có thể cần thực hiện thêm nhiều công việc: gửi email xác nhận, tạo hóa đơn, gửi thông tin đến đơn vị vận chuyển và cập nhật các hệ thống báo cáo.
[calm] Nếu bắt buộc tất cả những công việc này phải hoàn thành trước khi trả response cho người dùng, trải nghiệm có thể trở nên rất chậm.
[calm] Một cách tốt hơn là tách các công việc có thể xử lý bất đồng bộ.
[calm] AWS cung cấp Amazon Simple Queue Service, hay SQS.
[calm] Hãy tưởng tượng SQS là một hàng đợi công việc.
[calm] Application gửi message vào queue.
[calm] Sau đó, các worker sẽ lấy từng message ra để xử lý.
[calm] Điều quan trọng là producer và consumer không cần phải hoàn thành công việc cùng một thời điểm.
[calm] Nếu lượng công việc tăng đột biến, queue có thể giữ lại các message để worker xử lý theo năng lực của chúng.
[calm] Thậm chí, chúng ta có thể mở rộng số lượng worker dựa trên số lượng message đang chờ trong queue.
[normal] Nhưng SQS không phải phép màu [cười].
[calm] Standard Queue sử dụng cơ chế at-least-once delivery, nghĩa là một message có thể được giao nhiều lần và thứ tự không được bảo đảm tuyệt đối.
[calm] Vì vậy, consumer cần được thiết kế để xử lý message trùng lặp an toàn.
[calm] Những message liên tục thất bại có thể được chuyển sang Dead Letter Queue để điều tra.
[calm] Và hãy nhớ: Những giao dịch cốt lõi như kiểm tra tồn kho và xác nhận thanh toán vẫn cần cơ chế xử lý nhất quán riêng.
[calm] Không nên đơn giản đưa toàn bộ giao dịch vào queue rồi xem như đã giải quyết xong.
[pause:0.9s]

# CHAPTER 09 – PREPARING FOR THE FLASH SALE
[normal] Một câu hỏi quan trọng khác là: Liệu chúng ta có thể đợi đến khi website quá tải rồi mới bắt đầu mở rộng không?
[normal] Câu trả lời là không nên [cười].
[calm] Đối với một chương trình Flash Sale đã được lên lịch trước, đội ngũ kỹ thuật hoàn toàn có thể chuẩn bị hệ thống từ trước.
[calm] Đầu tiên, họ cần thực hiện Load Testing.
[calm] Thay vì chờ khách hàng truy cập thật, chúng ta mô phỏng nhiều người dùng cùng gửi request đến hệ thống.
[calm] Mục đích là tìm ra giới hạn hiện tại.
[calm] Ví dụ, server bắt đầu chậm ở mức traffic nào?
[calm] Database bắt đầu nghẽn khi nào?
[calm] Có bao nhiêu request mỗi giây trước khi tỷ lệ lỗi tăng mạnh?
[calm] Sau đó, đội kỹ thuật sử dụng kết quả này để lựa chọn cấu hình và capacity phù hợp.
[calm] Với AWS, chúng ta có thể thiết lập Scheduled Scaling để tăng số lượng EC2 Instances trước thời điểm Flash Sale.
[calm] Ngoài ra, hệ thống cũng cần kiểm tra service quotas, giới hạn kết nối database, mức tiêu thụ queue và ngân sách dự kiến.
[calm] Nếu có lượng traffic không hợp lệ từ bot, các lớp bảo vệ như AWS WAF cũng có thể hỗ trợ lọc và giới hạn request.
[calm] Vì vậy, một hệ thống tốt không chỉ biết phản ứng khi có sự cố.
[calm] Nó còn phải được chuẩn bị để giảm khả năng sự cố xảy ra ngay từ đầu.
[pause:0.9s]

# CHAPTER 10 – FOLLOW ONE ORDER THROUGH AWS
[calm] Hãy cùng theo dõi một đơn hàng từ lúc người dùng nhấn nút mua cho đến khi hệ thống xử lý xong.
[calm] Đầu tiên, người dùng truy cập website.
[calm] Những nội dung tĩnh như hình ảnh, CSS và JavaScript có thể được phân phối thông qua CloudFront.
[calm] Khi người dùng cần thực hiện một hành động, chẳng hạn gửi request đặt hàng, request sẽ đi đến Application Load Balancer.
[calm] ALB chuyển request đến một EC2 Instance đang hoạt động bình thường.
[calm] Ứng dụng tiếp nhận request và kiểm tra thông tin sản phẩm, tình trạng tồn kho cũng như các điều kiện cần thiết.
[calm] Những truy vấn đọc lặp lại có thể được phục vụ từ ElastiCache, trong khi các thao tác ghi quan trọng được thực hiện tại database.
[calm] Sau khi đơn hàng được tiếp nhận và trạng thái giao dịch đã được xử lý theo đúng logic nghiệp vụ, ứng dụng có thể gửi các sự kiện hoặc message vào Amazon SQS.
[calm] Những background workers sẽ lấy message ra để gửi email, tạo hóa đơn hoặc đồng bộ với các hệ thống khác.
[calm] Trong suốt quá trình đó, CloudWatch theo dõi trạng thái hoạt động của các thành phần.
[calm] Nếu lượng traffic tăng, Auto Scaling có thể bổ sung thêm năng lực xử lý.
[calm] Nếu một server gặp lỗi, Load Balancer có thể ngừng gửi request đến server đó.
[calm] Như vậy, mỗi thành phần đảm nhiệm một vai trò riêng thay vì bắt một server duy nhất xử lý mọi thứ.
[pause:0.9s]

# CHAPTER 11 – THE REAL ANSWER
[normal] [hắng giọng] Vậy cuối cùng, một trăm nghìn người truy cập cùng lúc có khiến website bị sập hay không?
[calm] Câu trả lời là còn phụ thuộc vào cách hệ thống được thiết kế và chuẩn bị.
[calm] AWS cung cấp những dịch vụ giúp doanh nghiệp phân phối traffic, cache nội dung, mở rộng tài nguyên, xử lý công việc bất đồng bộ và giám sát toàn bộ hệ thống.
[calm] Nhưng nếu database vẫn quá tải, nếu ứng dụng có truy vấn kém hiệu quả, nếu những server mới không khởi động kịp hoặc nếu kiến trúc có một điểm lỗi duy nhất, website vẫn có thể gặp sự cố.
[calm] Vì vậy, xây dựng một hệ thống có khả năng chịu tải lớn không chỉ là việc lựa chọn thật nhiều dịch vụ AWS.
[calm] Đó là bài toán thiết kế kiến trúc, kiểm thử, tối ưu hiệu năng, quản lý chi phí và chuẩn bị cho những tình huống xấu nhất.
[calm] Lần tới khi bạn truy cập một website lớn và mọi thứ vẫn hoạt động bình thường dù có hàng trăm nghìn người đang sử dụng, hãy nhớ rằng phía sau trải nghiệm đơn giản đó có thể là cả một hệ thống phân tán rất phức tạp.
[normal] Đây là cách AWS giúp giải quyết một trong những bài toán lớn nhất của thế giới công nghệ: Làm thế nào để một hệ thống vẫn hoạt động khi hàng triệu người cùng muốn sử dụng nó?
[pause:0.8s]
[calm] Cảm ơn bạn đã theo dõi.
[calm] Hẹn gặp lại trong tập tiếp theo của AWS Behind the Cloud.


# Cấu trúc
- Định dạng: explainer dài 16:9, Một vấn đề thực tế, Một thách thức công nghệ, Một giải pháp AWS, Cách hệ thống hoạt động.
- Lời hứa: hiểu vì sao 100.000 người truy cập cùng lúc có thể làm sập website và các lớp AWS giúp hệ thống chịu tải.
- Chương 1: hook Flash Sale, tình huống quá tải, câu hỏi mở.
- Chương 2: 100.000 người không bằng 100.000 request mỗi giây, các chỉ số tải.
- Chương 3: một server thất bại, Vertical Scaling và Horizontal Scaling.
- Chương 4 đến 8: bốn lớp giải pháp CloudFront và S3, ALB, EC2 Auto Scaling, database và ElastiCache, SQS.
- Chương 9: chuẩn bị trước Flash Sale bằng load testing, Scheduled Scaling, quotas, WAF.
- Chương 10: theo một đơn hàng qua toàn bộ kiến trúc.
- Chương 11: payoff, câu trả lời là phụ thuộc vào thiết kế và chuẩn bị.
