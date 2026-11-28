[tense] Nửa đêm, con đường không có đèn, một người mặc áo tối bước xuống lòng đường.
[tense] Mắt người có thể chưa kịp nhận ra, vậy chiếc xe tự lái biết người đó ở đâu?
[normal] Mình sẽ cùng bạn theo một tia sáng đi vào bên trong cảm biến LiDAR để tìm câu trả lời.
[normal] Bạn sẽ thấy nó đo khoảng cách bằng thời gian, rồi dựng con đường thành khoảng một triệu điểm mỗi giây.
[normal] LiDAR là viết tắt của Light Detection and Ranging, nghĩa là dò tìm và đo khoảng cách bằng ánh sáng.
[normal] Theo một bài tổng quan năm 2020, phần lớn xe tự lái cấp cao dùng LiDAR.
[normal] Camera trên xe là cảm biến thụ động, nó ghi lại ánh sáng có sẵn đi vào ống kính.
[normal] LiDAR thì khác, nó là cảm biến chủ động, tự phát ra tia laser để soi sáng xung quanh.
[normal] Nó đo khoảng cách bằng chính ánh sáng mình phát ra, chứ không dựa vào đèn đường.
[normal] Phóng to vào bên trong, bạn thấy hai phần chính là bộ đo khoảng cách và bộ quét tia.
[normal] Bộ đo khoảng cách có một đi ốt laser, phát ra từng xung ánh sáng hồng ngoại gần.
[normal] Xung sáng lao về phía trước, chạm vào người đi bộ, rồi một phần ánh sáng dội ngược trở lại.
[normal] Ở đầu nhận, một cảm biến quang gọi là photodetector đón lấy phần ánh sáng quay về đó.
[normal] Mạch điện tử ghi lại lúc xung đi và lúc xung về, rồi tính khoảng thời gian chênh lệch.
[normal] Cách đo này gọi là time of flight, tức là đo thời gian bay của ánh sáng.
[normal] Trong không khí, ánh sáng đi gần ba trăm nghìn ki lô mét mỗi giây.
[normal] Trong một nano giây, tức một phần tỉ giây, ánh sáng đi được khoảng ba mươi xen ti mét.
[normal] Nhưng xung sáng phải đi tới vật rồi quay về, nên quãng đường nó đi dài gấp đôi khoảng cách.
[normal] Vì thế máy nhân tốc độ ánh sáng với thời gian, rồi chia đôi để ra khoảng cách.
[normal] Người đi bộ đứng cách xe mười lăm mét thì xung sáng quay về sau khoảng một trăm nano giây.
[calm] Nếu bấm giờ lệch chỉ một nano giây, khoảng cách tính ra sẽ lệch khoảng mười lăm xen ti mét.
[normal] Cũng có loại LiDAR phát sóng liên tục, rồi đo độ lệch tần số và pha của tín hiệu về.
[normal] Loại này gọi là FMCW, nó đo được cả khoảng cách lẫn tốc độ của vật cùng một lúc.
[normal] Nhưng một tia laser chỉ đo được một điểm, mà con đường trước xe thì có rất nhiều thứ.
[normal] Đây là việc của bộ quét, nó lái các tia laser đi qua khắp vùng nhìn của cảm biến.
[normal] Với loại quay cơ học, một mô tơ xoay cảm biến để quét đủ ba trăm sáu mươi độ.
[normal] Năm 2012, nhóm làm bộ dữ liệu KITTI gắn lên xe một LiDAR Velodyne có sáu mươi tư tia laser.
[normal] Nó cập nhật mười lần mỗi giây, đo xa tới một trăm mét, tạo hơn một triệu điểm mỗi giây.
[normal] Mỗi điểm là một tọa độ trong không gian, kèm cường độ của phần ánh sáng phản xạ về.
[normal] Gộp các điểm đó lại, bạn có một đám mây điểm, tiếng Anh gọi là point cloud.
[normal] Nhưng lúc này LiDAR chưa biết đâu là người, nó chỉ có những điểm với khoảng cách rất chính xác.
[normal] Đầu tiên, phần mềm lọc bỏ các điểm thuộc mặt đường, chỉ giữ lại những thứ nhô lên.
[normal] Tiếp theo, các điểm nằm sát nhau được gom thành từng cụm, mỗi cụm có thể là một vật thể.
[normal] Từ mỗi cụm, hệ thống ước tính vị trí và hình dạng vật, như một chiếc hộp bao quanh.
[normal] Sau đó, bộ phân loại học máy gắn nhãn cho từng cụm, như người đi bộ, ô tô hay cây.
[normal] Theo dõi qua nhiều lần quét, hệ thống còn ước tính được hướng đi và tốc độ của vật.
[normal] Ở cuộc thi xe tự lái của DARPA năm 2007, ba đội dẫn đầu đều gắn nhiều LiDAR.
[normal] Năm 2017, Audi công bố mẫu A8 dùng LiDAR Scala của Valeo cho các chức năng lái tự động.
[normal] Còn Waymo cho biết LiDAR giúp đo kích thước và khoảng cách vật quanh xe, tới ba trăm mét.
[normal] Dù vậy, LiDAR không làm việc một mình, vì nó đo khoảng cách giỏi nhưng nhận diện vật lại kém.
[normal] Camera thì ngược lại, giỏi nhận ra vật là gì, nên hai cảm biến thường được ghép với nhau.
[normal] Ngoài ra, mưa, sương mù, tuyết hay bụi đều tán xạ và hấp thụ bớt ánh sáng của LiDAR.
[normal] Vật càng xa thì ánh sáng quay về càng yếu, giảm theo bình phương của khoảng cách.
[normal] Muốn đo xa cũng không thể cứ tăng công suất, vì phải theo tiêu chuẩn an toàn cho mắt.
[normal] Với LiDAR bấm giờ, nắng gắt hay tia của một LiDAR khác còn có thể gây nhiễu tín hiệu.
[calm] Đây là điều bất ngờ, đơn vị mét trên cây thước của bạn cũng được định nghĩa bằng ánh sáng.
[calm] Một mét là quãng đường ánh sáng đi trong chân không, trong một phần gần ba trăm triệu giây.
[calm] Mỗi lần LiDAR bấm giờ một tia sáng, nó dùng đúng tốc độ đã định nghĩa ra mét.
[calm] Nên lúc nửa đêm, chiếc xe không cần nhìn thấy người đi bộ theo cách bạn nhìn.
[calm] Trước hết, nó đếm xem tia sáng của chính nó mất bao lâu để quay về.

# Cấu trúc
- Format: Explainer
- Core promise: Hiểu LiDAR đo khoảng cách bằng thời gian bay của ánh sáng và biến con đường thành đám mây điểm ba chiều.
- Câu 1-4: Gây tò mò, người đi bộ trong đêm và lời hứa theo một tia sáng vào bên trong LiDAR.
- Câu 5-9: Hé lộ, LiDAR là cảm biến chủ động tự phát laser, khác camera thụ động.
- Câu 10-21: Cơ chế, bộ đo khoảng cách bấm giờ xung laser, nhân tốc độ ánh sáng rồi chia đôi.
- Câu 22-23: Cơ chế, cách đo FMCW theo độ lệch tần số và pha.
- Câu 24-30: Cơ chế, bộ quét xoay ba trăm sáu mươi độ và tạo đám mây điểm, ví dụ LiDAR của KITTI.
- Câu 31-36: Cơ chế, lọc mặt đường, gom cụm, ước tính hình dạng, gắn nhãn và theo dõi.
- Câu 37-45: Ứng dụng thực tế, DARPA, Audi A8, Waymo, ghép với camera và các giới hạn.
- Câu 46-48: Sự thật bất ngờ, mét được định nghĩa bằng ánh sáng.
- Câu 49-50: Câu chốt, payoff ở câu 50, việc đầu tiên của xe là đếm thời gian tia sáng quay về.
