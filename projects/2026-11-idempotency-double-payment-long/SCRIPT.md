# CHAPTER 01 – THE DOUBLE PAYMENT PROBLEM
[calm] Hãy tưởng tượng bạn đang mua một chiếc điện thoại trên một website thương mại điện tử.
[calm] Giá trị đơn hàng là hai mươi triệu đồng.
[normal] Bạn nhập thông tin thanh toán, kiểm tra lại đơn hàng rồi nhấn nút Pay Now.
[normal] Màn hình chuyển sang trạng thái Processing.
[tense] Một giây.
[tense] Hai giây.
[tense] Năm giây.
[tense] Nhưng không có gì xảy ra.
[tense] Bạn bắt đầu lo lắng.
[tense] Liệu giao dịch đã thành công chưa?
[tense] Tiền đã bị trừ chưa?
[tense] Hay website đang bị lỗi?
[tense] Không muốn chờ thêm, bạn nhấn nút thanh toán thêm một lần nữa.
[tense] Vài giây sau, ngân hàng thông báo có hai giao dịch trừ tiền cùng một số tiền.
[pause:0.6s]
[normal] Vấn đề nằm ở đâu?
[normal] Có phải người dùng đã bấm sai?
[calm] Không hẳn.
[calm] Đôi khi, lỗi nằm ở cách hệ thống xử lý những request bị gửi lại khi mạng gặp sự cố.
[normal] Và đây là một bài toán rất quan trọng trong kiến trúc phần mềm hiện đại.
[pause:0.9s]

# CHAPTER 02 – WHAT ACTUALLY HAPPENED?
[calm] Để hiểu vấn đề, chúng ta hãy đi sâu vào hệ thống.
[calm] Khi bạn nhấn nút thanh toán, trình duyệt gửi một request đến backend.
[calm] Backend kiểm tra đơn hàng, sau đó gửi yêu cầu đến cổng thanh toán.
[calm] Cổng thanh toán xử lý giao dịch và trả về kết quả thành công.
[normal] Nhưng có một điều xảy ra.
[tense] Response từ backend về trình duyệt bị mất do mạng không ổn định hoặc request timeout.
[normal] Ở phía server, giao dịch đã hoàn thành.
[tense] Nhưng ở phía người dùng, màn hình vẫn đang loading.
[calm] Đây là một tình huống rất phổ biến trong hệ thống phân tán.
[calm] Khi hai hệ thống giao tiếp qua mạng, chúng ta không thể giả định rằng nếu client không nhận được response thì server chưa thực hiện công việc.
[normal] Đó chính là điểm nguy hiểm.
[calm] Client không biết request đã thất bại hay chỉ có response bị mất.
[normal] Vì vậy, nếu nó gửi lại request mà không có cơ chế chống trùng, backend có thể thực hiện nghiệp vụ lần thứ hai.
[calm] Và với một giao dịch thanh toán, tác động của việc này có thể rất nghiêm trọng.
[pause:0.9s]

# CHAPTER 03 – WHY RETRYING IS NECESSARY
[normal] Một câu hỏi đặt ra là, tại sao ứng dụng không đơn giản tránh gửi lại request?
[calm] Bởi vì retry là một cơ chế rất quan trọng để xây dựng hệ thống đáng tin cậy.
[calm] Mạng Internet không phải lúc nào cũng ổn định.
[calm] Server có thể tạm thời không phản hồi.
[calm] Một dịch vụ bên ngoài có thể quá tải.
[calm] Kết nối có thể bị ngắt giữa chừng.
[calm] Nếu chúng ta không thử lại request, một lỗi mạng nhỏ cũng có thể khiến người dùng phải bắt đầu lại toàn bộ quy trình.
[calm] Vì vậy, nhiều hệ thống sử dụng retry để tự động thử lại khi gặp lỗi tạm thời.
[calm] Các SDK của AWS cũng hỗ trợ nhiều cơ chế retry cho những trường hợp phù hợp.
[normal] Nhưng retry lại tạo ra một vấn đề mới.
[tense] Nếu một request có tác động phụ, chẳng hạn tạo đơn hàng, trừ tiền hoặc cấp phát tài nguyên.
[tense] Thì việc thực hiện nó nhiều lần có thể tạo ra nhiều kết quả không mong muốn.
[calm] Chúng ta cần một cơ chế cho phép retry nhưng không lặp lại tác động nghiệp vụ.
[normal] Và đó chính là Idempotency.
[pause:0.9s]

# CHAPTER 04 – WHAT IS IDEMPOTENCY?
[calm] Idempotency là tính chất mà khi thực hiện cùng một thao tác nhiều lần, hệ thống vẫn đạt được cùng một kết quả như khi thực hiện một lần.
[normal] Hãy nhìn vào một ví dụ đơn giản.
[calm] Nếu bạn đặt giá trị tài khoản thành một trăm, thực hiện thao tác đó một lần hay mười lần thì kết quả vẫn là một trăm.
[calm] Đó là một thao tác idempotent.
[calm] Nhưng nếu bạn cộng thêm một trăm vào tài khoản, thực hiện một lần sẽ tăng thêm một trăm, thực hiện mười lần sẽ tăng thêm một nghìn.
[normal] Đây không phải thao tác idempotent.
[calm] Đối với thanh toán, chúng ta không muốn cùng một yêu cầu tạo ra nhiều giao dịch.
[calm] Vì vậy, hệ thống cần biết liệu một request gửi đến có phải là một yêu cầu hoàn toàn mới hay chỉ là một lần thử lại của yêu cầu trước đó.
[normal] Đây là nơi Idempotency Key xuất hiện.
[pause:0.9s]

# CHAPTER 05 – THE IDEMPOTENCY KEY
[calm] Idempotency Key là một mã định danh duy nhất đại diện cho một ý định nghiệp vụ.
[calm] Ví dụ, khi người dùng bắt đầu thanh toán đơn hàng, frontend tạo một UUID và gửi nó kèm request.
[calm] Request có thể mang một header như Idempotency Key.
[calm] Nếu người dùng bị timeout và cần retry, frontend phải sử dụng lại chính key đó.
[calm] Nhờ vậy, backend có thể nhận diện hai request này thuộc cùng một ý định thanh toán.
[normal] Một điểm quan trọng, key cần được tạo một lần cho mỗi checkout intent, chứ không được tạo lại mỗi khi người dùng nhấn nút.
[tense] Nếu mỗi lần bấm lại tạo một key mới, backend sẽ tưởng rằng đó là hai giao dịch khác nhau.
[calm] Ngược lại, nếu khách hàng thật sự muốn mua thêm một sản phẩm bằng một giao dịch mới, hệ thống cần tạo một key mới.
[calm] Điều này giúp phân biệt giữa một lần retry và một hành động mua hàng mới.
[normal] Ngoài ra, backend cần xác thực nội dung request.
[calm] Nếu một key cũ được dùng lại với payload khác, chẳng hạn ban đầu mua điện thoại nhưng lần sau đổi sang laptop.
[calm] Thì hệ thống nên từ chối với lỗi validation, thay vì âm thầm coi chúng là cùng một giao dịch.
[calm] Amazon Builders' Library sử dụng một unique client request identifier để thể hiện ý định rõ ràng của client trong các API an toàn khi retry.
[pause:0.9s]

# CHAPTER 06 – HOW AWS IMPLEMENTS IDEMPOTENCY
[normal] Vậy chúng ta có thể triển khai cơ chế này trên AWS như thế nào?
[calm] Một kiến trúc tham khảo là sử dụng Amazon API Gateway, AWS Lambda và Amazon DynamoDB.
[calm] Đầu tiên, người dùng gửi request thanh toán đến API Gateway cùng Idempotency Key.
[calm] API Gateway chuyển request đến Lambda.
[calm] Trước khi thực hiện logic thanh toán, Lambda kiểm tra Idempotency Key trong một nơi lưu trữ trạng thái.
[calm] Chúng ta có thể sử dụng DynamoDB cho mục đích này.
[calm] Nếu đây là lần đầu tiên key xuất hiện, hệ thống sẽ tạo một bản ghi để đánh dấu request đang được xử lý.
[calm] Sau khi hoàn thành nghiệp vụ, hệ thống cập nhật bản ghi và lưu lại kết quả thành công.
[normal] Nhưng nếu request đã được xử lý trước đó, Lambda không chạy lại toàn bộ nghiệp vụ.
[calm] Thay vào đó, nó có thể trả về response đã lưu.
[normal] Để không phải tự viết toàn bộ logic này, AWS cung cấp AWS Lambda Powertools.
[calm] Đây là một bộ thư viện hỗ trợ xây dựng Lambda functions, trong đó có Idempotency Utility.
[calm] Powertools giúp quản lý key, trạng thái In Progress, Complete, thời gian hết hạn và response đã được xử lý.
[calm] Đây là cách chúng ta có thể biến một Lambda function thành một function an toàn hơn khi nhận các request trùng lặp.
[pause:0.9s]

# CHAPTER 07 – INPROGRESS AND COMPLETE
[normal] Hãy nhìn kỹ hơn vào hai trạng thái quan trọng.
[normal] Đầu tiên là In Progress.
[calm] Khi request xuất hiện lần đầu, hệ thống tạo một bản ghi cho biết yêu cầu đang được xử lý.
[calm] Điều này giúp ngăn nhiều request giống nhau chạy đồng thời và cùng tạo ra tác động phụ.
[calm] Sau khi Lambda thực hiện xong và lưu được kết quả, bản ghi chuyển sang trạng thái Complete.
[calm] Bây giờ, nếu client gửi lại cùng một request với cùng Idempotency Key, hệ thống sẽ tìm thấy bản ghi Complete.
[normal] Thay vì thanh toán lần nữa, nó trả lại kết quả đã được lưu trước đó.
[calm] Vậy nên, dù client gửi một request một lần hay nhiều lần, hệ thống vẫn giữ được một kết quả nhất quán trong phạm vi ý định đó.
[calm] Nếu một request thứ hai đến trong lúc request đầu tiên đang ở trạng thái In Progress, hệ thống cũng cần một cơ chế xử lý đồng thời.
[calm] Nó có thể báo đang xử lý, hoặc yêu cầu client retry sau.
[tense] Nó không được phép để cả hai request cùng thực hiện một side effect mà không có kiểm soát.
[pause:0.9s]

# CHAPTER 08 – WHAT IF TWO REQUESTS ARRIVE AT THE SAME TIME?
[normal] Có một tình huống phức tạp hơn.
[tense] Điều gì xảy ra nếu người dùng nhấn nút liên tục và hai request được gửi đến server gần như cùng một thời điểm?
[tense] Nếu backend chỉ kiểm tra key rồi mới ghi database mà không có cơ chế đồng bộ, cả hai request có thể cùng nhìn thấy key chưa tồn tại.
[tense] Và cả hai đều tưởng mình là request đầu tiên.
[tense] Kết quả là hai giao dịch có thể được thực hiện song song.
[pause:0.6s]
[calm] Để giải quyết vấn đề này, hệ thống cần một thao tác ghi có tính nguyên tử.
[calm] Với DynamoDB, chúng ta có thể dùng Conditional Write để chỉ cho phép tạo bản ghi khi key chưa tồn tại.
[calm] Nếu một request đã tạo thành công, request còn lại sẽ không thể ghi đè bản ghi đó.
[calm] AWS Lambda Powertools cũng có cơ chế lưu trạng thái In Progress để xử lý các request giống nhau đang chạy đồng thời.
[normal] Đây là lý do idempotency không chỉ đơn giản là kiểm tra xem một ID đã tồn tại hay chưa.
[calm] Nó còn phải giải quyết race condition, timeout và những trạng thái xử lý chưa hoàn tất.
[pause:0.9s]

# CHAPTER 09 – THE PAYMENT PROVIDER PROBLEM
[normal] Tuy nhiên, chúng ta vẫn còn một vấn đề rất quan trọng.
[normal] Việc lưu Idempotency Key trong DynamoDB không tự động bảo vệ những hệ thống bên ngoài mà Lambda gọi đến.
[calm] Hãy tưởng tượng Lambda gửi yêu cầu thanh toán đến một Payment Provider.
[calm] Provider đã trừ tiền thành công.
[tense] Nhưng response bị timeout trước khi Lambda nhận được.
[calm] Lúc này, Lambda không thể chỉ dựa vào bản ghi của riêng mình để kết luận chắc chắn rằng giao dịch thất bại.
[tense] Nếu gọi lại Payment Provider bằng một giao dịch mới, khách hàng có thể bị tính tiền thêm lần nữa.
[calm] Vì vậy, nếu cổng thanh toán hỗ trợ idempotency, chúng ta cần truyền cùng một key hoặc một payment operation identifier tương ứng cho cổng đó.
[calm] Nếu provider nhận lại cùng key, nó có thể nhận diện request trùng và trả về kết quả trước đó theo hợp đồng API của họ.
[calm] Nếu provider không hỗ trợ cơ chế này, chúng ta cần thiết kế thêm quy trình kiểm tra trạng thái giao dịch, đối soát và reconciliation.
[calm] Việc này phải xong trước khi gửi lại một payment operation không rõ kết quả.
[normal] Điểm quan trọng là mỗi hệ thống trong chuỗi thanh toán đều phải có cơ chế bảo vệ phù hợp.
[pause:0.9s]

# CHAPTER 10 – SQS AND TRANSACTIONAL OUTBOX
[normal] Và bài toán chống trùng không chỉ xuất hiện khi người dùng bấm nút thanh toán.
[calm] Sau khi tạo đơn hàng, hệ thống có thể phải gửi email, tạo hóa đơn hoặc thông báo cho đơn vị vận chuyển.
[calm] Những công việc này thường được xử lý bất đồng bộ thông qua Amazon SQS.
[normal] Nhưng có một đặc điểm cần lưu ý.
[calm] Amazon SQS Standard Queue sử dụng cơ chế at-least-once delivery.
[calm] Điều đó có nghĩa là trong một số tình huống, một message có thể được giao nhiều hơn một lần.
[calm] Vì vậy, worker nhận message cũng cần có cơ chế idempotency riêng.
[calm] Ví dụ, worker lưu những event ID đã được xử lý và không thực hiện lại tác động nếu nhận cùng event lần nữa.
[normal] Một vấn đề khác là chuyện cập nhật database và gửi message.
[tense] Nếu ứng dụng lưu đơn hàng thành công nhưng gửi message đến SQS thất bại, những hệ thống phía sau có thể không biết đơn hàng đã được tạo.
[calm] Để giải quyết vấn đề này, chúng ta có thể sử dụng Transactional Outbox Pattern.
[calm] Ý tưởng là lưu trạng thái đơn hàng và sự kiện cần gửi vào database trong cùng một transaction.
[calm] Sau đó, một tiến trình khác đọc outbox và gửi sự kiện đến SQS.
[calm] Nhờ vậy, chúng ta giảm nguy cơ dữ liệu và message bị lệch trạng thái.
[calm] AWS Prescriptive Guidance mô tả cách triển khai pattern này với RDS, Lambda và SQS.
[pause:0.9s]

# CHAPTER 11 – EDGE CASES AND LIMITATIONS
[normal] Vậy có phải chỉ cần thêm một Idempotency Key là hệ thống sẽ không bao giờ tạo giao dịch trùng?
[normal] Không hoàn toàn.
[calm] Idempotency cần được thiết kế với một khoảng thời gian lưu trạng thái phù hợp.
[tense] Nếu bản ghi key bị hết hạn quá sớm, một request cũ có thể được xử lý lại như một request mới.
[calm] Ngược lại, nếu lưu mãi mãi, hệ thống có thể tiêu tốn tài nguyên lưu trữ không cần thiết.
[calm] Ngoài ra, nếu Lambda bị timeout khi đang xử lý, bản ghi có thể vẫn ở trạng thái In Progress.
[calm] Hệ thống cần xác định khi nào một operation thực sự đã thất bại, khi nào cần retry và khi nào phải kiểm tra lại trạng thái từ hệ thống bên ngoài.
[normal] Một trường hợp nữa là cùng một key nhưng payload lại khác nhau.
[calm] Ví dụ, request đầu tiên thanh toán hai mươi triệu đồng cho một chiếc điện thoại.
[tense] Nhưng request sau lại sử dụng cùng key để thanh toán ba mươi triệu đồng cho một chiếc laptop.
[calm] Hệ thống cần từ chối trường hợp này thay vì coi nó là cùng một giao dịch.
[calm] Vì vậy, Idempotency Key cần được kết hợp với kiểm tra payload, trạng thái xử lý, thời gian hết hạn và cơ chế reconciliation.
[pause:0.9s]

# CHAPTER 12 – THE REAL SOLUTION
[normal] Vậy tại sao bạn có thể nhấn nút thanh toán nhiều lần mà hệ thống vẫn có thể chỉ thực hiện một giao dịch?
[calm] Bởi vì backend không chỉ dựa vào số lần người dùng nhấn nút.
[calm] Nó dựa vào ý định của người dùng được thể hiện thông qua Idempotency Key.
[calm] Amazon API Gateway tiếp nhận request.
[calm] AWS Lambda xử lý logic.
[calm] DynamoDB lưu trạng thái.
[calm] AWS Lambda Powertools giúp quản lý tính idempotent.
[calm] Cổng thanh toán cũng cần hỗ trợ nhận diện request trùng hoặc có cơ chế reconciliation phù hợp.
[calm] Và các hệ thống phía sau cũng cần tiếp tục bảo vệ trước những message được gửi lại.
[normal] Đó chính là một trong những nguyên tắc quan trọng khi xây dựng các hệ thống phân tán đáng tin cậy.
[calm] Bởi vì trên thực tế, request có thể được gửi nhiều lần.
[normal] Điều quan trọng là hệ thống phải biết khi nào một request là giao dịch mới, và khi nào nó chỉ là một lần thử lại của giao dịch cũ.
[pause:0.8s]
[calm] Góc nhìn DEV - AWS: Behind the Cloud.
[calm] Hẹn gặp bạn ở tập tiếp theo!

# Cấu trúc
- Định dạng: explainer dài 16:9, Một vấn đề thực tế, Một thách thức công nghệ, Một giải pháp AWS, Cách hệ thống hoạt động.
- Lời hứa: hiểu vì sao bấm thanh toán hai lần có thể bị trừ tiền hai lần, và cách Idempotency Key, API Gateway, Lambda, DynamoDB, Powertools cùng cổng thanh toán và hàng đợi phía sau giữ một ý định thanh toán thành một kết quả.
- Chương 1, câu 1-19: hook mua điện thoại hai mươi triệu, màn hình Processing, bấm lại, bị trừ tiền hai lần.
- Chương 2, câu 20-33: response bị mất, server đã xong nhưng client không biết, retry không chống trùng gây trừ tiền lần hai.
- Chương 3, câu 34-46: vì sao retry cần thiết, retry với tác động phụ tạo vấn đề mới, giới thiệu Idempotency.
- Chương 4, câu 47-55: định nghĩa idempotency, ví dụ đặt số dư so với cộng thêm.
- Chương 5, câu 56-67: Idempotency Key theo checkout intent, dùng lại key khi retry, key mới cho giao dịch mới, kiểm tra payload.
- Chương 6, câu 68-81: kiến trúc API Gateway, Lambda, DynamoDB, Powertools là thư viện.
- Chương 7, câu 82-91: trạng thái In Progress và Complete, trả lại kết quả đã lưu.
- Chương 8, câu 92-102: hai request cùng lúc, race condition, Conditional Write của DynamoDB.
- Chương 9, câu 103-113: Payment Provider cần idempotency riêng hoặc đối soát, reconciliation.
- Chương 10, câu 114-128: SQS Standard at-least-once delivery, worker chống trùng, Transactional Outbox Pattern.
- Chương 11, câu 129-140: giới hạn, thời gian hết hạn, Lambda timeout ở In Progress, cùng key khác payload.
- Chương 12, câu 141-154: tổng kết kiến trúc, nguyên tắc hệ thống phân tán, end card kênh.
- Payoff: câu 152, "Điều quan trọng là hệ thống phải biết khi nào một request là giao dịch mới, và khi nào nó chỉ là một lần thử lại của giao dịch cũ."
