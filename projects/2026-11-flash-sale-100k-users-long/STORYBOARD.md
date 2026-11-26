# STORYBOARD · 100.000 người truy cập cùng lúc, website có sập không?

Theme `cleanui`, format `16x9` 1920x1080, YouTube long-form, tiếng Việt. 43 scene theo `SCENES` hiện có trong `scripts/plan-beats.py`. Mọi thời gian trong file là ước tính ở PACE 3.62 âm tiết/giây; thay bằng `syl-times.json` sau khi align.

## 0. Components

Bộ khối dựng dùng lại cho cả 43 scene. Chỉ dùng `var(--role)` của look cleanui, sắc độ qua `color-mix`. Quy ước màu: khỏe = `var(--term-text)`, quá tải hoặc traffic = `var(--accent)`, trung tính = `var(--ink)`. Không chữ nào dưới 40 px, trừ credit ảnh ở B10.

| Khối | Tên | Dùng cho |
|---|---|---|
| B1 | `.srv` server rack card, cỡ `sm` 120x150, mặc định 200x240, `lg` 280x340; trạng thái `.ok` `.hot` `.down` | mọi server, EC2, worker |
| B2 | `.crowd` lưới người dùng: pattern SVG cho đám đông lớn, lưới `users.svg` cho nhóm nhỏ | người dùng, 100.000 |
| B3 | `.stream` dòng chấm request trên đường SVG, độ trễ theo chỉ số | traffic, truy vấn, message |
| B4 | `.meter` thanh chỉ số có vạch giới hạn | CPU, RAM, DB conn, latency, độ sâu hàng |
| B5 | `.chart` line chart 800x400 vẽ bằng dashoffset, có ngưỡng | RPS, traffic, capacity, load test |
| B6 | `.ltile` logo tile AWS, cỡ `big` 320, `md` 184, `sm` 110 | mọi logo trong `assets/logos/aws/` |
| B7 | `.map` bản đồ chấm + pin edge | chương 4 |
| B8 | `.lane` hàng đợi 1000x120 | SQS, DLQ, hàng chờ DB |
| B9 | thẻ chương + chip chương | mở mỗi chương |
| B10 | `.photo` ảnh thật full-frame + `.credit` | 5 ảnh trong `assets/img/` |
| B11 | `.win` browser mock, `.phone` phone mock | trang shop, 503, Order Confirmed |
| B12 | `.zone` khung nhóm nét đứt | AZ 1, AZ 2, ASG, AWS |
| B13 | `.badge` 72 px: check, x, ? | trạng thái |

```html
<!-- B1 server -->
<div class="srv ok" id="s-c3a-srv"><i class="slot"></i><i class="slot"></i><i class="slot"></i><b class="led"></b>
  <img class="ic" src="assets/logos/aws/ec2-instance.svg" alt=""></div>
<!-- B2 crowd lớn -->
<svg class="crowd" viewBox="0 0 1600 760"><defs><pattern id="p-user" width="32" height="40" patternUnits="userSpaceOnUse">
  <circle cx="16" cy="12" r="7"/><path d="M4 38c0-8 5-13 12-13s12 5 12 13z"/></pattern></defs>
  <rect width="1600" height="760" fill="url(#p-user)"/></svg>
<!-- B3 stream: dot i có delay = i * 0.12 s, không Math.random -->
<svg class="stream" viewBox="0 0 1920 1080"><path id="r1" d="M200 490 H820"/><circle class="dot" r="9"/>…</svg>
<!-- B4 meter -->
<div class="meter"><svg class="ic"><use href="#i-cpu"/></svg><span class="lbl">CPU</span>
  <div class="bar"><i class="fill"></i><i class="cap"></i></div></div>
<!-- B5 chart -->
<svg class="chart" viewBox="0 0 800 400"><line class="thr" y1="160" y2="160" x2="800"/>
  <polyline class="ln" pathLength="1" points="…"/><circle class="head" r="10"/></svg>
<!-- B6 logo tile -->
<div class="ltile md"><img src="assets/logos/aws/alb.svg" alt="Application Load Balancer"><span class="chip">ALB</span></div>
<!-- B8 lane -->
<div class="lane"><img class="head" src="assets/logos/aws/sqs-queue.svg" alt=""><div class="track">
  <img class="msg" src="assets/logos/aws/sqs-message.svg" alt="">…</div></div>
<!-- B10 photo -->
<div class="photo"><img src="assets/img/dc-wmf-aisle.jpg" alt=""><span class="credit">Ảnh: VGrigas (WMF) / Wikimedia Commons, CC BY-SA 3.0</span></div>
```

```css
.srv{position:absolute;width:200px;height:240px;background:var(--surface);border-radius:28px;box-shadow:0 18px 40px color-mix(in srgb,var(--ink) 14%,transparent)}
.srv .slot{display:block;height:22px;margin:22px 24px 0;border-radius:8px;background:color-mix(in srgb,var(--ink) 12%,transparent)}
.srv .led{position:absolute;right:22px;bottom:22px;width:22px;height:22px;border-radius:50%;background:var(--term-text)}
.srv.hot{outline:6px solid var(--accent)} .srv.hot .led{background:var(--accent)}
.srv.down{opacity:.35;filter:grayscale(1)}
.crowd{fill:var(--ink);opacity:.8} .stream .dot{fill:var(--accent)} .stream .dot.read{fill:var(--ink)}
.meter .bar{height:28px;border-radius:14px;background:color-mix(in srgb,var(--ink) 10%,transparent);position:relative}
.meter .fill{position:absolute;inset:0 auto 0 0;border-radius:14px;background:var(--term-text);transform-origin:left}
.meter.over .fill{background:var(--accent)} .meter .cap{position:absolute;top:-8px;bottom:-8px;width:0;border-left:4px dashed var(--ink)}
.chart .ln{fill:none;stroke:var(--accent);stroke-width:8;stroke-dasharray:1;stroke-dashoffset:1}
.chart .thr{stroke:var(--ink);stroke-dasharray:14 10;stroke-width:4}
.ltile{position:absolute;background:var(--surface);border-radius:40px;display:grid;place-items:center} .ltile.md{width:184px;height:184px}
.ltile .chip{position:absolute;top:100%;margin-top:16px;font:800 44px/1 var(--font);color:var(--ink);white-space:nowrap}
.lane .track{width:1000px;height:120px;border-radius:60px;background:color-mix(in srgb,var(--ink) 8%,transparent)}
.zone{position:absolute;border:4px dashed color-mix(in srgb,var(--ink) 40%,transparent);border-radius:32px}
.photo{position:absolute;inset:0} .photo img{width:100%;height:100%;object-fit:cover}
.credit{position:absolute;left:160px;top:852px;padding:6px 18px;border-radius:20px;background:color-mix(in srgb,var(--ink) 70%,transparent);color:var(--on-ink);font:600 32px/1.2 var(--font)}
```

Ghi chú khối: B7 là lưới chấm 72x36 gõ tay trong viewBox 1440x720, chiếu `x=(lon+180)*4`, `y=(90-lat)*4`; pin là `edge-location.svg`, vị trí minh họa, không ghi tên thành phố. B9 theo mẫu chương trong `parts/scenes.part`: `.num` x560 y250, `.tile.big` 320x320 x800 y200, `.h1.chap` 104 px/800 y590, `.burst` x1180 y170, `.mascot` x1420 y560; sau ≥2.5 s thẻ thu về chip chương 62 px tại x160 y80. Chấm request chính của chương 10 là B3 cỡ 28 px với vòng sáng accent.

## 1. Concept

- **Tiêu đề:** 100.000 người truy cập cùng lúc, website có sập không?
- **Format:** explainer dài 16:9, lấy từ `# Cấu trúc` của `SCRIPT.md`. Xương sống hình: một kiến trúc AWS dựng thêm từng lớp, từ một server đơn tới hệ thống đầy đủ ở chương 10 và 11.
- **Lời hứa:** hiểu vì sao 100.000 người truy cập cùng lúc có thể làm sập website và các lớp AWS giúp hệ thống chịu tải.
- **Góc hook:** mở bằng ảnh thật trung tâm dữ liệu và một ngày bán hàng bình thường, rồi đồng hồ Flash Sale đếm về 12:00, cả đám đông cùng nhấn Mua và trang hiện 503. Không mở bằng "X là gì?".
- **Payoff:** s142 "Câu trả lời là còn phụ thuộc vào cách hệ thống được thiết kế và chuẩn bị." Có scene toàn khung trong c11a, nhạc cắt ngay trước.
- **Thời lượng:** 150 câu, 2556 âm tiết. Ở PACE 3.62 ước tính 12:46; mục tiêu 11:00 cần khoảng 3.9 âm tiết/giây. Số thật lấy từ bản ghi Vibi.
- **Phong cách:** cleanui, giấy sáng, card trắng bo góc, icon Lucide, logo AWS chính thức, 5 ảnh thật có credit. Chuyển động 2D thay cho camera: push-in ảnh, slide, pop, pan và zoom-out canvas kiến trúc.
- **3 màu chính:** `var(--ink)` trung tính, `var(--accent)` traffic và quá tải, `var(--term-text)` khỏe mạnh.
- **Thực thể chính:** chấm request accent 28 px có vòng sáng. Nó là đơn vị traffic xuyên suốt và là "đơn hàng" được theo dấu ở chương 10.
- **Từ khóa phụ đề:** `SCRIPT.md` không có mục `# Từ khóa phụ đề`. Cột Text / UI Overlay dưới đây là đề xuất của mình; phụ đề 16:9 không tô màu từ.

## 2. Bảng scene

| Scene | Câu số | Thời gian & Nhịp | Hình ảnh & Camera | Text / UI Overlay | Âm thanh & SFX | Lời thoại |
|---|---|---|---|---|---|---|
| c1a | 1-4 | 0:00-0:14 · 14.9 s · seam mở phim, không seam | Ảnh thật trung tâm dữ liệu full-frame, đẩy chậm; rồi browser mock cửa hàng nổi lên, server và DB xanh. Chuyển động: Ken Burns push-in 1.00 -> 1.06, card slide-up | Series pill "Behind the Cloud" + logo AWS; credit ảnh; không tiêu đề | thud t=0; pop s4:"mua hàng"; nhạc nền vào nhẹ | 1. "Hãy tưởng tượng bạn đang vận hành một website thương mại điện tử." 2. "Hằng ngày, website chỉ có vài nghìn người truy cập." 3. "Mọi thứ hoạt động bình thường." 4. "Server không quá tải, database phản hồi nhanh và khách hàng có thể mua hàng mà không gặp vấn đề gì." |
| c1b | 5-8 | 0:15-0:32 · 17.1 s · seam cut | Thẻ chương 01, đồng hồ 12:00, ảnh thật đám đông cầm điện thoại, lưới điện thoại cùng nhấn Mua. Chuyển động: pop, card exit thu về chip góc, ảnh push-in nhanh, ripple lan trên lưới | "01", "Cơn bão Flash Sale"; nhãn "SALE"; pill đếm ngược 00:10 -> 00:00; credit ảnh | swoosh seam; pop s5 tile; click s8:"mười hai"; riser đỉnh s8:"nhấn"; laser s8:"mua hàng"; nhạc dồn nhịp, riser | 5. "Nhưng hôm nay là một ngày đặc biệt." 6. "Bạn chuẩn bị tổ chức Flash Sale vào đúng mười hai giờ trưa, với một chương trình giảm giá cực lớn." 7. "Mười giây trước giờ mở bán, hàng nghìn người đã đứng chờ trước màn hình điện thoại." 8. "Và đúng mười hai giờ, tất cả cùng nhấn nút mua hàng." |
| c1c | 9-13 | 0:32-0:43 · 10.8 s · seam slide | Đám đông bắn request vào một server; CPU đỏ, DB chậm, timeout, trang 503. Chuyển động: stream dày, server rung 2 px, browser 503 đập vào | Nhãn meter CPU, DB; toast "Timeout"; "503" | pop s10:"CPU"; click s13:"năm"; nhạc cắt ở "năm không ba", lặng 0.6 s | 9. "Trong vài giây, lượng request đổ về website tăng vọt." 10. "CPU bắt đầu quá tải." 11. "Database phản hồi chậm." 12. "Một số request timeout." 13. "Những người khác bắt đầu nhìn thấy lỗi năm không ba." |
| c1d | 14-15 | 0:44-0:55 · 11.0 s · seam fade | Biển người khổng lồ thu nhỏ quanh một server vẫn xanh với dấu hỏi; logo AWS với tia sáng. Chuyển động: zoom-out pattern, rays | Badge "?"; tên "AWS" | pop s15:"AWS"; nhạc quay lại nhẹ ở s14; lặng 0.9 s cuối | 14. "Và câu hỏi đặt ra là: Làm thế nào những hệ thống lớn có thể phục vụ một lượng người dùng khổng lồ mà không bị sập?" 15. "Hãy xem AWS giải quyết bài toán này như thế nào." |
| c2a | 16-19 | 0:55-1:13 · 17.1 s · seam cut | Thẻ chương 02; 100.000 người so với cửa sổ 1 giây; từng người làm việc khác nhau. Chuyển động: pop, chia đôi màn hình, stream theo loại | "02", "100.000 người nghĩa là gì?"; pill "100.000"; "1 giây"; dấu "≠" | swoosh seam; click s17:"Một trăm nghìn"; pop s19:"đặt hàng"; nhạc calm | 16. "Trước tiên, chúng ta cần hiểu một điều." 17. "Một trăm nghìn người truy cập cùng lúc không có nghĩa là một trăm nghìn request được gửi đến server trong cùng một giây." 18. "Một người dùng có thể chỉ đang đọc trang sản phẩm." 19. "Người khác lại liên tục tìm kiếm, tải hình ảnh hoặc gửi request đặt hàng." |
| c2b | 20-23 | 1:13-1:37 · 24.5 s · seam slide | Dashboard 5 ô chỉ số dựng dần. Chuyển động: slide-up khung, từng ô pop, số và vạch chạy | Nhãn ô: Concurrent Users, RPS, Response Time, Error Rate, DB Throughput | pop s21, s22, s23:"Database"; pop mềm cho 2 ô giữa; nhạc calm | 20. "Vì vậy, khi thiết kế một hệ thống có khả năng chịu tải lớn, các kỹ sư cần quan tâm đến nhiều chỉ số khác nhau." 21. "Đầu tiên là Concurrent Users, số lượng người đang sử dụng hệ thống đồng thời." 22. "Tiếp theo là Requests Per Second, số request server phải xử lý trong mỗi giây." 23. "Ngoài ra còn có Response Time, tức thời gian phản hồi, Error Rate, tỷ lệ request bị lỗi và Database Throughput, khả năng xử lý truy vấn của database." |
| c2c | 24-25 | 1:38-1:56 · 18.0 s · seam slide | Hai panel cạnh nhau: cùng 100.000 người, bên trái đọc trang đã cache nhẹ nhàng, bên phải ghi vào DB nặng. Chuyển động: split-screen, stream, meter | Pill "100.000" trên mỗi panel; không chữ khác | pop s24:"ghi"; pop s25:"số lượng"; nhạc calm; lặng 0.9 s cuối | 24. "Ví dụ, một trăm nghìn người chỉ xem một trang chứa những hình ảnh đã được cache sẽ khác hoàn toàn với một trăm nghìn người cùng thực hiện các giao dịch cần ghi dữ liệu vào database." 25. "Đây chính là lý do không thể chỉ nhìn vào số lượng người dùng để kết luận một hệ thống có chịu tải được hay không." |
| c3a | 26-28 | 1:57-2:05 · 8.4 s · seam cut | Thẻ chương 03; một server ở giữa, người dùng vòng quanh cùng chĩa vào. Chuyển động: pop, vòng người xoay vào | "03", "Vì sao một server gục" | swoosh seam; pop s27:"Website"; nhạc calm | 26. "Hãy bắt đầu với kiến trúc đơn giản nhất." 27. "Website của bạn chạy trên một server duy nhất." 28. "Mọi người dùng đều phải gửi request đến server này." |
| c3b | 29-32 | 2:05-2:20 · 14.3 s · seam slide | Server nhận đủ loại việc, 4 meter CPU, RAM, Network, DB conn leo đỏ. Chuyển động: chip việc quay quanh server, meter fill | Nhãn meter: CPU, RAM, Network, DB conn | pop s32:"giới hạn"; nhạc calm | 29. "Khi traffic tăng lên, server phải xử lý nhiều công việc hơn: chạy code, thực hiện truy vấn database, đọc dữ liệu và trả về kết quả." 30. "CPU phải hoạt động liên tục." 31. "RAM có thể không còn đủ." 32. "Các kết nối đến database cũng có giới hạn." |
| c3c | 33-37 | 2:20-2:38 · 18.0 s · seam slide | Vertical Scaling: server phình to, chạm trần, rồi hỏng làm cả web tắt. Chuyển động: scale-up, trần đứt nét hạ xuống, squash, grey-out | Pill "Vertical Scaling"; chip "+CPU", "+RAM" | pop s33:"nâng cấp"; pop s37:"lỗi"; nhạc calm | 33. "Bạn có thể giải quyết bằng cách nâng cấp server, chẳng hạn tăng CPU và RAM." 34. "Đây được gọi là Vertical Scaling." 35. "Nhưng phương pháp này có giới hạn." 36. "Một server dù mạnh đến đâu cũng chỉ có khả năng xử lý nhất định." 37. "Và nếu server duy nhất đó bị lỗi, toàn bộ website có thể ngừng hoạt động." |
| c3d | 38-40 | 2:38-2:53 · 14.5 s · seam fade | Ảnh thật dãy rack, rồi một server tách thành cụm 4 server chia tải, khung AWS vẽ quanh. Chuyển động: fade ảnh, pan phải, split, khung vẽ nét | Pill "Horizontal Scaling"; credit ảnh | pop s39:"nhiều server"; pop s40:"AWS"; nhạc calm; lặng 0.9 s cuối | 38. "Một giải pháp khác là Horizontal Scaling." 39. "Thay vì phụ thuộc vào một server thật mạnh, chúng ta tạo nhiều server cùng chạy ứng dụng và phân phối công việc cho chúng." 40. "Và đây chính là một trong những nền tảng quan trọng khi xây dựng hệ thống trên AWS." |
| c4a | 41-44 | 2:54-3:16 · 22.0 s · seam cut | Thẻ chương 04; trang sản phẩm nổ thành các tài nguyên tĩnh lặp lại. Chuyển động: pop, fan-out theo cung, nhân bản | "04", "Lớp 1: CloudFront & S3"; tile "CSS", "JS" | swoosh seam; pop s43:"hình ảnh"; pop s44:"mỗi lần"; nhạc calm | 41. "Trước khi đưa tất cả request đến các server ứng dụng, chúng ta có thể giảm đáng kể lượng công việc phải xử lý ngay từ đầu." 42. "Hãy lấy ví dụ một website thương mại điện tử." 43. "Khi bạn mở trang sản phẩm, website phải tải rất nhiều thứ: hình ảnh, logo, file CSS, JavaScript và các nội dung khác." 44. "Những dữ liệu này thường không cần được tạo mới mỗi lần có người truy cập." |
| c4b | 45-48 | 3:16-3:37 · 20.4 s · seam slide | Logo CloudFront, bản đồ thế giới chấm, edge location sáng, người dùng ở Việt Nam lấy nội dung từ điểm gần. Chuyển động: pop, map draw-in, arc draw | Tên "Amazon CloudFront"; chip "CDN" | pop s45:"CloudFront"; pop s48:"gần"; nhạc calm | 45. "Đó là lúc Amazon CloudFront phát huy tác dụng." 46. "CloudFront là một dịch vụ Content Delivery Network, hay CDN." 47. "Nó có thể lưu bản sao của những nội dung được phép cache tại các điểm phân phối trên toàn cầu." 48. "Khi người dùng truy cập, nội dung có thể được trả về từ một điểm gần họ thay vì phải quay về server gốc ở một khu vực xa hơn." |
| c4c | 49-52 | 3:37-3:58 · 20.7 s · seam slide | S3 giữ file tĩnh sau CloudFront; backend nhẹ hẳn; dữ liệu đơn hàng có khóa đi thẳng, không cache. Chuyển động: pipeline trái sang phải, stream thưa dần | Tên "Amazon S3"; meter ms, RPS | pop s49:"S3"; pop s52:"đơn hàng"; nhạc calm; lặng 0.9 s cuối | 49. "Các file tĩnh có thể được lưu trên Amazon S3 và phân phối thông qua CloudFront." 50. "Điều này giúp giảm độ trễ cho người dùng và giảm số lượng request phải xử lý tại hệ thống backend." 51. "Tuy nhiên, không phải dữ liệu nào cũng được cache." 52. "Những nội dung cá nhân hóa hay giao dịch như thông tin đơn hàng phải được xử lý theo các quy tắc phù hợp." |
| c5a | 53-56 | 3:59-4:15 · 16.4 s · seam cut | Thẻ chương 05; dòng request dồn vào một điểm nối, rồi ELB và ALB xuất hiện. Chuyển động: pop, dồn ứ, swap tile | "05", "Lớp 2: Load Balancing"; tên "Elastic Load Balancing", "ALB" | swoosh seam; pop s55; pop s56; nhạc calm | 53. "Sau khi giảm được những request không cần thiết, chúng ta cần giải quyết một vấn đề khác." 54. "Làm thế nào phân phối những request thực sự cần xử lý đến nhiều server?" 55. "AWS cung cấp Elastic Load Balancing." 56. "Trong ví dụ này, chúng ta sử dụng Application Load Balancer, thường được gọi là ALB." |
| c5b | 57-59 | 4:15-4:31 · 15.6 s · seam slide | ALB như người điều phối, chia request tới 6 EC2 nằm trong 2 Availability Zone. Chuyển động: chevron xoay, fan-out round robin, khung AZ vẽ nét | Nhãn "AZ 1", "AZ 2"; tên "EC2" | pop s59:"EC2"; nhạc calm | 57. "Hãy tưởng tượng ALB giống như một người điều phối giao thông." 58. "Thay vì để mọi request đi vào một server duy nhất, ALB phân phối chúng đến nhiều máy chủ ứng dụng đã đăng ký." 59. "Những server này có thể chạy trên các EC2 Instances và được triển khai ở nhiều Availability Zones." |
| c5c | 60-63 | 4:31-4:48 · 16.8 s · seam slide | Health check dò từng server; một server hỏng xám đi, traffic tự chảy qua server còn sống. Chuyển động: ping ripple, đường nối chuyển nét đứt, reroute | Không chữ mới; icon `heart-pulse` | pop s62:"khỏe mạnh"; pop s63:"phục vụ"; nhạc calm | 60. "Một tính năng quan trọng là Health Check." 61. "Load Balancer liên tục kiểm tra trạng thái của các server." 62. "Nếu một server không còn khỏe mạnh, nó sẽ ngừng chuyển request đến server đó theo trạng thái health check." 63. "Nhờ vậy, hệ thống có thể tiếp tục phục vụ người dùng bằng những server còn hoạt động." |
| c5d | 64-65 | 4:48-5:01 · 12.5 s · seam slide | Tải chia đều, độ sẵn sàng lên; rồi đường traffic vượt qua năng lực cụm. Chuyển động: histogram cân bằng, chart vượt ngưỡng | Dấu "?" | pop s65:"thì sao"; nhạc calm; lặng 0.9 s cuối | 64. "Load Balancing giúp cải thiện khả năng phân phối tải và tính sẵn sàng của ứng dụng." 65. "Nhưng vẫn còn một câu hỏi: Nếu lượng truy cập tiếp tục tăng và các server hiện tại không còn đủ năng lực xử lý thì sao?" |
| c6a | 66-69 | 5:02-5:22 · 20.1 s · seam cut | Thẻ chương 06 với logo EC2 Auto Scaling; tạo server bằng tay bị gạch; Auto Scaling Group 3 instance, Flash Sale đẩy vượt ngưỡng. Chuyển động: pop, khung vẽ nét, meter vượt vạch | "06", "Lớp 3: Auto Scaling"; tên "Amazon EC2 Auto Scaling", "Auto Scaling Group"; số "3" | swoosh seam; pop s66:"Auto Scaling"; click s68:"ba"; pop s69:"vượt"; nhạc calm | 66. "Đây là lúc Amazon EC2 Auto Scaling xuất hiện." 67. "Thay vì phải ngồi theo dõi và tạo server mới bằng tay mỗi khi traffic tăng, chúng ta có thể cấu hình một Auto Scaling Group." 68. "Ví dụ, bình thường ứng dụng chỉ cần ba EC2 Instances." 69. "Nhưng khi bắt đầu Flash Sale, lượng request tăng mạnh và các chỉ số hoạt động vượt mức mục tiêu đã thiết lập." |
| c6b | 70-74 | 5:22-5:49 · 26.2 s · seam slide | ASG tự thêm instance; CloudWatch dashboard đo CPU và request mỗi target; Target Tracking giữ quanh mục tiêu. Chuyển động: ghost -> solid, dashboard slide-in, line draw, dao động hội tụ | Tên "Amazon CloudWatch"; nhãn chart "CPU avg", "Requests / target"; pill "Target Tracking" | pop s70:"tự động"; pop s72:"CloudWatch"; nhạc calm | 70. "EC2 Auto Scaling có thể tự động khởi chạy thêm instances để tăng năng lực xử lý." 71. "Vậy hệ thống biết khi nào cần thêm server bằng cách nào?" 72. "Đó là nhờ các metrics được thu thập và giám sát thông qua Amazon CloudWatch." 73. "Chẳng hạn, chúng ta có thể theo dõi mức sử dụng CPU trung bình hoặc số lượng request trên mỗi target của Load Balancer." 74. "Sau đó, một Target Tracking Scaling Policy sẽ giúp duy trì chỉ số quanh giá trị mục tiêu đã cấu hình." |
| c6c | 75-76 | 5:49-5:57 · 8.4 s · seam slide | Traffic lên rồi xuống, số server bám theo đường cong. Chuyển động: line draw, slot server fill rồi rút | Không chữ; icon đồng xu | pop s76:"lãng phí"; nhạc calm | 75. "Khi mức sử dụng tăng, hệ thống mở rộng." 76. "Khi nhu cầu giảm, hệ thống có thể thu hẹp số lượng máy chủ để tránh lãng phí tài nguyên." |
| c6d | 77-79 | 5:58-6:17 · 19.2 s · seam slide | Instance mới cần thời gian boot, đỉnh traffic tới trước; Scheduled Scaling bật capacity trước giờ sale. Chuyển động: progress bar 3 đoạn, chart vẽ lại với bậc capacity sớm | Pill "Scheduled Scaling"; icon lịch | pop s79:"biết trước"; nhạc calm; lặng 0.9 s cuối | 77. "Tuy nhiên, Auto Scaling không có nghĩa là server xuất hiện ngay lập tức." 78. "Một EC2 Instance vẫn cần thời gian để khởi chạy, khởi động ứng dụng và sẵn sàng nhận traffic." 79. "Đối với sự kiện Flash Sale đã biết trước thời điểm, doanh nghiệp nên chuẩn bị capacity từ trước bằng Scheduled Scaling, kết hợp kiểm thử tải và những chính sách scaling phù hợp." |
| c7a | 80-83 | 6:18-6:32 · 14.3 s · seam cut | Thẻ chương 07; tóm tắt cụm đã có, rồi lộ ra database duy nhất bên dưới. Chuyển động: pop, cả cụm trượt lên, reveal theo mép | "07", "Nút thắt: Database" | swoosh seam; pop s83:"database"; nhạc calm | 80. "Đến đây, có thể bạn nghĩ rằng bài toán đã được giải quyết." 81. "Chúng ta đã có nhiều server, một Load Balancer và khả năng tự động mở rộng." 82. "Nhưng vẫn còn một thành phần có thể khiến toàn bộ hệ thống chậm lại." 83. "Đó chính là database." |
| c7b | 84-86 | 6:32-6:42 · 10.1 s · seam slide | 10 server cùng bắn truy vấn vào một DB, xếp hàng, nghẽn cổ chai. Chuyển động: query stream, hàng chờ dồn, funnel bóp | Pill "10" | click s84:"mười"; pop s86:"nút thắt"; nhạc calm | 84. "Hãy tưởng tượng mười server ứng dụng cùng truy vấn một database." 85. "Khi lượng người dùng tăng cao, số lượng truy vấn cũng tăng theo." 86. "Database có thể trở thành nút thắt cổ chai." |
| c7c | 87-91 | 6:43-7:07 · 24.3 s · seam slide | ElastiCache chen giữa app và DB; cache hit trả về ngay, DB nhẹ đi. Chuyển động: slot đứt nét được lấp, chấm đi về, meter tụt | Tên "Amazon ElastiCache" | pop s88:"ElastiCache"; pop s90:"hợp lệ"; nhạc calm | 87. "Để giảm tải, một giải pháp là sử dụng caching." 88. "Ví dụ, thông tin sản phẩm, danh mục hoặc những dữ liệu được đọc thường xuyên có thể được lưu trong Amazon ElastiCache." 89. "Khi người dùng yêu cầu dữ liệu, ứng dụng kiểm tra cache trước." 90. "Nếu dữ liệu còn hợp lệ trong cache, ứng dụng có thể trả kết quả mà không cần truy vấn database." 91. "Điều này giúp giảm số lượng truy vấn đọc và cải thiện tốc độ phản hồi." |
| c7d | 92-94 | 7:07-7:27 · 19.8 s · seam slide | Cache không thay DB: thanh toán, tồn kho, đơn hàng ghi thẳng vào DB qua khóa; Multi-AZ giữ sẵn sàng nhưng không tăng tốc ghi vô hạn. Chuyển động: bật ngược, xếp tuần tự qua khóa, failover, meter có nắp | Nhãn "Multi-AZ" | pop s93:"thanh toán"; pop s94:"Multi-AZ"; nhạc calm; lặng 0.9 s cuối | 92. "Tuy nhiên, cache không thể thay thế database." 93. "Những giao dịch như thanh toán, cập nhật tồn kho hoặc ghi nhận đơn hàng vẫn cần được xử lý bằng các cơ chế giao dịch và kiểm soát đồng thời phù hợp." 94. "Và một điểm quan trọng: Multi-AZ chủ yếu hỗ trợ tính sẵn sàng cao, không đồng nghĩa database tự động có khả năng ghi nhanh hơn vô hạn." |
| c8a | 95-98 | 7:28-7:51 · 23.1 s · seam cut | Thẻ chương 08; điện thoại "Order Confirmed", 4 việc phụ chồng lên làm người dùng phải chờ. Chuyển động: pop, chip xếp chồng, progress tuần tự, spinner | "08", "Lớp 4: Amazon SQS"; UI "Order Confirmed" | swoosh seam; pop s96:"thành công"; pop s98:"rất chậm"; nhạc calm | 95. "Bây giờ, hãy xem một tình huống thực tế." 96. "Bạn vừa đặt một đơn hàng thành công." 97. "Sau đó, hệ thống có thể cần thực hiện thêm nhiều công việc: gửi email xác nhận, tạo hóa đơn, gửi thông tin đến đơn vị vận chuyển và cập nhật các hệ thống báo cáo." 98. "Nếu bắt buộc tất cả những công việc này phải hoàn thành trước khi trả response cho người dùng, trải nghiệm có thể trở nên rất chậm." |
| c8b | 99-103 | 7:52-8:07 · 15.8 s · seam slide | Tách việc phụ ra: app thả message vào hàng đợi SQS, worker lấy ra xử lý. Chuyển động: chip tách khỏi timeline, lane vẽ, message trượt, worker kéo | Tên "Amazon SQS" | pop s100:"Simple"; pop s103:"worker"; nhạc calm | 99. "Một cách tốt hơn là tách các công việc có thể xử lý bất đồng bộ." 100. "AWS cung cấp Amazon Simple Queue Service, hay SQS." 101. "Hãy tưởng tượng SQS là một hàng đợi công việc." 102. "Application gửi message vào queue." 103. "Sau đó, các worker sẽ lấy từng message ra để xử lý." |
| c8c | 104-106 | 8:08-8:25 · 17.6 s · seam slide | Producer và consumer chạy nhịp riêng; đột biến được hàng đợi hấp thụ; worker tăng theo độ dài hàng. Chuyển động: hai nhịp pulse, lane đầy rồi rút, worker nhân thêm | Nhãn "Producer", "Consumer" | pop s106:"mở rộng"; nhạc calm | 104. "Điều quan trọng là producer và consumer không cần phải hoàn thành công việc cùng một thời điểm." 105. "Nếu lượng công việc tăng đột biến, queue có thể giữ lại các message để worker xử lý theo năng lực của chúng." 106. "Thậm chí, chúng ta có thể mở rộng số lượng worker dựa trên số lượng message đang chờ trong queue." |
| c8d | 107-110 | 8:26-8:45 · 19.0 s · seam slide | SQS không phải phép màu: message có thể đến 2 lần, sai thứ tự; consumer bỏ qua bản trùng; message lỗi đi xuống DLQ. Chuyển động: nhân bản chip, hoán vị, bật ra, rơi xuống lane phụ | Chip "Standard"; badge "#42"; "1 2 3"; nhãn "DLQ" | pop s108:"nhiều lần"; pop s110:"Dead"; nhạc calm | 107. "Nhưng SQS không phải phép màu." 108. "Standard Queue sử dụng cơ chế at-least-once delivery, nghĩa là một message có thể được giao nhiều lần và thứ tự không được bảo đảm tuyệt đối." 109. "Vì vậy, consumer cần được thiết kế để xử lý message trùng lặp an toàn." 110. "Những message liên tục thất bại có thể được chuyển sang Dead Letter Queue để điều tra." |
| c8e | 111-112 | 8:45-8:58 · 12.8 s · seam slide | Giao dịch cốt lõi nằm trong khối khóa riêng; nhét cả giao dịch vào hàng đợi bị chặn lại. Chuyển động: khóa sập, bóng rơi vào lane bị bật về | Không chữ mới | pop s111:"nhất quán"; nhạc calm; lặng 0.9 s cuối | 111. "Và hãy nhớ: Những giao dịch cốt lõi như kiểm tra tồn kho và xác nhận thanh toán vẫn cần cơ chế xử lý nhất quán riêng." 112. "Không nên đơn giản đưa toàn bộ giao dịch vào queue rồi xem như đã giải quyết xong." |
| c9a | 113-115 | 8:59-9:15 · 16.6 s · seam cut | Thẻ chương 09; đợi quá tải mới mở rộng thì trễ; Flash Sale có lịch nên chuẩn bị trước. Chuyển động: pop, chart với vùng trễ, vẽ lại bậc sớm | "09", "Chuẩn bị trước giờ G"; pill "12:00" | swoosh seam; pop s114:"không nên"; pop s115:"lên lịch"; nhạc calm | 113. "Một câu hỏi quan trọng khác là: Liệu chúng ta có thể đợi đến khi website quá tải rồi mới bắt đầu mở rộng không?" 114. "Câu trả lời là không nên." 115. "Đối với một chương trình Flash Sale đã được lên lịch trước, đội ngũ kỹ thuật hoàn toàn có thể chuẩn bị hệ thống từ trước." |
| c9b | 116-121 | 9:16-9:36 · 20.7 s · seam slide | Load Testing: đội bot mô phỏng người dùng, tải tăng dần, chart đánh dấu 3 điểm gãy: server chậm, DB nghẽn, lỗi tăng. Chuyển động: lưới bot fill theo bậc, stream ramp, marker pop | Pill "Load Testing"; marker 1 2 3 | pop s119, s120, s121 (mềm); nhạc calm | 116. "Đầu tiên, họ cần thực hiện Load Testing." 117. "Thay vì chờ khách hàng truy cập thật, chúng ta mô phỏng nhiều người dùng cùng gửi request đến hệ thống." 118. "Mục đích là tìm ra giới hạn hiện tại." 119. "Ví dụ, server bắt đầu chậm ở mức traffic nào?" 120. "Database bắt đầu nghẽn khi nào?" 121. "Có bao nhiêu request mỗi giây trước khi tỷ lệ lỗi tăng mạnh?" |
| c9c | 122-125 | 9:37-10:03 · 25.9 s · seam slide | Dùng kết quả để cấu hình: Scheduled Scaling với Min, Desired, Max; checklist quotas, kết nối DB, queue, ngân sách; AWS WAF chặn bot. Chuyển động: marker bay vào card, slider dâng, tick, khiên chặn | "Min", "Desired", "Max"; tên "AWS WAF"; nhãn chip ngắn | pop s123:"thiết lập"; pop s124:"service"; pop s125:"WAF"; nhạc calm | 122. "Sau đó, đội kỹ thuật sử dụng kết quả này để lựa chọn cấu hình và capacity phù hợp." 123. "Với AWS, chúng ta có thể thiết lập Scheduled Scaling để tăng số lượng EC2 Instances trước thời điểm Flash Sale." 124. "Ngoài ra, hệ thống cũng cần kiểm tra service quotas, giới hạn kết nối database, mức tiêu thụ queue và ngân sách dự kiến." 125. "Nếu có lượng traffic không hợp lệ từ bot, các lớp bảo vệ như AWS WAF cũng có thể hỗ trợ lọc và giới hạn request." |
| c9d | 126-127 | 10:03-10:12 · 9.2 s · seam slide | Phản ứng khi có sự cố so với chuẩn bị từ đầu. Chuyển động: hai panel, panel phải trượt đè, bump | Không chữ; icon còi báo và khiên | pop s127:"chuẩn bị"; nhạc calm; lặng 0.9 s cuối | 126. "Vì vậy, một hệ thống tốt không chỉ biết phản ứng khi có sự cố." 127. "Nó còn phải được chuẩn bị để giảm khả năng sự cố xảy ra ngay từ đầu." |
| c10a | 128-130 | 10:13-10:27 · 13.7 s · seam cut | Thẻ chương 10; điện thoại bấm Mua sinh ra chấm request phát sáng, tài nguyên tĩnh trả về từ CloudFront. Chuyển động: pop, tap, canvas pan theo chấm | "10", "Theo dấu một đơn hàng" | swoosh seam; laser s128:"nhấn"; pop s130:"CloudFront"; nhạc calm, nhịp tăng nhẹ | 128. "Hãy cùng theo dõi một đơn hàng từ lúc người dùng nhấn nút mua cho đến khi hệ thống xử lý xong." 129. "Đầu tiên, người dùng truy cập website." 130. "Những nội dung tĩnh như hình ảnh, CSS và JavaScript có thể được phân phối thông qua CloudFront." |
| c10b | 131-134 | 10:27-10:51 · 24.0 s · seam slide | Request đặt hàng qua ALB tới EC2 khỏe trong ASG; app kiểm tra; đọc từ ElastiCache, ghi vào DB. Chuyển động: canvas pan phải, chấm chạy theo đường, check tick | Tên ngắn dưới logo: "ALB", "EC2", "ElastiCache" | pop s131:"đi đến"; pop s134:"ElastiCache"; nhạc calm | 131. "Khi người dùng cần thực hiện một hành động, chẳng hạn gửi request đặt hàng, request sẽ đi đến Application Load Balancer." 132. "ALB chuyển request đến một EC2 Instance đang hoạt động bình thường." 133. "Ứng dụng tiếp nhận request và kiểm tra thông tin sản phẩm, tình trạng tồn kho cũng như các điều kiện cần thiết." 134. "Những truy vấn đọc lặp lại có thể được phục vụ từ ElastiCache, trong khi các thao tác ghi quan trọng được thực hiện tại database." |
| c10c | 135-136 | 10:52-11:07 · 15.5 s · seam slide | Đơn hàng được nhận, message vào SQS, worker gửi email, tạo hóa đơn, đồng bộ. Chuyển động: canvas pan phải, message trượt lane, icon đáp xuống | Không chữ mới | pop s135:"Amazon SQS"; pop s136:"email"; nhạc calm | 135. "Sau khi đơn hàng được tiếp nhận và trạng thái giao dịch đã được xử lý theo đúng logic nghiệp vụ, ứng dụng có thể gửi các sự kiện hoặc message vào Amazon SQS." 136. "Những background workers sẽ lấy message ra để gửi email, tạo hóa đơn hoặc đồng bộ với các hệ thống khác." |
| c10d | 137-140 | 11:08-11:27 · 19.8 s · seam slide | Zoom-out cả kiến trúc; CloudWatch theo dõi mọi thành phần; ASG thêm máy; ALB né server lỗi; mỗi thành phần một vai trò. Chuyển động: canvas scale 1 -> 0.45, đường giám sát vẽ, cascade bump | Không chữ mới | pop s137:"CloudWatch"; pop s140:"vai trò"; nhạc calm; lặng 0.9 s cuối | 137. "Trong suốt quá trình đó, CloudWatch theo dõi trạng thái hoạt động của các thành phần." 138. "Nếu lượng traffic tăng, Auto Scaling có thể bổ sung thêm năng lực xử lý." 139. "Nếu một server gặp lỗi, Load Balancer có thể ngừng gửi request đến server đó." 140. "Như vậy, mỗi thành phần đảm nhiệm một vai trò riêng thay vì bắt một server duy nhất xử lý mọi thứ." |
| c11a | 141-143 | 11:28-11:48 · 19.7 s · seam cut | Thẻ chương 11; câu hỏi lặp lại; PAYOFF toàn khung: phụ thuộc vào thiết kế và chuẩn bị; rồi kiến trúc đầy đủ sáng theo từng vai trò. Chuyển động: clear toàn khung, rays, 2 tile pop lớn, cascade | "11", "Câu trả lời thật sự"; thesis "Phụ thuộc vào thiết kế & chuẩn bị" | swoosh seam; riser đỉnh s142:"phụ thuộc"; pop s142:"thiết kế"; pop s142:"chuẩn bị"; pop mềm cascade s143; nhạc cắt sau s141, lặng tới s142; drop trở lại ở "thiết kế" | 141. "Vậy cuối cùng, một trăm nghìn người truy cập cùng lúc có khiến website bị sập hay không?" 142. "Câu trả lời là còn phụ thuộc vào cách hệ thống được thiết kế và chuẩn bị." 143. "AWS cung cấp những dịch vụ giúp doanh nghiệp phân phối traffic, cache nội dung, mở rộng tài nguyên, xử lý công việc bất đồng bộ và giám sát toàn bộ hệ thống." |
| c11b | 144-146 | 11:48-12:14 · 25.8 s · seam slide | Điểm yếu vẫn làm sập: DB quá tải, truy vấn kém, server boot chậm, điểm lỗi duy nhất; xây hệ thống chịu tải là 5 việc chứ không phải chồng thêm dịch vụ. Chuyển động: node nháy đỏ, rung, chồng logo đổ, 5 trụ pop | Không chữ; 5 icon trụ | pop s144:"database"; pop s146:"thiết kế"; pop mềm cho 4 trụ sau; nhạc calm | 144. "Nhưng nếu database vẫn quá tải, nếu ứng dụng có truy vấn kém hiệu quả, nếu những server mới không khởi động kịp hoặc nếu kiến trúc có một điểm lỗi duy nhất, website vẫn có thể gặp sự cố." 145. "Vì vậy, xây dựng một hệ thống có khả năng chịu tải lớn không chỉ là việc lựa chọn thật nhiều dịch vụ AWS." 146. "Đó là bài toán thiết kế kiến trúc, kiểm thử, tối ưu hiệu năng, quản lý chi phí và chuẩn bị cho những tình huống xấu nhất." |
| c11c | 147-148 | 12:14-12:39 · 24.1 s · seam fade | Website lớn chạy êm dù traffic lên xuống, server thêm rồi rút; lật ra ảnh thật sảnh datacenter; logo AWS. Chuyển động: chart sống, slot server, browser trượt đi lộ ảnh, push-in | Credit ảnh; tên "AWS" | pop s148:"AWS"; nhạc dâng nhẹ; lặng 0.8 s cuối | 147. "Lần tới khi bạn truy cập một website lớn và mọi thứ vẫn hoạt động bình thường dù có hàng trăm nghìn người đang sử dụng, hãy nhớ rằng phía sau trải nghiệm đơn giản đó có thể là cả một hệ thống phân tán rất phức tạp." 148. "Đây là cách AWS giúp giải quyết một trong những bài toán lớn nhất của thế giới công nghệ: Làm thế nào để một hệ thống vẫn hoạt động khi hàng triệu người cùng muốn sử dụng nó?" |
| c11d | 149-150 | 12:39-12:45 · 5.3 s · seam fade | Ảnh thật dãy rack, logo AWS và tên series; sau đó end card thương hiệu. Chuyển động: fade, pop, bump | Pill series "AWS: Behind the Cloud"; credit ảnh | pop s150:"AWS"; swoosh vào end card; nhạc kết, fade-out theo end card | 149. "Cảm ơn bạn đã theo dõi." 150. "Hẹn gặp lại trong tập tiếp theo của AWS Behind the Cloud." |

## 2b. Chi tiết từng scene

Beat dạng `s<câu>:"từ"` -> thay đổi. Từ neo là tiếng Việt khi có thể; với thuật ngữ tiếng Anh, đối chiếu `asr-words.json` trước khi dựng.

### c1a · câu 1-4 · 0:00-0:14 · seam vào: mở phim, không seam

- **Bố cục:** Ảnh `dc-wmf-aisle.jpg` phủ 1920x1080. Series pill x160 y80. Sau s1: scrim tối 0.45 + blur 8 px trên ảnh; crowd nhỏ x160-360 y300-700; browser mock x420-1260 y140-780; server card M x1380 y220, DB x1560 y520; credit x160 y852.
- **Thành phần:** B10 photo+credit, B11 browser mock (trang sản phẩm: khối ảnh, 2 dòng skeleton, nút "Mua"), B2 crowd nhỏ 12 `users.svg`, B3 stream thưa, B1 server `.ok`, DB cylinder `.ok`, B4 meter x2, B13 badge check
- **Beat:**
  - s1:"Hãy" -> ảnh datacenter full-frame đã hiện từ frame 0, push-in bắt đầu; series pill trượt vào từ trái; credit hiện cùng ảnh
  - s1:"website" -> scrim + blur ảnh, browser mock slide-up 60 px vào giữa
  - s2:"vài nghìn" -> 12 user glyph pop thành lưới thưa bên trái; stream 3 chấm/giây chạy vào browser
  - s3:"bình thường" -> server card M + DB pop bên phải, LED xanh; 2 meter CPU và DB ở mức 20%
  - s4:"database" -> DB bump nhẹ, meter DB nhấp nháy xanh
  - s4:"mua hàng" -> cursor nhấn "Mua", badge check xanh pop trên browser
- **SFX:** thud t=0; pop s4:"mua hàng". Nền: nhạc nền vào nhẹ.

### c1b · câu 5-8 · 0:15-0:32 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu 16:9: num x560 y250, tile lớn x800 y200, title y590, burst x1180 y170, mascot x1420 y560. Sau đó: browser mock x420-1260 y160-760, đồng hồ tile M x1400 y200. Ảnh `crowd-phones.jpg` full-frame, pill đếm ngược x1460 y80. Lưới 8x4 điện thoại mini x200-1720 y140-860.
- **Thành phần:** B9 chapter card (icon `i-zap` trên tile accent), B11 browser + phone mini, B6-style tile đồng hồ `i-clock`, B10 photo+credit, nhãn `.label` "SALE"
- **Beat:**
  - s5:"Nhưng" -> num "01" + tile `i-zap` + burst hiện ngay trên cut
  - s5:"đặc biệt" -> title "Cơn bão Flash Sale" reveal; mascot pop
  - s6:"Flash Sale" -> thẻ chương thu về chip "01" góc x160 y80; browser mock quay lại, banner accent quét ngang
  - s6:"mười hai giờ" -> tile đồng hồ pop, kim quay tới 12; pill "12:00"
  - s6:"giảm giá" -> nhãn "SALE" xoay vào trên khối ảnh sản phẩm
  - s7:"Mười giây" -> pill đếm ngược "00:10" bắt đầu nhảy mỗi giây
  - s7:"hàng nghìn" -> fade ảnh `crowd-phones.jpg` full-frame + credit, pill đếm ngược giữ góc phải trên
  - s8:"đúng" -> pill chạm "00:00", flash accent
  - s8:"nhấn" -> cut trong cảnh sang lưới 32 điện thoại mini; riser đạt đỉnh
  - s8:"mua hàng" -> ripple: cả 32 nút "Mua" nhấn cùng lúc, từ giữa lan ra
- **SFX:** swoosh seam; pop s5 tile; click s8:"mười hai"; riser đỉnh s8:"nhấn"; laser s8:"mua hàng". Nền: nhạc dồn nhịp, riser.

### c1c · câu 9-13 · 0:32-0:43 · seam vào: slide

- **Bố cục:** Crowd x160-520 y200-760; server L x820 y260; DB x860 y640; mini chart RPS x1240-1760 y100-330; 2 meter x1240-1760 y420-560; browser 503 x480-1440 y180-760 khi đập vào.
- **Thành phần:** B2 crowd dày, B3 stream 60 chấm, B1 server L, DB, B5 chart nhỏ, B4 meter x2, toast `i-triangle-alert`, B11 browser
- **Beat:**
  - s9:"request" -> stream 60 chấm từ crowd vào server
  - s9:"tăng vọt" -> chart RPS vẽ đường dựng đứng
  - s10:"CPU" -> meter CPU lên 100% accent; server `.hot` rung
  - s11:"Database" -> DB hiện đồng hồ cát xoay; meter DB lên accent
  - s12:"timeout" -> 8 chấm chuyển xám, rơi khỏi đường; toast "Timeout" trượt vào
  - s13:"năm không ba" -> browser đập vào giữa, "503" cỡ 160 px; toàn khung rung 0.2 s
- **SFX:** pop s10:"CPU"; click s13:"năm". Nền: nhạc cắt ở "năm không ba", lặng 0.6 s.

### c1d · câu 14-15 · 0:44-0:55 · seam vào: fade

- **Bố cục:** Crowd pattern phủ x160-1760 y100-880; server M giữa x860 y380; badge "?" x1040 y340. Sau s15: tile AWS lớn 320 giữa x800 y250, radial rays sau; hàng 6 logo sm y640, opacity 0.35.
- **Thành phần:** B2 crowd pattern, B1 server, B13 badge "?", B6 tile lớn `aws-cloud.svg`, radial rays, B6 sm x6
- **Beat:**
  - s14:"câu hỏi" -> fade vào: server giữa, badge "?" pop
  - s14:"khổng lồ" -> pattern người dùng thu nhỏ 1 -> 0.3, mật độ tăng
  - s14:"không bị sập" -> LED server vẫn xanh, check nhấp nháy
  - s15:"AWS" -> tile `aws-cloud.svg` pop giữa, radial rays
  - s15:"giải quyết" -> 6 logo sm trượt lên mờ: cloudfront, alb, ec2-autoscaling, elasticache, sqs, cloudwatch
- **SFX:** pop s15:"AWS". Nền: nhạc quay lại nhẹ ở s14; lặng 0.9 s cuối.

### c2a · câu 16-19 · 0:55-1:13 · seam vào: cut

- **Bố cục:** Thẻ chương như c1b. Sau đó: crowd pattern x160-860 y140-760, pill "100.000" x360 y790; dấu "≠" x900 y430; lane 1 giây x1000-1760 y380-520 với icon `i-clock`. Từ s18: 3 hàng người dùng x160-1760 y160 / y400 / y640.
- **Thành phần:** B9, B2 crowd, B3 stream có icon loại (ảnh `i-image`, tìm `i-search`, giỏ `i-shopping-cart`), B8 lane dùng như cửa sổ thời gian, B11 trang sản phẩm mini
- **Beat:**
  - s16:"Trước tiên" -> num "02" + tile `i-users` có badge "?" + burst
  - s16:"hiểu" -> title reveal; mascot pop
  - s17:"Một trăm nghìn" -> thẻ chương về chip; crowd pattern phủ nửa trái; pill "100.000"
  - s17:"không có nghĩa" -> dấu "≠" pop giữa; lane "1 giây" vẽ bên phải
  - s17:"cùng một giây" -> chỉ 9 chấm đi qua lane; phần lớn crowd chuyển xám
  - s18:"đọc" -> hàng 1: một user + trang sản phẩm có icon mắt, không có chấm nào chạy
  - s19:"tìm kiếm" -> hàng 2: user phát chấm `i-search` liên tục
  - s19:"hình ảnh" -> chấm `i-image` nối theo
  - s19:"đặt hàng" -> hàng 3: một chấm accent mang giỏ hàng chạy tới DB
- **SFX:** swoosh seam; click s17:"Một trăm nghìn"; pop s19:"đặt hàng". Nền: nhạc calm.

### c2b · câu 20-23 · 1:13-1:37 · seam vào: slide

- **Bố cục:** Khung dashboard x160-1760 y100-860. Hàng trên 3 ô 500x340 tại y120; hàng dưới 2 ô 500x340 tại y500, căn giữa.
- **Thành phần:** Card trắng radius 36; mỗi ô: icon 110 px + nhãn 44 px + một hình nhỏ: counter (ô 1), B5 sparkline (ô 2), B4 meter ms (ô 3), B4 meter % (ô 4), B4 meter DB (ô 5)
- **Beat:**
  - s20:"thiết kế" -> khung dashboard slide-up, 5 ô skeleton xám
  - s20:"nhiều chỉ số" -> 5 ô skeleton nhấp lần lượt trái sang phải
  - s21:"Đầu tiên" -> ô 1 lật thành `users.svg` + counter chạy lên; nhãn "Concurrent Users"
  - s22:"Tiếp theo" -> ô 2: sparkline RPS vẽ, đầu đường nhảy; nhãn "Requests / s"
  - s23:"Ngoài ra" -> ô 3: đồng hồ bấm giờ + meter ms; nhãn "Response Time"
  - s23:"tỷ lệ" -> ô 4: `i-triangle-alert` + meter % nhỏ; nhãn "Error Rate"
  - s23:"khả năng" -> ô 5: DB cylinder + meter truy vấn; nhãn "DB Throughput"
  - s23:"database" -> cả 5 ô bump đồng loạt
- **SFX:** pop s21, s22, s23:"Database"; pop mềm cho 2 ô giữa. Nền: nhạc calm.

### c2c · câu 24-25 · 1:38-1:56 · seam vào: slide

- **Bố cục:** Panel trái x180-940 y120-800; panel phải x980-1740 y120-800. Mỗi panel: pill "100.000" trên cùng, crowd mini, đích ở giữa, meter dưới cùng y720.
- **Thành phần:** B2 crowd mini x2, tile cache `i-image` có badge check, DB cylinder, B3 stream x2, B4 meter x2
- **Beat:**
  - s24:"Ví dụ" -> panel trái: crowd -> tile ảnh đã cache, chấm bật về nhanh, meter thấp xanh
  - s24:"khác hoàn toàn" -> panel phải slide vào: crowd y hệt
  - s24:"ghi" -> chấm accent mang icon bút chạy vào DB; meter phải leo lên accent
  - s25:"Đây chính là" -> hai pill "100.000" phát sáng cùng lúc: số người như nhau
  - s25:"số lượng" -> hai pill mờ đi, hai meter bump: tải khác hẳn
  - s25:"chịu tải" -> DB phải `.hot`, panel trái giữ xanh
- **SFX:** pop s24:"ghi"; pop s25:"số lượng". Nền: nhạc calm; lặng 0.9 s cuối.

### c3a · câu 26-28 · 1:57-2:05 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu. Sau đó: server L giữa x820 y330; 12 `users.svg` trên vòng tròn bán kính 400 tâm x960 y490, kẹp trong y100-880.
- **Thành phần:** B9 (tile: server glyph + badge `i-x` accent), B1 server L, 12 user tile sm, B3 stream hướng tâm
- **Beat:**
  - s26:"Hãy" -> num "03" + tile server có badge `i-x` + burst
  - s26:"đơn giản" -> title reveal; mascot pop
  - s27:"Website" -> thẻ chương về chip; server L pop giữa
  - s27:"duy nhất" -> server bump, LED xanh
  - s28:"Mọi người dùng" -> 12 user pop thành vòng
  - s28:"server này" -> mỗi user bắn 1 chấm vào tâm
- **SFX:** swoosh seam; pop s27:"Website". Nền: nhạc calm.

### c3b · câu 29-32 · 2:05-2:20 · seam vào: slide

- **Bố cục:** Server L x360 y300; 4 chip việc quay quỹ đạo bán kính 240 quanh server; 4 meter x1000-1700, y220 / y360 / y500 / y640.
- **Thành phần:** B1 server L, 4 chip icon (`i-code`, `i-database`, `i-file`, `i-send`), B4 meter x4 có vạch giới hạn, B3 stream
- **Beat:**
  - s29:"traffic" -> stream vào server dày dần
  - s29:"chạy code" -> chip `i-code` pop lên quỹ đạo
  - s29:"truy vấn" -> chip `i-database` pop
  - s29:"đọc dữ liệu" -> chip `i-file` pop
  - s29:"trả về" -> chip `i-send` pop; 4 chip quay nhanh hơn
  - s30:"CPU" -> meter CPU lên 95% accent
  - s31:"RAM" -> meter RAM lên 90%; meter Network bò lên 80%
  - s32:"kết nối" -> meter DB conn chạm vạch giới hạn đứt nét
  - s32:"giới hạn" -> server `.hot`, rung nhẹ
- **SFX:** pop s32:"giới hạn". Nền: nhạc calm.

### c3c · câu 33-37 · 2:20-2:38 · seam vào: slide

- **Bố cục:** Server ở x820 y420 (gốc đáy) scale từ dưới lên; mũi tên dọc x1180; pill x160 y120; trần đứt nét y160 từ x500 đến x1420; browser mini x1300 y600.
- **Thành phần:** B1 server, chip "+CPU" "+RAM", `.label` pill, đường trần accent, B11 browser mini, B13 badge `i-x`
- **Beat:**
  - s33:"nâng cấp" -> mũi tên lên pop; server scale 1 -> 1.6 neo đáy
  - s33:"CPU và RAM" -> chip "+CPU" "+RAM" bay vào và dính vào server
  - s34:"Đây được gọi" -> pill "Vertical Scaling" trượt vào góc trái trên
  - s35:"giới hạn" -> đường trần accent hạ xuống y160
  - s36:"nhất định" -> server cố lớn thêm, đụng trần, squash; meter trên server chạm đỉnh lại
  - s37:"bị lỗi" -> server `.down`, badge `i-x`
  - s37:"toàn bộ website" -> browser mini chuyển xám, mọi chấm rơi
- **SFX:** pop s33:"nâng cấp"; pop s37:"lỗi". Nền: nhạc calm.

### c3d · câu 38-40 · 2:38-2:53 · seam vào: fade

- **Bố cục:** Ảnh `dc-cern-racks.jpg` full-frame, credit x160 y852, pill x160 y760. Từ s39: ảnh blur + scrim; 4 server M hàng ngang x260-1660 y360; stream từ x160; khung AWS x200-1720 y200-780 với `aws-cloud.svg` ở góc trái trên.
- **Thành phần:** B10 photo+credit, `.label` pill, B1 server x4, B3 stream chia 4, B12 khung nhóm AWS
- **Beat:**
  - s38:"Một giải pháp khác" -> fade vào ảnh rack, pan phải chậm; credit hiện
  - s38:"Horizontal Scaling" -> pill "Horizontal Scaling" pop
  - s39:"Thay vì" -> ảnh blur 8 px + scrim; một server lớn hiện giữa
  - s39:"nhiều server" -> server tách thành 4 card trượt ra hàng ngang
  - s39:"phân phối" -> stream chia đều 4 nhánh, 4 meter mini xanh
  - s40:"AWS" -> khung nhóm AWS vẽ nét quanh cụm, logo `aws-cloud.svg` pop ở góc
- **SFX:** pop s39:"nhiều server"; pop s40:"AWS". Nền: nhạc calm; lặng 0.9 s cuối.

### c4a · câu 41-44 · 2:54-3:16 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu. Sau đó: cụm 4 server nhỏ x1380-1760 y380; khung lọc đứt nét x1040 y360; browser mock x560-1360 y200-720; 5 tile tài nguyên M bung theo cung quanh browser, trong y100-880.
- **Thành phần:** B9 (tile `i-globe` có 3 chấm edge accent), B1 server sm x4, B11 browser, tile tài nguyên: `i-image`, sao (logo shop giả), file "CSS", file "JS", "…"; B13 badge `i-copy`
- **Beat:**
  - s41:"Trước khi" -> num "04" + tile `i-globe` + burst
  - s41:"giảm đáng kể" -> title reveal; mascot pop
  - s42:"ví dụ" -> thẻ chương về chip; browser mock pop giữa; stream mờ chạy về cụm server bên phải
  - s43:"hình ảnh" -> tile ảnh bung ra từ browser
  - s43:"logo" -> tile logo bung ra
  - s43:"CSS" -> tile "CSS" bung ra
  - s43:"JavaScript" -> tile "JS" bung ra
  - s44:"tạo mới" -> mỗi tile gắn badge `i-copy`: giống hệt nhau
  - s44:"mỗi lần" -> 3 user glyph lần lượt xin cùng tile ảnh; cùng một bản trả về 3 lần
- **SFX:** swoosh seam; pop s43:"hình ảnh"; pop s44:"mỗi lần". Nền: nhạc calm.

### c4b · câu 45-48 · 3:16-3:37 · seam vào: slide

- **Bố cục:** Logo L giữa x800 y260 rồi thu về x160 y100 (sm). Map x160-1760 y120-880. Pin edge 8 điểm. User pin ở vị trí Việt Nam. Origin pin xa.
- **Thành phần:** B6 `cloudfront.svg` lớn rồi sm, radial rays, B7 map + pin `edge-location.svg` + user `client.svg`, cung accent ngắn, cung xám dài
- **Beat:**
  - s45:"Đó là lúc" -> rays sẵn
  - s45:"CloudFront" -> tile `cloudfront.svg` pop lớn + tên "Amazon CloudFront"
  - s46:"Content" -> tile thu về góc trái trên; chip "CDN"; map chấm vẽ từ trái sang phải
  - s47:"bản sao" -> tile tài nguyên mini nhân bản ra 8 pin
  - s47:"toàn cầu" -> 8 pin cùng pulse
  - s48:"người dùng" -> user pin ở Việt Nam sáng
  - s48:"gần họ" -> cung accent ngắn nối pin gần nhất -> user, chấm chạy nhanh
  - s48:"server gốc" -> cung xám dài tới origin xa vẽ rồi mờ đi, badge `i-x`
- **SFX:** pop s45:"CloudFront"; pop s48:"gần". Nền: nhạc calm.

### c4c · câu 49-52 · 3:37-3:58 · seam vào: slide

- **Bố cục:** Hàng trên y200-480: S3 x220, CloudFront x860 (có "kệ cache"), users x1560. Hàng dưới y600-860: cụm server backend x700-1220, meter RPS x1300-1760 y640, meter ms x1300-1760 y760.
- **Thành phần:** B6 `s3.svg` (tên "Amazon S3"), B6 `cloudfront.svg`, `users.svg`, B3 stream, B1 server sm x4, B4 meter x2, chấm khóa `i-lock`, card `i-receipt`
- **Beat:**
  - s49:"lưu" -> tile `s3.svg` pop, file tĩnh rơi vào bucket
  - s49:"phân phối" -> mũi tên S3 -> CloudFront -> users, chấm tài nguyên chạy
  - s50:"độ trễ" -> meter ms tụt từ accent về xanh
  - s50:"backend" -> stream xuống cụm backend thưa từ 60 còn 10 chấm; meter RPS tụt
  - s51:"Tuy nhiên" -> một chấm accent có `i-lock` xuất hiện ở users
  - s52:"cá nhân hóa" -> chấm khóa đi qua CloudFront không dừng ở kệ cache, kệ hiện gạch chéo
  - s52:"đơn hàng" -> card `i-receipt` có khóa theo cùng đường xuống backend
- **SFX:** pop s49:"S3"; pop s52:"đơn hàng". Nền: nhạc calm; lặng 0.9 s cuối.

### c5a · câu 53-56 · 3:59-4:15 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu. Sau đó: stream từ x160 y490 tới điểm nối x700 y490; 4 server sm cột x1400-1560 y160-820; tile ELB/ALB đặt tại điểm nối.
- **Thành phần:** B9 (tile glyph `split` một mũi tên tách 3), B3 stream, B1 server sm x4, B6 `elb.svg`, B6 `alb.svg`
- **Beat:**
  - s53:"Sau khi" -> num "05" + tile mũi tên chia nhánh + burst
  - s53:"vấn đề" -> title reveal; mascot pop
  - s54:"phân phối" -> thẻ chương về chip; stream dồn ứ ở điểm nối, server bên phải còn trống
  - s55:"AWS cung cấp" -> tile `elb.svg` pop tại điểm nối + tên
  - s56:"chúng ta sử dụng" -> `alb.svg` lật thay ELB
  - s56:"gọi là" -> pill "ALB" dưới tile
- **SFX:** swoosh seam; pop s55; pop s56. Nền: nhạc calm.

### c5b · câu 57-59 · 4:15-4:31 · seam vào: slide

- **Bố cục:** ALB tile M x320 y400. AZ 1 x780-1740 y100-460; AZ 2 x780-1740 y520-880. Mỗi AZ 3 server M cách 300 px. Logo EC2 sm x1600 y110 khi được gọi tên.
- **Thành phần:** B6 `alb.svg`, chevron điều phối, B1 server M x6 (icon `ec2-instance.svg` sau s59), B12 zone x2, B3 stream, B13 badge check nhỏ, B6 `ec2.svg`
- **Beat:**
  - s57:"điều phối" -> 3 chevron trên ALB bật lần lượt như đèn hiệu
  - s58:"Thay vì" -> bóng mờ: mọi chấm dồn vào 1 server, server đó đỏ
  - s58:"phân phối" -> chấm chia vòng lần lượt sang 6 server, server đỏ hồi xanh
  - s58:"đã đăng ký" -> mỗi server gắn badge check nhỏ
  - s59:"EC2" -> tile `ec2.svg` pop; icon trong 6 server đổi sang `ec2-instance.svg`
  - s59:"Availability" -> khung "AZ 1" và "AZ 2" vẽ nét đứt quanh 2 hàng
- **SFX:** pop s59:"EC2". Nền: nhạc calm.

### c5c · câu 60-63 · 4:31-4:48 · seam vào: slide

- **Bố cục:** Giữ nguyên bố cục c5b. Icon heart-pulse sm trên ALB x380 y300. Cột users x160-260 y200-780.
- **Thành phần:** Như c5b + glyph `heart-pulse`, vòng ping, B13 badge `i-x`, `users.svg` x4
- **Beat:**
  - s60:"tính năng" -> glyph `heart-pulse` pop trên ALB
  - s61:"liên tục" -> vòng ping chạy từ ALB tới 6 server mỗi 1 s, LED nháy khi trúng
  - s62:"không còn" -> server AZ 1 #2 LED chuyển accent
  - s62:"khỏe mạnh" -> server đó `.down`, badge `i-x`
  - s62:"ngừng chuyển" -> đường nối tới nó thành nét đứt xám, chấm rẽ sang 5 server còn lại
  - s63:"tiếp tục phục vụ" -> 4 user bên trái nhận check xanh
- **SFX:** pop s62:"khỏe mạnh"; pop s63:"phục vụ". Nền: nhạc calm.

### c5d · câu 64-65 · 4:48-5:01 · seam vào: slide

- **Bố cục:** Trên: 5 cột histogram tải x400-1520 y140-440; meter "availability" x400-1520 y500. Từ s65: chart x160-1760 y120-860 phủ lên, đường capacity đứt nét y420.
- **Thành phần:** B4 meter dọc x5, B4 meter ngang, B5 chart + đường capacity, B13 badge "?"
- **Beat:**
  - s64:"Load Balancing" -> 5 cột tải pop cùng chiều cao
  - s64:"tính sẵn sàng" -> meter availability lên xanh
  - s65:"Nhưng" -> chart trượt vào, đường traffic bắt đầu leo
  - s65:"tiếp tục tăng" -> đường vượt vạch capacity, 5 cột chuyển accent
  - s65:"thì sao" -> badge "?" pop tại điểm cắt
- **SFX:** pop s65:"thì sao". Nền: nhạc calm; lặng 0.9 s cuối.

### c6a · câu 66-69 · 5:02-5:22 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu, tile lớn chứa `ec2-autoscaling.svg`. Sau đó: cursor + nút "+" x260 y300; khung ASG x480-1480 y180-780 với `asg-group.svg` góc trái trên; 3 server M trong khung; pill "3" x1560 y200; `cloudwatch-alarm.svg` sm x1560 y420.
- **Thành phần:** B9 + B6 lớn `ec2-autoscaling.svg`, cursor, B13 `i-x`, B12 khung ASG, B1 server x3 với `ec2-instance.svg`, B4 meter mini x3 có vạch target, B6 sm `cloudwatch-alarm.svg`
- **Beat:**
  - s66:"Đây là lúc" -> num "06" + burst; tile trống
  - s66:"Auto Scaling" -> logo `ec2-autoscaling.svg` pop vào tile + tên; title reveal; mascot pop
  - s67:"bằng tay" -> thẻ chương về chip; cursor bấm "+" liên tục trên 1 server, rồi gạch `i-x`
  - s67:"Auto Scaling Group" -> khung ASG vẽ nét + tên
  - s68:"ba EC2" -> 3 server pop trong khung; pill "3"
  - s69:"Flash Sale" -> stream vào khung dày gấp ba
  - s69:"vượt mức" -> 3 meter vượt vạch target; badge `cloudwatch-alarm.svg` pop
- **SFX:** swoosh seam; pop s66:"Auto Scaling"; click s68:"ba"; pop s69:"vượt". Nền: nhạc calm.

### c6b · câu 70-74 · 5:22-5:49 · seam vào: slide

- **Bố cục:** s70-71: khung ASG giữa x480-1480. Từ s72: ASG thu nhỏ còn x160-700 y200-760; dashboard card x780-1760 y120-860 chứa 2 chart xếp dọc, logo CloudWatch sm góc trái trên card.
- **Thành phần:** B12 khung ASG, B1 server x5, B6 `cloudwatch.svg`, B5 chart x2 + đường target đứt nét, `.label` pill
- **Beat:**
  - s70:"tự động" -> 2 server ghost nét đứt trượt vào khung, rồi đặc lại; pill 3 -> 5
  - s71:"biết khi nào" -> badge "?" trên khung
  - s72:"metrics" -> dashboard slide-in, ASG thu sang trái
  - s72:"CloudWatch" -> logo `cloudwatch.svg` pop + tên
  - s73:"CPU" -> chart 1 "CPU avg" vẽ
  - s73:"mỗi target" -> chart 2 "Requests / target" vẽ
  - s74:"Target Tracking" -> đường target đứt nét kéo ngang 2 chart; pill "Target Tracking"
  - s74:"duy trì" -> đường đo dao động rồi hội tụ quanh đường target
- **SFX:** pop s70:"tự động"; pop s72:"CloudWatch". Nền: nhạc calm.

### c6c · câu 75-76 · 5:49-5:57 · seam vào: slide

- **Bố cục:** Chart rộng x160-1760 y100-500; hàng 10 slot server sm x220-1700 y600-820.
- **Thành phần:** B5 chart, B1 server sm x10, glyph `coins`
- **Beat:**
  - s75:"tăng" -> đường traffic leo; slot server lấp 3 -> 8 bám theo
  - s75:"mở rộng" -> 8 server bump nhẹ
  - s76:"giảm" -> đường đi xuống; server tắt dần 8 -> 3
  - s76:"lãng phí" -> glyph đồng xu pop cạnh slot trống
- **SFX:** pop s76:"lãng phí". Nền: nhạc calm.

### c6d · câu 77-79 · 5:58-6:17 · seam vào: slide

- **Bố cục:** Trên: chart x160-1760 y100-440 (traffic + bậc capacity). Dưới: server ghost x200 y560; thanh boot 3 đoạn x460-1700 y600-720. Từ s79: tile lịch x200 y560 thay server ghost; chip x460-1700 y760.
- **Thành phần:** B5 chart + bậc capacity, B1 server ghost + đồng hồ cát, thanh 3 đoạn với icon `power`, `i-code`, `i-check`, tile `calendar-check`, B6 sm `ec2-autoscaling.svg`, `.label` pill, chip `gauge`, chip `i-file`
- **Beat:**
  - s77:"ngay lập tức" -> server ghost hiện với đồng hồ cát; bậc capacity trên chart chậm hơn đỉnh
  - s78:"khởi chạy" -> đoạn 1 `power` fill
  - s78:"khởi động ứng dụng" -> đoạn 2 `i-code` fill
  - s78:"sẵn sàng" -> đoạn 3 `i-check` fill; vùng trễ tô accent trên chart
  - s79:"biết trước" -> tile lịch pop thay server ghost
  - s79:"Scheduled Scaling" -> pill "Scheduled Scaling" + logo sm; chart vẽ lại: bậc capacity dựng trước đỉnh, vùng accent biến mất
  - s79:"kiểm thử tải" -> chip `gauge` pop
  - s79:"chính sách" -> chip `i-file` pop
- **SFX:** pop s79:"biết trước". Nền: nhạc calm; lặng 0.9 s cuối.

### c7a · câu 80-83 · 6:18-6:32 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu. Sau đó: ALB x200 y300; 6 server sm x520-1600 y260; logo ASG sm x1640 y120. Ở s82 cả nhóm trượt lên y-160; DB L x860 y600, các đường hội tụ vào DB.
- **Thành phần:** B9 (tile DB cylinder có đồng hồ cát accent), B6 `alb.svg`, B1 server sm x6, B6 sm `ec2-autoscaling.svg`, DB cylinder L
- **Beat:**
  - s80:"Đến đây" -> num "07" + tile DB + burst
  - s80:"giải quyết" -> title reveal; mascot pop
  - s81:"nhiều server" -> thẻ chương về chip; 6 server pop
  - s81:"Load Balancer" -> `alb.svg` pop bên trái
  - s81:"tự động" -> logo sm `ec2-autoscaling.svg` pop
  - s82:"chậm lại" -> cả nhóm trượt lên, mép dưới tối dần
  - s83:"database" -> DB L lộ ra từ dưới mép; 6 đường hội tụ về DB
- **SFX:** swoosh seam; pop s83:"database". Nền: nhạc calm.

### c7b · câu 84-86 · 6:32-6:42 · seam vào: slide

- **Bố cục:** 10 server sm theo cung y120-320 x200-1720; DB L x860 y620; hàng chờ dọc ngay trên DB x930 y420-600; meter latency x1360-1760 y700.
- **Thành phần:** B1 server sm x10, DB, B3 stream, B8 lane dọc, hình phễu SVG, B4 meter
- **Beat:**
  - s84:"mười server" -> 10 server pop theo cung; pill "10"
  - s84:"truy vấn" -> mỗi server vẽ một đường xuống DB
  - s85:"tăng theo" -> chấm truy vấn dày; hàng chờ trên DB dài ra
  - s86:"nút thắt" -> phễu bóp quanh hàng chờ; DB `.hot`; meter latency lên accent
- **SFX:** click s84:"mười"; pop s86:"nút thắt". Nền: nhạc calm.

### c7c · câu 87-91 · 6:43-7:07 · seam vào: slide

- **Bố cục:** App server cột x200-460 y220-760; cache x860 y380; DB x1420 y380; 2 meter dưới x560-1760 y700 và y800.
- **Thành phần:** B1 server sm x3, slot đứt nét, B6 `elasticache.svg`, 3 chip dữ liệu (`package`, `list`, `i-star`), DB, B3 stream, B13 check, B4 meter x2 (truy vấn DB, thời gian phản hồi)
- **Beat:**
  - s87:"caching" -> slot đứt nét giữa app và DB nhấp nháy
  - s88:"Amazon" -> logo `elasticache.svg` pop vào slot + tên
  - s88:"sản phẩm" -> chip `package` rơi vào cache
  - s88:"danh mục" -> chip `list` rơi vào cache
  - s89:"kiểm tra cache" -> một chấm đi từ app tới cache, dừng
  - s90:"hợp lệ" -> cache check xanh, chấm bật về app theo cung ngắn; DB mờ đi
  - s91:"giảm" -> meter truy vấn DB tụt
  - s91:"tốc độ phản hồi" -> meter thời gian phản hồi tụt về xanh
- **SFX:** pop s88:"ElastiCache"; pop s90:"hợp lệ". Nền: nhạc calm.

### c7d · câu 92-94 · 7:07-7:27 · seam vào: slide

- **Bố cục:** Cache x400 y300, DB x1100 y300 cạnh nhau. Chấm ghi từ x160 y600 vào DB. Từ s94: 2 khung AZ x700-1180 và x1240-1720, y120-560, mỗi khung 1 DB; meter ghi x400-1520 y700 có nắp đứt nét.
- **Thành phần:** B6 `elasticache.svg`, DB x2, B13 `i-x`, chấm ghi có icon `credit-card`, `package`, `i-receipt`, `i-lock`, B12 zone x2, B6 `rds-multiaz.svg`, B4 meter có nắp
- **Beat:**
  - s92:"không thể thay thế" -> bóng cache trượt sang che DB, bị bật lại, `i-x`
  - s93:"thanh toán" -> chấm `credit-card` đi thẳng vào DB, vòng qua cache
  - s93:"tồn kho" -> chấm `package` theo sau
  - s93:"đơn hàng" -> chấm `i-receipt` theo sau
  - s93:"kiểm soát đồng thời" -> khóa `i-lock` trên DB; 2 chấm đi qua lần lượt
  - s94:"Multi-AZ" -> `rds-multiaz.svg` pop + nhãn "Multi-AZ"; DB nhân đôi vào 2 khung AZ, đường sync
  - s94:"sẵn sàng cao" -> DB chính `.down`, DB dự phòng sáng lên nhận traffic
  - s94:"ghi nhanh hơn" -> meter ghi chạm nắp đứt nét, không vượt
- **SFX:** pop s93:"thanh toán"; pop s94:"Multi-AZ". Nền: nhạc calm; lặng 0.9 s cuối.

### c8a · câu 95-98 · 7:28-7:51 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu. Sau đó: phone mock x200-560 y110-870; 4 chip việc x700-1100 y180 / y360 / y540 / y720; timeline tuần tự x1160-1760 y300-700; đồng hồ bấm giờ x1460 y740.
- **Thành phần:** B9 (tile `inbox` có 3 chấm xếp hàng), B11 phone mock, chip `i-mail`, `i-receipt`, `truck`, `chart`, thanh tuần tự 4 đoạn, spinner, đồng hồ bấm giờ
- **Beat:**
  - s95:"Bây giờ" -> num "08" + tile `inbox` + burst
  - s95:"tình huống" -> title reveal; mascot pop
  - s96:"thành công" -> thẻ chương về chip; phone mock pop với check lớn + "Order Confirmed"
  - s97:"email" -> chip `i-mail` pop
  - s97:"hóa đơn" -> chip `i-receipt` pop
  - s97:"vận chuyển" -> chip `truck` pop
  - s97:"báo cáo" -> chip `chart` pop
  - s98:"trước khi" -> 4 đoạn timeline chạy nối đuôi; phone hiện spinner
  - s98:"rất chậm" -> đồng hồ bấm giờ chuyển accent, phone rung nhẹ
- **SFX:** swoosh seam; pop s96:"thành công"; pop s98:"rất chậm". Nền: nhạc calm.

### c8b · câu 99-103 · 7:52-8:07 · seam vào: slide

- **Bố cục:** Phone mini x160 y160; app tile x200 y440; lane x520-1360 y420-560; logo SQS x880 y220; 3 worker x1460-1720 y200 / y440 / y680.
- **Thành phần:** B11 phone mini, tile app `i-code`, B8 lane + `sqs-queue.svg`, `sqs-message.svg` chip, B6 `sqs.svg`, worker card (B1 sm + glyph `i-wrench`), B13 check
- **Beat:**
  - s99:"bất đồng bộ" -> 4 chip tách khỏi timeline trượt sang phải; phone nhận check ngay
  - s100:"Simple" -> logo `sqs.svg` pop + tên
  - s101:"hàng đợi" -> lane vẽ, `sqs-queue.svg` ở đầu lane
  - s102:"gửi message" -> app thả 4 message vào lane lần lượt
  - s103:"worker" -> 3 worker pop bên phải
  - s103:"từng message" -> mỗi worker kéo 1 message, spinner rồi check
- **SFX:** pop s100:"Simple"; pop s103:"worker". Nền: nhạc calm.

### c8c · câu 104-106 · 8:08-8:25 · seam vào: slide

- **Bố cục:** Như c8b. Meter độ sâu hàng x520-1360 y300 trên lane; worker tăng tới 6 ở x1460-1740 y120-860 (2 cột).
- **Thành phần:** Như c8b + `.label` pill x2, B4 meter độ sâu
- **Beat:**
  - s104:"producer" -> pill "Producer" dưới app, "Consumer" dưới worker
  - s104:"cùng một thời điểm" -> app pulse nhịp nhanh, worker pulse nhịp chậm, lệch pha
  - s105:"tăng đột biến" -> 20 message dồn vào lane; meter độ sâu lên accent
  - s105:"năng lực" -> worker giữ nhịp đều, lane rút chậm
  - s106:"mở rộng" -> 3 worker mới pop, tổng 6
  - s106:"đang chờ" -> lane rút nhanh, meter độ sâu về xanh
- **SFX:** pop s106:"mở rộng". Nền: nhạc calm.

### c8d · câu 107-110 · 8:26-8:45 · seam vào: slide

- **Bố cục:** Lane x360-1360 y300-440; consumer x1460 y300; sổ "đã xử lý" x1460 y520; lane DLQ x360-1360 y680-800 với `sqs-queue.svg`.
- **Thành phần:** B6 `sqs.svg` + `i-sparkles` gạch chéo, B8 lane + `sqs-message.svg` có badge số, consumer card, sổ check, B8 lane phụ DLQ, glyph `i-search`
- **Beat:**
  - s107:"phép màu" -> `i-sparkles` cạnh logo SQS bị gạch `i-x`
  - s108:"Standard" -> chip "Standard" + `sqs-queue.svg`
  - s108:"nhiều lần" -> message "#42" tách thành 2 bản giống hệt
  - s108:"thứ tự" -> 3 message "1 2 3" tới consumer theo thứ tự 2 1 3
  - s109:"trùng lặp" -> consumer nhận bản "#42" thứ hai, sổ đã có "#42", bản này xám đi và bị bỏ qua
  - s110:"thất bại" -> một message bật ra khỏi worker 3 lần, đếm 1 2 3
  - s110:"Dead Letter Queue" -> message rơi xuống lane DLQ; nhãn "DLQ"
  - s110:"điều tra" -> kính lúp `i-search` pop trên lane DLQ
- **SFX:** pop s108:"nhiều lần"; pop s110:"Dead". Nền: nhạc calm.

### c8e · câu 111-112 · 8:45-8:58 · seam vào: slide

- **Bố cục:** Khối cốt lõi giữa x560-1360 y160-560 chứa tile `package` và `credit-card`; lane SQS bên dưới x360-1560 y680-820 chở `i-mail`, `i-receipt`, `truck`.
- **Thành phần:** Card viền ink 6 px, tile x2, `i-lock`, B8 lane, B13 `i-x`
- **Beat:**
  - s111:"giao dịch cốt lõi" -> khối cốt lõi pop với tile tồn kho và thanh toán; lane việc phụ chạy bên dưới
  - s111:"nhất quán" -> khóa `i-lock` sập trên khối, check
  - s112:"Không nên" -> bóng khối cốt lõi rơi xuống lane
  - s112:"giải quyết xong" -> bị chặn `i-x`, bật về chỗ cũ
- **SFX:** pop s111:"nhất quán". Nền: nhạc calm; lặng 0.9 s cuối.

### c9a · câu 113-115 · 8:59-9:15 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu. Sau đó: chart x160-1760 y120-640; tile lịch x200 y700 + pill "12:00" x400 y740.
- **Thành phần:** B9 (tile `calendar-check`), B5 chart + bậc capacity + vùng trễ accent, B13 `i-x`, tile lịch
- **Beat:**
  - s113:"Một câu hỏi" -> num "09" + tile `calendar-check` + burst
  - s113:"quan trọng" -> title reveal; mascot pop
  - s113:"quá tải" -> thẻ chương về chip; chart: traffic vượt capacity, bậc capacity phản ứng muộn, vùng trễ accent
  - s114:"không nên" -> `i-x` lớn đè lên vùng trễ
  - s115:"lên lịch" -> tile lịch pop + pill "12:00"
  - s115:"chuẩn bị" -> chart vẽ lại: bậc capacity dựng trước đỉnh, xanh
- **SFX:** swoosh seam; pop s114:"không nên"; pop s115:"lên lịch". Nền: nhạc calm.

### c9b · câu 116-121 · 9:16-9:36 · seam vào: slide

- **Bố cục:** Lưới bot x160-520 y160-760; stream tới hệ thống mini x600-1040 y300-660 (ALB, server, DB); chart x1100-1760 y120-760; pill x160 y100.
- **Thành phần:** `.label` pill + glyph `gauge`, lưới `i-bot`, B3 stream, hệ thống mini (B6 sm `alb.svg`, B1 sm, DB), B5 chart 3 đường (tải, latency, lỗi), marker số
- **Beat:**
  - s116:"thực hiện" -> pill "Load Testing" + `gauge` pop
  - s117:"mô phỏng" -> lưới `i-bot` lấp theo bậc 25, 50, 100; stream ramp
  - s117:"gửi request" -> đường tải trên chart leo
  - s118:"giới hạn" -> vạch dọc quét trên chart
  - s119:"chậm" -> đường latency gãy, marker 1 pop, server mini nháy accent
  - s120:"nghẽn" -> marker 2 pop, DB mini nháy accent
  - s121:"tỷ lệ lỗi" -> đường lỗi dựng đứng, marker 3 pop
- **SFX:** pop s119, s120, s121 (mềm). Nền: nhạc calm.

### c9c · câu 122-125 · 9:37-10:03 · seam vào: slide

- **Bố cục:** s122-123: card cấu hình x160-900 y120-860 với 3 slider dọc; timeline đồng hồ x980-1760 y200-700. s124: checklist card x980-1760 y120-860, 4 chip y200 / y380 / y560 / y740. s125: toàn khung, stream x160-1760 y480, WAF x860 y360.
- **Thành phần:** B6 sm `ec2-autoscaling.svg` + `i-clock`, 3 slider (B4 dọc), timeline với server sm, chip checklist (`gauge`, `i-database`, `sqs-queue.svg`, `coins`), B3 stream, chấm `waf-bot.svg`, B6 `waf.svg`
- **Beat:**
  - s122:"kết quả" -> 3 marker từ c9b bay vào card cấu hình
  - s123:"thiết lập" -> logo sm Auto Scaling + đồng hồ pop; 3 slider "Min", "Desired", "Max"
  - s123:"tăng" -> 3 slider dâng lên
  - s123:"trước thời điểm" -> timeline: server tăng từ 11:00, trước vạch 12:00
  - s124:"service quotas" -> checklist trượt vào, chip `gauge` tick
  - s124:"kết nối database" -> chip DB tick
  - s124:"queue" -> chip queue tick
  - s124:"ngân sách" -> chip `coins` tick
  - s125:"bot" -> chấm `waf-bot.svg` lẫn vào stream
  - s125:"AWS WAF" -> khiên `waf.svg` pop + tên "AWS WAF"; chấm bot bật ra, chấm người đi qua
  - s125:"giới hạn request" -> thanh chắn hạ xuống, stream đều lại
- **SFX:** pop s123:"thiết lập"; pop s124:"service"; pop s125:"WAF". Nền: nhạc calm.

### c9d · câu 126-127 · 10:03-10:12 · seam vào: slide

- **Bố cục:** Panel trái x180-940 y140-800: `siren` + chart đỉnh nhọn trễ. Panel phải x980-1740 y140-800: `calendar-check` + `shield` + chart êm.
- **Thành phần:** Card x2, glyph `siren`, `calendar-check`, `shield`, B5 chart mini x2
- **Beat:**
  - s126:"phản ứng" -> panel trái pop, còi nháy accent, chart trễ
  - s127:"chuẩn bị" -> panel phải trượt vào; panel trái mờ 0.35
  - s127:"ngay từ đầu" -> panel phải bump 1.05, check xanh
- **SFX:** pop s127:"chuẩn bị". Nền: nhạc calm; lặng 0.9 s cuối.

### c10a · câu 128-130 · 10:13-10:27 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu. Sau đó: canvas kiến trúc rộng 3600 px, pan theo chấm giữ chấm trong x700-1200. Phone x220 y180-860; user `client.svg` x560 y420; CloudFront x1160 y380.
- **Thành phần:** B9 (tile `i-shopping-cart` có vệt chấm accent), B11 phone, chấm request chính (main entity), B6 `client.svg`, B6 `cloudfront.svg`, chip tài nguyên mini
- **Beat:**
  - s128:"Hãy cùng" -> num "10" + tile giỏ hàng + burst
  - s128:"theo dõi" -> title reveal; mascot pop
  - s128:"nhấn" -> thẻ chương về chip; phone pop, ngón tay nhấn "Mua", chấm sáng sinh ra
  - s129:"truy cập" -> user tile + đường tới CloudFront vẽ; chấm chạy
  - s130:"CloudFront" -> tile `cloudfront.svg` pop
  - s130:"JavaScript" -> 3 chip ảnh, CSS, JS bật từ CloudFront về user ngay
- **SFX:** swoosh seam; laser s128:"nhấn"; pop s130:"CloudFront". Nền: nhạc calm, nhịp tăng nhẹ.

### c10b · câu 131-134 · 10:27-10:51 · seam vào: slide

- **Bố cục:** Canvas pan từ x1160 tới x2900. Trong khung: ALB x360 y420; khung ASG x700-1180 y160-820 với 3 EC2 dọc; cache x1400 y220; DB x1400 y600.
- **Thành phần:** Chấm chính mang `i-shopping-cart`, B6 `alb.svg`, B12 khung ASG, B1 server x3 + `ec2-instance.svg`, chip check x3, B6 `elasticache.svg`, DB + `i-lock`
- **Beat:**
  - s131:"đặt hàng" -> chấm chính đổi sang mang giỏ hàng; canvas pan phải
  - s131:"đi đến" -> tile `alb.svg` pop, chấm tới ALB
  - s132:"đang hoạt động" -> ALB bỏ qua EC2 xám, chấm vào EC2 LED xanh
  - s133:"kiểm tra" -> 3 chip pop trong EC2: `package`, `layers`, `list-checks`
  - s133:"điều kiện" -> 3 chip tick lần lượt
  - s134:"ElastiCache" -> chấm đọc nhỏ lên cache, bật về nhanh
  - s134:"thao tác ghi" -> chấm ghi accent xuống DB qua khóa
- **SFX:** pop s131:"đi đến"; pop s134:"ElastiCache". Nền: nhạc calm.

### c10c · câu 135-136 · 10:52-11:07 · seam vào: slide

- **Bố cục:** Canvas pan tới x2900-3600. Trong khung: EC2 x260 y420; lane SQS x560-1260 y420-560 với `sqs.svg` trên; 3 worker x1400 y200 / y440 / y680; đích x1640.
- **Thành phần:** B1 EC2, check lớn trên `i-receipt`, B6 `sqs.svg`, B8 lane + `sqs-message.svg` x3, worker card x3, `i-mail`, `i-receipt`, `refresh-cw`
- **Beat:**
  - s135:"tiếp nhận" -> EC2 hiện `i-receipt` có check lớn
  - s135:"logic nghiệp vụ" -> check bump
  - s135:"Amazon SQS" -> logo `sqs.svg` pop, lane vẽ, 3 message trượt vào
  - s136:"background workers" -> 3 worker pop
  - s136:"email" -> `i-mail` bay ra từ worker 1
  - s136:"hóa đơn" -> `i-receipt` bay ra từ worker 2
  - s136:"đồng bộ" -> `refresh-cw` quay ở worker 3
- **SFX:** pop s135:"Amazon SQS"; pop s136:"email". Nền: nhạc calm.

### c10d · câu 137-140 · 11:08-11:27 · seam vào: slide

- **Bố cục:** Canvas scale 0.45 lọt x160-1760 y260-860. CloudWatch x860 y100 với đường đứt nét xuống từng node.
- **Thành phần:** Toàn canvas c10a-c10c, B6 `cloudwatch.svg`, nhịp tim mini trên node, B6 sm `ec2-autoscaling.svg`, B1 server ghost
- **Beat:**
  - s137:"CloudWatch" -> canvas zoom-out; logo `cloudwatch.svg` pop trên đỉnh
  - s137:"theo dõi" -> đường giám sát đứt nét vẽ xuống mọi node
  - s138:"Auto Scaling" -> badge `ec2-autoscaling.svg` trên khung ASG; 2 EC2 mới pop
  - s139:"Load Balancer" -> 1 EC2 `.down`, đường ALB tới nó thành nét đứt, chấm rẽ
  - s140:"vai trò riêng" -> mọi node bump nối tiếp trái sang phải
  - s140:"một server duy nhất" -> bóng server đơn đỏ của chương 3 hiện nhỏ ở góc rồi tan
- **SFX:** pop s137:"CloudWatch"; pop s140:"vai trò". Nền: nhạc calm; lặng 0.9 s cuối.

### c11a · câu 141-143 · 11:28-11:48 · seam vào: cut

- **Bố cục:** Thẻ chương mẫu. s141 sau thẻ: pill "100.000" x360 y400 + server có "?" x1160 y360. s142: toàn khung trống, thesis 104 px ở y180-300; 2 tile lớn 320 tại x480 y440 và x1120 y440; rays sau. s143: thesis thu về y100 72 px; kiến trúc zoom-out x160-1760 y260-860.
- **Thành phần:** B9 (tile `drafting-compass`), B13 badge "?", `.h1` thesis, tile lớn `drafting-compass` và `calendar-check`, radial rays, canvas kiến trúc c10d với B6 các logo
- **Beat:**
  - s141:"Vậy cuối cùng" -> num "11" + tile `drafting-compass` + burst
  - s141:"một trăm nghìn" -> title reveal; mascot pop
  - s141:"bị sập" -> thẻ chương về chip; pill "100.000" và server "?" pop
  - s142:"Câu trả lời" -> clear toàn khung; rays nở
  - s142:"phụ thuộc" -> thesis "Phụ thuộc vào thiết kế & chuẩn bị" pop lên
  - s142:"thiết kế" -> tile `drafting-compass` pop lớn
  - s142:"chuẩn bị" -> tile `calendar-check` pop lớn
  - s143:"AWS cung cấp" -> thesis thu lên trên; kiến trúc hiện
  - s143:"phân phối traffic" -> `alb.svg` sáng
  - s143:"cache nội dung" -> `cloudfront.svg` và `elasticache.svg` sáng
  - s143:"mở rộng tài nguyên" -> `ec2-autoscaling.svg` sáng
  - s143:"bất đồng bộ" -> `sqs.svg` sáng
  - s143:"giám sát" -> `cloudwatch.svg` sáng
- **SFX:** swoosh seam; riser đỉnh s142:"phụ thuộc"; pop s142:"thiết kế"; pop s142:"chuẩn bị"; pop mềm cascade s143. Nền: nhạc cắt sau s141, lặng tới s142; drop trở lại ở "thiết kế".

### c11b · câu 144-146 · 11:48-12:14 · seam vào: slide

- **Bố cục:** s144: kiến trúc giữ như c11a, mờ 0.6, node lỗi sáng lên. s145: chồng logo x560-900 y200-760 cạnh dấu "≠" x1000. s146: 5 tile M hàng ngang x200-1720 y360.
- **Thành phần:** Canvas kiến trúc, `i-triangle-alert`, glyph `snail`, đồng hồ cát, vòng accent quanh node đơn, badge "503", chồng B6 sm, 5 tile `drafting-compass`, `gauge`, `i-zap`, `coins`, `shield`
- **Beat:**
  - s144:"database" -> DB `.hot`, `i-triangle-alert` pop
  - s144:"kém hiệu quả" -> badge `snail` trên EC2
  - s144:"khởi động kịp" -> EC2 ghost với đồng hồ cát tới muộn
  - s144:"một điểm lỗi" -> vòng accent khoanh một node đơn lẻ
  - s144:"gặp sự cố" -> cả kiến trúc rung, badge "503" nhỏ
  - s145:"không chỉ là" -> kiến trúc trượt đi; 12 logo sm chồng thành tháp
  - s145:"nhiều dịch vụ" -> tháp logo nghiêng đổ; dấu "≠"
  - s146:"thiết kế kiến trúc" -> trụ 1 `drafting-compass` pop
  - s146:"kiểm thử" -> trụ 2 `gauge` pop
  - s146:"tối ưu hiệu năng" -> trụ 3 `i-zap` pop
  - s146:"chi phí" -> trụ 4 `coins` pop
  - s146:"xấu nhất" -> trụ 5 `shield` pop
- **SFX:** pop s144:"database"; pop s146:"thiết kế"; pop mềm cho 4 trụ sau. Nền: nhạc calm.

### c11c · câu 147-148 · 12:14-12:39 · seam vào: fade

- **Bố cục:** Browser x160-1060 y120-780 check xanh; chart mini x1120-1760 y120-440; hàng 8 slot server x1120-1760 y520-780. Ảnh `dc-cern-hall.jpg` full-frame, credit x160 y852; tile AWS x800 y300 trên ảnh.
- **Thành phần:** B11 browser, B5 chart, B1 server sm x8, B2 crowd pattern mờ, B10 photo+credit, overlay đường kiến trúc trắng 0.5, B6 `aws-cloud.svg`, B3 stream trên ảnh
- **Beat:**
  - s147:"Lần tới" -> fade: browser check xanh, chart lên xuống, server thêm rồi rút theo chart
  - s147:"hàng trăm nghìn" -> crowd pattern dâng sau browser
  - s147:"phía sau" -> browser trượt sang trái ra khỏi khung, lộ ảnh `dc-cern-hall.jpg` + credit
  - s147:"phân tán" -> đường kiến trúc trắng mờ vẽ lên ảnh
  - s148:"AWS" -> tile `aws-cloud.svg` pop giữa ảnh
  - s148:"hàng triệu người" -> stream dày chạy ngang ảnh, mọi chấm xanh
  - s148:"sử dụng nó" -> push-in ảnh tăng, stream giữ đều
- **SFX:** pop s148:"AWS". Nền: nhạc dâng nhẹ; lặng 0.8 s cuối.

### c11d · câu 149-150 · 12:39-12:45 · seam vào: fade

- **Bố cục:** Ảnh `dc-wmf-racks.jpg` full-frame, scrim 0.5; credit x160 y852; tile AWS 320 x800 y220; pill series giữa y600.
- **Thành phần:** B10 photo+credit, B6 lớn `aws-cloud.svg`, `.label` pill series
- **Beat:**
  - s149:"Cảm ơn" -> fade ảnh rack + credit, push-in chậm
  - s150:"AWS" -> tile `aws-cloud.svg` pop + pill "AWS: Behind the Cloud"
  - s150:"tập tiếp theo" -> pill bump; sau đó end card cắt vào
- **SFX:** pop s150:"AWS"; swoosh vào end card. Nền: nhạc kết, fade-out theo end card.

## 3. Âm thanh

**Nhạc nền.** Mặc định giữ `bgm-little-things.mp3` của house set, lặp bằng `LOOP_BED = True`. Nếu tìm nhạc khác:

1. `calm corporate tech ambient electronic background, minimal pulse, no vocals` · mood bình tĩnh, tò mò · ambient electronic · ~95 BPM · lặng 0.6 s sau s13, lặng 0.9 s ở các nghỉ cuối chương, cắt hẳn sau s141, drop trở lại ở s142 "thiết kế".
2. Tùy chọn cho hook 0:00-0:43: `tense countdown ticking electronic pulse build, no vocals` · căng · electronic pulse · ~120 BPM · đỉnh ở s8 "nhấn", cắt ở s13 "năm không ba".

**SFX** chỉ dùng house set. Swoosh tự thêm ở mọi seam `cut`: c1b, c2a, c3a, c4a, c5a, c6a, c7a, c8a, c9a, c10a, c11a và end card. Pop còn lại theo cột Âm thanh của bảng scene, tối đa khoảng một pop mỗi 3 đến 4 s, không pop nào trong 0.5 s quanh swoosh. Query tiếng Anh là phương án dự phòng cho `freesound` hoặc `synth-sfx.py`.

- [0:00] tiếng thud mở phim -> house sfx-thud (0.6 s)
- [0:29] tiếng click khi đồng hồ chạm 00:00 -> house sfx-click; fallback "camera shutter click ui" (0.2 s)
- [0:31] riser hook đạt đỉnh khi mọi người nhấn Mua -> house sfx-riser; fallback "tension riser short whoosh build" (3 s)
- [0:31] laser khi 32 nút Mua cùng nhấn -> house sfx-laser (0.3 s)
- [0:35] pop khi CPU đỏ -> house sfx-pop (0.2 s)
- [0:42] click mạnh khi trang 503 đập vào -> house sfx-click; fallback "error glitch hit ui" (0.4 s)
- [0:52] pop logo AWS -> house sfx-pop (0.2 s)
- [0:58] click con số 100.000 -> house sfx-click (0.2 s)
- [3:17] pop logo CloudFront -> house sfx-pop (0.2 s)
- [4:09] pop logo ELB -> house sfx-pop (0.2 s)
- [4:39] pop khi server rớt health check -> house sfx-pop (0.2 s)
- [5:14] click số 3 instance -> house sfx-click (0.2 s)
- [5:35] pop logo CloudWatch -> house sfx-pop (0.2 s)
- [6:33] click số 10 server -> house sfx-click (0.2 s)
- [6:52] pop logo ElastiCache -> house sfx-pop (0.2 s)
- [7:58] pop logo SQS -> house sfx-pop (0.2 s)
- [10:00] pop khiên WAF chặn bot -> house sfx-pop (0.2 s)
- [10:16] laser khi ngón tay nhấn Mua sinh chấm request -> house sfx-laser (0.3 s)
- [11:32] nhạc cắt, lặng -> duck bed về 0 trong 0.3 s
- [11:35] riser payoff đạt đỉnh -> house sfx-riser hoặc sfx-risercut3 (2.5 s)
- [11:37] pop lớn tile thiết kế, nhạc drop trở lại -> house sfx-pop, gain +2 dB (0.3 s)
- [11:38] pop tile chuẩn bị -> house sfx-pop (0.2 s)
- [12:44] pop logo AWS cuối phim -> house sfx-pop (0.2 s)

## 4. Build notes

1. **Seam và chuyển động.** Thẻ chương luôn vào bằng `cut` có swoosh. `fade` chỉ dùng khi vào ảnh thật: c1d, c3d, c11c, c11d. Còn lại là `slide`. Chương 10 dựng một canvas rộng 3600 px và pan theo chấm request qua c10a đến c10c, rồi zoom-out 0.45 ở c10d; c11a tái dùng đúng canvas đó. Ảnh thật push-in tối đa scale 1.08. Mọi stream, ping, rung lấy delay theo chỉ số, không `Math.random`. Chỉ có `gsap.min.js`, nên chấm chạy trên đoạn thẳng `x`/`y` hoặc `getPointAtLength` lấy mẫu cố định.
2. **Phụ đề và credit.** Phụ đề một dòng trắng 44 px trên hộp tối ở y 960-1024. Credit ảnh ở x160 y852, cao tới y890, không chạm phụ đề. Credit cỡ 32 px là ngoại lệ có chủ ý so với sàn 40 px, cần người duyệt. Credit phải hiện suốt thời gian ảnh trên khung, kể cả khi ảnh bị blur làm nền.
3. **Scene dài.** c2b, c6b, c9c, c10b, c11a, c11b, c11c dài 20 đến 27 s. Mỗi scene đã có thay đổi ít nhất 5 s một lần qua beat. Nếu khi dựng vẫn thấy đứng hình, tách c11a để s142 thành scene riêng.

**Logo AWS theo lần gọi tên.** Chỉ dùng file trong `assets/logos/aws/`, nguồn AWS Architecture Icons gói 07312026.

| File | Lần xuất hiện |
|---|---|
| `aws-cloud.svg` | series pill c1a, s15, s40, s148, s150 |
| `cloudfront.svg` | s45, s49, s130, s143 |
| `edge-location.svg` | pin bản đồ c4b |
| `s3.svg` | s49 |
| `elb.svg` | s55 |
| `alb.svg` | s56, s81, s116 mini, s131, s143 |
| `ec2.svg` | s59 |
| `ec2-instance.svg` | icon trong server từ s59 |
| `ec2-autoscaling.svg` | s66, s79, s81, s123, s138, s143 |
| `asg-group.svg` | góc khung ASG từ s67 |
| `cloudwatch-alarm.svg` | s69 |
| `cloudwatch.svg` | s72, s137, s143 |
| `elasticache.svg` | s88, s92, s134, s143 |
| `rds-multiaz.svg` | s94 |
| `sqs.svg` | s100, s107, s135, s143 |
| `sqs-queue.svg` | đầu lane c8b đến c8d, chip queue s124 |
| `sqs-message.svg` | message trong lane |
| `waf.svg` | s125 |
| `waf-bot.svg` | chấm bot s125 |
| `users.svg`, `client.svg` | người dùng, s2, s28, s48, s129 |

`rds.svg` không dùng vì lời thoại không gọi tên RDS.

**Ảnh thật và credit nguyên văn từ `assets/SOURCES.md`.**

| Ảnh | Scene | Credit trên khung |
|---|---|---|
| `assets/img/dc-wmf-aisle.jpg` | c1a | Ảnh: VGrigas (WMF) / Wikimedia Commons, CC BY-SA 3.0 |
| `assets/img/crowd-phones.jpg` | c1b | Ảnh: Rawpixel Ltd / Wikimedia Commons, CC BY 2.0 |
| `assets/img/dc-cern-racks.jpg` | c3d | Ảnh: Florian Hirzinger - www.fh-ap.com / Wikimedia Commons, CC BY-SA 3.0 |
| `assets/img/dc-cern-hall.jpg` | c11c | Ảnh: Hugovanmeijeren / Wikimedia Commons, CC BY-SA 3.0 |
| `assets/img/dc-wmf-racks.jpg` | c11d | Ảnh: Victor Grigas / Wikimedia Commons, CC BY-SA 3.0 |

**Icon Lucide cần thêm vào sprite `head.part`,** giấy phép ISC, ghi vào `assets/SOURCES.md`. Glyph viết tắt trong beat như `package` nghĩa là symbol `i-package`. Danh sách: `i-server`, `i-database`, `i-cpu`, `i-memory-stick`, `i-network`, `i-clock`, `i-shopping-cart`, `i-zap`, `i-shield`, `i-chart-line`, `i-mail`, `i-receipt`, `i-truck`, `i-calendar-check`, `i-gauge`, `i-triangle-alert`, `i-image`, `i-hourglass`, `i-heart-pulse`, `i-split`, `i-coins`, `i-snail`, `i-drafting-compass`, `i-siren`, `i-package`, `i-list`, `i-list-checks`, `i-layers`, `i-inbox`, `i-refresh-cw`, `i-power`, `i-credit-card`, `i-eye`. Cylinder DB và đồng hồ đếm ngược vẽ bằng SVG/CSS.

**Media checklist.** Mọi logo và ảnh cần dùng đã có trong project. Tác giả không cần cung cấp thêm. Không có URL nào cần chụp. Video ứng viên trong `SOURCES.md` chưa tải và không dùng trong plan này.

**Riêng tư.** Không frame nào hiện dữ liệu riêng tư. Trang shop, đơn hàng, email, hóa đơn trong mock dùng dữ liệu hư cấu, không tên, không số điện thoại, không số thẻ. Không cần privacy blur.

**Giá trị gợi ý.**

- `scripts/build.py`: `STEPS = []`. Đây là explainer, chip chương góc trái trên thay bộ đếm bước. `SC` hiện là giá trị mẫu, dựng lại từ thời gian scene sau align. `BRAND_NAME`, `BRAND_LOGO`, `SLOGAN` giữ theo `brand/brand.json`.
- `scripts/plan-beats.py`: giữ nguyên `SCENES` 43 scene từ c1a 1-4 tới c11d 149-150.
- `scripts/add-sfx.py`: `LOOP_BED = True` vì phim dài hơn 124 s. `RISER` đỉnh ở s8:"nhấn"; riser thứ hai ở s142:"phụ thuộc" qua `EXTRA` nếu `RISER` chỉ nhận một mốc. Cần kiểm tra lại cú pháp trong file. Duck bed về 0 từ cuối s141 đến s142:"thiết kế".

**Cần người duyệt.**

- Giấy phép CC BY-SA 3.0 của 4 ảnh: scrim, blur và overlay có thể bị coi là bản phái sinh, khi đó phần phái sinh cần cùng giấy phép. Đưa credit và link giấy phép vào mô tả YouTube.
- `crowd-phones.jpg` có người thật nhận ra được mặt; giấy phép CC BY 2.0 không thay cho quyền hình ảnh cá nhân.
- Icon `rds-multiaz.svg` là icon riêng của RDS, trong khi lời thoại chỉ nói "database" và "Multi-AZ".
- Pin edge trên bản đồ là minh họa, không phải vị trí thật của CloudFront.
- Credit 32 px thấp hơn sàn chữ 40 px của theme.
- Thời lượng ước tính 12:46 vượt mục tiêu 11:00 nếu giọng đọc chậm.
