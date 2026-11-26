# STORYBOARD · 100.000 người truy cập cùng lúc, website có sập không?

## 1. Concept

| Mục | Nội dung |
|---|---|
| Tiêu đề | 100.000 người truy cập cùng lúc, website có sập không? |
| Format | Explainer theo khung kênh: vấn đề thực tế, thách thức công nghệ, giải pháp AWS, cách hệ thống hoạt động. SCRIPT.md chưa có mục \`# Cấu trúc\`, nên format, core promise và các beat dưới đây là suy luận từ câu thoại và SCRIPT.source.md. |
| Core promise | Sau video, người xem hiểu vì sao website sập khi có đợt traffic lớn và 5 khối AWS chia tải ra sao: CloudFront và S3, Application Load Balancer, EC2 Auto Scaling, SQS, ElastiCache cùng CloudWatch. |
| Hook angle | Khoảnh khắc ai cũng hình dung được: 12:00, Flash Sale mở, 100.000 người cùng bấm mua. Câu hỏi treo: "Liệu website có sập không?" |
| Beat suy luận | Câu 1-4 hook. Câu 5-6 vấn đề. Câu 7-9 thách thức, câu 8 là twist đầu. Câu 10-22 giải pháp AWS, 5 khối. Câu 23 đảo chiều. **Câu 24 là payoff.** Câu 25 lưu ý. Câu 26 kết. |
| Thời lượng | Voice 107.36 s, câu cuối kết thúc 106.82 s. End card vào 107.12 s. Với end card mặc định 2.75 s, tổng 109.87 s. Để đạt 1:50 đến 2:00, đề xuất end card chạy 1x, 5.5 s, tổng khoảng 112.6 s. Xem Build notes. |
| Số âm tiết | 398 âm tiết, 26 câu, khoảng 3.7 âm tiết mỗi giây. |
| Visual style | cleanui 9:16: nền giấy chấm, tile trắng bo góc, logo AWS chính thức trên tile, icon Lucide vẽ bằng code, ảnh thật toàn khung cho 4 khoảnh khắc. Chữ trên màn hình chỉ là tên dịch vụ, con số và 1 thesis. |
| 3 màu chủ đạo | Cam AWS \`#FF9900\` cho accent và đường đi của request. Đỏ \`#E5484D\` cho quá tải và lỗi. Xanh lá \`#30A46C\` cho máy khỏe, cache hit, thành công. Đỏ và xanh xuất hiện theo câu chuyện: đỏ chiếm cảnh p1, xanh chiếm cảnh r1. |
| Main entity | "Request chip": viên tròn trắng 56 px, viền cam 4 px, bên trong glyph giỏ hàng Lucide màu cam. Một hình dạng duy nhất xuyên suốt video, đi từ đám đông qua từng dịch vụ. Chip đổi viền đỏ khi bị nghẽn, viền xanh khi được phục vụ. |
| Ẩn dụ xuyên suốt | "Đường đi của request": sơ đồ kiến trúc tự lắp dần. Mỗi cảnh giải pháp mở bằng thanh sơ đồ mini 5 ô, logo mới pop vào ô của mình, rồi camera dolly in xuyên qua ô đó vào cảnh. Cảnh r1 zoom out để thấy toàn bộ sơ đồ. |

## 2. Scene table

Thời gian là giây thật của bản ghi, lấy từ \`syl-times.json\`. Neo dạng \`câu:từ\` dùng cho \`cues.json\`. "Camera" trong cleanui là chuyển động 2D trên wrapper \`#w-<id>\`: dolly in và zoom out là tween \`scale\`, whip pan là blur slide trục x, top-down là bố cục nhìn từ trên. Vùng an toàn 9:16: chủ thể và chữ trong x 0-918, y 288-1440.

| Scene | Câu số | Thời gian & Nhịp | Hình ảnh & Camera | Text / UI Overlay | Âm thanh & SFX | Lời thoại |
|---|---|---|---|---|---|---|
| h1 HOOK | 1-4 | 0.00-10.11 · 10.1 s · nhanh, 4 nhịp | **0.00 \`1:Đúng\`** Đồng hồ số lật 11:59:57 sang 12:00:00, vẽ bằng code, tile lớn giữa khung. Camera: dolly in 1.0 lên 1.08. **1.36 \`2:website\`** Whip pan sang điện thoại mockup, trang shop giả lập không thương hiệu, sticker "FLASH SALE" nảy vào trên ảnh sản phẩm ở \`2:Flash\` 3.22. **4.38 \`3:Chỉ\`** Ảnh stock đám đông cầm điện thoại, toàn khung, có dòng credit tác giả trên ảnh. Camera: fast zoom out 1.25 xuống 1.0. Ở \`3:trăm\` 5.48 bộ đếm nhảy lên 100.000. Ở \`3:săn\` 7.22 hàng trăm request chip bay từ mép ảnh dồn vào nút "Mua ngay". **8.56 \`4:Liệu\`** Ảnh stock trung tâm dữ liệu, có credit. Camera: fast zoom in vào hàng rack. **9.58 \`4:không?\`** Đứng hình 0.4 s, tối nền 20%. | Series pill nhỏ ở y 300: logo Góc nhìn DEV + "AWS". Pill số: "12:00", "100.000". Sticker "FLASH SALE" là một phần của hình. Từ khóa phụ đề: 12 giờ trưa, Flash Sale, một trăm nghìn, sập | 0.00 thud. Tiếng tick đồng hồ 0.0-0.9. Riser risercut3 cắt đứng tại 9.58. Click chuột dồn dập 7.22-8.0. Shutter ở 5.48 cho số 100.000. Pop ở 3.22 cho sticker. Tiếng quạt server khởi động 8.56. Bed vào từ 0.3, nhỏ dần dưới riser. | Đúng mười hai giờ trưa! Một website thương mại điện tử bắt đầu Flash Sale. Chỉ trong vài giây, một trăm nghìn người cùng truy cập để săn một món hàng. Liệu website có sập không? |
| p1 PROBLEM | 5-6 | 10.11-20.31 · 10.2 s · dồn dập, 4 nhịp · vào bằng **cut** | **10.46 \`5:Nếu\`** Top-down: dòng request chip đổ từ trên xuống một tile server lớn 320 px, glyph Lucide server. **12.94 \`5:CPU\`** Đồng hồ CPU, kim quét lên 100%, tile server chuyển đỏ và rung. Camera: dolly in lên server. **14.54 \`5:bộ\`** Thanh RAM đầy đỏ bên trái tile. **15.92 \`5:database\`** Pan xuống hình trụ database, chip kẹt thành đống trước cửa, viền chip chuyển đỏ, tam giác cảnh báo pop. **17.28 \`6:Và\`** Glitch chuyển sang điện thoại, màn hình lỗi "503" vẽ bằng code. Camera: whip pan rồi dolly in chậm vào số 503. | Pill số "100%" ở 13.84. Pill "503" trong màn hình lỗi. Từ khóa phụ đề: request, một server, CPU, quá tải, bộ nhớ, database, báo lỗi | Swoosh ở cut 10.11. Shutter ở 13.84 cho 100%. Báo động ngắn ở 13.84. Pop cho tam giác cảnh báo ở 16.34. Glitch ở 19.30. Thất bại, tiếng máy tắt, ở 19.88. Bed hạ 3 dB trong p1. | Nếu toàn bộ request đổ dồn vào một server, CPU có thể quá tải, bộ nhớ cạn kiệt, kết nối database bị nghẽn. Và cuối cùng, người dùng chỉ nhìn thấy một màn hình báo lỗi. |
| c1 CHALLENGE | 7-9 | 20.31-30.99 · 10.7 s · chậm lại rồi tăng, 3 nhịp · vào bằng **slide** | **20.50 \`7:Nhưng\`** Màn hình 503 tua ngược bằng glitch đảo, rồi fast zoom out ra lưới 10x10 icon người, mỗi icon một nhóm người dùng. **22.88 \`8:Một\`** Lưới người đứng yên, giữ không quá 2 s. Ở \`8:không\` 24.56 đa số icon mờ xám, chỉ vài icon bắn ra request chip. **27.26 \`9:Điều\`** Top-down: request chip chạy xuống, ở \`9:phân\` 28.90 tách thành 4 làn màu, mỗi làn có icon: ảnh, mắt xem sản phẩm, giỏ hàng, thẻ thanh toán. Ở \`9:loại\` 30.26 cả 4 làn sáng lên. Camera: dolly in nhẹ theo dòng chảy. | Thesis một dòng, 2 pill số nối bằng dấu ≠: "100.000 người" ≠ "100.000 request/giây", hiện ở 24.56. Từ khóa phụ đề: số lượng, một trăm nghìn request mỗi giây, phân phối, từng loại request | Không swoosh vì là slide. Rewind ngắn ở 20.50. Shutter ở 25.98 cho con số request. Tiếng "tách làn" whoosh nhẹ ở 28.90. Bed trở về mức bình thường từ 20.50. | Nhưng vấn đề không đơn giản là số lượng người dùng. Một trăm nghìn người online không có nghĩa là một trăm nghìn request mỗi giây. Điều quan trọng là hệ thống phải biết cách phân phối và xử lý từng loại request. |
| s1 CDN | 10-12 | 30.99-44.37 · 13.4 s · đều, 5 nhịp · vào bằng **cut** | **31.34 \`10:Đầu\`** Thanh sơ đồ mini 5 ô rỗng, số "1" trên starburst. **32.10 \`10:Amazon\`** Logo Amazon CloudFront chính thức pop vào ô 1, tile 320 px. Camera: dolly in xuyên qua ô. **33.10 \`10:giúp\`** Page snapshot trang CloudFront chính thức trong khung trình duyệt có dòng URL, toàn khung, camera dolly in vào bản đồ mạng lưới edge, các điểm edge nhấp nháy. **35.26 \`11:Những\`** 3 tile file: ảnh, CSS, JS, bay vào hộp cache tại một điểm edge. Ở \`11:cache.\` 38.98 hộp đóng lại, dấu tick xanh. **39.62 \`12:Amazon\`** Logo Amazon S3 pop, bucket chứa 3 file. **42.20 \`12:giúp\`** Fast zoom out: người dùng, edge, S3, server gốc. Request chip lặp lại quay về từ edge, viền xanh; server gốc mờ đi. | Số chương "1". Label pill "Amazon CloudFront", "Amazon S3". Nhãn file "CSS", "JS" là một phần của icon. Từ khóa phụ đề: CloudFront, gần người dùng, hình ảnh, CSS, JavaScript, cache, S3 | Swoosh ở cut 30.99. Pop ở 32.10 cho logo CloudFront. Pop ở 38.98 cho hộp cache. Pop ở 39.62 cho logo S3. Tiếng "ping" mạng nhẹ ở 33.10. | Đầu tiên, Amazon CloudFront giúp đưa nội dung đến gần người dùng hơn. Những dữ liệu tĩnh như hình ảnh, CSS hay JavaScript có thể được cache. Amazon S3 có thể lưu trữ các file này, giúp giảm request phải quay về hệ thống chính. |
| s2 ALB | 13-14 | 44.37-53.31 · 8.9 s · đều, 3 nhịp · vào bằng **slide** | **44.58 \`13:Các\`** Thanh sơ đồ mini, ô 1 đã có CloudFront, ô 2 sáng. Chỉ làn giỏ hàng và thanh toán đi tiếp. **46.58 \`13:Application\`** Logo Elastic Load Balancing pop vào ô 2, kèm icon resource Application Load Balancer. Camera: dolly in vào ô. **48.54 \`14:Nó\`** Top-down: ALB ở trên, 4 tile server bên dưới, request chip tỏa đều xuống 4 máy. **50.14 \`14:khỏe\`** Một server chuyển đỏ với dấu X, mũi tên tới nó đứt, chip chuyển hướng; 3 máy còn lại hiện tick xanh. **51.10 \`14:thay\`** Inset nhỏ: tile server quá tải của p1 hiện lại rồi bị gạch chéo. Camera: zoom out nhẹ. | Số chương "2". Label pill "Application Load Balancer". Từ khóa phụ đề: Application Load Balancer, phân phối traffic, khỏe mạnh, một máy chủ | Không swoosh. Pop ở 46.58 cho logo. Tiếng lỗi "buzz" ngắn ở 50.14 khi máy đỏ. Laser ở 51.36 khi gạch chéo server cũ. | Các request cần xử lý tiếp tục đi qua Application Load Balancer. Nó phân phối traffic đến những server khỏe mạnh, thay vì bắt một máy chủ gánh toàn bộ công việc. |
| s3 SCALING | 15-17 | 53.31-64.80 · 11.5 s · nở ra rồi co lại, 4 nhịp · vào bằng **cut** | **53.50 \`15:Tiếp\`** Thanh sơ đồ mini, ô 3 sáng, số "3". **54.34 \`15:EC2\`** Logo Amazon EC2 pop, **54.66 \`15:Auto\`** logo EC2 Auto Scaling pop cạnh nó. **55.88 \`16:Khi\`** Khung nhóm Auto Scaling nét đứt kiểu sơ đồ AWS, 3 instance EC2, đường traffic phía trên đang dốc lên. **57.84 \`16:Auto\`** đến 60.10: instance thứ 4, 5, 6 lần lượt bật ra, khung giãn theo. Camera: zoom out để vừa 6 máy. **61.08 \`17:Khi\`** Đường traffic đi xuống. Ở \`17:thu\` 62.50 3 instance mờ và rút đi, khung co lại. **63.80 \`17:tối\`** Icon đồng xu với mũi tên xuống, thanh chi phí hạ. Camera: dolly in vào đồng xu. | Số chương "3". Label pill "EC2 Auto Scaling". Từ khóa phụ đề: EC2 Auto Scaling, thêm năng lực, tự động, giảm, tối ưu chi phí | Swoosh ở cut 53.31. Pop ở 54.66 cho logo Auto Scaling. Pop ở 59.42 cho instance mới, các instance sau trong cascade thì im. Tiếng "power down" ngắn ở 62.50. Shutter ở 64.00 cho thanh chi phí. | Tiếp theo là EC2 Auto Scaling. Khi hệ thống cần thêm năng lực xử lý, Auto Scaling có thể tự động khởi chạy thêm server. Khi lượng truy cập giảm, nó thu hẹp số lượng server để tối ưu chi phí. |
| s4 QUEUE | 18-20 | 64.80-77.69 · 12.9 s · chậm, đều như băng chuyền, 4 nhịp · vào bằng **cut** | **65.02 \`18:Nhưng\`** Điện thoại: giỏ hàng chuyển thành tick xanh, đơn đã nhận. Phía sau trồi ra icon đồng hồ cát. **67.74 \`19:Ví\`** Thẻ tác vụ icon phong bì ở \`19:email\` 68.42, thẻ hóa đơn ở \`19:hóa\` 69.84, thẻ xe tải vận chuyển theo ghi chú nguồn. **70.62 \`20:Amazon\`** Logo Amazon SQS pop vào ô 4 của thanh sơ đồ mini. Camera: dolly in. **71.64 \`20:đưa\`** Top-down: các thẻ trượt vào ống hàng đợi nằm ngang, hàng dài ra. **72.98 \`20:worker\`** 3 icon worker bên phải lần lượt lấy từng thẻ, hàng ngắn dần. **75.02 \`20:thay\`** Inset điện thoại người dùng: tick xanh hiện ngay, không chờ hàng đợi. | Số chương "4". Label pill "Amazon SQS". Từ khóa phụ đề: không cần, ngay lập tức, email, hóa đơn, SQS, hàng đợi, worker, phải chờ | Swoosh ở cut 64.80. Pop ở 70.62 cho logo SQS. Tiếng băng chuyền tick đều 71.64-74.50. Laser ở 75.36 khi tick xanh hiện. | Nhưng có những công việc không cần hoàn thành ngay lập tức. Ví dụ như gửi email xác nhận hay tạo hóa đơn. Amazon SQS đưa chúng vào hàng đợi để các worker xử lý theo khả năng của mình, thay vì khiến request của người dùng phải chờ tất cả. |
| s5 CACHE + MONITOR | 21-22 | 77.69-89.17 · 11.5 s · căng rồi nhẹ, 4 nhịp · vào bằng **slide** | **77.94 \`21:Để\`** Hình trụ database, phía trên là cổ chai hẹp, request chip kẹt lại viền đỏ. Camera: dolly in vào cổ chai. **81.48 \`21:Amazon\`** Logo Amazon ElastiCache pop vào ô 5, đặt trước database như một làn nhanh. **82.96 \`21:cho\`** Chip có cùng ảnh sản phẩm đi vào ElastiCache, tia sét, quay về viền xanh; đồng hồ tải database hạ từ đỏ về xanh. **84.86 \`22:Trong\`** Whip pan sang page snapshot trang CloudWatch chính thức có hình dashboard, khung trình duyệt có URL, logo Amazon CloudWatch pop ở 85.68. **86.72 \`22:dõi\`** Dashboard vẽ bằng code, 3 biểu đồ: CPU, số request, độ sâu hàng đợi. **87.82 \`22:cảnh\`** Đường CPU vượt vạch ngưỡng, chuông báo rung, viền đỏ nháy. | Label pill "Amazon ElastiCache", "Amazon CloudWatch". Biểu đồ chỉ có icon trục, không chú thích dài. Từ khóa phụ đề: database, nút thắt cổ chai, ElastiCache, đọc thường xuyên, CloudWatch, theo dõi, cảnh báo | Không swoosh. Pop ở 81.48 cho ElastiCache. Pop ở 85.68 cho CloudWatch. Chuông báo nhẹ ở 87.82. Shutter ở 83.76 khi đồng hồ tải hạ. | Để database không trở thành nút thắt cổ chai, hệ thống có thể sử dụng Amazon ElastiCache cho những dữ liệu được đọc thường xuyên. Trong khi đó, CloudWatch liên tục theo dõi các chỉ số và cảnh báo khi có bất thường. |
| r1 REVEAL | 23-25 | 89.17-103.27 · 14.1 s · lặng, rồi bùng lên ở payoff, rồi lắng, 5 nhịp · vào bằng **cut** | **89.44 \`23:Vậy\`** Nền trống, một tile server khổng lồ lớn dần, top-down. **91.70 \`23:mạnh.\`** Dấu X đỏ đập lên server, server vỡ thành mảnh. **92.36 \`24:Đó\`** PAYOFF. Fast zoom out ra toàn bộ sơ đồ đã lắp qua video: người dùng, CloudFront và S3, ALB, nhóm Auto Scaling EC2, SQS và worker, ElastiCache và database, CloudWatch phía trên. Request chip xanh chảy qua toàn tuyến, sóng xung kích tròn từ tâm. 4 điểm sáng theo từ: \`24:phân\` 92.66 ALB sáng; \`24:cache\` 93.86 CloudFront và ElastiCache sáng; \`24:mở\` 94.94 nhóm Auto Scaling giãn ra; \`24:tách\` 96.06 SQS sáng. **98.52 \`25:AWS\`** Sơ đồ thu nhỏ thành bản vẽ trên giấy, icon compa vẽ và icon ống nghiệm kiểm thử pop ở \`25:kiến\` 100.08 và \`25:kiểm\` 100.76. **102.10 \`25:chịu\`** Biểu đồ load test dốc lên chạm vạch ngưỡng. Camera: dolly in vào vạch ngưỡng. | Không chữ ở câu 23. 4 chip ở payoff, mỗi chip một cụm từ của câu 24: "Phân phối", "Cache", "Mở rộng", "Bất đồng bộ". Từ khóa phụ đề: không phải, server thật mạnh, phân phối traffic, cache dữ liệu, mở rộng tài nguyên, bất đồng bộ, kiến trúc, kiểm thử | Swoosh ở cut 89.17. **Cắt nhạc** 89.17 đến 92.30. Thud ở 91.70 khi X đập. **Drop nhạc** ở 92.36, riser ngắn dẫn vào từ 91.9. Pop ở 92.66, 93.86, 94.94, 96.06 cho 4 điểm tóm tắt. Đây là khoảnh khắc to nhất video. Bed hạ về mức thường từ 98.52. | Vậy bí quyết không phải là mua một server thật mạnh. Đó là phân phối traffic, cache dữ liệu, mở rộng tài nguyên và tách những công việc có thể xử lý bất đồng bộ. AWS cung cấp công cụ, nhưng kiến trúc và kiểm thử mới quyết định hệ thống chịu tải được bao nhiêu. |
| e1 OUTRO | 26 | 103.27-106.82 · 3.6 s · lắng, 2 nhịp · vào bằng **fade** | **103.48 \`26:Đó\`** Điện thoại ở h1 quay lại: đồng hồ 12:00, nút "Mua ngay" chuyển tick xanh, đơn đặt thành công. **103.92 \`26:AWS\`** Logo AWS chính thức pop giữa khung, sơ đồ kiến trúc thu nhỏ mờ phía sau. Camera: zoom out chậm 1.06 về 1.0. | Logo AWS. Từ khóa phụ đề: AWS, sẵn sàng, traffic khổng lồ | Pop ở 103.92 cho logo AWS. Bed lên lại 2 dB rồi fade ra cùng end card. | Đó là cách AWS giúp hệ thống sẵn sàng cho những đợt traffic khổng lồ. |
| ec END CARD | không | 107.12 đến hết · 2.75 s mặc định, đề xuất 5.5 s | End card của template: logo Góc nhìn DEV, tên kênh, dòng chữ "AWS – Behind the Cloud". Vào bằng **cut**. | "AWS – Behind the Cloud" | Swoosh ở cut. Pop cho logo kênh. Bed fade ra trong 1.5 s cuối. | không có lời |

## 3. Audio queries

**Nhạc nền**

- Lựa chọn 1, giữ house bed: \`bgm-little-things.mp3\`, 124 s, đủ dài cho 112.6 s nên không cần \`LOOP_BED\`. Bed này không có drop thật; payoff khi đó dựa vào việc cắt bed ở 89.17 và đưa bed trở lại tại 92.36 kèm riser và 4 tiếng pop.
- Lựa chọn 2, query: \`tech explainer electronic corporate tension build drop\`, mood: căng ở đầu, tự tin ở cuối, genre: electronic / future garage nhẹ, BPM ước lượng 100 đến 110. Cần một bản có đoạn build và drop để đặt drop tại 92.36.
- Lựa chọn 3, query: \`minimal tech pulse ticking clock background no vocals\`, mood: đếm ngược, gọn, genre: minimal electronic, BPM ước lượng 120. Hợp hook đồng hồ, dễ cắt.
- Điểm lặng: 9.58 đến 10.11, dead stop cuối hook. 89.17 đến 92.30, câu đảo chiều 23.
- Điểm drop: 92.36, đầu câu payoff 24.
- Mức: bed 10 đến 12 dB dưới voice theo \`audio-mix.md\`. Nhạc chỉ lấy nguồn có giấy phép rõ ràng, ghi vào \`assets/SOURCES.md\`.

**SFX**

- [0.00] Tiếng tích tắc đồng hồ đếm ngược 3 nhịp -> \`clock ticking countdown three ticks\` (1.0 s)
- [0.00] Thud mở đầu -> house \`sfx-thud.mp3\`
- [~6.4 đến 9.58] Riser cắt đứng ở "không?" -> house \`sfx-risercut3.mp3\`, đặt sao cho điểm cắt rơi đúng 9.58
- [5.48] Shutter cho số 100.000 -> house \`sfx-click.mp3\`
- [7.22] Click chuột dồn dập nhiều người -> \`many mouse clicks rapid crowd clicking\` (0.8 s)
- [8.56] Server khởi động, quạt quay lên -> \`server rack fan spin up hum\` (1.2 s)
- [13.84] Báo động quá tải ngắn -> \`short alarm beep warning electronic\` (0.8 s)
- [19.30] Glitch màn hình -> \`digital glitch stutter short\` (0.5 s), hoặc \`synth-sfx.py\` noise burst
- [19.88] Máy sập, tắt nguồn -> \`power down failure electronic\` (0.8 s)
- [20.50] Tua ngược -> \`tape rewind short reverse whoosh\` (0.5 s)
- [28.90] Tách làn, whoosh nhẹ -> \`soft whoosh split airy\` (0.4 s)
- [33.10] Ping mạng lưới edge -> \`soft network ping blip\` (0.3 s), hoặc \`synth-sfx.py\` sine blip
- [50.14] Máy lỗi bị loại -> \`error buzz short negative ui\` (0.3 s)
- [62.50] Instance tắt bớt -> \`ui power down soft\` (0.4 s)
- [71.64 đến 74.50] Băng chuyền hàng đợi tick đều -> \`conveyor belt mechanical ticking loop\` (3 s, giảm 6 dB)
- [87.82] Chuông cảnh báo CloudWatch -> \`notification bell alert soft\` (0.6 s)
- [91.70] Dấu X đập lên server, vỡ -> house \`sfx-thud.mp3\` + \`glass crack short\` (0.4 s)
- [91.90] Riser ngắn dẫn vào drop -> house \`sfx-riser.mp3\`, cắt tại 92.36
- [92.36] Sóng xung kích payoff -> \`deep impact boom cinematic short\` (1.0 s)
- Pop, laser, shutter, swoosh còn lại: house set, mốc nằm trong bảng cảnh và trong \`cues.json\`.

## 4. Build notes

**Chuyển cảnh, loop, màu caption, camera**

1. Seam: h1 to p1 **cut**, p1 to c1 **slide**, c1 to s1 **cut**, s1 to s2 **slide**, s2 to s3 **cut**, s3 to s4 **cut**, s4 to s5 **slide**, s5 to r1 **cut**, r1 to e1 **fade**, e1 to ec **cut**. Theo luật cleanui, swoosh chỉ ở cut: 10.11, 30.99, 53.31, 64.80, 89.17 và end card. Thanh sơ đồ mini 5 ô là vật nối giữa các cảnh giải pháp: mỗi lần mở cảnh, ô mới sáng và camera dolly in xuyên qua ô. Ở r1 chính các ô đó bung ra thành sơ đồ đầy đủ. e1 dùng lại điện thoại và đồng hồ 12:00 của h1 để khép vòng.
2. Màu: đề xuất \`look.json\` \`palette.accent\` = \`#FF9900\`. Đỏ \`#E5484D\` và xanh \`#30A46C\` cần 2 role mới trong \`look.json\`, ví dụ \`danger\` và \`ok\`; chưa kiểm tra \`scripts/look.py\` có nhận role mới hay không, cần xem trước khi dựng. Caption giữ mặc định: \`lit\` = ink, \`unlit\` = unread. Trên 4 khoảnh khắc ảnh toàn khung ở h1, s1, s5, dùng pill mờ \`.capbg\`.
3. Camera và vùng an toàn: mọi "camera move" là tween \`scale\` hoặc \`x\` trên wrapper, không dùng 3D. Logo, pill số, label pill và chủ thể chính đặt trong x 60-900, y 300-1420. Xung đột cần tác giả quyết: theme cleanui đặt caption band top ở y 170, nằm trong 15% trên; footer dock ở y 1580-1730, nằm trong 25% dưới. Đề xuất giữ caption ở y 170 như theme, bỏ footer dock. Ảnh stock và page snapshot được phép tràn khung, nhưng điểm nhấn phải nằm ở y khoảng 945 như theme quy định. Kiểm tra bằng snapshot 0.2 đến 0.4 s sau mỗi cut và zoom vào từng logo.

**Riêng tư**: không cảnh nào dùng tài khoản đăng nhập. Nếu tác giả thay dashboard vẽ bằng code ở s5 bằng bản ghi console CloudWatch thật, phải blur account ID, ARN, tên tài nguyên và region. Page snapshot trang AWS: tắt hoặc cắt banner cookie trước khi dùng.

**Rủi ro cần người duyệt**

- Logo AWS ở e1 là thương hiệu của Amazon; cần đối chiếu https://aws.amazon.com/trademark-guidelines/ trước khi đăng. Gói Architecture Icons cho phép dùng icon trong sơ đồ; việc dùng logo AWS đứng riêng ở outro chưa được xác minh là được phép.
- Nội dung kỹ thuật trong script chưa qua fact-checker. Bản đồ edge trong page snapshot chỉ minh họa; không thêm số lượng edge location lên màn hình.
- Ảnh stock có người thật: chỉ dùng ảnh có giấy phép rõ, giữ dòng credit trên ảnh.

**Model list**: không áp dụng, cleanui là theme 2D. Icon mới cần thêm vào sprite \`head.part\`, lấy từ Lucide, giấy phép ISC: \`i-cart\`, \`i-server\`, \`i-database\`, \`i-cpu\`, \`i-memory\`, \`i-clock\`, \`i-image\`, \`i-eye\`, \`i-card\`, \`i-mail\`, \`i-receipt\`, \`i-truck\`, \`i-hourglass\`, \`i-bell\`, \`i-chart\`, \`i-alert\`, \`i-coin\`, \`i-zap\`, \`i-compass\`, \`i-flask\`. Kit hiện có \`i-users\`, \`i-user\`, \`i-bot\`, \`i-globe\`, \`i-check\`, \`i-x\`, \`i-file\`, \`i-code\` dùng lại được.

**Media checklist**

| Media | Cảnh | Loại nguồn | Ai lấy |
|---|---|---|---|
| Logo Amazon CloudFront | s1, r1 | Official logo, gói AWS Architecture Icons | Agent tự tải |
| Logo Amazon S3 | s1, r1 | Official logo, cùng gói | Agent tự tải |
| Logo Elastic Load Balancing + icon resource Application Load Balancer | s2, r1 | Official logo, cùng gói | Agent tự tải |
| Logo Amazon EC2 | s3, r1 | Official logo, cùng gói | Agent tự tải |
| Logo Amazon EC2 Auto Scaling | s3, r1 | Official logo, cùng gói | Agent tự tải |
| Logo Amazon SQS | s4, r1 | Official logo, cùng gói | Agent tự tải |
| Logo Amazon ElastiCache | s5, r1 | Official logo, cùng gói | Agent tự tải |
| Logo Amazon CloudWatch | s5, r1 | Official logo, cùng gói | Agent tự tải |
| Logo AWS | e1, series pill h1 | Official logo, từ gói icon hoặc trang thương hiệu AWS | Agent tải được; **tác giả xác nhận** quyền dùng theo trademark guidelines |
| Logo Góc nhìn DEV | h1 pill, ec | Official logo kênh, đã có tại \`brand/logos/goc-nhin-dev-logo.png\` | Đã có |
| Ảnh đám đông dùng điện thoại mua sắm | h1 | Stock qua \`media-use\` hoặc Pexels / Unsplash, credit trên ảnh | Agent tự lấy |
| Ảnh trung tâm dữ liệu, hàng rack | h1 | Stock, Wikimedia Commons hoặc Pexels, credit trên ảnh | Agent tự lấy |
| Trang CloudFront có bản đồ mạng lưới edge, https://aws.amazon.com/cloudfront/features/ | s1 | Page snapshot, khung trình duyệt có URL | Agent tự chụp; cần kiểm tra trang còn bản đồ khi chụp, nếu không dùng https://aws.amazon.com/about-aws/global-infrastructure/ |
| Trang CloudWatch có hình dashboard, https://aws.amazon.com/cloudwatch/ | s5 | Page snapshot, khung trình duyệt có URL | Agent tự chụp; nội dung trang chưa kiểm tra |
| Đồng hồ 12:00, shop giả lập, màn hình 503, đồng hồ CPU, RAM, database, lưới người, làn request, hàng đợi, nhóm Auto Scaling, dashboard, sơ đồ tổng | h1 đến e1 | Built in code, CSS / SVG + icon Lucide | Agent dựng |
| Bản ghi console CloudWatch thật | s5, tùy chọn | Bản ghi của tác giả, phải blur | **Tác giả cung cấp** nếu muốn |
| Nhạc nền ngoài house set | toàn video, tùy chọn | Stock có giấy phép | Agent tìm, tác giả duyệt |

Không cảnh nào cần ảnh hoặc video sinh bằng AI.

Gói icon tìm thấy trên https://aws.amazon.com/architecture/icons/ ngày 2026-11-26: \`Icon-package_07312026\` tại d1.awsstatic.com. Tên file trong gói chưa kiểm tra; tên dự kiến dạng \`Arch_Amazon-CloudFront_64.svg\`. Ghi mọi logo, ảnh và page snapshot vào \`assets/SOURCES.md\`.

**\`build.py\`**

\`\`\`python
STEPS = []   # đề xuất: footer dock y 1580-1730 nằm trong 25% dưới bị UI TikTok che
# nếu tác giả vẫn muốn dock, 5 icon cho 5 khối giải pháp, cần thêm sprite trước:
# STEPS = ["i-globe", "i-split", "i-scale", "i-queue", "i-database"]
BRAND_NAME = "Góc nhìn DEV"
BRAND_LOGO = "assets/logos/goc-nhin-dev-logo.png"
SLOGAN = "AWS – Behind the Cloud"   # chỉ cho video này; brand.json giữ slogan kênh
\`\`\`

SLOGAN mặc định trong \`brand.json\` là dòng khung kênh dài. Yêu cầu của tác giả là chữ cuối "AWS – Behind the Cloud", nên đề xuất ghi đè SLOGAN cho riêng dự án này. Thời lượng end card: đề xuất chạy end card ở tốc độ 1x, 5.5 s, để tổng đạt khoảng 112.6 s; cần sửa chỗ \`build.py\` hoặc \`timeline.js\` đặt tốc độ 2x, chưa xác định dòng cụ thể.

**\`plan-beats.py\` SCENES**: giữ nguyên nhóm hiện có.

\`\`\`python
SCENES = [
    ("h1",  "HOOK",      "flash sale at 12:00, 100.000 shoppers click buy at once",            1, 4),
    ("p1",  "PROBLEM",   "all requests hit one server, CPU 100%, DB overload, error 503",     5, 6),
    ("c1",  "CHALLENGE", "crowd becomes request types split into separate lanes",              7, 9),
    ("s1",  "CDN",       "CloudFront edge locations cache static files stored in S3",         10, 12),
    ("s2",  "ALB",       "Application Load Balancer spreads traffic, drops unhealthy server", 13, 14),
    ("s3",  "SCALING",   "EC2 Auto Scaling adds instances on load, removes them after",       15, 17),
    ("s4",  "QUEUE",     "SQS queue holds email and invoice jobs, workers drain it",          18, 20),
    ("s5",  "CACHE",     "ElastiCache serves hot reads, CloudWatch dashboard and alarm",      21, 22),
    ("r1",  "REVEAL",    "zoom out to the whole architecture, order succeeds",                23, 25),
    ("e1",  "OUTRO",     "AWS logo over the shrunken architecture",                           26, 26),
]
\`\`\`

Neo cut cho \`cues.json\`: p1 \`5:Nếu\`, c1 \`7:Nhưng\`, s1 \`10:Đầu\`, s2 \`13:Các\`, s3 \`15:Tiếp\`, s4 \`18:Nhưng\`, s5 \`21:Để\`, r1 \`23:Vậy\`, e1 \`26:Đó\`.
