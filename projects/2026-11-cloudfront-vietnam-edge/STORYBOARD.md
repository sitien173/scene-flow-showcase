# STORYBOARD · Tại sao website ở Mỹ vẫn tải nhanh tại Việt Nam?

## 1. Concept

| Mục | Nội dung |
|---|---|
| Tiêu đề | Tại sao website ở Mỹ vẫn tải nhanh tại Việt Nam? |
| Format | Explainer, theo `# Cấu trúc` của SCRIPT.md và khung kênh: vấn đề thực tế, thách thức công nghệ, giải pháp AWS, cách hệ thống hoạt động. |
| Core promise | Hiểu vì sao website đặt máy chủ ở Mỹ vẫn có thể tải nhanh tại Việt Nam nhờ CDN và Amazon CloudFront. |
| Hook angle | Một tình huống ai cũng gặp: ngồi ở TP.HCM, mở một website có server ở Mỹ, cách hơn 10.000 km, trang vẫn hiện ngay. Câu hỏi treo ở câu 3. Không mở bằng "CloudFront là gì". |
| Beat | Câu 1-3 hook. Câu 4-6 vấn đề. Câu 7-9 giải pháp AWS. Câu 10-13 Cache Hit. Câu 14-19 Cache Miss. Câu 20-22 giới hạn, là đảo chiều trước payoff. **Câu 23 là payoff**. Câu 24 chốt. Câu 25-26 outro. |
| Thời lượng | Chưa có voice. Ước lượng theo 3.7 âm tiết mỗi giây, nhịp đo được của Vibi ở EP01: voice khoảng 108 s, end card mặc định 2.75 s, tổng khoảng 111 s, nằm trong 1:50 đến 2:00. Các từ đọc tách chữ như "AWS", "CDN" làm voice thật dài hơn ước lượng 1 đến 3 s. Mọi mốc giây trong bảng là ước lượng; neo `câu:từ` là chuẩn, build.py tính giây thật từ `syl-times.json`. |
| Số âm tiết | 366 âm tiết theo cách đếm của plan-beats.py, 26 câu. |
| Visual style | cleanui 9:16, giữ nguyên ngôn ngữ của EP01: nền giấy chấm, tile trắng bo góc, icon AWS Architecture Icons chính thức trên tile, glyph Lucide vẽ bằng code. Thêm một bản đồ thế giới dạng lưới chấm vẽ bằng code làm nền tảng hình ảnh của cả video. |
| 3 màu chủ đạo | Cam AWS `#FF9900`: accent, đường đi của request, các điểm edge. Xanh lá `#30A46C`: Cache Hit, đường ngắn. Đỏ `#E5484D`: Cache Miss, đường dài về Mỹ. Đường dài đỏ chiếm phần đầu và m1 đến m2; đường ngắn xanh chiếm h2 và r1. |
| Main entity | "Request chip" giống EP01 để giữ tính nhận diện của series: viên tròn trắng 56 px, viền cam 4 px, bên trong glyph Lucide `image` màu cam. Chip đổi viền xanh khi được phục vụ từ cache, viền đỏ khi phải đi xa. |
| Ẩn dụ xuyên suốt | "Hai tầng màn hình": tầng trên là bản đồ, cho thấy dữ liệu đi bao xa; tầng dưới là chuỗi sơ đồ "Người dùng → Edge Location → Regional Edge Cache → Origin", cho thấy dữ liệu đi qua đâu. Chuỗi lắp dần từ cảnh p1 đến m2, rồi toàn bộ sáng lên ở r1. |

**Quyết định đã ghi lại, tác giả yêu cầu không hỏi:**

1. **Caption ở band `mid` cho mọi cảnh.** Band `top` của theme đặt caption ở y 170, nằm trong 15% trên mà TikTok che. Band `mid` đặt caption ở y 980 đến 1140, trong vùng an toàn. Hệ quả bố cục: tầng trên y 300 đến 950, tầng dưới y 1170 đến 1420, x 60 đến 900. Đây là thay đổi so với EP01, EP01 giữ y 170.
2. **Không footer dock**, `STEPS = []`. Dock y 1580 đến 1730 nằm trong 25% dưới.
3. **Không dùng mascot**, giống EP01.
4. **Không dùng ảnh bên thứ ba từ brief**: Cullen International, About Amazon, Freepik, Medium và các nguồn tương tự đều bị loại. Không page capture trang AWS, khác EP01, vì MEDIA.md của EP01 còn treo câu hỏi trademark mục 15. Bản đồ edge tự vẽ thay cho ảnh chụp trang CloudFront.
5. **Một ảnh stock có giấy phép** cho nhịp mở đầu, lấy qua `media-use` với `--provider heygen`. Không tìm được ảnh có giấy phép rõ thì dùng laptop vẽ bằng code, đã thiết kế sẵn làm phương án dự phòng.
6. **Bản đồ không vẽ biên giới quốc gia.** Chỉ lưới chấm đất liền. Ở cảnh zoom vào Việt Nam, có thêm cụm chấm Hoàng Sa và Trường Sa kèm nhãn. Lý do ở mục Rủi ro.
7. **Không có con số độ trễ trên màn hình.** Fact-check không kiểm chứng giá trị ms nào. Đồng hồ độ trễ chỉ có kim và vùng màu, không số.
8. **Điểm edge toàn cầu là minh họa**, có tag nhỏ "Minh họa", không hiện số lượng. Chỉ Hà Nội và TP.HCM được ghi tên, vì fact-check đã xác minh hai điểm này.
9. **Không Global Accelerator**, không vẽ đường mạng riêng của AWS, không vẽ "đường cao tốc" xuyên biển cho request.
10. **Outro dùng tên kênh "Góc nhìn DEV"**, theo CLAUDE.md của dự án. SLOGAN giữ mặc định của `brand.json`.

## 2. Scene table

Vùng an toàn 9:16: chủ thể và chữ trong x 60 đến 900, y 300 đến 1420. Caption band mid y 980 đến 1140. "Camera" là tween `scale`, `x`, `y` trên wrapper `#w-<id>` như EP01: dolly in và fast zoom out là `scale`, whip pan là blur slide trục x, top-down là bố cục nhìn từ trên của sơ đồ, orbit là xoay chậm `rotation` ±4° quanh tâm kèm `scale`. Giây là ước lượng, neo `câu:từ` là chuẩn.

| Scene | Câu số | Thời gian & Nhịp | Hình ảnh & Camera | Text / UI Overlay | Âm thanh & SFX | Lời thoại |
|---|---|---|---|---|---|---|
| h1 HOOK | 1-3 | ~0.0-10.5 · 10.5 s · nhanh, 4 nhịp | **`1:Bạn` ~0.0** Ảnh stock có giấy phép: người dùng laptop trong quán cà phê hoặc văn phòng ở TP.HCM, toàn khung 1080x1920, nguồn `media-use`. Dự phòng: laptop vẽ bằng code trên bàn, nền skyline phẳng. Camera: dolly in 1.0 lên 1.10 vào màn hình laptop. **`1:website` ~2.2** Màn hình laptop thay bằng trang shop giả lập không thương hiệu, vẽ bằng code, ảnh sản phẩm đang tải; chip request đầu tiên bay ra khỏi laptop. **`1:nước` ~3.8** Fast zoom out 1.6 xuống 1.0 ra bản đồ lưới chấm, kiểu Thái Bình Dương ở giữa: Việt Nam bên trái, Mỹ bên phải. Pin cam ở TP.HCM, tile server ở Mỹ, icon AWS General `Server`. **`2:Hai` ~5.2** Cung đường tròn lớn vẽ dần từ Việt Nam sang Mỹ, 0.8 s. Ở `2:mười` ~6.2 pill "> 10.000 km" pop giữa cung. **`3:Vậy` ~7.7** Top-down vào laptop thu nhỏ ở tầng dưới: trang shop hiện đủ ngay, tick xanh. Ở `3:nhanh?` ~10.0 đứng hình 0.4 s, dấu "?" lớn màu cam pop cạnh laptop. | Series pill y 310: logo Góc nhìn DEV + "AWS". Pill số "> 10.000 km", 62 px. Dấu "?" là hình, không chữ. Từ khóa phụ đề: Việt Nam, nước Mỹ, hơn mười nghìn kilomet, rất nhanh | 0.0 thud. Bed vào từ 0.3. Tiếng gõ phím ngắn ở ~0.4. Pop ở `2:mười` cho pill khoảng cách, thay bằng shutter vì là con số. Whoosh dài theo cung ở ~5.2. Riser risercut3 đặt sao cho điểm cắt rơi đúng `3:nhanh?` ~10.0. | Bạn đang ở Việt Nam, nhưng lại truy cập một website có máy chủ đặt tận nước Mỹ. Hai nơi cách nhau hơn mười nghìn kilomet. Vậy tại sao website vẫn có thể tải rất nhanh? |
| p1 PROBLEM | 4-6 | ~10.7-22.2 · 11.5 s · chậm lại, nặng dần, 4 nhịp · vào bằng **cut** | **`4:Bình` ~11.0** Mở chương bằng hình: tile 320 px glyph Lucide `cable` kèm sóng biển vẽ bằng code, đại diện cho "cáp quang quốc tế". Camera: dolly in nhẹ 1.0 lên 1.05. **`4:nhiều` ~12.6** Bản đồ tầng trên: chip đi từ TP.HCM qua 4 nút mạng nhỏ, từng nút nháy cam khi chip đi qua. **`4:cáp` ~14.2** 2 đến 3 đường cáp ngầm cách điệu vẽ dưới biển, nét đứt xanh xám, tag "Minh họa"; chip trượt dọc cáp sang Mỹ. Camera: whip pan theo chip từ trái sang phải. **`5:Khoảng` ~16.2** Tầng dưới: chuỗi sơ đồ bắt đầu, chỉ 2 ô "Người dùng" và "Origin · Mỹ", nối bằng đường đỏ dài. Đồng hồ độ trễ dạng bán nguyệt, kim quét từ xanh sang đỏ khi đường dài ra, ở `5:tăng` ~19.0. **`6:Vậy` ~19.8** Chip đi và về 2 vòng trên đường đỏ, mỗi vòng chậm hơn; ảnh sản phẩm trên laptop chỉ hiện nửa. Camera: dolly in vào đồng hồ. | Không chữ ngoài nhãn ô sơ đồ "Người dùng", "Origin · Mỹ". Đồng hồ không có số. Từ khóa phụ đề: nhiều mạng kết nối, cáp quang quốc tế, khoảng cách, độ trễ | Swoosh ở cut ~10.7. Tiếng "ping" nhẹ mỗi nút mạng, 4 tiếng, nhỏ dần, ~12.6 đến 13.6. Tiếng sóng ngầm trầm ở ~14.2. Tiếng kim đồng hồ kéo căng ở ~19.0. | Bình thường, dữ liệu phải đi qua nhiều mạng kết nối và những tuyến cáp quang quốc tế. Khoảng cách càng xa, độ trễ mạng càng có thể tăng lên. Vậy làm sao giải quyết vấn đề này? |
| s1 CDN | 7-9 | ~22.5-36.5 · 14 s · sáng lên, 4 nhịp · vào bằng **cut** | **`7:Câu` ~22.5** Tile 320 px glyph Lucide `globe` với 5 điểm cam tỏa ra quanh địa cầu, đại diện cho mạng phân phối. Camera: dolly in. **`7:CDN,` ~24.4** Fast zoom out ra bản đồ đầy đủ; khoảng 24 điểm cam lần lượt sáng trên khắp lục địa theo kiểu cascade, tag "Minh họa". **`8:AWS` ~26.9** Logo Amazon CloudFront chính thức, icon Arch 64, pop trên tile 240 px ở tầng dưới, y ~1200. Ở `8:Edge` ~28.6 icon resource `Edge Location` pop cạnh logo, nối bằng đường mảnh tới các điểm cam trên bản đồ. Camera: orbit chậm quanh bản đồ, rotation 0 đến -3°, scale 1.0 lên 1.06. **`9:Đặc` ~31.3** Dolly in mạnh vào Việt Nam, scale 1.0 lên 2.6, tâm ở x ~300 của bản đồ. Đường bờ biển Việt Nam bằng chấm, cụm chấm Hoàng Sa và Trường Sa có nhãn. Ở `9:Hà` ~33.6 pin edge cam pop ở Hà Nội. Ở `9:Hồ` ~35.0 pin edge cam pop ở TP.HCM. Vòng sóng cam lan từ hai pin. | Label pill "Amazon CloudFront" dưới logo. Nhãn địa danh "Hà Nội", "TP.HCM", "Hoàng Sa", "Trường Sa", 44 px. Tag "Minh họa" 40 px, góc dưới trái bản đồ. Từ khóa phụ đề: CDN, Content Delivery Network, Amazon CloudFront, Edge Location, toàn cầu, Hà Nội, Thành phố Hồ Chí Minh | Swoosh ở cut ~22.5. Pop cho logo CloudFront ở `8:AWS`. Cascade điểm edge im. Pop cho pin Hà Nội và pin TP.HCM, cách nhau ~1.4 s. Tiếng "ping" mạng sáng ở `7:CDN,`. | Câu trả lời nằm ở một công nghệ gọi là CDN, hay Content Delivery Network. AWS có dịch vụ Amazon CloudFront với các Edge Location phân bố trên toàn cầu. Đặc biệt, AWS đã triển khai CloudFront Edge Location tại cả Hà Nội và Thành phố Hồ Chí Minh. |
| s2 ROUTE | 10 | ~36.8-44.9 · 8.1 s · đều, 3 nhịp · vào bằng **slide** | **`10:Khi` ~36.8** Bản đồ đã zoom ở khu vực Đông Nam Á, user pin ở TP.HCM, request chip rời laptop. **`10:định` ~38.8** 3 đường thử tỏa ra từ chip tới 3 điểm edge: TP.HCM, Hà Nội, và một điểm cam không tên ngoài Việt Nam. Mỗi đường có một thanh ngắn biểu thị độ trễ tương đối, không số. Camera: top-down, giữ khung khu vực. **`10:thường` ~41.6** Thanh ngắn nhất sáng cam, chip chạy theo đường đó vào pin TP.HCM; 2 đường còn lại mờ nhưng không biến mất, cho thấy đây là "thường", không phải "luôn". **`10:độ` ~44.0** Tầng dưới: chuỗi sơ đồ chèn ô thứ 2, icon `Edge Location`, giữa "Người dùng" và "Origin · Mỹ". Camera: dolly in nhẹ vào ô mới. | Chip nhỏ 44 px cạnh đường được chọn: "thường gần nhất". Nhãn ô "Edge Location". Từ khóa phụ đề: định tuyến, Edge Location, gần nhất, độ trễ | Không swoosh vì là slide. Laser ở `10:thường` khi chip chọn đường. Pop nhỏ ở `10:độ` cho ô Edge Location chèn vào chuỗi. | Khi bạn truy cập website, CloudFront sẽ định tuyến request đến một Edge Location có thể phục vụ bạn tốt, thường là vị trí gần nhất xét theo độ trễ. |
| h2 CACHE HIT | 11-13 | ~45.2-55.7 · 10.5 s · nhẹ, nhanh, 4 nhịp · vào bằng **cut** | **`11:Nếu` ~45.2** Mở chương: tile 320 px vẽ kệ cache của Edge Location nhìn top-down, 3 ô đã có file: glyph `image`, `film`, `file-code`. Camera: dolly in vào kệ. **`11:cache,` ~49.3** Chip request trượt vào kệ, ô `image` sáng xanh, file nhảy ra. **`12:Đó` ~51.0** Pill "CACHE HIT" xanh đập vào giữa khung, sóng xung kích xanh nhỏ. **`13:Không` ~52.7** Fast zoom out ra bản đồ: đường ngắn xanh từ pin TP.HCM về user, chạy 2 vòng nhanh; đường dài sang Mỹ hiện mờ, nét đứt xám, có dấu X nhỏ. Ở `13:lần` ~55.0 laptop tầng dưới hiện đủ ảnh sản phẩm, tick xanh. | Pill "CACHE HIT" chữ trắng trên nền xanh, 62 px, là punchline. Từ khóa phụ đề: hình ảnh, video, file website, cache, Cache Hit, server ở Mỹ, lần tải đó | Swoosh ở cut ~45.2. Pop ở `11:cache,` khi file nhảy ra. Chime hit sáng ở `12:Đó`. Laser ở `13:lần` khi tick xanh hiện. | Nếu hình ảnh, video hoặc file website đã được lưu trong cache, CloudFront sẽ trả dữ liệu ngay từ đó. Đó gọi là Cache Hit. Không cần quay về server ở Mỹ cho lần tải đó! |
| m1 CACHE MISS | 14-16 | ~56.0-64.8 · 8.8 s · khựng, 3 nhịp · vào bằng **cut** | **`14:Nhưng` ~56.0** Mở chương: cùng kệ cache, chip mới mang glyph `film` khác màu tìm ô của nó, ô trống, viền chip chuyển đỏ. Camera: dolly in vào ô trống. **`15:Đó` ~59.0** Pill "CACHE MISS" đỏ đập vào, kệ rung 2 lần. **`16:Thường` ~60.7** Tầng dưới: chuỗi sơ đồ chèn ô thứ 3 "Regional Edge Cache", một hộp kệ lớn hơn vẽ bằng code, không phải logo. Chip đi từ Edge Location sang hộp này theo đường cam liền nét. Cùng lúc một đường nét đứt mảnh hơn đi thẳng từ Edge Location tới Origin, chip nhỏ 40 px "Một số request đi thẳng", để không gợi ý mọi request đều qua tầng này. Camera: whip pan sang phải theo chip, rồi dừng ở hộp Regional. | Pill "CACHE MISS" chữ trắng trên nền đỏ, 62 px. Nhãn ô "Regional Edge Cache". Chip "Một số request đi thẳng". Từ khóa phụ đề: chưa được lưu, Cache Miss, Regional Edge Cache, tầng cache lớn hơn | Swoosh ở cut ~56.0. Tiếng "buzz" lỗi ngắn ở `15:Đó`. Pop cho ô Regional Edge Cache ở `16:Regional`. Bed hạ 3 dB trong m1. | Nhưng nếu nội dung chưa được lưu thì sao? Đó gọi là Cache Miss. Thường thì CloudFront sẽ tìm tiếp ở Regional Edge Cache, một tầng cache lớn hơn. |
| m2 ORIGIN | 17-19 | ~65.1-78.0 · 12.9 s · đi xa rồi quay về, 4 nhịp · vào bằng **slide** | **`17:Nếu` ~65.1** Hộp Regional mở ra, cũng trống, chip đỏ. **`17:gửi` ~66.9** Fast zoom out ra bản đồ toàn cảnh; chip đỏ đi đường dài qua Thái Bình Dương tới tile Origin ở Mỹ, đuôi đỏ vẽ dần theo. Tầng dưới: ô "Origin · Mỹ" sáng. **`18:Khi` ~70.1** Origin trả file: chip đổi viền xanh, quay về theo đường dài. Ở `18:lưu` ~72.3 file rơi vào cả hộp Regional và kệ Edge Location, ô trống được lấp, tick nhỏ trên mỗi ô. Camera: dolly in vào kệ Edge. **`19:Những` ~73.7** Top-down tầng trên: 3 user pin mới quanh TP.HCM lần lượt gửi chip, cả 3 nhận về theo đường ngắn xanh. Ô file trong kệ có icon đồng hồ cát nhỏ, Lucide `hourglass`, để gợi ý bản cache có hạn, khớp chữ "có cơ hội". | Nhãn ô "Origin · Mỹ" sáng. Không chữ mới. Từ khóa phụ đề: server gốc, tại Mỹ, lưu lại vào cache, lần truy cập tiếp theo, Edge Location | Không swoosh vì là slide. Whoosh dài trầm theo đường xuyên biển ở `17:gửi`. Pop ở `18:lưu` khi file vào kệ. 3 chime hit ngắn, giảm dần âm lượng, ở 3 lần phục vụ tại edge, ~74.5 đến 76.5. | Nếu vẫn chưa có, nó sẽ gửi request về server gốc tại Mỹ để lấy dữ liệu. Khi nhận được nội dung, CloudFront có thể lưu lại vào cache. Những lần truy cập tiếp theo có cơ hội được phục vụ ngay tại Edge Location. |
| l1 LIMIT | 20-22 | ~78.3-92.5 · 14.2 s · chững lại, 4 nhịp · vào bằng **cut** | **`20:Tất` ~78.3** Mở chương: tile 320 px glyph Lucide `split`, tách hai nhánh. Camera: dolly in. **`21:Ảnh` ~81.4** Màn hình chia đôi trái phải. Bên trái, viền xanh: 3 tile file glyph `image` cho ảnh sản phẩm, một logo shop giả lập không thương hiệu vẽ bằng code, `file-code` có nhãn "JS"; cả ba trượt vào kệ Edge Location. Camera: whip pan sang trái. **`22:Nhưng` ~85.3** Bên phải, viền đỏ: 3 tile glyph `user`, `shopping-cart`, `credit-card` lần lượt pop ở `22:tài`, `22:giỏ`, `22:thanh`. Mỗi tile mang dấu người dùng riêng là avatar tròn màu khác nhau. **`22:backend.` ~91.5** Chip đỏ từ bên phải đi qua Edge Location, không dừng ở kệ, rồi đi tiếp về tile Origin; đường đỏ vẽ dần. Camera: whip pan sang phải theo chip. | Nhãn cột 62 px: "Cache" bên trái, "Backend" bên phải. Nhãn "JS" là một phần của icon. Từ khóa phụ đề: không phải mọi dữ liệu, ảnh sản phẩm, logo, JavaScript, tài khoản, giỏ hàng, thanh toán, backend | Swoosh ở cut ~78.3. Pop ở `21:Ảnh` cho cột cache. Pop ở `22:tài` cho cột backend, 2 tile sau im vì cascade. **Bed tắt dần** từ `22:Nhưng` ~85.3, im hẳn từ ~88.0 đến hết câu 22. | Tất nhiên, không phải mọi dữ liệu đều được cache. Ảnh sản phẩm, logo hay file JavaScript thường phù hợp để lưu cache. Nhưng thông tin tài khoản, giỏ hàng và thanh toán lại cần được xử lý theo dữ liệu của từng người dùng, thường phải đi đến backend. |
| r1 REVEAL | 23-24 | ~92.9-104.9 · 12 s · bùng lên ở payoff rồi chốt, 4 nhịp · vào bằng **cut** | **`23:Đó` ~92.9 PAYOFF.** Fast zoom out lớn nhất video, scale 2.2 xuống 1.0, ra bản đồ toàn cảnh với chuỗi sơ đồ đầy đủ ở tầng dưới. Hàng chục đường ngắn xanh chạy liên tục quanh hai pin Việt Nam và các điểm edge khác; sóng xung kích cam từ Hà Nội và TP.HCM. Ở `23:gần` ~95.0 thesis một dòng hiện ở tầng dưới thay cho chuỗi sơ đồ. **`23:thay` ~97.4** Một đường đỏ dài duy nhất sang Mỹ hiện mờ, rồi co lại thành đoạn ngắn và mờ đi, đối lập với các vòng xanh. Camera: orbit chậm, rotation 0 đến 2°. **`24:Và` ~101.6** Logo Amazon CloudFront pop lớn 300 px ở giữa tầng trên, bản đồ mờ xuống 40% phía sau. Ở `24:nhanh` ~104.0 laptop từ h1 trở lại ở tầng dưới, trang shop tải xong, tick xanh. Camera: dolly in nhẹ vào logo. | Thesis một dòng, 72 px: "Đưa dữ liệu đến gần người dùng". Label pill "Amazon CloudFront" dưới logo. Từ khóa phụ đề: CDN, gần người dùng hơn, bên kia thế giới, Amazon CloudFront, tải nhanh hơn | Swoosh ở cut ~92.9. **Drop nhạc** ở `23:Đó`: riser house dẫn vào từ ~92.0, cắt đúng ~92.9, kèm boom ngắn và bed trở lại +2 dB so với mức thường. Đây là khoảnh khắc to nhất video. Pop ở `23:gần` cho thesis. Pop ở `24:Và` cho logo CloudFront. Laser ở `24:nhanh` khi tick xanh hiện. | Đó là cách CDN giúp đưa dữ liệu đến gần người dùng hơn, thay vì bắt mọi người phải kết nối trực tiếp đến một server ở bên kia thế giới. Và đó chính là cách Amazon CloudFront giúp website tải nhanh hơn! |
| e1 OUTRO | 25-26 | ~105.2-108.3 · 3.1 s · lắng, 2 nhịp · vào bằng **fade** | **`25:Góc` ~105.2** Logo Góc nhìn DEV pop giữa tầng trên, bản đồ thu nhỏ mờ phía sau, các vòng xanh vẫn chạy chậm. Camera: zoom out chậm 1.06 về 1.0. **`26:Hẹn` ~106.4** Request chip của video bay vào góc logo, đổi viền xanh. | Logo kênh. Không chữ thêm, caption mang câu nói. Từ khóa phụ đề: Góc nhìn DEV, tập tiếp theo | Pop ở `25:Góc` cho logo kênh. Bed bắt đầu fade ra. | Góc nhìn DEV. Hẹn gặp bạn ở tập tiếp theo! |
| ec END CARD | không | ~108.6 đến hết · 2.75 s | End card của template: logo Góc nhìn DEV, `BRAND_NAME`, `SLOGAN` từ `brand.json`. Vào bằng **cut**. | Theo template | Swoosh ở cut. Bed fade ra trong 1.5 s cuối. | không có lời |

## 3. Audio queries

**Nhạc nền**

- Lựa chọn mặc định, giữ house bed như EP01: `bgm-little-things.mp3`, 124 s, đủ cho ~111 s, không cần loop. Payoff dựa vào việc bed im từ ~88.0 và quay lại ở `23:Đó` kèm riser và boom.
- Query 1: `curious tech explainer electronic pulse build and drop no vocals`. Mood: tò mò ở đầu, sáng và tự tin ở cuối. Genre: light electronic, future garage nhẹ. BPM ước lượng 100 đến 110. Cần đoạn build để đặt drop đúng `23:Đó`.
- Query 2: `minimal ambient tech travel pulse world map documentary`. Mood: hành trình xa, nhẹ. Genre: minimal electronic, ambient. BPM ước lượng 90 đến 100.
- Điểm lặng: ~10.0 đến ~10.7, dead stop cuối hook. ~88.0 đến ~92.9, cuối câu 22, đảo chiều trước payoff.
- Điểm drop: `23:Đó` ~92.9, đầu câu payoff.
- Mức: bed 10 đến 12 dB dưới voice theo `audio-mix.md`. Nhạc ngoài house set chỉ lấy nguồn có giấy phép rõ, ghi vào `assets/SOURCES.md`.

**SFX** (mốc là ước lượng; khi dựng, đặt theo neo `câu:từ`)

- [~0.0 `1:Bạn`] Thud mở đầu -> house `sfx-thud.mp3`
- [~0.4] Tiếng gõ phím laptop ngắn -> `laptop keyboard typing short soft` (0.6 s)
- [~5.2 `2:Hai`] Whoosh dài theo cung bay qua bản đồ -> `long airy whoosh pass across` (1.0 s)
- [~6.2 `2:mười`] Shutter cho số > 10.000 km -> house `sfx-click.mp3`
- [~7.5 đến ~10.0] Riser cắt đứng ở "nhanh?" -> house `sfx-risercut3.mp3`
- [~10.0 `3:nhanh?`] Pop cho dấu hỏi -> house `sfx-pop.mp3`
- [~12.6 đến ~13.6] 4 tiếng ping qua nút mạng, nhỏ dần -> `soft network ping blip` (0.2 s mỗi tiếng), hoặc `synth-sfx.py` sine blip 1200 Hz
- [~14.2 `4:cáp`] Tiếng sóng ngầm dưới biển, trầm -> `deep underwater rumble low` (1.2 s)
- [~19.0 `5:tăng`] Kim đồng hồ kéo căng -> `gauge needle tension rising creak ui` (0.8 s)
- [~24.4 `7:CDN,`] Mạng lưới sáng lên -> `network nodes light up shimmer` (1.0 s), hoặc `synth-sfx.py` arpeggio blip
- [~41.6 `10:thường`] Chọn đường -> house `sfx-laser.mp3`
- [~51.0 `12:Đó`] Chime Cache Hit -> `positive ui chime success bright` (0.5 s)
- [~59.0 `15:Đó`] Buzz Cache Miss -> `error buzz short negative ui` (0.3 s)
- [~66.9 `17:gửi`] Whoosh trầm xuyên đại dương -> `slow deep whoosh long distance` (1.5 s)
- [~74.5 đến ~76.5] 3 chime hit ngắn, giảm dần -> cùng file chime ở trên, -3 dB và -6 dB
- [~92.0 đến ~92.9] Riser dẫn vào payoff -> house `sfx-riser.mp3`, cắt đúng `23:Đó`
- [~92.9 `23:Đó`] Boom payoff -> `deep impact boom cinematic short` (1.0 s)
- Pop, laser, swoosh còn lại dùng house set, mốc nằm trong bảng cảnh và trong `cues.json`.

## 4. Build notes

## Build decisions (2026-11-26)

- HOOK (h1): the storyboard stock photo is replaced by a laptop drawn in code. No licensed stock was verified.
- Map: Natural Earth 110m land only, static dot grid (695 dots, 12 px pitch, lon 60 to 260, lat 65 to -40), no borders. Hoang Sa and Truong Sa are omitted. Open: the 10m dataset is not fetched; any sovereignty-related element needs human review before publishing.
- AWS icons: official AWS Architecture Icons only (CloudFront, Edge Location, server, user). No logo redrawn. Open: the author decides whether service icons stay in this channel video.
- Camera: only s2 moves (zoom to HCMC). s1 uses pins without a camera move; r1 has no zoom-out.
- Caption band: mid (y 980) for all scenes.
- Voice: about 100.06 s (vo-alignment.json, scriptEndsAt 99.54 s). End card 2.75 s (EC_DUR). Total from beats.json 102.6 s.
- Step tracker: STEPS = [] in scripts/build.py (no footer dock).
- Colour roles (look.json): accent #FF9900; mascot #E5484D (Cache Miss, origin path); term-text #30A46C (Cache Hit, edge path); on-accent ink. Caption lit ink, unlit unread.
- Sound: thud at 0 s; swoosh on hard cuts only (ledger seams); pop, laser and click on the beats in cues.json. Storyboard SFX beyond thud, swoosh, pop, laser and click (riser, whoosh, boom, typing, ping, rumble, creak, chime, buzz) are not added in this pass. Open.
- scripts/build.py SC placeholder left as-is (overwritten in cleanui mode).


**Chuyển cảnh, loop, màu caption, camera**

1. Seam: h1 to p1 **cut**, p1 to s1 **cut**, s1 to s2 **slide**, s2 to h2 **cut**, h2 to m1 **cut**, m1 to m2 **slide**, m2 to l1 **cut**, l1 to r1 **cut**, r1 to e1 **fade**, e1 to ec **cut**. Swoosh chỉ ở cut theo luật cleanui. Vật nối giữa các cảnh là bản đồ tầng trên và chuỗi sơ đồ tầng dưới: không cảnh nào reset hoàn toàn. Chuỗi lắp dần: p1 có 2 ô, s2 thêm Edge Location, m1 thêm Regional Edge Cache, r1 sáng toàn bộ. e1 dùng lại laptop và chip của h1 để khép vòng.
2. Màu qua `look.json`, giống EP01 vì `look.py` của cleanui không nhận role mới: `accent` = `#FF9900`, `mascot` = `#E5484D` làm role đỏ vì video không dùng mascot, `term-text` = `#30A46C` làm role xanh, `on-accent` = `ink`. Caption: `lit` = ink, `unlit` = unread. Mọi cảnh đặt `"band": "mid"` trong `cues.json`. Ở nhịp ảnh stock toàn khung của h1, cần một pill mờ sau caption ở band mid: dùng lại style `.capbg` nhưng đặt top ~965 thay cho 150; đây là chỉnh trong `parts/`, không đổi `theme.css`.
3. Bản đồ: lưới chấm sinh sẵn một lần thành SVG tĩnh từ dữ liệu đất liền Natural Earth, public domain, bản 110m cho toàn cảnh và 10m cho cảnh zoom Việt Nam để có Hoàng Sa và Trường Sa. Không `Math.random()`; mọi vị trí điểm edge minh họa là danh sách cố định. Thái Bình Dương ở giữa, khung bản đồ 840 x 440 trong y 300 đến 950. Camera zoom vào Việt Nam ở s1 dùng cùng SVG, phải kiểm tra chấm không vỡ ở scale 2.6. Snapshot 0.2 đến 0.4 s sau mỗi cut, zoom vào từng icon AWS, nhất là icon Edge Location chỉ có cỡ 48.

**Riêng tư**: không cảnh nào dùng console, tài khoản hay màn hình của tác giả. Ảnh stock ở h1 không được lộ màn hình có dữ liệu thật; nếu ảnh có màn hình đọc được, thay bằng trang shop giả lập hoặc blur. Không cần privacy blur ở cảnh nào khác.

**Rủi ro cần người duyệt**

- **Bản đồ Việt Nam.** Bản đồ có phần lãnh thổ Việt Nam phát hành tới khán giả Việt Nam có thể chịu quy định về thể hiện chủ quyền, gồm Hoàng Sa và Trường Sa. Chưa kiểm chứng văn bản pháp luật cụ thể. Storyboard đã chọn: không biên giới, có cụm chấm và nhãn Hoàng Sa, Trường Sa ở cảnh zoom. Cần người duyệt trước khi đăng.
- **Icon AWS trong video.** Giống EP01, trang AWS Architecture Icons nêu sơ đồ, tài liệu, bài trình bày; video không được nêu tên. MEDIA.md của EP01 mục 2 và 3 vẫn mở. Cần cùng quyết định cho EP02.
- **Điểm edge minh họa.** Chỉ Hà Nội và TP.HCM được ghi tên. Không vẽ điểm edge ở thành phố cụ thể khác với nhãn. Đường cáp ngầm là minh họa, có tag.
- **Kỹ thuật theo fact-check**: không cảnh nào ngụ ý mọi request qua Regional Edge Cache; đường bypass nét đứt ở m1 và đường backend ở l1 thể hiện ngoại lệ. Edge được chọn có chip "thường gần nhất". Không có Global Accelerator.

**Model list**: không áp dụng, cleanui là theme 2D. Glyph Lucide, giấy phép ISC, cần thêm vào sprite `head.part`: `i-laptop`, `i-cable`, `i-globe`, `i-image`, `i-film`, `i-file-code`, `i-gauge`, `i-hourglass`, `i-split`, `i-user`, `i-shopping-cart`, `i-credit-card`, `i-check`, `i-x`. Kiểm tra sprite hiện có trước khi thêm để tránh trùng.

**Media checklist**

| Media | Cảnh | Loại nguồn | Ai lấy |
|---|---|---|---|
| Amazon CloudFront, `Arch_Amazon-CloudFront_64.svg` -> `assets/logos/aws/cloudfront.svg` | s1, r1 | AWS Architecture Icons, gói `Icon-package_07312026`. Có sẵn ở EP01; sao chép, đối chiếu sha256 với file trong gói | Agent |
| Edge Location, `Res_Amazon-CloudFront_Edge-Location_48.svg` -> `assets/logos/aws/edge-location.svg` | s1, s2, h2, m1, m2, l1, r1 | Cùng gói, thư mục `Resource-Icons_07312026/Res_Networking-Content-Delivery/`. Đã thấy tên file trong gói ngày 2026-11-26 | Agent |
| Server, `Res_Server_48_Light.svg` -> `assets/logos/aws/server.svg` | h1, p1, m2, l1, r1 | Cùng gói, `Res_General-Icons/Res_48_Light/` | Agent |
| User, `Res_User_48_Light.svg` -> `assets/logos/aws/user.svg` | ô "Người dùng" trong chuỗi sơ đồ | Cùng gói, `Res_General-Icons/Res_48_Light/` | Agent |
| Regional Edge Cache | m1, m2, r1 | Gói không có icon riêng cho Regional Edge Cache theo tìm kiếm tên file. Vẽ hộp kệ trung tính bằng code, có nhãn chữ, không mô phỏng logo | Agent dựng |
| Logo Góc nhìn DEV | h1 pill, e1, ec | `brand/logos/goc-nhin-dev-logo.png`, đã có | Đã có |
| Ảnh stock người dùng laptop ở TP.HCM | h1 nhịp 1 | `media-use resolve --type image --provider heygen`, intent "person using laptop in a cafe in Ho Chi Minh City". Ghi giấy phép và credit vào `assets/SOURCES.md` | Agent; dự phòng laptop vẽ bằng code |
| Dữ liệu đất liền Natural Earth 110m và 10m | h1 đến r1 | Public domain, naturalearthdata.com. Ghi vào `assets/SOURCES.md` | Agent tải, sinh SVG lưới chấm |
| Bản đồ lưới chấm, điểm edge, đường cáp minh họa, kệ cache, đồng hồ độ trễ, trang shop giả lập, split cache và backend | mọi cảnh | Built in code, CSS và SVG + glyph Lucide | Agent dựng |
| Nhạc ngoài house set | toàn video, tùy chọn | Stock có giấy phép | Agent tìm; mặc định dùng house bed |

Không dùng: ảnh từ Cullen International, About Amazon, Freepik, Medium hay bất kỳ nguồn nào trong brief chưa rõ giấy phép; page capture trang AWS; logo AWS đứng riêng; ảnh hay video sinh bằng AI. Gói icon tại `/tmp/sf-dl-aws-icons/icon-package.zip` là bản tải tạm; nếu đã mất, tải lại từ https://aws.amazon.com/architecture/icons/.

**`build.py`**

```python
STEPS = []   # footer dock y 1580-1730 nằm trong 25% dưới bị UI TikTok che
BRAND_NAME = "Góc nhìn DEV"
BRAND_LOGO = "assets/logos/goc-nhin-dev-logo.png"
SLOGAN = "Từ Một vấn đề thực tế → Một thách thức công nghệ → Một giải pháp AWS → Cách hệ thống hoạt động"   # giữ brand.json
EC_DUR = 2.75   # giữ mặc định; tổng ước lượng ~111 s. Nếu voice thật ngắn hơn 107 s, cân nhắc 5.5 s
```

`SC` do `cues.json` sinh ra. Thay mẫu `cues.json` hiện tại, vốn là sample của theme, bằng danh sách cảnh sau:

```json
{"id": "h1", "band": "mid"},
{"id": "p1", "in": "cut",   "band": "mid", "at": {"sentence": 4,  "word": "Bình"}},
{"id": "s1", "in": "cut",   "band": "mid", "at": {"sentence": 7,  "word": "Câu"}},
{"id": "s2", "in": "slide", "band": "mid", "at": {"sentence": 10, "word": "Khi"}},
{"id": "h2", "in": "cut",   "band": "mid", "at": {"sentence": 11, "word": "Nếu"}},
{"id": "m1", "in": "cut",   "band": "mid", "at": {"sentence": 14, "word": "Nhưng"}},
{"id": "m2", "in": "slide", "band": "mid", "at": {"sentence": 17, "word": "Nếu"}},
{"id": "l1", "in": "cut",   "band": "mid", "at": {"sentence": 20, "word": "Tất"}},
{"id": "r1", "in": "cut",   "band": "mid", "at": {"sentence": 23, "word": "Đó"}},
{"id": "e1", "in": "fade",  "band": "mid", "at": {"sentence": 25, "word": "Góc"}}
```

Beat chính, mỗi beat nằm trong cảnh của nó: `h1-site` 1:website, `h1-map` 1:nước, `h1-arc` 2:Hai, `h1-km` 2:mười, `h1-q` 3:nhanh; `p1-hops` 4:nhiều, `p1-cable` 4:cáp, `p1-gauge` 5:tăng; `s1-map` 7:CDN, `s1-logo` 8:AWS, `s1-edge` 8:Edge, `s1-zoom` 9:Đặc, `s1-hn` 9:Hà, `s1-hcm` 9:Hồ; `s2-try` 10:định, `s2-pick` 10:thường, `s2-chain` 10:độ; `h2-file` 11:cache, `h2-hit` 12:Đó, `h2-done` 13:lần; `m1-miss` 15:Đó, `m1-rec` 16:Regional; `m2-origin` 17:gửi, `m2-store` 18:lưu, `m2-next` 19:Những; `l1-cache` 21:Ảnh, `l1-acct` 22:tài, `l1-cart` 22:giỏ, `l1-pay` 22:thanh, `l1-back` 22:backend; `r1-thesis` 23:gần, `r1-logo` 24:Và, `r1-done` 24:nhanh; `e1-logo` 25:Góc. `sfx` trong `cues.json`: pop cho `h1-q`, `s1-logo`, `s1-hn`, `s1-hcm`, `s2-chain`, `h2-file`, `m1-rec`, `m2-store`, `l1-cache`, `l1-acct`, `r1-thesis`, `r1-logo`, `e1-logo`; click cho `h1-km`; laser cho `s2-pick`, `h2-done`, `r1-done`. Âm ngoài house set đi qua `EXTRA` trong `add-sfx.py`. Neo từ phải được đối chiếu với `asr-words.json` sau khi align, vì ASR có thể ghi "AWS" và "CDN" khác chữ viết.

**`plan-beats.py` SCENES**

```python
SCENES = [
    ("h1", "HOOK",    "laptop in Ho Chi Minh City opens a US-hosted shop; arc across the Pacific, > 10,000 km", 1, 3),
    ("p1", "PROBLEM", "request hops networks and undersea cables to the US; latency gauge climbs",              4, 6),
    ("s1", "CDN",     "dot map lights edge points; CloudFront logo; zoom to Hanoi and HCMC edge pins",          7, 9),
    ("s2", "ROUTE",   "request tries 3 edges, usually takes the lowest-latency one, HCMC",                     10, 10),
    ("h2", "HIT",     "edge cache shelf has the file; CACHE HIT; short green loop, US path greyed",            11, 13),
    ("m1", "MISS",    "empty shelf; CACHE MISS; usually on to Regional Edge Cache, dashed bypass shown",       14, 16),
    ("m2", "ORIGIN",  "long red trip to US origin; file cached at regional and edge; next users served fast",  17, 19),
    ("l1", "LIMIT",   "split: static files cached vs account, cart, payment going to backend",                20, 22),
    ("r1", "REVEAL",  "payoff zoom out: green loops near users, one long path fades; CloudFront logo",          23, 24),
    ("e1", "OUTRO",   "Goc nhin DEV logo over the faded map",                                                  25, 26),
]
```

Mọi câu 1 đến 26 thuộc đúng một cảnh. Cảnh dài nhất là l1 và s1, khoảng 14 s, mỗi cảnh có 4 nhịp hình để giữ nhịp đổi hình 3 đến 5 s.

## Build decisions, pass 2 (2026-11-26)

- Caption limits (cleanui in scripts/karaoke.py): maxu 6, maxc 28, maxc_side 28 (was 6, 40, 40). At 40 characters the wide Vietnamese glyphs ran past the right edge of the 1080 px frame at 19.58 s, 52.90 s and 86.58 s. The stickman block is unchanged.
- Cost of the caption limit: craft:line_unread warnings (52). Short lines stay on screen under the 1.50 s reading floor. Accepted for now. Open: the author decides whether to hold longer lines or accept shorter ones.
- Unread caption colour: palette.unread in look.json is #8A8A8A (was #A3A3A3). Contrast on paper rises from 2.31:1 to 3.17:1.
- Labels "Minh họa" (.tag) and the bypass label now use ink, not term-dim. Contrast warning cleared.
- Paths with pathLength="1" in parts/scenes.part use stroke-linecap butt. The lint svg_round_cap_hidden_dash warning is cleared.
- Layout open: layout:outside_safe_zone (17). Chain labels such as "Người dùng" and "Origin · Mỹ" sit in the bottom platform UI band (TikTok, Reels, Shorts). Not moved. Open: shift the chain rows up in parts/scenes.part if the author wants them clear of the bottom bar.
- Layout info, accepted: escaped_container on #cam-s2 (the GSAP zoom origin of 315.8 px, 587.0 px). Expected for the zoom.
- Lint advisories, accepted: duplicate_media_discovery_risk (4, the same map and server images repeat across scenes), nested_structure_needs_subcomposition (11), composition_file_too_large (1, 974 lines), timeline_track_too_dense (1, 71 timed elements). Not split into sub-compositions for this pass.
- Snapshots: snapshots/v1 holds the cut-plus-0.3 s frames (0.30, 9.94, 19.58, 34.22, 42.54, 52.90, 61.42, 72.98, 86.58, 97.72, 100.22 s), an extra end frame at 102.42 s, and two contact sheets. Caption overflow and the "Minh họa" contrast were fixed from these frames.
- scripts/audit-sync.py: 21 flags, not treated as sync failures. The script applies T() (OLD to NEW) to authored times. The beat times in index.html and syl-times.json are already on the aligned scale (syl-times.json ends at 99.54 s). Each authored time falls inside the sentence its cue illustrates: p1 in sentence 4, s1 in 9, s2 in 10, m1 in 14 and 16, m2 in 17, l1 in 21 and 22, r1 in 23 and 24. The script itself is not changed. Open: the pipeline owner decides whether T() should apply when the timing map is already aligned.
- End card: SLOGAN is unchanged and still needs about 4.88 s on a 2.75 s card. Open for the author.

## Build decisions, pass 3 (2026-11-26)
- Caption plate: .kc now has a solid paper background (x 96 to 984, y 980 to 1120). Every scene uses the mid band, so the zoomed s2 map no longer shows through the caption. Reason: coordinator review, 38 s.
- Chain row: nodes at y 1124, labels at y 1258 in 28 px single line. "Regional Edge Cache" wraps to two lines. Reason: the checker type floor is 28 px and the labels had to leave the bottom platform zone.
- Chain labels are centred under their nodes. They were 40 px left of the node centre before.
- Open: 17 outside_safe_zone warnings remain (chain labels at y 1257 to 1292, caption lines, the Minh họa tag, the thesis line at y 1239 to 1315). The safe-zone rule needs human review before the diagrams are scaled further.
- M1 and H2 pills moved to y 640, above the request chip at y 720. Reason: the pill overlapped the chip.
- L1 split: left column "Cache được" (x 96 to 496), right column "Đi đến backend" (x 600 to 1000), fork card at y 300. Reason: the storyboard split screen.
- P1 cable line moved to y 1186 so it runs through the node centres. Reason: it crossed the chain labels and the checker flagged text_occluded.
- S2: Hà Nội, TP.HCM, Hoàng Sa and Trường Sa labels are screen-space and appear at s2-zoom + 0.8 s. Hoàng Sa and Trường Sa dot clusters sit in the zoomed map at the Natural Earth positions. Sovereignty-related content: needs human review before publishing.
- S1 Hà Nội and TP.HCM labels appear at 32.24 s and 33.24 s, the narration beats. The 28 s frame shows the globe stage before them.
- Minh họa tag moved to the top-left of the map frame (x 96, y 340) in s1 and s2.
- Captions: each cue now holds for at least 1.0 s in karaoke.py (e = max(e, s + 1.0)). The next cue's start still caps the end.
- Not done: the diagrams are not scaled up. The lower band is used only down to y 1292, because the checker flags text below that line.
