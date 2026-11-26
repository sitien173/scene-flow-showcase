# Prompt đã dùng

## Ý tưởng ban đầu

Video về công nghệ đằng sau GTA 6: game engine RAGE của Rockstar, các công cụ mà ngành game thường dùng, và cách tạo ra một thế giới mở lớn và sống động.

## Các bước chính và prompt tiêu biểu

1. Rút gọn kịch bản và tạo lại giọng để vừa giới hạn YouTube Shorts.
   > "Viết lại kịch bản 2026-11-gta6-cong-nghe và tạo lại giọng để phù hợp với youtube shorts, maximum length for a YouTube Short is 3 minutes (180 seconds)"
2. Chạy tiếp pipeline với giọng mới: ASR, căn thời gian, dời các mốc thời gian cũ sang giọng mới, bỏ các cảnh và hình đã cắt, dựng lại.
   > "tiếp"
3. Đổi logo thương hiệu sang logo chính thức của kênh.
   > "Giúp tôi đổi logo brand trong dự án 2026-11-gta6-cong-nghe"
4. Tìm nhạc nền trên Freesound thay cho nhạc có sẵn của plugin, rồi chọn một bản.
   > "Sử dụng freesound, có nhạc nền nào phù hợp mà có thể sử dụng không, tôi không muốn sử dụng nhạc nền của plugin"

## Những lần sửa quan trọng

- Kịch bản rút từ khoảng 3:35 xuống 43 câu, giọng dài 150,3 giây, dưới giới hạn 180 giây của Shorts.
- Kịch bản có các chỉnh sửa nhỏ sau fact-check. Maya, Houdini và Perforce được giới thiệu là công cụ phổ biến trong ngành game, vì không có nguồn nào gắn chúng trực tiếp với GTA 6.
- Bỏ câu kêu gọi follow ở cuối.
- Mỗi công cụ được nhắc tới đều hiện logo gốc. RAGE không có logo chính thức nên hiện bằng chữ.
- Bỏ bảng phiên âm, để VieNeu-TTS đọc thuật ngữ tiếng Anh như viết.

## Bài học

- Khi rút ngắn giọng, dời mốc thời gian bằng cách khớp âm tiết trong từng nhóm câu sẽ an toàn hơn khớp trên toàn bộ chuỗi.
- Sau khi dời mốc thời gian, cần kiểm tra lại các hình bị rút còn quá ngắn hoặc bằng không.
