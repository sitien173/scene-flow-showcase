# Storyboard EP02: Khi bạn chạm điện thoại vào máy POS, chuyện gì xảy ra?

## 1. Concept

- **Tiêu đề:** Thanh toán chạm POS (`2026-11-thanh-toan-pos`)
- **Định dạng:** Explainer (9:16 dọc, 1080×1920, 30 fps)
- **Lời hứa cốt lõi:** Hiểu dữ liệu nào đi qua khe hở giữa điện thoại và đầu đọc POS, và kết quả thanh toán thực sự đến từ đâu.
- **Góc hook:** Đặt câu hỏi ngay tại cú chạm quen thuộc ở quầy: không cắm dây, vậy điện thoại đã gửi gì để máy báo kết quả?
- **Thời lượng & Nhịp:** Voiceover thực tế `41.96 s` (`scriptEndsAt: 41.50 s`, kết thúc cùng end card ở `~44.5 s`), 11 câu, 182 âm tiết (~4.38 âm tiết/giây thực tế). Hình ảnh đổi mỗi `3.3–4.3 s`, không khung hình nào đứng yên quá `3 s`.
- **Phong cách hình ảnh:** `toon3d` — mô hình 3D low-poly đổ bóng phẳng (flat toon shading), viền mực tối (`#1C1C20`), nền giấy ấm (`#D8D8C8`) trong khu phố ban ngày (`day`), kết hợp tách lớp cutaway (điện thoại & đầu đọc POS) và mô phỏng trường điện từ / gói dữ liệu.
- **Ba màu chủ đạo & Quy ước màu cố định (nhất quán toàn tập):**
  - **Trường điện từ:** Vàng hổ phách `#FCD53E` (`palette.highlight`) — vùng liên lạc và các vòng sóng cảm ứng quanh cuộn dây POS.
  - **Gói dữ liệu từ điện thoại (Số thay thế & Mã bảo mật):** Xanh lam sáng `#2D7FF9` — mọi gói tin xuất phát từ điện thoại sang POS và trạng thái kiểm tra mã (`MÃ HỢP LỆ`).
  - **Gói dữ liệu / Yêu cầu từ máy POS & Cửa hàng:** Cam ấm `#F08A4B` — luồng dữ liệu cửa hàng gửi đi xin duyệt.
  - **Tín hiệu kết quả (chỉ dùng ở cảnh kết quả `a1b`):** Xanh lá `#2D884E` (`palette.good`) chỉ dùng cho kết quả **chấp thuận**; Đỏ `#DD3428` (`palette.accent`) chỉ dùng cho kết quả **từ chối**. Biểu tượng không cần Internet ở `m1b` dùng quả cầu gạch chéo màu xám `#A5A6AA`.
- **Nhân vật / Thực thể chính:** Đầu đọc thẻ POS (`pos-reader`) và điện thoại thông minh (`smartphone`) đặt trên quầy thu ngân quán cà phê (`cafe-counter`), giữ nguyên thiết kế và tỉ lệ suốt 11 cảnh.

---

## 2. Scene table

| Scene | Câu số | Thời gian & Nhịp | Hình ảnh & Camera | Text / UI Overlay | Âm thanh & SFX | Lời thoại |
|---|---|---|---|---|---|---|
| **c1 / `tap`** *(Curiosity)* | 1 | `0.00–4.19 s` (4.19 s) · Beat `result` @ `2.92 s` | **Thế giới `cafe` (`day`):** Toàn cảnh quầy thu ngân quán cà phê có máy POS (`pos-reader`) và ly cà phê (`coffee-cup`). Điện thoại (`smartphone`) tiến lại gần đầu đọc; dấu hỏi nhỏ bật lên trên mặt quầy. **Camera:** `open` crane từ trên cao đáp xuống góc 3/4 nhìn vào mặt quầy (`fov 36`). | Callout: `GỬI GÌ?` (trỏ vào khe giữa điện thoại & POS @ `2.92 s`). Caption từ khóa: `điện thoại`, `đầu đọc thẻ`, `thanh toán`. | Nhạc nền chill mở đầu (`-18 dBFS`). `pop` @ `2.92 s` khi pill `GỬI GÌ?` bật lên. | Chạm điện thoại vào đầu đọc thẻ, bạn gửi gì để máy báo kết quả thanh toán? |
| **r1a / `reader`** *(Reveal)* | 2 | `4.19–7.86 s` (3.67 s) · Beat `pos` @ `6.36 s` | **Thế giới `cafe`:** Góc nhìn cận hơn vào chiếc máy POS đặt trên quầy; lớp vỏ trên của `pos-reader` tách nhẹ (exploded cutaway) để lộ cuộn dây ăng-ten đồng bên trong. **Camera:** `move` (`dur 0.80 s`, `ease: stop`) tiến sát vào đầu đọc POS. | Callout: `ĐẦU ĐỌC POS` (trỏ vào thân máy POS @ `6.36 s`). | Nhạc nền giữ nhịp đều. | Mình lần theo cú chạm đó, bắt đầu ở chiếc máy đọc thẻ ngay trên quầy. |
| **r1b / `field`** *(Reveal)* | 3 | `7.86–11.66 s` (3.80 s) · Beat `em_field` @ `8.80 s` | **Thế giới `cafe`:** Cuộn dây bên trong `pos-reader` phát sáng nhẹ, phóng ra các vòng sóng trường điện từ (`em-field`, màu `#FCD53E`) tạo thành một vùng vòm sát mặt đầu đọc. **Camera:** `move` (`dur 0.75 s`) hạ thấp xuống ngang mặt đầu đọc để thấy rõ độ dày vùng trường điện từ (`kit.drift` nhẹ). | Callout: `TRƯỜNG ĐIỆN TỪ` (trỏ vào vòng sóng `#FCD53E` @ `8.80 s`). | `pop` @ `8.80 s` khi vùng trường điện từ bung ra. | Máy đọc tạo ra một trường điện từ, như một vùng liên lạc sát đầu đọc. |
| **m1a / `nfc`** *(Mechanism)* | 4 | `11.66–15.37 s` (3.71 s) · Beat `nfc` @ `13.60 s` | **Thế giới `cafe` (Cutaway):** **Di chuyển:** `smartphone` (tách mặt lưng lộ cuộn ăng-ten) tiến vào vùng `#FCD53E`. **Tương tác:** Hai cuộn dây ghép cảm ứng, các hạt dữ liệu xanh lam (`#2D7FF9`) và cam (`#F08A4B`) chạy qua lại dọc đường dẫn `kit.beads`. **Kết quả:** Kênh liên kết NFC hình thành giữa hai máy. **Camera:** `move` (`dur 0.75 s`) cận cảnh khe hở hai cuộn dây (`orbit` chậm). | BigText: `NFC` (@ `13.60 s`, giữa khung trên vùng safe zone). | `pop` @ `13.60 s` khi chữ `NFC` và luồng hạt sáng lên. | Khi điện thoại vào vùng đó, hai máy dùng NFC để trao đổi dữ liệu. |
| **m1b / `no_net`** *(Mechanism)* | 5 | `15.37–18.75 s` (3.38 s) · Beat `no_net` @ `16.88 s` | **Thế giới `cafe`:** **Di chuyển:** Dòng hạt `#2D7FF9` tiếp tục truyền trực tiếp giữa `smartphone` và `pos-reader`. Phía trên xuất hiện biểu tượng quả cầu Internet màu xám (`#A5A6AA`). **Tương tác:** Nét gạch chéo màu xám (`#A5A6AA`) đóng lên biểu tượng quả cầu Internet. **Kết quả:** Đường truyền NFC tại chỗ vẫn thông suốt không cần mạng. **Camera:** `move` (`dur 0.70 s`) kéo nhẹ ra góc nghiêng để thấy cả kết nối trực tiếp lẫn biểu tượng quả cầu gạch chéo. | Biểu tượng quả cầu gạch chéo xám (`#A5A6AA`) (@ `16.88 s`); Callout: `KHÔNG CẦN MẠNG` (@ `16.88 s`). | `click` @ `16.88 s` khi nét gạch chéo xám đóng lên biểu tượng quả cầu. | Dữ liệu đi giữa hai máy mà không cần Internet cho đoạn kết nối này. |
| **m1c / `token`** *(Mechanism)* | 6 | `18.75–22.64 s` (3.89 s) · Beat `token` @ `20.68 s` | **Thế giới `cafe`:** **Di chuyển:** Từ chip bảo mật trong `smartphone`, một gói `data-packet` màu xanh lam (`#2D7FF9`) mang nhãn `SỐ THAY THẾ` bay qua khe NFC vào `pos-reader`, trong khi biểu tượng thẻ thật có dấu khóa nằm yên bên trong điện thoại. **Tương tác:** Chip Apple Pay thay số thẻ gốc bằng Device Account Number. **Kết quả:** Số thẻ thật không được gửi tại quầy. **Camera:** `move` (`dur 0.75 s`) hướng từ mặt sau điện thoại nhìn xuyên qua khe truyền sang POS. | Card nhỏ hoặc Callout: `APPLE PAY · SỐ THAY THẾ` (@ `20.68 s`). | `pop` @ `20.68 s` khi gói `SỐ THAY THẾ` bật ra khỏi điện thoại. | Với Apple Pay, điện thoại gửi một số thay thế, chứ không gửi số thẻ thật của bạn. |
| **m1d / `crypto`** *(Mechanism)* | 7 | `22.64–26.73 s` (4.09 s) · Beat `crypto` @ `24.16 s` | **Thế giới `cafe`:** **Di chuyển:** Gói `data-packet` thứ hai (`#2D7FF9`, gắn biểu tượng chìa khóa động) được tạo mới và nối đuôi gói số thay thế đi vào `pos-reader`. **Tương tác:** Gói mã bảo mật khớp vào khe nhận dữ liệu của giao dịch hiện tại. **Kết quả:** Đầu đọc nhận đủ cặp dữ liệu riêng cho đúng lần chạm này. **Camera:** `move` (`dur 0.75 s`) bám theo gói mã bảo mật bay vào đầu đọc (`kit.push`). | Callout: `MÃ BẢO MẬT RIÊNG` (trỏ vào gói chìa khóa `#2D7FF9` @ `24.16 s`). | `pop` @ `24.16 s` khi gói mã bảo mật được tạo và tách ra. | Nó gửi kèm một mã bảo mật riêng, được tạo cho đúng giao dịch đang diễn ra. |
| **m1e / `verify`** *(Mechanism)* | 8 | `26.73–30.02 s` (3.29 s) · Beat `check` @ `27.60 s` | **Thế giới `network` (không vẽ đường truyền yêu cầu từ quầy trước câu 9):** **Di chuyển:** Khối kiểm tra trên cụm `payment-network` (gắn nhãn `BÊN XỬ LÝ`) quét tia xanh lam (`#2D7FF9`) qua bản sao mã bảo mật. **Tương tác:** Bên xử lý đối chiếu tính hợp lệ của mã bảo mật. **Kết quả:** Mã được xác nhận hợp lệ với nhãn `MÃ HỢP LỆ` màu xanh lam/trung tính (`#2D7FF9`, chưa dùng màu xanh duyệt). **Camera:** `move` (`dur 0.75 s`, `occlude: true`) lướt qua vách ngăn sang cụm `payment-network`. | Callout: `BÊN XỬ LÝ` + Label: `MÃ HỢP LỆ` (`#2D7FF9`, @ `27.60 s`). | `pop` @ `27.60 s` khi nhãn `MÃ HỢP LỆ` bật sáng. | Bên xử lý có thể kiểm tra mã đó trước khi giao dịch được chấp thuận. |
| **a1a / `coffee`** *(Application)* | 9 | `30.02–33.97 s` (3.95 s) · Beat `send` @ `31.70 s` | **Thế giới `cafe` + `network`:** Quay lại toàn cảnh quầy cà phê (`coffee-cup` nổi bật bên cạnh `pos-reader`). Cửa hàng đóng gói yêu cầu thanh toán màu cam (`#F08A4B`) từ `pos-reader` bắn dọc đường truyền mũi tên hướng về `payment-network` (`BÊN XỬ LÝ`). **Camera:** `move` (`dur 0.80 s`) kéo rộng ra thấy cả quầy cà phê lẫn đường truyền hướng về `payment-network`. | Callout: `XIN DUYỆT GIAO DỊCH` (trỏ vào gói cam `#F08A4B` @ `31.70 s`). | `laser` @ `31.70 s` khi gói yêu cầu cam phóng đi xin duyệt. | Khi bạn trả tiền cà phê, cửa hàng chuyển dữ liệu vừa nhận đi xin duyệt khoản tiền. |
| **a1b / `result`** *(Application)* | 10 | `33.97–38.22 s` (4.25 s) · Beat `decision` @ `34.40 s` | **Thế giới `cafe`:** Tín hiệu kết quả từ `payment-network` quay ngược về `pos-reader`: màn hình POS nháy xanh (`#2D884E`) kèm dấu `check` cho chấp thuận, đồng thời hiện thoáng biểu tượng `x` đỏ (`#DD3428`) cho từ chối để minh họa 2 khả năng từ hệ thống. **Camera:** `move` (`dur 0.75 s`, `ease: stop`) đáp thẳng vào màn hình máy POS trên quầy. | Card: `KẾT QUẢ TỪ HỆ THỐNG` / `CHẤP THUẬN · TỪ CHỐI` (@ `34.40 s`). | `pop` @ `34.40 s` khi tín hiệu kết quả bật trên màn hình POS. | Kết quả chấp thuận hay từ chối quay về cửa hàng, chứ không do cú chạm quyết định. |
| **w1 / `gap`** *(Wow Fact)* | 11 | `38.22–41.80 s` (3.58 s + end card) · Beat `two_cm` @ `40.84 s` | **Thế giới `cafe`:** Cận cảnh ngang (macro side-view) khe hở không khí giữa `smartphone` và `pos-reader`, vòng trường điện từ `#FCD53E` vẫn nối liền hai máy dù chưa chạm sát. Thanh thước đo minh họa `≤ 2 CM` (tầm điển hình NFC Forum, không ghi là tầm bảo đảm). **Camera:** `move` (`dur 0.70 s`) hạ xuống góc ngang macro nhìn thẳng vào khe hở. | BigText: `≤ 2 CM` (@ `40.84 s`). | `pop` @ `40.84 s` khi số `≤ 2 CM` bật lên. Tiếp nối bằng `swoosh` vào end card (`41.80 s`). | Gọi là chạm, nhưng NFC thường nối được qua khe hở tới hai xen ti mét. |

---

## 3. Audio queries

- **Nhạc nền (BGM):** Đã có sẵn theo `AGENTS.md`: `./assets/audio/bgm-chill-zhro.mp3` (lofi/chill tech beat ~95–105 BPM, giữ mức nền `-18 dBFS` dưới giọng đọc VieNeu-TTS Hải Đăng; hạ nhẹ `-2 dB` ở đoạn câu 10–11 để câu chốt `≤ 2 CM` nổi bật).
- **Hiệu ứng âm thanh (SFX):** Dùng bộ cue chuẩn của `toon3d` (`pop`, `click`, `laser`, `swoosh` trong `scripts/add-sfx.py`, tuân thủ giãn cách `POP_GAP >= 3.0 s` và cách end card `>= 0.5 s`):
  - `[2.92 s]` Tiếng pop nhẹ khi pill `GỬI GÌ?` xuất hiện -> `pop` (0.3 s)
  - `[8.80 s]` Tiếng pop khi vùng trường điện từ bung ra quanh đầu đọc -> `pop` (0.3 s)
  - `[13.60 s]` Tiếng pop khi chữ `NFC` và luồng hạt sáng lên -> `pop` (0.3 s)
  - `[16.88 s]` Tiếng click dứt khoát khi nét gạch chéo xám đóng lên biểu tượng quả cầu Internet -> `click` (0.25 s)
  - `[20.68 s]` Tiếng pop khi gói số thay thế tách ra từ điện thoại -> `pop` (0.3 s)
  - `[24.16 s]` Tiếng pop khi gói mã bảo mật riêng được tạo -> `pop` (0.3 s)
  - `[27.60 s]` Tiếng pop khi nhãn `MÃ HỢP LỆ` bật sáng ở `m1e / verify` (beat `check`) -> `pop` (0.3 s)
  - `[31.70 s]` Tiếng laser ngắn khi cửa hàng gửi gói yêu cầu xin duyệt đi -> `laser` (0.4 s)
  - `[34.40 s]` Tiếng pop khi màn hình POS nhận tín hiệu kết quả -> `pop` (0.3 s)
  - `[40.84 s]` Tiếng pop cho con số chốt `≤ 2 CM` -> `pop` (0.3 s)
  - `[41.80 s]` Tiếng swoosh chuyển sang end card "Góc nhìn Mở" -> `swoosh` (0.4 s, tự động bởi `build.py`)

---

## 4. Build notes

- **Chuyển cảnh & Nhịp độ:** Toàn bộ 11 cảnh dùng `move` trong cùng một hệ tọa độ khu phố `cafe` (`world("cafe", cafeWorld)`), riêng `m1e / verify` dùng `occlude: true` để lướt qua vách ngăn sang cụm máy chủ `payment-network` rồi quay lại quầy ở `a1a / coffee`. Không dùng `cut` cứng giữa các câu để tránh lỗi `cut outside silence` do nhịp đọc Hải Đăng rất liền mạch (`41.96 s`).
- **Màu phụ đề & Keywords (`scripts/karaoke.py`):** Cập nhật `KEYS` thành:
  `["NFC", "trường điện từ", "Apple Pay", "số thay thế", "mã bảo mật", "Internet", "chấp thuận", "hai xen ti mét"]`.
- **Chi tiết kỹ thuật cần lưu ý:**
  - Giữ toàn bộ text (`GỬI GÌ?`, `NFC`, `≤ 2 CM`, Card kết quả) và vùng hero trong safe zone 9:16 (`x: 120–888`, thu hẹp `x <= 780` dưới `y: 840`; `y: 288–1248`), tránh đè lên thanh phụ đề ở `y: 288–396`.
  - Mọi animation trong `update(t)` phải thuần hàm của `t`, không dùng `Math.random()` hay `Date.now()`; dùng `kit.beads` cho đường truyền dữ liệu `#2D7FF9` / `#F08A4B` và `kit.ink()` một lần cho mỗi model.
  - Nội dung bảo mật (câu 6–8) chỉ minh họa cho **Apple Pay**; câu 11 chỉ ghi `≤ 2 CM` là tầm hoạt động điển hình theo NFC Forum, không khẳng định bảo đảm.

### Danh sách Model (kiểm tra `library/toon3d/` trống -> tất cả `new` theo D6)

| Model (kebab-case) | Trạng thái | Loại | Mô tả ngắn & Poses/States | Cảnh sử dụng |
|---|---|---|---|---|
| `cafe-counter` | `new` | `object` (shared world) | Quầy thu ngân quán cà phê toon3d trên nền sân giấy (`kit.stage`), gồm mặt quầy, vách sau và đường dẫn tới trạm xử lý. | Tất cả cảnh (`tap` -> `gap`) |
| `pos-reader` | `new` | `object` | Đầu đọc thẻ POS không tiếp xúc; states: nguyên khối, tách nắp cutaway lộ cuộn ăng-ten, màn hình báo xanh `#2D884E` / đỏ `#DD3428`. | `tap`, `reader`, `field`, `nfc`, `no_net`, `token`, `crypto`, `coffee`, `result`, `gap` |
| `smartphone` | `new` | `object` | Điện thoại thông minh tối giản; states: màn hình Apple Pay, tách mặt lưng cutaway lộ cuộn NFC và chip bảo mật. | `tap`, `nfc`, `no_net`, `token`, `crypto`, `gap` |
| `em-field` | `new` | `object` | Các vòng sóng trường điện từ đồng tâm màu `#FCD53E` quanh đầu đọc POS, co giãn theo `t`. | `field`, `nfc`, `no_net`, `token`, `crypto`, `gap` |
| `data-packet` | `new` | `object` | Khối gói dữ liệu 3D bo góc với màu cố định theo vai trò (`#2D7FF9` từ điện thoại: số thay thế / chìa khóa mã bảo mật; `#F08A4B` yêu cầu từ POS; `#2D884E` kết quả). | `token`, `crypto`, `verify`, `coffee`, `result` |
| `payment-network` | `new` | `object` | Cụm máy chủ / trạm xử lý thanh toán toon3d có đèn quét kiểm tra và biển báo trạng thái duyệt. | `verify`, `coffee`, `result` |
| `coffee-cup` | `new` | `object` | Ly cà phê mang đi có nắp và ống hút đặt trên quầy. | `tap`, `reader`, `coffee`, `result` |

### Media checklist
- Nhạc nền: `./assets/audio/bgm-chill-zhro.mp3` (đã có trong repo, copy vào `assets/audio/` ở Phase 4).
- Logo thương hiệu: `brand/logos/c1-avatar.webp` theo `brand/brand.json` (dùng cho watermark & end card).
- Toàn bộ hình ảnh 3D dùng procedural toon3d (`Three.js` + `kit`), không cần ảnh stock hay AI-generated image.

### Gợi ý cấu hình `scripts/build.py` & `scripts/plan-beats.py`
- `scripts/plan-beats.py`: **KHÔNG chạy lại** (theo quy tắc Phase 3, giữ nguyên `beats.json` đã căn tay 5 macro scenes `c1`, `r1`, `m1`, `a1`, `w1`).
- `scripts/build.py`: `STEPS` dùng cấu hình `toon3d` chuẩn đọc từ `vignettes.json` (11 vignettes, `light: "day"`).
