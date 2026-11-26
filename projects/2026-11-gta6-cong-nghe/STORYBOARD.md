# Storyboard: Công nghệ đằng sau GTA 6

Trạng thái: bản kế hoạch, chưa phải quyết định cuối. Chưa cắt clip nào, chưa render, chưa xem từng frame.

Mức kiểm chứng:

- Đã kiểm trên file: câu thoại (`SCRIPT.md`), ranh giới scene (`vo-alignment.json`), giây của mọi từ ghi dấu "s" trong cột Giây ở mục 4.2 (`syl-times.json`), danh sách logo, danh sách file âm thanh, chữ ký của `make-media.py`, `add-sfx.py`, `build.py`, quy tắc `cleanui.md`, câu chữ nguồn trong `fact-check.md`.
- Chưa kiểm: mọi in và out của clip. Chúng nằm trong cửa sổ của `research/footage.md`, mà chính catalog đó đọc từ contact sheet 2 giây. Mọi đầu clip phải xem lại ở bước 0.05 giây trước khi cắt.
- Ký hiệu "≈" nghĩa là giây chưa đo, suy ra từ từ neo của câu. `build.py` giải theo anchor từ, nên các mốc này tự khớp lúc build.
- Chưa chạy được `silences.py` trong phiên này, nên điểm cắt scene dùng `newA` và `newB` của `vo-alignment.json`.

## 1. Concept

- Tiêu đề: Công nghệ đằng sau GTA 6.
- Định dạng: explainer, series Phát minh. Theme `cleanui` theo prompt. `AGENTS.md` ghi series Phát minh dùng `neon3d`, nên tác giả cần xác nhận `cleanui` là chủ ý.
- Lời hứa: bạn hiểu hai hệ thống công nghệ đằng sau GTA 6, phần chạy trên console và phần bên trong Rockstar.
- Góc hook: game vừa ra mắt, rồi câu hỏi cụ thể về công nghệ đằng sau thế giới đông xe, đông người, nhiều ánh sáng. Riser dừng đúng chữ "hỏi:" ở 3.62 s.
- Payoff: câu 44 "Nó thực sự là một kỳ công kỹ thuật!", từ 223.52 đến 225.22 s. Đỉnh ở chữ "kỳ", 224.48 s.
- Thời lượng: giọng 225.59 s, scene cuối kết thúc 225.22 s. End card bắt đầu 225.52 s. Câu 44 có 10 âm tiết. Tổng âm tiết của kịch bản chưa đếm lại trong phiên này.
- Phong cách: `cleanui`, footage là hình chính. Ba màu khóa: nền `#F5F5F5`, mực `#1F1F1F`, nhấn `#D97656`, đúng bảng của `cleanui.md`.
- Thực thể chính: khung footage bo góc 40 px, đổ bóng nhẹ, giữ nguyên hình dạng và bóng cả video.
- Ẩn dụ dựng dần: mỗi kỹ thuật là một chip có icon và nhãn cùng kiểu, hiện ở chương của nó. Ở e1 các chip ghép thành hai cột của sơ đồ hai hệ thống.

### Khung hình, 1080x1920

Quy tắc tổ chức: chữ và chủ thể ngoài 288 px trên, ngoài 480 px dưới, ngoài 162 px bên phải. Chữ, số và logo nằm trong x 72 đến 918, y 288 đến 1440. Footage được phép tràn ra ngoài, chữ thì không. Quy tắc này chặt hơn vùng an toàn 240 và 440 px của `cleanui.md`.

| Tên | Vị trí | Dùng khi |
|---|---|---|
| Phụ đề | band top, mép trên y 300 | mọi scene, `karaoke.py` theo cleanui |
| CARD-SQ | x 72, y 500, 936x936, bo 40 | scene chủ yếu là footage. Cắt vuông 1080x1080 từ nguồn 1920x1080 |
| CARD-WD | x 72, y 500, 936x527, bo 40 | scene có sơ đồ. Giữ nguyên khung 16:9 |
| PANEL | x 72, y 1060, 936x360, bo 40, nền trắng | sơ đồ dưới CARD-WD |
| DZ | y 1200 đến 1420 trong CARD-SQ | sơ đồ và logo phủ lên footage |
| Ô logo | nền trắng, cao 184, bo 40, logo cao tối đa 104 | mọi logo. File logo giữ nguyên: không đổi màu, không cắt, không méo |

### Quyết định cần biết

- `cleanui.md` ghi "No camera moves, all motion is 2D". Quy tắc tổ chức đòi tên camera cho mọi scene. Cách giải: camera là biến đổi 2D của video bên trong card. Dolly in là scale 1.00 đến 1.08. Fast zoom out là scale 1.10 đến 1.00. Whip pan là dịch ngang 60 px kèm blur 6 px trong 0.20 s. Top-down là chính footage trên không. Card, phụ đề và sơ đồ không chuyển động theo camera.
- Mascot teal của `cleanui` bỏ đi, vì yêu cầu tác giả là footage chiếm ưu thế.
- `STEPS` đặt rỗng, vì thanh bước của template nằm trong vùng 15% trên cùng.
- Logo GTA VI ở h1 nằm trong clip trailer `vi-logo`, không phải file riêng.
- `SCRIPT.md` không có mục `# Từ khóa phụ đề`, nên phụ đề dùng mặc định của theme.
- Chip "Ngành game" giữ đúng nghĩa của lời. `fact-check.md` mục 13, 15 ghi không nguồn nào gắn Maya, Houdini, Perforce với GTA 6.

## 2. Bảng scene

Cột Hình ảnh ghi mã clip và camera. Nguồn, in, out, giây phim và tỉ lệ kéo dài của từng clip nằm ở mục 4.3.

| Scene | Câu số | Thời gian & Nhịp | Hình ảnh & Camera | Text / UI Overlay | Âm thanh & SFX | Lời thoại |
|---|---|---|---|---|---|---|
| h1 | 1 | 0.00 đến 2.64, mở đầu nhanh | CARD-SQ. c01 dolly in, c02 fast zoom out. Logo GTA VI nằm trong clip c01 | Pill "19.11.2026" 62 px tại ≈1.30, từ "cũng". Ngày xác nhận ở `fact-check.md` mục 1. Không dùng thẻ ngày của T2. Bỏ được nếu thừa | thud 0.00. risercut3 bắt đầu 0.42, dừng đúng 3.62. click ≈1.30 | GTA sau cuoi cung cung da chinh thuc ra mat! |
| h2 | 2 đến 4 | 2.64 đến 18.44, 7 shot, vào bằng slide | CARD-SQ. c03 dolly in, c04 top-down, c05 whip pan, c06 whip pan, c07 whip pan, c08 dolly in, c09 fast zoom out. Logo Rockstar tại 4.60, ô logo góc trái dưới DZ, tắt 8.20 | Glyph "?" 130 px trên starburst, hiện 3.62 từ "hỏi:", tắt 5.00 | pop 4.60 cho logo Rockstar | Nhung ban co bao gio tu hoi: Rockstar da su dung nhung cong nghe gi de tao ra mot the gioi rong lon, song dong den muc nay? Dang sau nhung con pho dong nghet xe co, nhung nguoi di bo va anh sang chan thuc la ca mot he thong cong nghe cuc ky phuc tap. Va hom nay, minh se cung ban kham pha no! |
| g1 | 5 | 18.44 đến 22.94, 2 shot, vào bằng cut. Chương 1 | CARD-SQ. c10 dolly in hướng lên, c11 dolly in | Icon bánh răng trong ô 184 px và số "1" tại 18.44. Tiêu đề "ENGINE" 104 px tại 20.50 từ "Engine,". Bánh răng quay từ 20.50 | swoosh 18.44, vì hard cut. pop 20.50 | Dau tien, moi thu bat dau tu Game Engine, bo may van hanh toan bo tro choi. |
| g2 | 6 đến 7 | 22.94 đến 38.06, 6 shot, vào bằng slide | CARD-SQ. c12 dolly in, c13 whip pan, c14 dolly in, c15 top-down, c16 dolly in, c17 fast zoom out. Logo: Unreal Engine 25.52, Rockstar 27.54, chữ RAGE 29.84, Rockstar nhỏ 31.68 | Hàng 3 ô trong DZ, mỗi ô cao 184: Unreal, Rockstar, chữ RAGE 72 px trên pill mực. Unreal giảm còn 35% độ đục tại 27.54. Hàng ô tắt 32.20. Pill nhỏ "RAGE" 62 px góc trái trên card từ 32.36. Mốc phiên bản trong DZ: "2006" ≈32.4, "IV" 35.26 từ "bốn,", "V" ≈36.3, "VI" 37.62 từ "sáu." | pop 25.52, 27.54, 29.84. click ≈32.4 và 37.62. Rockstar nhỏ 31.68 im lặng | Nhieu studio su dung nhung engine co san nhu Unreal Engine, nhung Rockstar lai tu phat trien engine rieng mang ten RAGE. Cong nghe nay da duoc Rockstar su dung tu nam hai nghin khong tram linh sau va lien tuc nang cap qua GTA bon, GTA nam cho den GTA sau. |
| g3 | 8 đến 11 | 38.06 đến 52.36, 7 shot, vào bằng slide | CARD-SQ. c18 whip pan, c19 dolly in, c20 dolly in, c21 fast zoom out, c22 dolly in, c23 top-down, c24 dolly in. Logo C++ tại 41.32, giữ đến 48.46 | Ô logo C++ góc trái dưới DZ tại 41.32. Ba icon 130 px bên phải: đồng hồ đo tại 46.34 từ "năng,", thẻ nhớ "bộ nhớ" ≈47.2, chip tại 48.14 từ "cứng.". Hàng icon tắt 48.46. Không viết "RAGE dùng C++", vì nguồn không xác nhận | pop 41.32 cho C++. Ba icon im lặng | Phan loi cua nhung game engine hieu nang cao nhu vay thuong duoc viet bang C cong cong. Tai sao lai la C cong cong? Vi no cho phep lap trinh vien kiem soat rat sau hieu nang, bo nho va tai nguyen phan cung. Day la dieu cuc ky quan trong khi phai van hanh mot the gioi game khong lo. |
| m1 | 12 đến 14 | 52.36 đến 64.35, 5 shot, vào bằng cut. Chương 2 | CARD-WD cộng PANEL. c25 dolly in, c26 whip pan, c27 dolly in, c28 whip pan, c29 top-down. Logo PS5 tại 54.40 | Icon thẻ nhớ và số "2" tại 52.36. Tiêu đề "BỘ NHỚ" 104 px tại 53.78 từ "nhớ.". Ô PS5 trái PANEL tại 54.40. PANEL hai thanh đúng tỉ lệ 16 trên 212. Thanh RAM đầy 55.26 đến 56.00, nhãn "16GB" tại 55.76 từ "GB". Thanh lưu trữ đầy 58.36 đến 59.46, nhãn "tới 212GB" tại 59.46 từ "GB". Chữ "tới" giữ nghĩa "tối đa" của `fact-check.md` mục 6. Từ 61.25 hai thanh trượt ra, hiện lưới 8x4 ô thành phố. Khung "RAM" ôm 2 ô tại ≈63.2 từ "RAM" câu 14 | swoosh 52.36. pop 54.40. click 55.76 và 59.46 | Va van de dau tien chinh la bo nho. PS nam co muoi sau GB bo nho dung chung, trong khi GTA sau can toi hai tram muoi hai GB dung luong luu tru, tuy may. Tat nhien, khong the dua toan bo thanh pho vao RAM cung mot luc. |
| m2 | 15 đến 18 | 64.35 đến 86.97, 8 shot, shot dài nhất 4.96 s nhưng sơ đồ đổi bước dưới 2.5 s. Vào bằng slide | CARD-WD cộng PANEL. c30 top-down, c31 dolly in, c32 whip pan, c33 dolly in, c34 whip pan, c35 dolly in, c36 top-down, c37 dolly in | Pill "WORLD STREAMING" 62 px tại 68.66 từ "World". PANEL lưới 8x4 ô, icon xe đi trái sang phải từ ≈69.8 đến 80.87. Cột ô trước xe đổi màu nhấn tại 71.56, 73.76. Chip "SSD" 44 px nổ tại 75.94 có mũi tên tới các ô. Các ô sau xe xám đi tại 77.34 từ "thời,". Khung "RAM" trượt theo xe, giữ 2 ô. Tại 86.36 từ "loading." hiện vòng quay đứt nét ở 20% độ đục, không gạch chéo | pop 75.94 cho SSD. Không swoosh, seam slide | Vi vay, cac game the gioi mo nhu GTA sau dung mot ky thuat goi la World Streaming. Hieu don gian, khi ban lai xe den mot khu vuc moi, engine se chu dong tai nhung toa nha, con duong va tai nguyen can thiet tu SSD. Dong thoi, nhung du lieu khong con can thiet se duoc giai phong khoi bo nho. Day chinh la cach ban co the di chuyen xuyen suot mot the gioi rong lon ma it phai dung lai de cho man hinh loading. |
| l1 | 19 đến 21 | 86.97 đến 97.79, 4 shot, vào bằng cut. Chương 3 | CARD-SQ. c38 dolly in, c39 whip pan, c40 dolly in, c41 fast zoom out | Icon vòng lặp và số "3" tại 86.97. Tiêu đề "VÒNG LẶP" 104 px tại ≈88.6. Từ 94.63 vòng đứt nét 300 px trong DZ quay mỗi giây một vòng. Số "30" 120 px tại 96.90 từ "mươi". Pill "lần/giây" 62 px tại 97.18 | swoosh 86.97. click 96.90 | Nhung tai duoc thanh pho moi chi la buoc dau. Dieu khien Vice City thuc su song dong chinh la hang loat he thong hoat dong lien tuc ben trong game. Moi giay, tro choi phai cap nhat the gioi khoang ba muoi lan. |
| l2 | 22 đến 24 | 97.79 đến 112.34, 7 shot, vào bằng slide | CARD-SQ. c42 fast zoom out, c43 whip pan, c44 dolly in, c45 whip pan, c46 top-down, c47 dolly in, c48 dolly in | Ba chip 44 px có icon, hàng ở y 1340: "PHYSICS" ≈98.3, "AI" ≈102.4, "ANIMATION" ≈108.6 (từ "Còn" 108.40). Chip đang nói sáng màu nhấn, chip đã nói xám. Overlay Physics: cung đứt nét và starburst nhỏ trên c42. Overlay AI: đường chấm 3 điểm dừng vẽ từ 103.80 từ "đâu," trên c44, c45. Overlay Animation: khung xương 13 khớp trên c47, là minh họa, không phải mocap thật | pop ≈98.3, ≈102.4, ≈108.6 | He thong Physics tinh toan va cham, chuyen dong va cach chiec xe tuong tac voi mat duong. He thong AI quyet dinh nguoi di bo se di dau, tai xe phan ung the nao voi giao thong va canh sat truy duoi ban ra sao. Con Animation chiu trach nhiem khien tung nhan vat di chuyen tu nhien nhu ngoai doi. |
| l3 | 25 | 112.34 đến 119.21, 3 shot, vào bằng slide | CARD-WD cộng PANEL. c49 dolly in, c50 whip pan, c51 dolly in | PANEL: chip CPU gồm 8 lõi, lưới 2x4. Ba chip nhỏ Physics, AI, Animation bay vào các lõi từ ≈114.1. Cả 8 lõi sáng cùng lúc tại 116.42 từ "CPU", nhãn "CPU" 44 px. Pill "Multithreading" 62 px tại 118.54 | pop 116.42 | Tat ca nhung cong viec nay duoc chia thanh nhieu tac vu va xu ly song song tren CPU thong qua ky thuat Multithreading. |
| l4 | 26 đến 27 | 119.21 đến 130.32, 5 shot, vào bằng slide | CARD-SQ. c52 dolly in, c53 dolly in, c54 whip pan, c55 dolly in, c56 fast zoom out | Pill "LOD" 62 px tại 121.78 từ "Level". DZ: vòng đồng tâm, tâm là người chơi, bán kính 300 px. Vòng trong đầy chấm dày tại 122.98. Vòng trong nhấn mạnh tại 125.84 từ "cao,". Vòng ngoài chỉ còn vài chấm lớn từ ≈126.7 | pop 121.78 | Dac biet, cac game the gioi mo con dung ky thuat Level of Detail. Nghia la nguoi dung ngay truoc mat ban se duoc mo phong voi do chi tiet cao, trong khi nhung nguoi o cach do vai con pho chi can nhung phep tinh don gian hon. |
| l5 | 28 | 130.32 đến 139.06, 3 shot, vào bằng fade | CARD-WD cộng PANEL. c57 whip pan, c58 dolly in, c59 dolly in. Logo: Rockstar 131.18, PS5 cùng chip "PRO" 132.42, PS5 thường 134.14 | Ô Rockstar nhỏ góc trái trên card tại 131.18, tắt 134.00. Chip "CPU" 44 px tại 131.82. PANEL hai hàng: PS5 Pro hiện tại 132.42, chip "PRO" 62 px tại 132.92 từ "Pro". PS5 thường tại 134.14. Hai thanh CPU gần bằng nhau, thanh Pro dài hơn khoảng 4%, tại 134.86 từ "chút,". Không ghi con số, vì nguồn chỉ nói "nhỉnh hơn một chút". Pill "30 FPS" 62 px tại 137.86 từ "FPS". Mục tiêu 30 fps lấy từ Game Informer, `fact-check.md` mục 8 | pop 132.42. click 137.86. Rockstar và PS5 thường im lặng | Theo Rockstar, CPU cua PS nam Pro chi nhinh hon PS nam mot chut, nen van chua du suc chay phan mo phong phuc tap nay o muc FPS cao hon. |
| r1 | 29 đến 30 | 139.06 đến 146.48, 3 shot, vào bằng cut. Chương 4 | CARD-WD cộng PANEL. c61 dolly in, c62 whip pan, c63 top-down | Icon chip đồ họa và số "4" tại 139.06. Tiêu đề "ĐỒ HỌA" 104 px tại ≈143.1. PANEL: chip CPU trái nổ tại 139.46. Khung thu nhỏ của footage bay sang phải từ 140.92 từ "game,". Chip GPU phải nổ tại 142.60. Khung thu nhỏ chớp sáng đầy màu tại 143.48 từ "hình.". Pill "RAY TRACING" 62 px tại 145.10 từ "Ray", tia sáng xòe sau pill | swoosh 139.06. pop 142.60 và 145.10 | Sau khi CPU xu ly the gioi game, canh vat se duoc chuyen den GPU de dung hinh. Va day la luc Ray Tracing phat huy suc manh. |
| r2 | 31 đến 32 | 146.48 đến 160.37, 5 shot, vào bằng slide | CARD-WD cộng PANEL. c64 dolly in, c65 dolly in, c66 dolly in, c67 whip pan, c68 fast zoom out. Logo PS5 tại 157.72 | PANEL: khối nhà và bóng đổ vẽ sẵn, phẳng, 146.48 đến 149.22. Tại 149.94 từ "Ray": pill thu nhỏ thành chip "RT". Mặt trời trái bắn 3 tia nhấn, mỗi tia vẽ 0.43 s, chạm khối nhà rồi nảy xuống đường. Tại 154.98 từ "ướt,": đường nét đứt phản chiếu tòa nhà phủ lên đường của c66. Tại 156.70 từ "hơn,": vòng sáng mờ lan quanh các tia. Tại 157.72 ô PS5, tại 158.38 từ "Pro," chip "PRO" và nêm bóng đổ tối dưới khối nhà. Chỉ bóng đổ gắn với PRO, phản chiếu và ánh sáng lan tỏa không gắn | pop mềm 157.72. Không swoosh, seam slide | Thay vi chi su dung nhung ky thuat gia lap anh sang truyen thong, Ray Tracing mo phong cach anh sang tuong tac voi moi truong. Nho do, nhung toa nha co the phan chieu tren mat duong uot, anh sang lan toa tu nhien hon, va tren PS nam Pro, bong do cung chan thuc hon. |
| r3 | 33 đến 34 | 160.37 đến 169.22, 3 shot, vào bằng fade | CARD-WD cộng PANEL. c69 top-down, c70 top-down, c71 top-down | PANEL: thanh đo "chi phí" dọc đầy lên màu nhấn từ 160.58 đến 162.36. Từ 163.22 từ "vậy,": cân thăng bằng, đĩa trái icon ảnh, đĩa phải icon đồng hồ đo. Chip "RT" rơi vào đĩa trái tại 164.86 từ "Ray", cân nghiêng. Ba chip nhỏ rơi vào đĩa phải trong khoảng 166 đến 168, cân thăng bằng tại 168.80 từ "năng." | Không SFX riêng. Seam fade không swoosh | Tuy nhien, viec tinh toan anh sang rat ton tai nguyen. Vi vay, GTA sau ket hop Ray Tracing voi nhieu ky thuat do hoa khac de can bang giua chat luong hinh anh va hieu nang. |
| t1 | 35 đến 36 | 169.22 đến 180.68, 5 shot, vào bằng cut. Chương 5 | CARD-SQ. c72 dolly in, c73 dolly in, c74 whip pan, c75 dolly in hướng lên, c76 whip pan. Logo Maya 177.36, Houdini 177.94 | Icon nhóm người và số "5" tại 169.22. Tiêu đề "CON NGƯỜI" 104 px tại ≈173.0. Chip "Ngành game" 44 px tại 175.02 từ "game,". DZ: ô Maya rộng 300 tại 177.36, ô Houdini 184 tại 177.94, cách nhau 24. Houdini là PNG, đặt trong ô trắng có lề, không bo góc ảnh | swoosh 169.22. pop 177.36. pop mềm 177.94 | Nhung dung quen mot dieu: tat ca nhung gi ban nhin thay tren man hinh deu phai duoc tao ra boi con nguoi truoc do. Trong nganh game, cac nghe si thuong dung nhung cong cu ba D nhu Maya va Houdini de xay dung toa nha, xe co va nhan vat. |
| t2 | 37 | 180.68 đến 186.04, 2 shot, vào bằng slide | CARD-SQ. c77 dolly in, c78 dolly in. Không logo, vì lời không gọi tên công cụ | Pill "MOTION CAPTURE" 62 px tại 181.52 từ "Motion". 13 chấm marker trắng nổ trên diễn viên tại 181.90 từ "Capture". Các chấm nối thành khung xương tại 183.38 từ "động,". Là minh họa phủ lên cảnh game, không phải ảnh quay mocap | pop 181.90 | Cac dien vien su dung Motion Capture de ghi lai chuyen dong, giup nhan vat trong game hanh xu tu nhien hon. |
| t3 | 38 đến 39 | 186.04 đến 198.67, 5 shot, vào bằng slide | CARD-SQ. c79 whip pan, c80 dolly in, c81 dolly in, c82 whip pan, c83 fast zoom out. Logo Perforce tại 194.28 | Lưới 12x6 chấm hình người đầy dần từ ≈187.4 đến 188.4, không ghi con số, vì chỉ có "hàng nghìn" trong lời. Từ ≈189.6 icon lịch sử phiên bản với ba nhãn "v1", "v2", "v3" xếp chồng. Chip "Ngành game" nhỏ tại 191.68 từ "Các". Ô Perforce tại 194.28. Từ khóa "3D" 62 px cùng icon khối tại ≈197.3. Thanh dung lượng đầy tới hết tại 198.02 từ "lớn.", không ghi con số | pop 194.28 | Va voi mot du an khong lo co hang nghin nguoi cung lam viec, viec quan ly phien ban cac tai nguyen cung rat quan trong. Cac studio lon thuong dung nhung cong cu nhu Perforce de kiem soat phien ban va phoi hop tren cac tep ba D co dung luong lon. |
| e1 | 40 đến 42 | 198.67 đến 218.71, 7 shot, vào bằng cut. Scene luận điểm trung tâm | CARD-WD cộng PANEL. c84 dolly in, c85 dolly in, c86 whip pan, c87 dolly in, c88 top-down, c89 dolly in, c90 fast zoom out. Logo: chữ RAGE 203.96, Rockstar 210.80. Không dùng logo Maya, Houdini hay Perforce ở đây, để không ngầm nói Rockstar dùng chúng | Số "2" 120 px trên starburst tại 198.67. PANEL hai cột, mỗi cột rộng 410, chip 44 px. Cột trái, icon tay cầm và nhãn "CONSOLE" tại 203.18. Chip "RAGE" 203.96, "CPU" 205.16, "GPU" 205.56, "SSD" 205.80. Các chip dùng lại icon đã thấy ở g2, m2, l3, r1. Cột phải, ô Rockstar tại 210.80 từ "Rockstar:". Chip "3D" icon khối tại 211.88, "MOCAP" icon khung xương tại 212.70 từ "Motion", icon nhánh phiên bản ≈214.3. Tại 216.88 từ "kết": mũi tên từ hai cột hội tụ vào icon quả cầu, quả cầu chớp tại 218.14 từ "chỉnh." | swoosh 198.67. pop 203.96, 210.80. pop mềm 205.16, 205.56, 205.80 | Vay nen, cong nghe dang sau GTA sau thuc chat gom hai he thong lon. Mot he thong chay tren console: RAGE Engine, CPU, GPU va SSD phoi hop de tao ra the gioi ban dang choi. He thong con lai nam ben trong Rockstar: cac cong cu ba D, Motion Capture va quan ly phien ban giup vo so tai nguyen duoc tao ra va ket hop thanh mot the gioi hoan chinh. |
| e2 | 43 đến 44 | 218.71 đến 225.22, 5 shot nhanh, vào bằng cut. Payoff | CARD-SQ, và tại 223.52 card phình từ 936 ra 1080 px, tràn hai bên. c91 whip pan, c92 whip pan, c93 whip pan, c94 whip pan, c95 fast zoom out và top-down | Montage không chữ từ 218.71 đến 223.52. Punchline 104 px, hai dòng "KỲ CÔNG" và "KỸ THUẬT", chữ trắng trên pill mực, x 96 đến 900, y 1050 đến 1330, tại 224.48 từ "kỳ", cùng chớp trắng 0.10 s | Bed nhạc cắt xuống im lặng tại 223.46, ngay sau "đẹp." kết thúc 223.44, trước "Nó" 223.52. Đây là đảo chiều ngay trước payoff. risercut3 bắt đầu ≈221.3 ở mức thấp dưới giọng. Tại 224.48: thud, click và pop cùng lúc, bed quay lại mạnh nhất cả phim. swoosh 225.52 cho end card | Va do la ly do tai sao GTA sau khong chi don thuan la mot tro choi co do hoa dep. No thuc su la mot ky cong ky thuat! |
| ec | không có câu | 225.52 trở đi, hard cut | End card của theme, `BRAND_LOGO` là `assets/logos/c1-avatar.webp`, `SLOGAN` lấy từ `brand/brand.json` | Slogan giữ nguyên theo `AGENTS.md`. Không dòng CTA nào khác | swoosh 225.52 | Không có lời |

## 3. Audio queries

### Nhạc nền

Bed mặc định là `assets/audio/bgm-little-things.mp3`. Chưa đo độ dài. Nếu ngắn hơn 225.6 s thì bật `LOOP_BED = True` trong `scripts/add-sfx.py`. Hai truy vấn thay thế nếu tác giả muốn bed khác:

1. `minimal lo-fi electronic instrumental, curious calm tech explainer, soft pulse, no vocals, loopable` - tò mò, bình tĩnh, ước lượng 88 BPM. Không có drop. Bed hạ 3 dB ở e1 để chip đọc được. Im lặng từ 223.46 đến 224.48, rồi bed quay lại mạnh nhất.
2. `documentary technology background, soft synth arpeggio, light percussion, instrumental, 90 BPM` - nghiêm túc và sáng, ước lượng 90 BPM. Cùng vị trí drop và im lặng.

### Hiệu ứng, dùng file có sẵn trong `assets/audio`

Các file có thật: `sfx-pop`, `sfx-click`, `sfx-thud`, `sfx-laser`, `sfx-swoosh`, `sfx-risercut3`, `sfx-riser`. Độ dài chưa đo. Truy vấn tiếng Anh chỉ dùng nếu tác giả muốn thay file nhà bằng bản mới qua `freesound` hoặc `synth-sfx.py`.

- [0.00] Thud mở đầu -> `sfx-thud.mp3`; thay thế `deep cinematic impact thud short` (3 s)
- [0.42 đến 3.62] Riser dừng đúng chữ "hỏi" -> `sfx-risercut3.mp3`; thay thế `short tension riser abrupt stop` (3.2 s)
- [≈1.30, ≈32.4, 37.62, 55.76, 59.46, 96.90, 137.86] Số quan trọng -> `sfx-click.mp3`; thay thế `camera shutter click single` (0.25 s)
- [4.60, 20.50, 25.52, 27.54, 29.84, 41.32, 54.40, 75.94, ≈98.3, ≈102.4, ≈108.6, 116.42, 121.78, 132.42, 142.60, 145.10, 177.36, 181.90, 194.28, 203.96, 210.80] Logo hoặc chip chính xuất hiện -> `sfx-pop.mp3`; thay thế `soft ui pop bubble short` (0.7 s)
- [157.72, 177.94, 205.16, 205.56, 205.80] Chip trong chuỗi dày -> `sfx-pop.mp3` mức mềm, `G_POP_SOFT` trong `add-sfx.py`
- [18.44, 52.36, 86.97, 139.06, 169.22, 198.67, 218.71, 225.52] Hard cut -> `sfx-swoosh.mp3`; thay thế `short whoosh transition` (1.1 s)
- [≈221.3 đến 224.48] Dựng tới payoff -> `sfx-risercut3.mp3` mức thấp, đỉnh đúng chữ "kỳ"; thay thế `riser stinger rising hit` (3.2 s)
- [224.48] Payoff -> `sfx-thud.mp3` cộng `sfx-click.mp3` cộng `sfx-pop.mp3` cùng lúc; thay thế `heavy cinematic hit with sub drop` (3 s)
- `sfx-laser.mp3` và `sfx-riser.mp3` không dùng.
- Seam slide và fade không có swoosh. Kiểm tra `ledger.json` đặt đúng sau khi chạy `plan-beats.py`. Tôi chưa đọc file này.

## 4. Build notes

### 4.1 Chuyển cảnh, phụ đề, chi tiết cần canh

- Seam theo scene: vào h2 slide. Vào g1 cut. Vào g2, g3 slide. Vào m1 cut. Vào m2 slide. Vào l1 cut. Vào l2, l3, l4 slide. Vào l5 fade. Vào r1 cut. Vào r2 slide. Vào r3 fade. Vào t1 cut. Vào t2, t3 slide. Vào e1 cut. Vào e2 cut. Vào ec cut. Hard cut đều rơi vào mở chương, nên icon chương nổ ngay trên cut.
- Phụ đề mực `#1F1F1F` sáng, chưa đọc xám `#A3A3A3`, ở band top y 300. Sơ đồ và chữ nằm dưới y 500. Chip và pill trong x 72 đến 918. `#A3A3A3` đọc từ trí nhớ về theme, chưa kiểm lại trong `cleanui.md`.
- Chữ tối thiểu 44 px theo `cleanui.md`: chip 44, nhãn 62, tiêu đề chương 104. Chữ trên footage đặt trong ô trắng hoặc pill mực.
- Footage chạy `muted`. Chụp snapshot 0.2 đến 0.4 s sau mỗi cut để chắc không có chữ trailer. `footage.md` chỉ dặn tránh chữ mạng xã hội, băng tin tức và thẻ ngày, không chỉ ra cửa sổ nào có chữ. Phải soát từng clip.
- Băng tin tức ở đáy `police-chase`: c46 cắt 900x900 tại x 510, y 0, để bỏ băng đáy.
- Không có dữ liệu riêng tư trong hình. Footage là trailer chính thức. Không cần làm mờ.
- `make-media.py` kéo dài bằng `setpts` rồi `fps`, nên frame bị nhân đôi. Tỉ lệ kéo dài từ 1.45 trở lên sẽ giật: c29, c31, c33, c36, c46, c59, c64, c71, c73, c77. Cách xử lý: thêm `minterpolate`, hoặc rút film của shot, hoặc đổi cửa sổ nguồn.
- Lặp footage: catalog có khoảng 67 s hình riêng của hai trailer, kể cả 5 s logo, so với 225 s lời. Mỗi cửa sổ nguồn dùng 2 đến 5 lần. Hai lần dùng liền nhau cách nhau ít nhất 20 s phim và dùng crop khác nhau. Chưa kiểm điều kiện này cho từng cặp.

### 4.2 Bảng cue logo

Mọi logo lấy từ `assets/logos`, đặt trên ô trắng, không đổi màu, không cắt, không méo. Chưa mở file Unreal, PS5, Perforce, Maya, Houdini để xem màu. Nếu logo hóa ra trắng, đổi màu ô sang mực `#1F1F1F`, vẫn giữ nguyên file.

Cột Giây: số không dấu là giây đo trong `syl-times.json`. Dấu ≈ là suy ra.

| Logo | File | Từ và câu | Giây | Scene |
|---|---|---|---|---|
| Rockstar | `Rockstar_Games_Logo.svg` | "Rockstar" câu 2 | 4.60 | h2 |
| Unreal Engine | `Unreal_Engine_Logo.svg` | "Unreal" câu 6 | 25.52 | g2 |
| Rockstar | `Rockstar_Games_Logo.svg` | "Rockstar" câu 6 | 27.54 | g2 |
| Chữ RAGE | không có logo, là chữ | "RAGE." câu 6 | 29.84 | g2 |
| Rockstar nhỏ | `Rockstar_Games_Logo.svg` | "Rockstar" câu 7 | 31.68 | g2 |
| C++ | `cpp_logo.svg` | "C" câu 8 | 41.32 | g3 |
| PS5 | `PlayStation_5_logo_and_wordmark.svg` | "PS" câu 13 | 54.40 | m1 |
| Rockstar | `Rockstar_Games_Logo.svg` | "Rockstar," câu 28 | 131.18 | l5 |
| PS5 cộng chip PRO | `PlayStation_5_logo_and_wordmark.svg` | "PS" và "Pro" câu 28 | 132.42 và 132.92 | l5 |
| PS5 thường | `PlayStation_5_logo_and_wordmark.svg` | "PS" thứ hai câu 28 | 134.14 | l5 |
| PS5 cộng chip PRO | `PlayStation_5_logo_and_wordmark.svg` | "PS" và "Pro," câu 32 | 157.72 và 158.38 | r2 |
| Maya | `Autodesk_Maya_logo.svg` | "Maya" câu 36 | 177.36 | t1 |
| Houdini | `Houdini3D_icon.png` | "Houdini" câu 36 | 177.94 | t1 |
| Perforce | `perforce.svg` | "Perforce" câu 39 | 194.28 | t3 |
| Chữ RAGE | không có logo, là chữ | "RAGE" câu 41 | 203.96 | e1 |
| Rockstar | `Rockstar_Games_Logo.svg` | "Rockstar:" câu 42 | 210.80 | e1 |

Hai chỗ lời nói chung chung nên không gắn logo: "game engine" ở câu 8 chỉ có C++ làm ví dụ chung, và "quản lý phiên bản" ở câu 42 chỉ có icon nhánh.

Bản quyền logo: `fact-check.md` ghi C++ cho phép dùng nguyên bản. Trang branding Unreal trả 403, brand hub Autodesk cần đăng nhập, trang press SideFX chưa mở. Điều khoản dùng logo Unreal, Maya, Houdini, PlayStation, Perforce và Rockstar chưa xác minh. Người có thẩm quyền cần duyệt trước khi đăng.

### 4.3 Danh sách hình đã dựng, khớp với `scripts/make-media.py` và `parts/scenes.part`

Bảng này thay danh sách clip cũ. Mỗi hình giữ 3 đến 5 giây, riêng e2 cắt 1 đến 1,5 giây. Clip trailer chạy chậm tối đa 1,25 lần; cửa sổ ngắn hơn thì giữ khung cuối. Ảnh tĩnh lấy từ bộ ảnh chính thức, có đẩy gần hoặc lia chậm. T1 là Trailer 1, T2 là Trailer 2.

| Scene | Giây phim | Loại | Nguồn | Cửa sổ nguồn | Tốc độ |
|---|---|---|---|---|---|
| h1 | 0.00-2.68 | clip | assets/video/v-h1-1.mp4 | T1 80.2-82.9 | 1.00x |
| h2 | 2.68-6.36 | ảnh | assets/img/s111.webp | | |
| h2 | 6.36-9.72 | clip | assets/video/v-h2-2.mp4 | T1 11.0-13.7 | 1.24x |
| h2 | 9.72-13.70 | clip | assets/video/v-h2-3.mp4 | T2 18.9-22.9 | 1.00x |
| h2 | 13.70-18.50 | ảnh | assets/img/s113.webp | | |
| g1 | 18.50-23.22 | ảnh | assets/img/s121.webp | | |
| g2 | 23.22-26.98 | ảnh | assets/img/s084.webp | | |
| g2 | 26.98-30.38 | clip | assets/video/v-g2-2.mp4 | T2 14.0-17.4 | 1.00x |
| g2 | 30.38-33.76 | clip | assets/video/v-g2-3.mp4 | T2 28.0-31.4 | 1.00x |
| g2 | 33.76-38.12 | ảnh | assets/img/s086.webp | | |
| g3 | 38.12-42.18 | ảnh | assets/img/s118.webp | | |
| g3 | 42.18-46.14 | clip | assets/video/v-g3-2.mp4 | T2 42.6-45.2 | 1.25x rồi giữ khung |
| g3 | 46.14-49.22 | ảnh | assets/img/s127.webp | | |
| g3 | 49.22-52.44 | ảnh | assets/img/s091.webp | | |
| m1 | 52.44-56.30 | ảnh | assets/img/s125.webp | | |
| m1 | 56.30-60.52 | ảnh | assets/img/s008.webp | | |
| m1 | 60.52-64.38 | ảnh | assets/img/s120.webp | | |
| m2 | 64.38-68.66 | clip | assets/video/v-m2-1.mp4 | T2 38.5-41.6 | 1.25x rồi giữ khung |
| m2 | 68.66-73.20 | ảnh | assets/img/s101.webp | | |
| m2 | 73.20-77.96 | ảnh | assets/img/s087.webp | | |
| m2 | 77.96-82.26 | ảnh | assets/img/s109.webp | | |
| m2 | 82.26-87.16 | clip | assets/video/v-m2-5.mp4 | T2 34.6-38.4 | 1.25x rồi giữ khung |
| l1 | 87.16-90.64 | ảnh | assets/img/s116.webp | | |
| l1 | 90.64-94.68 | ảnh | assets/img/s092.webp | | |
| l1 | 94.68-97.90 | clip | assets/video/v-l1-3.mp4 | T1 25.2-27.4 | 1.25x rồi giữ khung |
| l2 | 97.90-100.80 | clip | assets/video/v-l2-1.mp4 | T1 70.3-72.8 | 1.16x |
| l2 | 100.80-104.48 | ảnh | assets/img/s077.webp | | |
| l2 | 104.48-108.40 | clip | assets/video/v-l2-3.mp4 | T2 45.8-49.7 | 1.00x |
| l2 | 108.40-112.42 | ảnh | assets/img/s114.webp | | |
| l3 | 112.42-116.20 | ảnh | assets/img/s123.webp | | |
| l3 | 116.20-119.28 | clip | assets/video/v-l3-2.mp4 | T2 129.5-132.5 | 1.03x |
| l4 | 119.28-123.18 | ảnh | assets/img/s050.webp | | |
| l4 | 123.18-126.70 | ảnh | assets/img/s063.webp | | |
| l4 | 126.70-130.60 | ảnh | assets/img/s115.webp | | |
| l5 | 130.60-134.66 | ảnh | assets/img/s034.webp | | |
| l5 | 134.66-139.24 | clip | assets/video/v-l5-2.mp4 | T2 52.0-56.4 | 1.04x |
| r1 | 139.24-142.60 | ảnh | assets/img/s137.webp | | |
| r1 | 142.60-146.54 | ảnh | assets/img/s132.webp | | |
| r2 | 146.54-149.94 | ảnh | assets/img/s080.webp | | |
| r2 | 149.94-153.28 | clip | assets/video/v-r2-2.mp4 | T2 153.6-155.9 | 1.25x rồi giữ khung |
| r2 | 153.28-156.70 | clip | assets/video/v-r2-3.mp4 | T2 121.0-123.0 | 1.25x rồi giữ khung |
| r2 | 156.70-160.42 | ảnh | assets/img/s104.webp | | |
| r3 | 160.42-164.36 | ảnh | assets/img/s126.webp | | |
| r3 | 164.36-169.36 | ảnh | assets/img/s097.webp | | |
| t1 | 169.36-173.36 | ảnh | assets/img/s035.webp | | |
| t1 | 173.36-177.20 | ảnh | assets/img/s134.webp | | |
| t1 | 177.20-180.76 | ảnh | assets/img/s119.webp | | |
| t2 | 180.76-183.40 | ảnh | assets/img/s055.webp | | |
| t2 | 183.40-186.20 | clip | assets/video/v-t2-2.mp4 | T2 79.5-81.0 | 1.25x rồi giữ khung |
| t3 | 186.20-190.06 | clip | assets/video/v-t3-1.mp4 | T2 92.1-96.1 | 0.97x |
| t3 | 190.06-194.10 | ảnh | assets/img/s136.webp | | |
| t3 | 194.10-198.70 | clip | assets/video/v-t3-3.mp4 | T2 134.5-138.1 | 1.25x rồi giữ khung |
| e1 | 198.70-201.80 | clip | assets/video/v-e1-1.mp4 | T1 2.8-5.0 | 1.25x rồi giữ khung |
| e1 | 201.80-205.16 | clip | assets/video/v-e1-2.mp4 | T1 19.2-21.7 | 1.25x rồi giữ khung |
| e1 | 205.16-208.96 | ảnh | assets/img/s099.webp | | |
| e1 | 208.96-212.70 | ảnh | assets/img/s030.webp | | |
| e1 | 212.70-215.70 | clip | assets/video/v-e1-5.mp4 | T2 11.6-13.7 | 1.25x rồi giữ khung |
| e1 | 215.70-218.76 | ảnh | assets/img/s103.webp | | |
| e2 | 218.76-219.80 | ảnh | assets/img/s113.webp | | |
| e2 | 219.80-220.94 | ảnh | assets/img/s116.webp | | |
| e2 | 220.94-221.98 | ảnh | assets/img/s125.webp | | |
| e2 | 221.98-223.52 | ảnh | assets/img/s137.webp | | |
| e2 | 223.52-225.52 | ảnh | assets/img/s111.webp | | |


### 4.4 Checklist media cho tác giả

Đã có trong dự án:

- Logo trong `assets/logos`: Rockstar, Unreal Engine, Maya, Houdini, PS5, C++, Perforce. Chữ RAGE là chữ.
- Footage: hai trailer chính thức trong `research/src`, và catalog `research/footage.md`.
- End card: `assets/logos/c1-avatar.webp`.

Tác giả cần quyết hoặc xác nhận:

- Xác nhận theme `cleanui` cho series Phát minh, vì `AGENTS.md` ghi `neon3d`.
- Xem lại từng cửa sổ clip ở bước 0.05 giây, để soát chữ trailer và chỉnh crop.
- Nếu muốn bớt lặp footage, thêm clip vào `research/footage.md` hoặc lấy ảnh từ trang Screenshots của Rockstar. `fact-check.md` ghi trang này có 138 ảnh.
- Icon cần có: bánh răng, thẻ nhớ, vòng lặp, chip, đồng hồ đo, cân, khối 3D, nhánh phiên bản, tay cầm, xe, mặt trời, quả cầu, nhóm người. Chưa đối chiếu với sprite của `parts/head.part`, nên chưa biết icon nào đã có.
- Không cần ghi âm thêm, giọng đã xong.

### 4.5 Giá trị đề xuất cho build

`scripts/build.py` hiện có:

- `STEPS = ["i-laptopdl", "i-code", "i-send"]`. Đề xuất đặt `STEPS = []`.
- `BRAND_LOGO = "assets/logos/c1-avatar.webp"`. Đã đúng theo `AGENTS.md`.
- `SLOGAN = "Theo dõi Góc Nhìn Mở để biết thêm nhiều điều hữu ích nhé"`. Giá trị này gõ cứng trong script. `AGENTS.md` yêu cầu lấy từ `brand/brand.json`. Tôi chưa đọc `brand/brand.json`, nên chưa biết hai chuỗi có khớp không. Cần đối chiếu.
- Không thấy `CTA_WORD` trong `build.py` khi tìm. Kiểm tra end card không in thêm dòng CTA ngoài slogan.

`SCENES` trong `scripts/plan-beats.py`: giữ nguyên 20 scene và dải câu đã có, h1 1, h2 2 đến 4, g1 5, g2 6 đến 7, g3 8 đến 11, m1 12 đến 14, m2 15 đến 18, l1 19 đến 21, l2 22 đến 24, l3 25, l4 26 đến 27, l5 28, r1 29 đến 30, r2 31 đến 32, r3 33 đến 34, t1 35 đến 36, t2 37, t3 38 đến 39, e1 40 đến 42, e2 43 đến 44.

Từ neo đầu câu cho `cues.json`. Từ đầu câu đã khớp `SCRIPT.md`. Định dạng của `cues.json` chưa kiểm, chỉ là đề xuất:

```
h2 slide câu 2 "Nhưng"; g1 cut câu 5 "Đầu"; g2 slide câu 6 "Nhiều"; g3 slide câu 8 "Phần";
m1 cut câu 12 "Và"; m2 slide câu 15 "Vì"; l1 cut câu 19 "Nhưng"; l2 slide câu 22 "Hệ";
l3 slide câu 25 "Tất"; l4 slide câu 26 "Đặc"; l5 fade câu 28 "Theo"; r1 cut câu 29 "Sau";
r2 slide câu 31 "Thay"; r3 fade câu 33 "Tuy"; t1 cut câu 35 "Nhưng"; t2 slide câu 37 "Các";
t3 slide câu 38 "Và"; e1 cut câu 40 "Vậy"; e2 cut câu 43 "Và"
```

### 4.6 Điều chưa đạt và rủi ro

- Lặp footage nhiều, như ở mục 4.1. Người xem có thể nhận ra cảnh lặp.
- Nhịp đổi hình trung bình khoảng 2.4 s mỗi shot, nhanh hơn mức 3 đến 5 s. Lý do là cửa sổ nguồn chỉ dài 1.5 đến 4 s. Không shot nào dài quá 5 s. Shot dài nhất là c31 với 4.96 s.
- Quy tắc "không khung nào đứng yên quá 3 s": mỗi shot dưới 3.5 s đều có chuyển động camera. Hai shot dài hơn 3.4 s (c31, c59, c84, c86 cũng gần ngưỡng) dựa vào sơ đồ đổi bước để giữ nhịp. Chưa kiểm bằng render.
- Maya, Houdini và Perforce chỉ có logo. Tác giả chưa cấp bản ghi giao diện nào.
- Cảnh Motion Capture, Physics, AI, Animation và LOD là sơ đồ minh họa phủ lên cảnh game, không phải kết xuất của engine hay ảnh mocap thật.
- Chưa xác minh bằng mắt: mọi in và out, crop, màu logo, độ dài bed nhạc và các file SFX, `silences.py`.
