[normal] Bạn vừa thanh toán hai mươi triệu đồng cho một chiếc điện thoại.
[tense] Nhưng màn hình cứ loading mãi không kết thúc.
[tense] Bạn bắt đầu lo lắng và nhấn nút thanh toán thêm lần nữa.
[tense] Điều gì sẽ xảy ra nếu cả hai lần đều thành công?
[pause:0.6s]
[tense] Điều nguy hiểm là giao dịch đầu tiên có thể đã thành công ở server, nhưng phản hồi lại không đến được điện thoại của bạn.
[normal] Hệ thống không biết bạn đã được thanh toán hay chưa.
[tense] Nếu xử lý request thứ hai như một giao dịch mới, bạn có thể bị trừ tiền hai lần.
[normal] Đây là lúc một nguyên tắc quan trọng xuất hiện, Idempotency.
[calm] Hiểu đơn giản, dù một request được gửi lại nhiều lần, hệ thống vẫn chỉ thực hiện tác động nghiệp vụ một lần.
[normal] Khi bắt đầu thanh toán, ứng dụng tạo một mã định danh duy nhất, gọi là Idempotency Key.
[normal] Nếu request gặp timeout và cần gửi lại, ứng dụng sử dụng chính mã này, để backend biết rằng đây vẫn là cùng một yêu cầu.
[normal] Trên AWS, mình có thể sử dụng API Gateway kết hợp AWS Lambda.
[normal] Lambda có thể dùng Powertools Idempotency Utility, với DynamoDB làm nơi lưu trạng thái request.
[normal] Lần đầu tiên, hệ thống ghi nhận yêu cầu đang xử lý, thực hiện nghiệp vụ và lưu lại kết quả thành công.
[normal] Khi request được gửi lại với cùng key, Lambda kiểm tra DynamoDB và phát hiện yêu cầu đã được xử lý.
[normal] Thay vì thanh toán thêm lần nữa, hệ thống trả về kết quả đã lưu trước đó.
[normal] Còn với cổng thanh toán bên ngoài, backend cũng gửi kèm chính key đó, nếu cổng hỗ trợ, để phía cổng cũng không trừ tiền lần nữa.
[calm] Người dùng nhận được xác nhận giao dịch thành công, nhưng chỉ có một giao dịch được ghi nhận.
[pause:0.6s]
[calm] Đó chính là Idempotency.
[normal] Một kỹ thuật cực kỳ quan trọng trong các hệ thống thanh toán, đặt hàng và xử lý giao dịch phân tán.
[calm] Vì đôi khi, điều quan trọng không phải là hệ thống có thể xử lý request bao nhiêu lần, mà là nó chỉ tạo ra một kết quả đúng!
[normal] Góc nhìn DEV - AWS: Behind the Cloud.
[normal] Hẹn gặp bạn ở tập tiếp theo!

# Cấu trúc
- Format: Explainer
- Core promise: hiểu vì sao bấm thanh toán hai lần mà không bị trừ tiền hai lần, nhờ Idempotency Key, AWS Lambda, Powertools và DynamoDB
- Câu 1-4: Hook, màn hình loading và lần bấm thứ hai
- Câu 5-7: Vấn đề thực tế, giao dịch thành công nhưng phản hồi bị mất, nguy cơ trừ tiền hai lần
- Câu 8-9: Thách thức công nghệ, khái niệm Idempotency
- Câu 10-11: Idempotency Key, cùng một mã cho request gửi lại
- Câu 12-14: Giải pháp AWS, API Gateway, Lambda, Powertools Idempotency Utility, DynamoDB ghi INPROGRESS rồi COMPLETE
- Câu 15-18: Cách hệ thống hoạt động, request gửi lại nhận kết quả đã lưu, cổng thanh toán nhận cùng key, payoff ở câu 18
- Câu 19-20: Reveal, tên kỹ thuật và nơi dùng
- Câu 21: Thông điệp kết, một kết quả đúng
- Câu 22-23: End card của kênh
