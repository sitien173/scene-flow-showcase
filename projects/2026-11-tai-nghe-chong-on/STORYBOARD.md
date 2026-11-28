# Storyboard EP01: Tai nghe chống ồn hoạt động như thế nào?

## 1. Concept

- **Tiêu đề:** Tai nghe chống ồn hoạt động như thế nào? (Bên trong công nghệ — EP01)
- **Định dạng & Theme:** Video ngắn dọc 9:16 (1080 × 1920 px, 30 fps), theme `toon3d` (mô hình 3D low-poly/bo góc bề mặt lì `kit.toon`, viền mực đậm `kit.ink`, nền giấy sáng `palette.paper`, vùng an toàn hiển thị: `x` 120–888 px, thu hẹp còn 780 px bên dưới `y` 840 px; `y` 288–1248 px; phụ đề karaoke ở dải trên `y` 288–396 px; callout pill ở vùng `y` 471–840 px).
- **Lời hứa cốt lõi:** Hiểu vì sao phát thêm âm thanh có thể làm tiếng ồn nhỏ đi ngay gần tai bạn.
- **Góc tiếp cận Hook:** Đặt nghịch lý trực diện ngay 4 giây đầu — tai nghe không bịt kín hoàn toàn mà *phát thêm âm* để làm tiếng ồn nhỏ đi.
- **Thời lượng thực tế & Nhịp độ:** 43.60 giây audio voiceover (kết thúc lời ở 43.18 s, 189 âm tiết; end card vào ở 43.48 s), chia thành 5 nhịp lớn (`c1` Câu 1, `r1` Câu 2–3, `m1` Câu 4–8, `a1` Câu 9, `w1` Câu 10–11) và 11 vignette (mỗi câu một vignette dài 3.3–4.4 s, đổi khung hình mỗi 3–5 s, không giữ tĩnh quá 3 s).
- **Phong cách hình ảnh & 4 vai trò màu (quy ước vai trò màu cố định):**
  - Thực thể chính xuyên suốt: một chiếc tai nghe chụp tai `anc-headphone` phong cách toon3d bo góc với vỏ ngoài cắt lớp (3D cutaway) và chế độ tách lớp (exploded view) để lộ mic, chip xử lý, màng loa và đệm tai.
  - **Sóng tiếng ồn môi trường (Noise wave):** Đỏ `#DD3428` (`palette.accent`).
  - **Sóng ngược pha (Anti-phase wave):** Xanh lá `#2D884E` (`palette.good`).
  - **Tín hiệu điện (Electrical signal):** Vàng `#FCD53E` (`palette.highlight`).
  - **Sóng còn lại / vùng yên tĩnh (Residual / quiet result):** Tím nhạt `#9F88A5` (`palette.shade`, biên độ nhỏ, mờ dịu).

---

## 2. Scene table

| Scene | Câu số | Thời gian & Nhịp | Hình ảnh & Camera | Text / UI Overlay | Âm thanh & SFX | Lời thoại |
|---|---|---|---|---|---|---|
| `hook` (`c1`) | Câu 1 | 0.00–4.36 s (4.36 s)<br>Beat `ồn` (1.54 s), `phát` (2.74 s) | **3D mở màn:** Chiếc `anc-headphone` đặt chính giữa khung dưới (`y` ~ 900–1200 px) trong sân nền giấy `toon3d`. Các dải sóng đỏ `#DD3428` lao từ ngoài vào chụp tai; tới `phát` (2.74 s), củ loa lóe sáng phát ra sóng xanh `#2D884E` đẩy lùi phần lớn sóng đỏ.<br>**Camera:** `move` (`open: true`) — cần cẩu từ trên cao hạ xuống góc ¾ trước mặt tai nghe, rồi `kit.push` nhẹ vào củ tai. | Callout pill (beat `phát`, 2.74 s): `"PHÁT THÊM ÂM"` trỏ vào củ loa. | Nhạc nền `bed.mp3` (-32 dB); `pop` tại beat `phát` (2.74 s). | Làm sao tai nghe có thể làm tiếng ồn nhỏ đi bằng cách phát thêm âm thanh? |
| `cushion` (`r1`) | Câu 2 | 4.36–8.24 s (3.88 s)<br>Beat `chặn` (5.00 s), `chủ` (6.78 s) | **Exploded view:** Đệm tai `anc-headphone` tách nhẹ ra 1 đoạn để lộ lớp mút dày; sóng đỏ `#DD3428` đập vào đệm tai, một phần bị bật ngược lại (cản thụ động), phần sóng trầm vẫn xuyên qua. Tại `chủ` (6.78 s), lớp vỏ ngoài trượt mở mặt cắt 3D hé lộ mạch bên trong.<br>**Camera:** `move` (`dur: 0.8 s`) sang góc nghiêng phải cận lớp đệm, kèm `kit.drift` ngang chậm. | Callout pill (beat `chủ`, 6.78 s): `"CHỐNG ỒN CHỦ ĐỘNG"` trỏ vào khoang mạch bên trong. | `pop` tại beat `chủ` (6.78 s). | Lớp đệm có thể chặn bớt tiếng ồn, nhưng chống ồn chủ động làm theo cách khác. |
| `cabin_intro` (`r1`) | Câu 3 | 8.24–12.62 s (4.38 s)<br>Beat `máy` (9.70 s), `trong` (11.64 s) | **Chuyển bối cảnh (occlude):** Tấm tường cắt qua khung để bước vào mô hình khoang máy bay `airplane-cabin` đơn giản hóa (cửa sổ bầu dục, ghế ngồi, mô hình động cơ nhỏ ngoài cửa sổ phát tiếng ù bằng vòng sóng đỏ `#DD3428` đều đặn). Tới `trong` (11.64 s), camera lướt thẳng vào mặt cắt 3D bên trong chụp tai.<br>**Camera:** `move` (`dur: 0.9 s, occlude: true`) từ cảnh ngoài vào khoang máy bay, rồi `kit.fly` áp sát mặt cắt tai nghe. | Callout pill (beat `trong`, 11.64 s): `"BÊN TRONG TAI NGHE"` trỏ vào mặt cắt củ tai. | `pop` tại beat `trong` (11.64 s). | Mình lấy tiếng ù khi bạn ngồi trên máy bay làm ví dụ, rồi nhìn vào bên trong tai nghe. |
| `mic` (`m1` — Bước 1) | Câu 4 | 12.62–16.22 s (3.60 s)<br>Beat `thu` (13.76 s), `tín` (15.34 s) | **Cơ chế — Thu & đổi tín hiệu:** Cận cảnh `mic-module` gắn trên vỏ ngoài `anc-headphone`.<br>• **Thứ di chuyển:** Sóng âm đỏ `#DD3428` từ ngoài bay vào lỗ mic; các hạt năng lượng vàng `#FCD53E` (`kit.beads`) chạy dọc dây dẫn vào trong.<br>• **Tương tác:** Sóng đỏ làm màng mic rung nhịp theo chu kỳ, chuyển dao động thành xung điện vàng.<br>• **Kết quả:** Dòng tín hiệu điện vàng `#FCD53E` nối thẳng từ mic tới bo mạch xử lý.<br>**Camera:** `move` (`dur: 0.8 s, ease: "stop"`) dừng gọn trước lỗ mic, kèm `kit.push` nhẹ. | Callout pill (beat `tín`, 15.34 s): `"TÍN HIỆU ĐIỆN"` trỏ vào đường hạt vàng. | `pop` tại beat `tín` (15.34 s). | Đầu tiên, mic trên tai nghe thu tiếng ồn và biến nó thành tín hiệu điện. |
| `processor` (`m1` — Bước 2) | Câu 5 | 16.22–20.26 s (4.04 s)<br>Beat `bộ` (17.24 s), `tính` (17.64 s) | **Cơ chế — Xử lý & đảo pha:** Cận cảnh `anc-chip` nằm trên bo mạch trong củ tai.<br>• **Thứ di chuyển:** Chuỗi hạt tín hiệu vàng `#FCD53E` đi vào chân chip; hai dải sóng mini (đỏ vào, xanh ra) trượt qua màn hình/thanh đồ họa gắn trên chip.<br>• **Tương tác:** `anc-chip` nhấp sáng mạch theo nhịp xử lý, lật ngược pha tín hiệu (đỉnh chuyển thành đáy).<br>• **Kết quả:** Đầu ra của chip phát xung điều khiển xanh lá `#2D884E` chạy xuống cuộn dây loa.<br>**Camera:** `move` (`dur: 0.8 s`) lướt dọc dây dẫn tới góc top-down nhìn thẳng vào `anc-chip`, kèm `kit.drift`. | Callout pill (beat `bộ`, 17.24 s): `"BỘ XỬ LÝ"` trỏ vào `anc-chip`. | `click` tại beat `bộ` (17.24 s). | Từ tín hiệu đó, bộ xử lý tính xem loa cần phát âm gì để chống lại tiếng ồn. |
| `antiphase` (`m1` — Bước 3) | Câu 6 | 20.26–24.14 s (3.88 s)<br>Beat `ngược` (20.94 s), `đỉnh` (22.12 s) | **Cơ chế — Phát sóng ngược pha:** Cận cảnh màng `speaker-driver` hướng về phía tai nghe trong.<br>• **Thứ di chuyển:** Màng loa rung đẩy ra dải sóng hình sin xanh lá `#2D884E` tiến vào khoang tai; đồng thời sóng đỏ `#DD3428` xuyên qua từ phía ngoài.<br>• **Tương tác:** Hai đường sóng đặt song song để người xem thấy rõ pha đối nghịch — đỉnh sóng đỏ thẳng hàng với đáy sóng xanh.<br>• **Kết quả:** Sóng ngược pha `#2D884E` tiến sát tới vùng gần tai để chuẩn bị giao thoa.<br>**Camera:** `move` (`dur: 0.8 s, ease: "stop"`) chuyển sang mặt cắt ngang nhìn rõ cả màng loa và hai dải sóng song song. | Callout pill (beat `ngược`, 20.94 s): `"SÓNG NGƯỢC PHA"` trỏ vào dải sóng xanh; `label` nhỏ `"ĐỈNH ↔ ĐÁY"` cạnh điểm đối pha. | `pop` tại beat `ngược` (20.94 s). | Loa phát một sóng ngược pha, sao cho đỉnh của sóng này gặp đáy của sóng kia. |
| `cancel` (`m1` — Bước 4) | Câu 7 | 24.14–28.26 s (4.12 s)<br>Beat `chồng` (24.68 s), `bù` (27.10 s) | **Cơ chế — Giao thoa triệt tiêu tại tai:** Macro visualization vùng không gian giữa màng loa và mô hình `ear-model` (cửa ống tai).<br>• **Thứ di chuyển:** Dải sóng đỏ `#DD3428` và dải sóng xanh `#2D884E` trượt tiến lại gần nhau rồi chồng khít lên nhau ngay trước tai.<br>• **Tương tác:** Tại vùng chồng lấp, mỗi đỉnh dương (+) của sóng đỏ khớp vào đáy âm (−) của sóng xanh và kéo biên độ tổng về gần trục cân bằng.<br>• **Kết quả:** Hai sóng bù trừ phần lớn năng lượng cho nhau ngay tại vùng gần tai.<br>**Camera:** `move` (`dur: 0.8 s`) trượt ngang sang phải áp sát vùng trước `ear-model`, kèm `kit.push` chậm. | Callout pill (beat `bù`, 27.10 s): `"BÙ TRỪ NHAU"` trỏ vào vùng hai sóng chồng lên nhau. | `pop` tại beat `bù` (27.10 s). | Khi hai sóng chồng lên nhau gần tai bạn, phần đỉnh và phần đáy bù trừ cho nhau. |
| `quiet` (`m1` — Bước 5) | Câu 8 | 28.26–31.80 s (3.54 s)<br>Beat `yếu` (29.42 s), `ít` (30.52 s) | **Cơ chế — Kết quả sóng còn lại yếu hơn:** Vẫn tại vùng trước `ear-model`, ánh sáng chuyển sang `dusk` dịu mắt.<br>• **Thứ di chuyển:** Từ vùng giao thoa chỉ còn một gợn sóng nhỏ màu tím nhạt `#9F88A5` (biên độ giảm rõ rệt, không triệt tiêu 100%) đi nhẹ vào tai.<br>• **Tương tác:** Giao thoa triệt tiêu làm giảm biên độ tổng trước khi sóng chạm tai.<br>• **Kết quả:** Người đeo nghe ít tiếng ồn hơn hẳn.<br>**Camera:** `light` (`to: "dusk", dur: 0.6 s`) giữ khung cận vùng tai kết hợp `kit.drift` lùi nhẹ ra ngoài. | `mark` (`kind: "check"`) tại beat `ít` (30.52 s) trên sóng tím yếu + Callout pill `"SÓNG YẾU HƠN"`. | `pop` tại beat `ít` (30.52 s). | Nhờ thế, sóng còn lại yếu hơn và bạn nghe thấy ít tiếng ồn hơn. |
| `airplane` (`a1`) | Câu 9 | 31.80–35.46 s (3.66 s)<br>Beat `bật` (32.64 s), `nhỏ` (34.54 s) | **Ứng dụng thực tế:** Trở lại khoang `airplane-cabin` với ánh sáng `day`. Hình ảnh `anc-headphone` nằm cạnh cửa sổ máy bay nơi sóng đỏ `#DD3428` từ động cơ đang đập vào. Tại `bật` (32.64 s), nút gạt ANC trên vỏ tai nghe bật sáng xanh `#2D884E`, sóng tím yếu `#9F88A5` thay thế sóng đỏ bên trong chụp tai.<br>**Camera:** `move` (`dur: 0.8 s, light: "day", occlude: true`) lùi từ mặt cắt ra toàn cảnh khoang máy bay, kèm `kit.orbit` nhẹ. | Callout pill (beat `bật`, 32.64 s): `"BẬT CHỐNG ỒN"` trỏ vào công tắc ANC trên tai nghe. | `click` tại beat `bật` (32.64 s). | Trên máy bay, bật chống ồn có thể làm tiếng động cơ bạn nghe nhỏ đi. |
| `low_hum` (`w1`) | Câu 10 | 35.46–39.88 s (4.42 s)<br>Beat `trầm` (37.50 s), `máy` (39.10 s) | **So sánh dải âm (Wow fact):** Chia không gian 3D ngay phía trên `anc-headphone` thành 2 luồng sóng chạy song song: luồng sóng trầm đều chu kỳ dài (tiếng động cơ máy bay, màu đỏ `#DD3428` nhịp đều) được sóng xanh `#2D884E` khớp pha và hạ biên độ mượt mà; bên cạnh là sóng cao bất quy tắc (nhanh, gãy khúc) chỉ giảm được ít hơn.<br>**Camera:** `move` (`dur: 0.8 s`) nâng cao góc nhìn chếch ¾ để thấy rõ hai luồng sóng và `kit.drift` ngang. | `card` (beat `trầm`, 37.50 s): tiêu đề `"HIỆU QUẢ NHẤT"`, nội dung `"TIẾNG TRẦM, ĐỀU"` trỏ vào luồng sóng động cơ. | `pop` tại beat `trầm` (37.50 s). | Chống ồn chủ động thường hiệu quả nhất với tiếng trầm, đều như tiếng động cơ máy bay. |
| `paradox` (`w1` — Payoff) | Câu 11 | 39.88–43.48 s (3.60 s)<br>Beat `im` (41.46 s), `phát` (42.66 s) | **Chốt nghịch lý mở đầu (Payoff):** Camera đáp lại đúng góc ¾ trước `anc-headphone` như cảnh `hook` để tạo vòng lặp thị giác. Tại `im` (41.46 s), một dấu `X` đỏ đánh dấu lên biểu tượng loa tắt; tại `phát` (42.66 s), sóng xanh `#2D884E` bừng lên từ màng loa hòa cùng sóng đỏ tạo vùng êm tím `#9F88A5` quanh tai nghe.<br>**Camera:** `move` (`dur: 0.8 s, ease: "stop"`) đáp chắc vào chính diện ¾ tai nghe, kết thúc bằng `kit.crane` nhẹ lên cao trước khi vào end card (`43.48 s`). | `mark` (`kind: "x"`, beat `im`, 41.46 s) rồi `bigText` (beat `phát`, 42.66 s): `"PHÁT THÊM ÂM"`. | `pop` tại beat `phát` (42.66 s); `swoosh` khi chuyển sang end card ở 43.48 s. | Bạn nghe yên hơn không phải vì loa im đi, mà vì loa phát thêm âm. |

---

## 3. Audio queries

- **Nhạc nền (BGM):** Dùng sẵn file của kênh `./assets/audio/bgm-chill-zhro.mp3` (lấy từ thư mục gốc `assets/audio/bgm-chill-zhro.mp3` chép vào `assets/audio/bed.mp3` khi build Phase 4). Nhịp chill-tech ~95–105 BPM, giữ mức `-31` đến `-33 dB` dưới giọng đọc `-21.0 LUFS`; hạ nhẹ ở đoạn cao trào `quiet` (chuyển `dusk`) và cắt gọn trước end card.
  - *Query dự phòng (nếu cần tìm thêm trên Openverse/media-use):* `"chill ambient tech lo-fi electronic instrumental loop 100bpm"`
- **Hiệu ứng âm thanh (SFX):**
  - `[2.74, 6.78, 11.64, 15.34, 20.94, 27.10, 30.52, 37.50, 42.66]` Tiếng pop nhẹ khi callout hoặc điểm nhấn cơ chế xuất hiện -> `soft ui bubble pop clean short` (`sfx-pop.mp3`, khoảng cách mọi `pop` đều >= 3.0 s và cách end card >= 0.5 s).
  - `[17.24, 32.64]` Tiếng click điện tử khi bộ xử lý tính toán hoặc công tắc ANC bật -> `crisp digital switch toggle click short` (`sfx-click.mp3`).
  - `[43.48]` Tiếng swoosh khi chuyển sang end card "Góc nhìn Mở" -> `clean soft air whoosh transition short` (`sfx-swoosh.mp3`).

---

## 4. Build notes

### Ghi chú chuyển cảnh, màu sắc và camera
- **Thế giới dùng chung (`kit.world`):** Các vignette `hook`, `cushion`, `mic`, `processor`, `antiphase`, `cancel`, `quiet`, `low_hum`, `paradox` dùng chung thế giới tai nghe cutaway (`headphoneWorld`); `cabin_intro` và `airplane` dùng thế giới khoang máy bay (`cabinWorld`), nối với nhau bằng `occlude: true` để tấm tường giấy lướt che khung hình mượt mà, tránh xuyên qua vỏ máy bay.
- **Vòng lặp & Hook-Payoff:** Pose mở đầu của `hook` (sau `open` crane) và pose đáp của `paradox` đối xứng góc ¾ trước `anc-headphone` để câu kết chốt trực tiếp nghịch lý mở đầu.
- **Màu phụ đề & từ khóa (`scripts/karaoke.py`):** Giữ `look.json` mặc định của `toon3d` (`caption.lit: #18191E`, `caption.unlit: #A5A6AA`, `caption.key: #DD3428`), cập nhật `KEYS` cho EP01:
  `KEYS = ["tiếng ồn", "phát thêm âm", "lớp đệm", "chống ồn chủ động", "tín hiệu điện", "bộ xử lý", "sóng ngược pha", "bù trừ", "tiếng trầm", "yên hơn"]`
- **Lưu ý safe-zone 9:16 & khoảng vươn đường dẫn (leader line span):** Đặt chủ thể tai nghe và điểm neo `anchor` của `callout` ở nửa giữa-dưới (`y` ~ 750–1150 px) để toàn bộ `tv-pill` luôn nằm trong dải `y` 471–840 px, không đè lên dải phụ đề `y` 288–396 px và tránh vùng Action Rail của TikTok bên phải dưới `y` 840 px (`x <= 780 px`). Đường dẫn `.tv-line` nối từ mép dưới pill (`y` ~ 530–840 px) tới điểm neo trên mô hình với khoảng cách mặc định `gap = 230 px` (tổng dải vươn `y` 471–1150 px, không cắt qua dải phụ đề hay chạm vùng Action Rail).
- **Tính khoa học (theo `FACTCHECK.md`):** Khi minh họa sóng đối pha và triệt tiêu ở `antiphase`, `cancel`, `quiet`, dùng một thành phần sóng đơn sắc dễ nhìn và để lại gợn sóng tím dư `#9F88A5` (giảm phần lớn biên độ, không phẳng tuyệt đối về 0) đặt gần cửa tai `ear-model`.

### Danh sách Model (`toon3d`)
*Ghi chú: Thư mục `library/` của kênh hiện chỉ có các model `neon3d`, nên toàn bộ model dưới đây cho theme `toon3d` đều là **`new`**.*

1. `anc-headphone` — **`new`** (`object`): Tai nghe chụp tai over-ear phong cách toon3d bo góc với vỏ ngoài có thể trượt/cắt lớp (cutaway) và đệm tai tách lớp (exploded view), công tắc ANC phát sáng; các trạng thái: `closed`, `exploded-pad`, `cutaway-open`, `anc-on`. Dùng trong: `hook`, `cushion`, `cabin_intro`, `mic`, `processor`, `antiphase`, `cancel`, `quiet`, `airplane`, `low_hum`, `paradox`.
2. `mic-module` — **`new`** (`object`): Mô-đun micro thu âm nhỏ gắn trên vành ngoài chụp tai với màng rung và cổng dẫn dây tín hiệu; các trạng thái: `idle`, `vibrating`. Dùng trong: `mic`, `cushion`.
3. `anc-chip` — **`new`** (`object`): Vi mạch bộ xử lý DSP hình khối bo góc nằm trên bo mạch xanh nhạt, có đèn/vạch báo xung tín hiệu; các trạng thái: `idle`, `processing`, `inverting`. Dùng trong: `processor`, `cushion`.
4. `speaker-driver` — **`new`** (`object`): Cụm màng loa hình nón tròn đặt trong khoang tai nghe hướng về tai người nghe; các trạng thái: `idle`, `oscillating`. Dùng trong: `antiphase`, `cancel`, `hook`, `paradox`.
5. `wave-ribbon` — **`new`** (`object`): Dải sóng 3D hình sin có thể điều chỉnh pha, biên độ, màu sắc (`noise` đỏ `#DD3428`, `antiphase` xanh `#2D884E`, `residual` tím `#9F88A5`, `high-freq` bất quy tắc) và trạng thái chồng lấp triệt tiêu. Dùng trong: `hook`, `cushion`, `cabin_intro`, `antiphase`, `cancel`, `quiet`, `airplane`, `low_hum`, `paradox`.
6. `ear-model` — **`new`** (`object`): Mô hình vành tai toon3d tối giản đặt cạnh chụp tai trong cảnh cắt lớp để chỉ rõ vị trí hai sóng gặp nhau; các trạng thái: `static`, `quiet-glow`. Dùng trong: `antiphase`, `cancel`, `quiet`.
7. `airplane-cabin` — **`new`** (`object`): Khung cảnh khoang máy bay toon3d tối giản gồm vách cong, cửa sổ bầu dục, ghế hành khách và cánh/động cơ ngoài cửa sổ; các trạng thái: `engine-hum`, `anc-quiet`. Dùng trong: `cabin_intro`, `airplane`.

### Media checklist
- [x] Giọng đọc `assets/audio/voiceover.mp3` (đã có từ Phase 2, 43.60 s).
- [ ] Nhạc nền `assets/audio/bed.mp3` (sao chép từ `../../assets/audio/bgm-chill-zhro.mp3` ở Phase 4).
- [ ] SFX `sfx-pop.mp3`, `sfx-click.mp3`, `sfx-swoosh.mp3` trong `assets/audio/` (tạo/tải qua `media-use` hoặc `synth-sfx.py` ở Phase 4).
- [x] Logo & End card kênh (`brand/brand.json` -> `Góc nhìn Mở`, đã cấu hình ở kênh).

### Cấu hình gợi ý cho scripts
- **`scripts/plan-beats.py` (`SCENES`):**
  ```python
  SCENES = [
      ("c1", "CURIOSITY",   "headphone noise cancellation paradox hook",                     1, 1),
      ("r1", "REVEAL",      "earpad passive vs active noise cancellation with airplane hum", 2, 3),
      ("m1", "MECHANISM",   "mic to processor to speaker anti-phase wave cancellation",      4, 8),
      ("a1", "APPLICATION", "airplane cabin noise reduction",                                9, 9),
      ("w1", "WOW FACT",    "low steady hums vs paradox payoff",                            10, 11),
  ]
  ```
- **`scripts/build.py` (`STEPS` — dùng khi cần mốc bước bổ sung nếu `karaoke.py` hoặc ledger tham chiếu):**
  `STEPS = [(12.62, "1. Mic thu tiếng ồn"), (16.22, "2. Bộ xử lý tính sóng ngược pha"), (20.26, "3. Loa phát sóng ngược pha"), (24.14, "4. Hai sóng bù trừ gần tai")]`
