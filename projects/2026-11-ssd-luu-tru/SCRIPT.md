[tense] Một ổ SSD không có đĩa quay, vậy nó cất đoạn phim của bạn ở đâu?
[normal] Mình sẽ lần theo một đoạn phim, từ lúc bạn bấm lưu đến lúc mở lại.
[normal] Hãy tưởng tượng bạn lưu phim xong, tắt máy rồi sáng hôm sau mở phim lên.
[tense] Trong lúc máy tắt, thứ gì bên trong ổ có thể giữ lại dữ liệu của bạn?

[normal] Mở ổ SSD dùng bộ nhớ flash ra, bạn sẽ thấy các chip nằm trên bo mạch.
[normal] Những chip chứa đoạn phim là chip nhớ NAND, còn việc tìm dữ liệu do bộ điều khiển đảm nhận.
[normal] Mình nhìn sâu vào một chip NAND, nơi dữ liệu nằm trong rất nhiều ô nhớ nhỏ.
[normal] Trong kiểu ô nhớ mình đang xem, có một lớp giữ electron nằm giữa các lớp cách điện.
[calm] Lớp này có thể giữ electron sau khi tắt nguồn, nên ô nhớ vẫn giữ được trạng thái.

[normal] Quay lại khoảnh khắc bạn bấm lưu, máy tính gửi yêu cầu ghi cùng dữ liệu tới ổ.
[normal] Bộ điều khiển chọn chỗ trong chip NAND và gửi lệnh để ghi dữ liệu vào đó.
[normal] Chip dùng điện áp cao để đưa electron xuyên qua lớp cách điện vào vùng giữ điện tích.
[normal] Điện tích đó làm thay đổi mức điện áp cần thiết để dòng điện chạy qua ô nhớ.
[normal] Mức điện áp mà tại đó ô bắt đầu dẫn điện được gọi là điện áp ngưỡng.
[normal] Trong kiểu ô này, càng giữ nhiều electron thì điện áp ngưỡng càng cao, ô càng khó dẫn điện.
[tense] Nhưng lúc đọc, làm sao chip biết bên trong ô đang giữ trạng thái nào?
[normal] Chip đặt một điện áp thử lên ô nhớ và kiểm tra xem dòng điện có chạy qua không.
[normal] Nếu điện áp thử cao hơn ngưỡng của ô, dòng điện có thể chạy qua ô đó.
[normal] Nếu điện áp thử thấp hơn ngưỡng, ô không dẫn điện ở mức điện áp đó.
[normal] Với ô chỉ lưu một bit, hai kết quả này giúp chip phân biệt số không và số một.
[normal] Bạn có thể hình dung điện áp thử như một vạch nằm giữa hai vùng điện áp ngưỡng.
[normal] Nhưng một ô có thể giữ nhiều hơn một bit nếu chip phân biệt được nhiều vùng ngưỡng hơn.
[normal] Chẳng hạn, với bốn vùng ngưỡng, chip có thể gán cho mỗi vùng một cặp số khác nhau.
[normal] Có bốn cặp để gán là không không, không một, một không và một một.
[normal] Nhờ vậy, một ô nhớ có thể cất hai bit thay vì chỉ cất một bit.
[normal] Khi đọc ô đó, chip dùng các mức điện áp thử để phân biệt bốn vùng ngưỡng.
[normal] Với cùng số ô, cách chia nhiều vùng giúp tăng lượng dữ liệu mà chip có thể chứa.
[normal] Đổi lại, các vùng ngưỡng sát nhau hơn nên chip phải phân biệt những chênh lệch nhỏ hơn.
[normal] Dữ liệu phim nằm rải trên nhiều ô nhớ, nhưng lệnh đọc của NAND làm việc với cả trang.
[normal] Chip NAND thường đọc và ghi theo trang, còn nhiều trang được gom lại thành một khối.
[normal] Khi cần xóa để dùng lại chỗ đã ghi, chip xóa theo khối, không theo trang.
[tense] Vậy nếu bạn sửa một đoạn phim, ổ phải làm gì để giữ nguyên những dữ liệu bên cạnh?

[normal] Giả sử bạn cắt bớt phần đầu rồi lưu lại, và máy tính yêu cầu thay một phần dữ liệu.
[normal] Bộ điều khiển có thể ghi dữ liệu mới vào một trang trống thay vì ghi đè trang cũ.
[normal] Sau đó, nó cập nhật bảng tra để địa chỉ máy tính gửi tới trỏ sang chỗ mới.
[normal] Bạn cứ hình dung một va li đổi kệ, nhưng thẻ đánh số trên va li vẫn giữ nguyên.
[normal] Khi bạn mở lại đoạn phim, máy tính gửi địa chỉ cần đọc, chứ không chỉ định ô nhớ nào.
[normal] Bộ điều khiển tra vị trí trong chip NAND, đọc dữ liệu rồi gửi lại cho máy tính.
[normal] Nếu đọc ra một số bit sai, bộ điều khiển có thể dùng mã sửa lỗi để khôi phục chúng.
[normal] Mã này dựa vào thông tin kiểm tra được thêm khi ghi, nhưng chỉ sửa được trong giới hạn.
[normal] Còn trang chứa dữ liệu cũ không được xóa riêng ngay khi bảng tra đổi sang trang mới.
[normal] Khi cần dọn chỗ, ổ chép những trang còn dùng trong khối đó sang nơi khác.
[normal] Sau khi dữ liệu còn dùng đã được chuyển đi, ổ có thể xóa cả khối để dùng lại.
[normal] Mỗi khối chỉ chịu được một số lần ghi rồi xóa trước khi không còn hoạt động tin cậy.
[normal] Bộ điều khiển phân tán các lần ghi và xóa để tránh làm một số khối mòn quá sớm.

[tense] Vậy dữ liệu có thể đổi chỗ bên trong ổ, dù máy tính vẫn dùng địa chỉ cũ.
[normal] Nhưng để tìm lại dữ liệu, SSD không cần đợi một đĩa quay tới đúng vị trí.
[normal] Ổ cứng dùng đĩa từ thì khác, nó phải di chuyển đầu đọc trên mặt đĩa đang quay.
[normal] SSD không có những bộ phận cơ khí chuyển động như đĩa quay và đầu đọc đó.
[calm] Thay vì di chuyển đầu đọc, ổ dùng mạch điện để tìm và đọc các trạng thái trong chip.
[calm] Vậy đoạn phim của bạn nằm trong những trạng thái điện tích, được bộ điều khiển tìm lại khi cần.

# Cấu trúc
- Định dạng: Giải thích cơ chế
- Lời hứa: Theo một đoạn phim qua quá trình ghi và đọc để hiểu dữ liệu nằm ở đâu trong SSD, kể cả khi tắt nguồn.
- Câu 1-4: Gây tò mò. Đặt câu hỏi dữ liệu nằm ở đâu khi ổ không có đĩa quay và máy đã tắt.
- Câu 5-9: Hé lộ. Đi từ bo mạch qua chip NAND đến lớp giữ electron của ô nhớ.
- Câu 10-32: Cơ chế. Theo lệnh ghi đến ô nhớ, thử điện áp khi đọc, rồi mở rộng sang nhiều mức ngưỡng và tổ chức trang, khối.
- Câu 33-45: Ứng dụng thực tế. Theo lần lưu và mở lại đoạn phim qua bảng tra, sửa lỗi, dọn khối và phân bố hao mòn.
- Câu 46-51: Sự thật bất ngờ. Chỗ lưu vật lý có thể đổi mà máy tính không cần đổi địa chỉ; đối chiếu với ổ đĩa từ. Câu 51 trả lời câu hỏi mở đầu.
