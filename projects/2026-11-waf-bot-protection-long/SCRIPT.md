# CHAPTER 01 – THE ATTACK BEGINS
[calm] Hãy tưởng tượng bạn đang vận hành một website bán vé concert.
[calm] Bạn vừa công bố một chương trình mở bán vé cho một sự kiện lớn.
[tense] Hàng chục nghìn người đang chờ đợi.
[tense] Khi thời điểm mở bán đến, lượng truy cập tăng vọt.
[tense] Nhưng có một vấn đề.
[tense] Không phải tất cả request đều đến từ khách hàng thật.
[tense] Một lượng lớn traffic bất thường liên tục gửi request đến website.
[tense] Một số hệ thống tự động thử đăng nhập, một số thu thập thông tin giá vé, trong khi những nguồn khác liên tục gọi vào API để tìm kiếm sản phẩm và kiểm tra tình trạng vé.
[tense] Traffic tăng nhanh đến mức ứng dụng bắt đầu phản hồi chậm.
[tense] Các kết nối database tăng lên.
[tense] Những request hợp lệ của khách hàng bị chậm hoặc timeout.
[tense] Trong trường hợp nghiêm trọng, website có thể không còn phục vụ được người dùng.
[pause:0.6s]
[calm] Đây là một trong những vấn đề bảo mật phổ biến đối với những ứng dụng có thể truy cập công khai trên Internet.
[normal] Vậy làm thế nào AWS có thể giúp chúng ta phát hiện và ngăn chặn những request độc hại trước khi chúng đến server?
[pause:0.9s]

# CHAPTER 02 – UNDERSTANDING BOTS AND DDOS
[calm] Trước tiên, chúng ta cần hiểu bot là gì.
[calm] Bot đơn giản là một chương trình có khả năng tự động thực hiện các hành động mà bình thường con người phải thao tác trên website.
[normal] Nhưng không phải bot nào cũng xấu.
[calm] Ví dụ, Google sử dụng crawler để thu thập dữ liệu website và phục vụ kết quả tìm kiếm.
[calm] Các hệ thống monitoring cũng sử dụng bot để kiểm tra website có đang hoạt động hay không.
[calm] Vấn đề chỉ xuất hiện khi những chương trình tự động này thực hiện các hành vi gây hại.
[calm] Hãy tưởng tượng một số tình huống.
[calm] Đầu tiên, một bot liên tục tải thông tin sản phẩm và giá bán để sao chép dữ liệu từ website đối thủ.
[calm] Thứ hai, một bot tự động thử hàng nghìn tổ hợp username và password để tìm cách đăng nhập vào tài khoản người dùng.
[calm] Đây được gọi là Credential Stuffing.
[calm] Thứ ba, bot tự động mua hoặc giữ vé concert để bán lại với giá cao hơn.
[calm] Và cuối cùng, nhiều bot có thể phối hợp gửi lượng request cực lớn đến cùng một hệ thống để làm gián đoạn dịch vụ.
[calm] Đây là lúc chúng ta bắt đầu nói đến DDoS, viết tắt của Distributed Denial of Service.
[normal] Một điều cần nhớ là bot traffic và DDoS có liên quan nhưng không đồng nghĩa với nhau.
[calm] Một bot có thể gây hại mà không tham gia DDoS.
[calm] Và một cuộc DDoS cũng không nhất thiết chỉ sử dụng bot theo nghĩa thông thường.
[pause:0.9s]

# CHAPTER 03 – UNDERSTANDING ATTACK LAYERS
[calm] Để hiểu AWS bảo vệ website như thế nào, chúng ta cần phân biệt hai nhóm tấn công phổ biến.
[calm] Nhóm thứ nhất là Network-layer và Transport-layer attacks.
[calm] Đây là những cuộc tấn công nhắm vào tầng mạng và tầng vận chuyển, chẳng hạn như UDP flood hoặc TCP SYN flood.
[calm] Mục tiêu là làm cạn kiệt băng thông, tài nguyên mạng hoặc trạng thái kết nối của hệ thống.
[calm] Nhóm thứ hai là Application-layer attacks, thường được gọi là Layer bảy attacks.
[calm] Thay vì gửi những gói tin bất thường, kẻ tấn công gửi các request HTTP hoặc HTTPS trông rất giống hoạt động bình thường của người dùng.
[calm] Ví dụ, liên tục gọi API tìm kiếm sản phẩm, tải trang đăng nhập hoặc truy cập một endpoint đắt đỏ về tài nguyên xử lý.
[normal] Đây là dạng tấn công khó phát hiện hơn vì nhiều request có thể hợp lệ về mặt giao thức.
[calm] Một hệ thống chỉ kiểm tra xem request có đúng định dạng hay không sẽ không đủ để xác định nó có ý đồ xấu.
[calm] Vì vậy, chúng ta cần nhiều lớp bảo vệ khác nhau.
[normal] Và hai dịch vụ quan trọng nhất trong kiến trúc AWS ở đây là AWS Shield và AWS WAF.
[pause:0.9s]

# CHAPTER 04 – AWS SHIELD: PROTECT THE INFRASTRUCTURE
[normal] Đầu tiên là AWS Shield.
[calm] Đây là dịch vụ bảo vệ DDoS được AWS quản lý.
[calm] AWS Shield có hai cấp độ chính: Standard và Advanced.
[calm] AWS Shield Standard được cung cấp tự động cho khách hàng AWS mà không cần trả thêm phí riêng.
[calm] Nó bảo vệ trước nhiều dạng DDoS phổ biến ở Layer ba và Layer bốn, đặc biệt khi ứng dụng sử dụng những dịch vụ như Amazon CloudFront, Route 53 hoặc AWS Global Accelerator.
[calm] Điều này có nghĩa là hệ thống đã có một lớp bảo vệ cơ bản ngay từ đầu.
[calm] Nhưng đối với những doanh nghiệp có ứng dụng quan trọng, cần khả năng giám sát và bảo vệ nâng cao hơn, AWS còn có Shield Advanced.
[calm] Shield Advanced cung cấp thêm khả năng phát hiện, giảm thiểu các cuộc tấn công phức tạp, hỗ trợ tự động giảm thiểu DDoS ở Layer bảy và cho phép tiếp cận đội ngũ Shield Response Team của AWS, hoạt động hỗ trợ hai mươi bốn giờ mỗi ngày.
[calm] Tuy nhiên, Shield Advanced là dịch vụ có tính phí và cần được cấu hình đúng cho các tài nguyên cần bảo vệ.
[normal] Và còn một điều quan trọng.
[normal] AWS Shield không thay thế hoàn toàn tường lửa ứng dụng web.
[calm] Để kiểm tra các request HTTP cụ thể, chúng ta cần một công cụ khác.
[pause:0.9s]

# CHAPTER 05 – AWS WAF: INSPECT EVERY REQUEST
[normal] Đó chính là AWS WAF, hay AWS Web Application Firewall.
[calm] Hãy tưởng tượng AWS WAF như một nhân viên an ninh đang kiểm tra mọi người trước khi họ bước vào một tòa nhà.
[calm] Thay vì chỉ nhìn vào địa chỉ IP, WAF có thể kiểm tra nhiều đặc điểm khác nhau của một HTTP request.
[calm] Ví dụ, request đến từ IP nào, sử dụng đường dẫn nào, có query string gì, header ra sao hoặc nội dung request có chứa những dấu hiệu độc hại hay không.
[calm] Các quy tắc này được quản lý trong một thành phần gọi là Web ACL.
[calm] Một Web ACL có thể chứa nhiều rule.
[calm] Ví dụ, bạn có thể chặn những địa chỉ IP đã biết là độc hại, áp dụng các managed rules để phát hiện những dạng request nguy hiểm hoặc giới hạn số lượng request đến một endpoint nhạy cảm.
[calm] Khi request đến, WAF đánh giá nó theo thứ tự rule đã cấu hình.
[calm] Tùy thuộc vào kết quả, request có thể được cho phép tiếp tục, bị chặn hoặc phải vượt qua CAPTCHA hay Challenge.
[calm] Và vì WAF có thể được đặt tại lớp CloudFront edge, nhiều request đáng ngờ có thể bị xử lý trước khi đến origin server.
[calm] Như vậy, chúng ta không cần để mọi request đều đi sâu vào hệ thống ứng dụng rồi mới quyết định có nên xử lý hay không.
[pause:0.9s]

# CHAPTER 06 – RATE-BASED RULES
[calm] Một trong những tính năng đơn giản nhưng rất hữu ích của AWS WAF là Rate-based Rules.
[calm] Giả sử một endpoint đăng nhập bình thường chỉ nhận một lượng request tương đối ổn định.
[tense] Nhưng đột nhiên, một nguồn gửi hàng nghìn request trong một khoảng thời gian ngắn.
[calm] Chúng ta có thể tạo một Rate-based Rule để đếm số lượng request và giới hạn những nguồn gửi quá nhanh.
[calm] Ví dụ, chúng ta có thể áp dụng ngưỡng riêng cho endpoint đăng nhập thay vì dùng chung một ngưỡng cho toàn bộ website.
[calm] WAF sẽ theo dõi request theo các tiêu chí tổng hợp được cấu hình, chẳng hạn địa chỉ IP.
[calm] Khi vượt giới hạn, rule có thể áp dụng những hành động phù hợp.
[normal] Tuy nhiên, đây không phải giải pháp hoàn hảo.
[calm] Một cuộc tấn công phân tán có thể sử dụng rất nhiều IP khác nhau.
[calm] Mỗi IP chỉ gửi một lượng request nhỏ nhưng tổng cộng lại gây tải rất lớn.
[calm] Ngược lại, một văn phòng hoặc mạng di động có thể có nhiều người dùng thật chia sẻ cùng một IP công cộng.
[calm] Nếu giới hạn quá chặt, chúng ta có thể vô tình chặn cả khách hàng hợp lệ.
[calm] Vì vậy, giới hạn request cần được thiết kế theo hành vi sử dụng thực tế của từng endpoint.
[pause:0.9s]

# CHAPTER 07 – AWS WAF BOT CONTROL
[normal] Nhưng nếu chúng ta muốn nhận diện bot thay vì chỉ đếm số lượng request thì sao?
[calm] Đây là lúc AWS WAF Bot Control phát huy tác dụng.
[calm] Bot Control là một managed rule group của AWS WAF, được thiết kế để giúp nhận diện và kiểm soát những hoạt động tự động trên website.
[calm] Nó có hai cấp độ bảo vệ chính.
[calm] Đầu tiên là Common Protection.
[calm] Cấp độ này nhận diện các bot phổ biến thông qua những đặc điểm như User-Agent, địa chỉ IP và các dấu hiệu trong request.
[calm] Nó có thể giúp nhận diện những crawler hoặc scraper tự khai báo danh tính của chúng.
[calm] Cấp độ thứ hai là Targeted Protection.
[calm] Đây là lớp nâng cao hơn, được thiết kế để nhận diện những bot tinh vi cố gắng che giấu danh tính.
[calm] AWS sử dụng nhiều kỹ thuật như kiểm tra trình duyệt, TLS fingerprinting, phân tích hành vi và machine learning để đánh giá traffic.
[calm] Với những request đáng ngờ, Bot Control có thể kết hợp rate limiting, CAPTCHA hoặc browser challenge nhằm khiến việc tự động hóa trở nên khó khăn hơn.
[calm] Ví dụ, Googlebot đã được xác minh có thể được cho phép truy cập để thu thập dữ liệu phục vụ tìm kiếm.
[calm] Trong khi đó, một nhóm bot scraping không đáng tin cậy có thể bị giới hạn hoặc chặn.
[normal] Vì vậy, thay vì hỏi tất cả request có phải bot hay không, chúng ta cần hỏi: Đây là bot nào, đang làm gì và có được phép thực hiện hành động này không?
[calm] Lưu ý, Bot Control là managed rule group có chi phí bổ sung, cần xem xét cấu hình và mức độ bảo vệ phù hợp với ứng dụng.
[pause:0.9s]

# CHAPTER 08 – ANTI-DDOS MANAGED RULE GROUP
[normal] Bây giờ, hãy quay lại tình huống khó hơn.
[tense] Một lượng lớn request HTTP được gửi đến website từ nhiều nguồn khác nhau.
[tense] Các request đều có vẻ hợp lệ, nhưng tổng lưu lượng tăng bất thường và đang gây áp lực lên hệ thống.
[calm] Đây là một dạng HTTP Request Flood, hay Layer bảy DDoS.
[calm] Để giải quyết bài toán này, AWS cung cấp AWS WAF Anti-DDoS Managed Rule Group.
[calm] Đây là một lớp bảo vệ nâng cao trong AWS WAF.
[calm] Rule group này có thể theo dõi đặc điểm traffic, xác định những request có khả năng tham gia vào một cuộc tấn công DDoS và gắn nhãn cho chúng.
[calm] Một điểm quan trọng là hệ thống có thể phân biệt những đợt tăng traffic hợp lệ với những dấu hiệu của HTTP flood dựa trên baseline và các tín hiệu phát hiện.
[calm] Đối với request đáng ngờ, nó có thể sử dụng biện pháp mềm như browser challenge.
[calm] Nếu xác định mức độ nguy hiểm cao hơn, hệ thống có thể chặn request.
[normal] Đây là một tính năng quan trọng vì không phải cứ traffic tăng mạnh là đang có tấn công.
[calm] Ví dụ, một website bán hàng có thể nhận lượng truy cập rất lớn trong ngày Flash Sale.
[calm] Nếu chúng ta chặn toàn bộ request chỉ vì số lượng tăng cao, khách hàng thật cũng sẽ không thể mua hàng.
[calm] Theo tài liệu AWS hiện hành, từ ngày hai mươi sáu tháng ba năm hai nghìn không trăm hai mươi sáu, Anti-DDoS Managed Rule Group trở thành giải pháp mặc định mới được AWS hướng dẫn cho việc bảo vệ trước HTTP request flood ở Layer bảy.
[calm] Đây là một lớp bảo vệ cần được cấu hình phù hợp, không phải tính năng tự động có sẵn cho mọi website mà không cần triển khai.
[pause:0.9s]

# CHAPTER 09 – PROTECTING THE ORIGIN
[calm] Đến đây, chúng ta đã có CloudFront, AWS Shield và AWS WAF.
[normal] Nhưng vẫn còn một sai lầm rất nguy hiểm mà nhiều hệ thống có thể mắc phải.
[normal] Đó là để origin server có thể truy cập trực tiếp từ Internet.
[calm] Hãy tưởng tượng website của bạn đã được bảo vệ qua CloudFront và WAF.
[tense] Nhưng nếu kẻ tấn công biết địa chỉ IP của Application Load Balancer, họ có thể thử gửi request trực tiếp đến origin, bỏ qua lớp bảo vệ ở phía trước.
[calm] Vì vậy, kiến trúc phải đảm bảo rằng origin chỉ chấp nhận traffic đến từ những nguồn được phép.
[calm] Ví dụ, bạn có thể giới hạn Security Group của Application Load Balancer chỉ nhận traffic từ AWS CloudFront origin-facing managed prefix list.
[calm] Ngoài ra, có thể sử dụng một custom secret header giữa CloudFront và origin, sau đó kiểm tra header này tại lớp ứng dụng hoặc WAF.
[calm] Bằng cách đó, những request đi thẳng đến origin mà không có thông tin xác thực phù hợp sẽ bị từ chối.
[calm] Đây là một bước rất quan trọng để tránh việc lớp bảo vệ phía trước bị vô hiệu hóa chỉ vì origin vẫn mở công khai.
[pause:0.9s]

# CHAPTER 10 – MONITORING AND VISIBILITY
[normal] Một hệ thống bảo mật tốt không chỉ biết chặn request.
[calm] Nó còn phải cho đội ngũ kỹ thuật biết điều gì đang xảy ra.
[calm] AWS WAF cung cấp dashboard giúp theo dõi traffic, các rule được kích hoạt và số lượng request đã bị chặn hoặc yêu cầu xác minh.
[calm] Bot Control cũng có dashboard riêng để hiển thị các loại bot và hoạt động của chúng.
[calm] Khi kết hợp với Amazon CloudWatch và logging, đội ngũ vận hành có thể phân tích xu hướng traffic, phát hiện những endpoint đang bị nhắm mục tiêu và đánh giá hiệu quả của từng rule.
[normal] Điều này rất quan trọng trong thực tế.
[calm] Bởi vì nếu một rule vô tình chặn quá nhiều người dùng thật, bạn cần phát hiện và điều chỉnh nó càng sớm càng tốt.
[calm] Một cách triển khai thận trọng là bắt đầu bằng chế độ Count.
[calm] Khi đó, WAF ghi nhận những request khớp với rule nhưng chưa thực sự chặn chúng.
[calm] Đội ngũ kỹ thuật có thể quan sát kết quả, xác nhận rule hoạt động đúng rồi mới chuyển sang Block, CAPTCHA hoặc Challenge.
[calm] Như vậy, chúng ta vừa tăng cường bảo mật, vừa giảm nguy cơ ảnh hưởng đến khách hàng hợp lệ.
[pause:0.9s]

# CHAPTER 11 – THE COMPLETE ARCHITECTURE
[calm] Hãy cùng tổng kết toàn bộ kiến trúc.
[calm] Khi người dùng truy cập website, Route 53 giúp phân giải tên miền.
[calm] Traffic đi qua CloudFront, nơi hệ thống có thể phân phối nội dung từ mạng lưới edge toàn cầu.
[calm] AWS Shield cung cấp lớp bảo vệ DDoS cơ bản ở tầng mạng và tầng vận chuyển.
[calm] AWS WAF kiểm tra các request HTTP và HTTPS thông qua Web ACL.
[calm] Những request gửi quá nhanh có thể được kiểm soát bằng Rate-based Rules.
[calm] Những bot tự động có thể được phân loại thông qua Bot Control.
[calm] Những cuộc tấn công HTTP Flood ở tầng ứng dụng có thể được phát hiện và giảm thiểu bằng Anti-DDoS Managed Rule Group.
[calm] Nếu doanh nghiệp cần khả năng bảo vệ DDoS nâng cao và đội ngũ chuyên gia hỗ trợ, AWS Shield Advanced là một lựa chọn bổ sung.
[calm] Cuối cùng, chỉ những request được phép mới tiếp tục đến Application Load Balancer và backend.
[calm] Toàn bộ hệ thống được theo dõi thông qua dashboard, metrics và logs.
[normal] Nhưng hãy nhớ một điều.
[normal] Không có một dịch vụ nào có thể đảm bảo website miễn nhiễm với mọi cuộc tấn công.
[calm] Một hệ thống bảo mật tốt cần nhiều lớp phòng vệ, những quy tắc được kiểm thử, cơ chế phát hiện sớm và một kế hoạch ứng phó khi sự cố xảy ra.
[calm] Đó là cách AWS giúp doanh nghiệp bảo vệ ứng dụng trước những nguồn traffic độc hại trên Internet.
[normal] Và cũng là lý do tại sao phía sau một website tưởng chừng đơn giản lại có cả một hệ thống bảo mật phức tạp như vậy.
[pause:0.8s]
[calm] Góc nhìn DEV, AWS Behind the Cloud.
[calm] Hẹn gặp bạn ở tập tiếp theo!


# Cấu trúc
- Định dạng: explainer dài 16:9, Một vấn đề thực tế, Một thách thức công nghệ, Một giải pháp AWS, Cách hệ thống hoạt động.
- Lời hứa: hiểu vì sao bot và DDoS có thể làm website ngừng phục vụ và cách AWS Shield, AWS WAF, Bot Control, Anti-DDoS Managed Rule Group phân biệt traffic nào cho qua, traffic nào cần xác minh và traffic nào phải chặn.
- Chương 1, câu 1-14: hook website bán vé concert, traffic bot làm website chậm và lỗi, câu hỏi mở.
- Chương 2, câu 15-30: bot là gì, bot tốt và bot xấu, bốn tình huống gây hại, bot traffic khác DDoS.
- Chương 3, câu 31-41: thách thức công nghệ, tấn công Layer 3 và 4 so với Layer 7.
- Chương 4, câu 42-53: giải pháp AWS Shield Standard và Shield Advanced, giới hạn của Shield.
- Chương 5, câu 54-64: AWS WAF và Web ACL kiểm tra từng request, xử lý tại edge.
- Chương 6, câu 65-77: Rate-based Rules và giới hạn của chúng trước tấn công phân tán.
- Chương 7, câu 78-92: Bot Control, Common Protection và Targeted Protection, câu hỏi đúng là bot nào và đang làm gì.
- Chương 8, câu 93-107: Anti-DDoS Managed Rule Group cho HTTP flood, phân biệt Flash Sale thật với tấn công.
- Chương 9, câu 108-117: bảo vệ origin bằng managed prefix list và custom secret header.
- Chương 10, câu 118-128: giám sát bằng dashboard, CloudWatch, chế độ Count trước khi chặn.
- Chương 11, câu 129-146: cách hệ thống hoạt động từ Route 53 đến backend, nhiều lớp phòng vệ, end card kênh.
- Payoff: câu 144, "Và cũng là lý do tại sao phía sau một website tưởng chừng đơn giản lại có cả một hệ thống bảo mật phức tạp như vậy."
