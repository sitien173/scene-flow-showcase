# Prompt đã dùng

## Ý tưởng ban đầu

Tập 09 của series "Bên trong công nghệ" trên kênh Góc nhìn Mở: "Máy bơm nhiệt làm nóng nhà bằng cách nào?". Video bắt đầu bằng một câu hỏi gây tò mò, sau đó dùng animation 3D theme toon3d để đi vào bên trong công nghệ. Cấu trúc: Gây tò mò → Hé lộ → Cơ chế → Ứng dụng thực tế → Sự thật bất ngờ.

## Các bước chính và prompt tiêu biểu

1. Lập kế hoạch cho tập mới của series, theo bản kế hoạch series và tệp tiến độ.
   > "make a plan to create new chapter video"
2. Chọn độ dài tối thiểu 180 giây thay cho mục tiêu ngắn hơn trong kế hoạch series, rồi cho các tập chạy song song.
   > "Yes, I prefer use 180s instead of default series plan"
3. Chạy toàn bộ pipeline mà không dừng lại để hỏi: kịch bản, fact-check, review kịch bản, giọng VieNeu-TTS (Hải Đăng), căn thời gian bằng ASR, storyboard, dựng model và vignette, review video, caption.
   > "decide any question and run without stopping for approval"
4. Render bản cuối.
   > "render all videos, and copy it to publish folder"

## Những lần sửa quan trọng

- Kịch bản cuối có 50 câu, 939 âm tiết.
- Giọng đọc dài 211,44 giây.
- Mỗi khẳng định trong kịch bản được đối chiếu với nguồn trong FACTCHECK.md trước khi tạo giọng.
- Một số mục còn để tác giả kiểm tra bằng tai, như đồng bộ phụ đề và cách đọc thuật ngữ tiếng Anh.

## Bài học

- Tạo giọng trước rồi căn thời gian bằng ASR giúp cảnh khớp với lời đọc.
- Chạy nhiều tập song song cần ghi tiến độ và các việc còn nợ vào một tệp chung.
