# CHAPTER 01 – THE DISTANCE PROBLEM
[calm] Hãy tưởng tượng bạn đang ngồi tại Thành phố Hồ Chí Minh, mở trình duyệt và truy cập vào một website.
[calm] Website đó có thể được lưu trữ trên một server đặt tại Mỹ, cách Việt Nam hơn mười hai nghìn kilomet.
[tense] Bạn nhấn Enter.
[tense] Chỉ sau một khoảng thời gian rất ngắn, trang web đã bắt đầu hiển thị.
[tense] Hình ảnh tải lên, chữ xuất hiện và bạn có thể tương tác với website gần như ngay lập tức.
[pause:0.6s]
[normal] Nhưng hãy thử nghĩ về điều này.
[normal] Làm thế nào dữ liệu có thể di chuyển từ một server ở bên kia đại dương đến máy tính của bạn nhanh như vậy?
[normal] Liệu dữ liệu có thực sự phải đi từ Việt Nam sang Mỹ rồi quay trở lại mỗi lần bạn mở một hình ảnh?
[normal] Hay có một công nghệ nào đó đang giúp rút ngắn hành trình này?
[calm] Câu trả lời nằm trong một kiến trúc rất quan trọng của Internet hiện đại: Content Delivery Network, hay CDN.
[normal] Và hôm nay, chúng ta sẽ tìm hiểu cách Amazon CloudFront sử dụng công nghệ này để giúp người dùng truy cập nội dung từ khắp nơi trên thế giới nhanh hơn.
[pause:0.9s]

# CHAPTER 02 – WHY DISTANCE MATTERS
[calm] Trước tiên, chúng ta cần hiểu một khái niệm: Network Latency, hay độ trễ mạng.
[calm] Khi bạn mở một website, trình duyệt gửi request đến server để yêu cầu một nội dung nào đó.
[calm] Server nhận request, xử lý và gửi response trở lại.
[calm] Thời gian cần thiết để dữ liệu di chuyển và phản hồi được gọi là latency.
[calm] Thông thường, khi nói đến Round Trip Time, chúng ta đang nói đến thời gian cho một vòng đi và về của dữ liệu.
[calm] Một trong những yếu tố ảnh hưởng đến latency là khoảng cách vật lý.
[calm] Tín hiệu trong cáp quang di chuyển rất nhanh, nhưng không phải với tốc độ vô hạn.
[calm] Ngoài ra, dữ liệu còn phải đi qua nhiều thiết bị mạng, router, nhà cung cấp Internet và các điểm trung chuyển khác nhau.
[calm] Vì vậy, một request từ Việt Nam đến server tại Mỹ có thể phải trải qua một hành trình mạng dài hơn so với request đến một server đặt ngay trong khu vực.
[calm] Điều này đặc biệt dễ nhận thấy với những ứng dụng cần nhiều lần trao đổi dữ liệu liên tiếp.
[calm] Ví dụ, một trang web có thể phải tải HTML, sau đó tải CSS, JavaScript, hình ảnh và tiếp tục gửi những request khác.
[tense] Nếu mỗi request đều phải đi rất xa, tổng thời gian tải trang có thể tăng lên đáng kể.
[normal] Vậy chúng ta có thể giải quyết vấn đề này bằng cách đặt một server tại mỗi quốc gia không?
[normal] Về lý thuyết, có thể.
[normal] Nhưng triển khai và duy trì hàng trăm cụm server trên toàn thế giới sẽ rất tốn kém và phức tạp.
[normal] Đây chính là lý do CDN ra đời.
[pause:0.9s]

# CHAPTER 03 – HOW THE INTERNET CONNECTS THE WORLD
[calm] Internet không phải là một hệ thống dây cáp duy nhất nối trực tiếp mọi máy tính trên thế giới.
[calm] Nó là một mạng lưới khổng lồ được tạo nên từ rất nhiều mạng khác nhau.
[calm] Các nhà cung cấp Internet, trung tâm dữ liệu, mạng doanh nghiệp và nhà cung cấp dịch vụ cloud đều kết nối với nhau.
[calm] Một phần rất quan trọng của hệ thống này là các tuyến cáp quang biển.
[calm] Đây là những tuyến cáp được đặt dưới đáy đại dương, kết nối các quốc gia và châu lục để truyền tải một lượng dữ liệu khổng lồ.
[calm] Khi bạn truy cập một website đặt ở Mỹ, request và response có thể đi qua nhiều mạng và nhiều tuyến cáp khác nhau.
[calm] Đường đi cụ thể còn phụ thuộc vào hệ thống định tuyến và tình trạng kết nối tại thời điểm đó.
[normal] Điều quan trọng là: khoảng cách không chỉ ảnh hưởng đến việc dữ liệu phải đi xa bao nhiêu, mà còn ảnh hưởng đến hành trình mà dữ liệu cần đi qua.
[normal] Và thay vì đưa tất cả dữ liệu từ một server duy nhất đến mọi người dùng, chúng ta có một cách tiếp cận khác.
[normal] Đó là phân phối những nội dung có thể tái sử dụng đến gần người dùng hơn.
[pause:0.9s]

# CHAPTER 04 – MEET AMAZON CLOUDFRONT
[calm] Amazon CloudFront là một dịch vụ Content Delivery Network của AWS.
[calm] Thay vì bắt tất cả người dùng truy cập trực tiếp vào server gốc, CloudFront sử dụng một mạng lưới phân phối nội dung toàn cầu.
[calm] Những điểm hiện diện trong mạng lưới này được gọi là Point of Presence, hay Edge Locations.
[normal] Ý tưởng rất đơn giản.
[calm] Nếu server gốc đặt tại Mỹ nhưng có rất nhiều người dùng ở Việt Nam, chúng ta có thể lưu các bản sao của những nội dung phù hợp tại các Edge Locations gần người dùng Việt Nam.
[calm] Khi một người dùng truy cập, CloudFront sẽ định tuyến request đến một Edge Location có thể phục vụ tốt nhất, thường là điểm có latency thấp nhất đối với người dùng đó.
[calm] CloudFront kiểm tra xem nội dung được yêu cầu có đang nằm trong cache hay không.
[calm] Nếu có, nó trả kết quả trực tiếp từ edge.
[calm] Nếu chưa có, nó sẽ đi tìm nội dung ở các lớp cache trung gian hoặc lấy từ server gốc.
[calm] Như vậy, CloudFront không nhất thiết phải lưu toàn bộ website tại mọi quốc gia.
[calm] Nó chỉ cần lưu những nội dung phù hợp với quy tắc cache được cấu hình.
[pause:0.9s]

# CHAPTER 05 – AWS EDGE LOCATIONS IN VIETNAM
[normal] Và đây là một thông tin rất thú vị đối với người dùng tại Việt Nam.
[normal] AWS đã chính thức công bố việc triển khai CloudFront Edge Locations tại Hà Nội và Thành phố Hồ Chí Minh vào ngày hai mươi sáu tháng tám năm hai nghìn không trăm hai mươi hai.
[calm] Điều đó có nghĩa là, trong ví dụ của chúng ta, một người dùng tại Thành phố Hồ Chí Minh có thể được phục vụ nội dung thông qua một CloudFront Edge Location tại Việt Nam.
[normal] Hãy chú ý: Edge Location không giống một AWS Region.
[calm] Nó không phải là một trung tâm dữ liệu đầy đủ để chạy toàn bộ hệ thống backend của bạn.
[calm] Nó đóng vai trò là điểm phân phối nội dung và xử lý những chức năng được hỗ trợ tại edge.
[calm] Server gốc vẫn có thể nằm tại Mỹ.
[calm] Database vẫn có thể nằm tại một AWS Region ở Mỹ.
[calm] Nhưng những nội dung được phép cache có thể được lưu tại các Edge Locations để phục vụ người dùng tại Việt Nam.
[calm] Điều này giúp giảm khoảng cách của hành trình cuối cùng từ nơi phân phối nội dung đến thiết bị người dùng.
[normal] Đây chính là nền tảng của ý tưởng đưa dữ liệu đến gần người dùng hơn.
[pause:0.9s]

# CHAPTER 06 – CACHE HIT
[normal] Để hiểu tại sao cách hoạt động này hiệu quả, chúng ta hãy bắt đầu với khái niệm đầu tiên: Cache Hit.
[calm] Giả sử bạn mở một trang sản phẩm.
[calm] Trang này cần tải hình ảnh, logo, file CSS và JavaScript.
[calm] Nếu website đã được cấu hình đúng, những nội dung này có thể được lưu trong CloudFront cache.
[calm] Khi trình duyệt gửi request để lấy hình ảnh sản phẩm, request được chuyển đến CloudFront Edge Location phù hợp.
[calm] CloudFront tìm kiếm nội dung trong cache.
[normal] Và lần này, nó tìm thấy dữ liệu.
[normal] Đây được gọi là Cache Hit.
[calm] Thay vì phải gửi request đến server gốc ở Mỹ để lấy hình ảnh, CloudFront trả nội dung ngay từ Edge Location gần bạn, chẳng hạn một điểm tại Việt Nam, nếu đối tượng đang được cache ở đó và còn hợp lệ.
[calm] Hãy tưởng tượng trước đây bạn phải gọi điện đến một người ở Mỹ để hỏi một thông tin.
[calm] Nhưng bây giờ, người đó đã để sẵn một bản sao thông tin tại một văn phòng gần bạn.
[calm] Mỗi lần bạn cần, chỉ cần đến văn phòng đó để lấy.
[calm] Bạn không còn cần phải gọi điện qua nửa vòng trái đất nữa.
[normal] Đây chính là cách cache giúp tăng tốc độ phân phối nội dung.
[normal] Một điểm quan trọng khác là cache có thời hạn.
[calm] CloudFront sử dụng các thiết lập TTL và những HTTP headers như Cache-Control để xác định thời gian một đối tượng có thể được giữ trong cache.
[calm] Nếu nội dung vẫn còn hợp lệ, CloudFront có thể tiếp tục phục vụ từ edge.
[calm] Vì vậy, một website có nhiều hình ảnh, video và file tĩnh được cấu hình cache tốt có thể giảm đáng kể số lượng request phải quay về origin.
[pause:0.9s]

# CHAPTER 07 – CACHE MISS
[normal] Nhưng điều gì xảy ra nếu người dùng yêu cầu một nội dung chưa từng được truy cập tại Edge Location đó?
[tense] Đó là Cache Miss.
[calm] Hãy tưởng tượng một người dùng ở Việt Nam mở một trang sản phẩm mới vừa được đăng tải.
[calm] CloudFront tìm kiếm hình ảnh trong cache tại Edge Location, nhưng không tìm thấy.
[calm] Thay vì lập tức đi thẳng đến origin trong mọi trường hợp, CloudFront có thể tìm tiếp ở một lớp cache trung gian gọi là Regional Edge Cache.
[calm] Nếu nội dung đã có ở đó, CloudFront lấy dữ liệu từ Regional Edge Cache rồi trả lại cho người dùng.
[calm] Nhưng nếu cả hai nơi đều không có nội dung, CloudFront sẽ gửi request đến Origin Server.
[calm] Origin có thể là Amazon S3, một web server chạy trên EC2, một Application Load Balancer hoặc một HTTP server khác.
[calm] Ví dụ của chúng ta là một server đặt ở Mỹ.
[calm] Server trả về hình ảnh.
[calm] CloudFront bắt đầu chuyển dữ liệu về phía người dùng ngay khi nhận được byte đầu tiên từ origin, đồng thời lưu nội dung vào các tầng cache theo cấu hình.
[calm] Lần sau, khi một người dùng khác tại Việt Nam yêu cầu cùng nội dung, hệ thống có thể trả lời ngay từ cache.
[normal] Và đó chính là sự khác biệt giữa hai trạng thái:
[normal] Cache Hit là tìm thấy dữ liệu.
[normal] Cache Miss là phải đi lấy dữ liệu từ nơi khác.
[calm] CDN càng phục vụ được nhiều request bằng cache hợp lệ, origin càng ít phải xử lý những request lặp lại.
[pause:0.9s]

# CHAPTER 08 – REGIONAL EDGE CACHE AND ORIGIN SHIELD
[calm] Ngoài Edge Locations, CloudFront còn có một lớp quan trọng khác là Regional Edge Cache.
[calm] Bạn có thể hình dung đây là một tầng bộ nhớ cache trung gian, nằm giữa các Edge Locations và server gốc.
[calm] Regional Edge Cache có dung lượng cache lớn hơn một Edge Location riêng lẻ và giúp giữ lại những nội dung ít phổ biến hơn trong thời gian dài hơn.
[calm] Điều này đặc biệt hữu ích với những nội dung như ảnh do người dùng tải lên, video, ảnh sản phẩm thương mại điện tử hoặc những nội dung chỉ thỉnh thoảng mới có người truy cập.
[normal] AWS còn cung cấp một tính năng nâng cao gọi là Origin Shield.
[calm] Origin Shield tạo thêm một lớp cache tập trung giữa các tầng CloudFront và origin.
[calm] Hãy tưởng tượng có nhiều người dùng ở nhiều quốc gia cùng yêu cầu một file giống nhau.
[calm] Nếu không được tối ưu, nhiều cache location có thể cần lấy cùng một nội dung từ origin.
[calm] Với Origin Shield, những request phù hợp có thể được hợp nhất để giảm các lượt truy cập lặp lại về origin.
[normal] Tuy nhiên, đây là tính năng cần bật riêng và có tính phí bổ sung.
[normal] Không phải mọi website đều cần bật nó.
[pause:0.9s]

# CHAPTER 09 – CACHE POLICY AND TTL
[normal] Vậy ai quyết định dữ liệu nào được lưu trong cache và được lưu trong bao lâu?
[normal] Đó chính là nhiệm vụ của Cache Policy và TTL.
[calm] TTL là viết tắt của Time To Live, thời gian một object có thể được giữ trong cache trước khi cần được kiểm tra hoặc lấy lại theo quy tắc cấu hình.
[calm] Ví dụ, logo của một website rất ít khi thay đổi.
[calm] Bạn có thể cho phép CloudFront cache logo trong thời gian dài hơn.
[calm] Nhưng giá sản phẩm hoặc một nội dung thay đổi liên tục thì cần chiến lược cache khác.
[calm] CloudFront cho phép sử dụng Cache-Control headers như max-age để định nghĩa thời gian cache.
[calm] Ví dụ, max-age bằng ba nghìn sáu trăm nghĩa là object có thể được cache trong một giờ theo thiết lập và các giới hạn TTL tương ứng.
[normal] Ngoài thời gian, còn có một khái niệm rất quan trọng là Cache Key.
[calm] Cache Key quyết định một request có khớp với object đã được lưu trong cache hay không.
[calm] Nó có thể bao gồm URL, query strings, headers và cookies tùy theo cấu hình.
[tense] Nếu cấu hình sai, cache hit ratio có thể thấp hơn mong đợi.
[tense] Nguy hiểm hơn, những dữ liệu cá nhân hóa có thể bị cache sai cách nếu cache key và chính sách lưu trữ không được thiết kế cẩn thận.
[calm] Vì vậy, cache không chỉ là bật một công tắc rồi để hệ thống tự chạy.
[calm] Nó cần được thiết kế dựa trên bản chất của từng loại dữ liệu.
[pause:0.9s]

# CHAPTER 10 – STATIC CONTENT VS DYNAMIC CONTENT
[normal] Đến đây, bạn có thể nghĩ rằng chỉ cần CloudFront là mọi nội dung trên website đều có thể được phân phối từ Việt Nam.
[normal] Nhưng thực tế không phải như vậy.
[calm] Chúng ta cần phân biệt hai loại nội dung.
[calm] Đầu tiên là Static Content.
[calm] Ví dụ như logo, hình ảnh, file CSS, JavaScript và video.
[calm] Những nội dung này thường giống nhau đối với nhiều người dùng và ít thay đổi liên tục.
[calm] Vì vậy, chúng rất phù hợp để lưu trong CDN cache.
[calm] Loại thứ hai là Dynamic Content.
[calm] Ví dụ như thông tin tài khoản, lịch sử mua hàng, giỏ hàng, số dư tài khoản hoặc trạng thái thanh toán.
[calm] Những dữ liệu này phụ thuộc vào từng người dùng và có thể thay đổi liên tục.
[tense] Nếu người A truy cập giỏ hàng, hệ thống không thể trả về dữ liệu giỏ hàng của người B chỉ vì hai người sử dụng cùng một địa chỉ URL.
[calm] Vì vậy, những request động cần được chuyển đến backend để xử lý dữ liệu phù hợp.
[calm] CloudFront vẫn có thể hỗ trợ tối ưu việc phân phối và kết nối với origin, nhưng không thể biến một request cần xử lý tại server Mỹ thành một request hoàn toàn được trả lời tại edge.
[normal] Đây là điểm cần hiểu rõ nếu muốn xây dựng một hệ thống có tốc độ tốt trên phạm vi toàn cầu.
[pause:0.9s]

# CHAPTER 11 – FOLLOW ONE REQUEST
[normal] Hãy cùng tổng kết bằng cách theo dõi một request thực tế.
[calm] Bạn đang ở Thành phố Hồ Chí Minh và mở một website có origin tại Mỹ.
[calm] Trước tiên, trình duyệt gửi request.
[calm] DNS định tuyến request đến CloudFront Point of Presence có thể phục vụ tốt nhất.
[calm] Nếu nội dung đã có trong Edge Location đó, thường là một điểm gần bạn như tại Việt Nam, và còn hợp lệ, CloudFront trả dữ liệu ngay từ đó.
[normal] Đây là Cache Hit.
[calm] Nếu nội dung không có ở edge, CloudFront có thể tìm kiếm tại Regional Edge Cache.
[calm] Nếu vẫn không có, request tiếp tục đến Origin Server ở Mỹ.
[calm] Khi nhận được response, CloudFront chuyển nội dung về người dùng và có thể lưu lại trong cache.
[calm] Lần tiếp theo, một người khác ở Việt Nam yêu cầu cùng nội dung, hệ thống có cơ hội phục vụ ngay từ edge.
[calm] Như vậy, chúng ta không cần phải đưa bản gốc của toàn bộ website về Việt Nam.
[calm] Chỉ cần đặt một mạng lưới phân phối nội dung ở những vị trí chiến lược, sau đó sử dụng caching và routing để đưa dữ liệu đến gần người dùng hơn.
[normal] Đó là cách Amazon CloudFront giải quyết bài toán khoảng cách địa lý.
[pause:0.9s]

# OUTRO – THE REAL ANSWER
[normal] Vậy tại sao bạn ở Việt Nam vẫn có thể truy cập một website đặt tại Mỹ với tốc độ rất nhanh?
[calm] Không phải vì khoảng cách địa lý biến mất.
[calm] Mà bởi vì không phải mọi request đều cần đi hết quãng đường đó.
[calm] CDN như Amazon CloudFront giúp lưu trữ và phân phối những nội dung phù hợp tại các Edge Locations gần người dùng.
[calm] Điều quan trọng không phải đưa mọi thứ đến gần tất cả mọi người, mà là biết dữ liệu nào cần được lưu ở đâu và phục vụ như thế nào.
[calm] Đây chính là một trong những nền tảng giúp Internet hiện đại có thể phục vụ hàng tỷ người dùng trên toàn thế giới.
[pause:0.8s]
[calm] Bạn vừa xem Góc nhìn DEV.
[calm] Hẹn gặp lại trong tập tiếp theo!

# Cấu trúc
- Format: Explainer dài 16:9, Một vấn đề thực tế, Một thách thức công nghệ, Một giải pháp AWS, Cách hệ thống hoạt động.
- Core promise: hiểu vì sao người ở Việt Nam mở website đặt tại Mỹ vẫn tải nhanh, nhờ CloudFront Edge Locations và cache, và giới hạn của cách này.
- Chương 1: hook, người dùng ở Thành phố Hồ Chí Minh mở website đặt tại Mỹ, câu hỏi mở, giới thiệu CDN.
- Chương 2: latency, Round Trip Time, khoảng cách vật lý, nhiều request cộng dồn.
- Chương 3: Internet là mạng của nhiều mạng, cáp quang biển, đưa nội dung đến gần người dùng.
- Chương 4: Amazon CloudFront, Point of Presence, Edge Locations, định tuyến theo latency.
- Chương 5: Edge Locations tại Hà Nội và Thành phố Hồ Chí Minh, Edge Location khác AWS Region.
- Chương 6: Cache Hit, ví dụ văn phòng gần bạn, TTL và Cache-Control.
- Chương 7: Cache Miss, Regional Edge Cache, Origin Server, câu tóm tắt Hit và Miss.
- Chương 8: Regional Edge Cache và Origin Shield, chi phí và khi nào cần.
- Chương 9: Cache Policy, TTL, max-age, Cache Key, rủi ro cache dữ liệu cá nhân hóa.
- Chương 10: Static Content và Dynamic Content, giới hạn của edge.
- Chương 11: theo một request từ Thành phố Hồ Chí Minh qua edge, Regional Edge Cache, origin.
- Outro: payoff ở câu "Mà bởi vì không phải mọi request đều cần đi hết quãng đường đó.", khép câu hỏi của hook, kết bằng tên kênh Góc nhìn DEV.
