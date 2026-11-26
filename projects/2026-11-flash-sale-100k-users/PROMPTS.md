# Prompt đã dùng

## Ý tưởng ban đầu

Tập mở đầu của kênh, với câu hỏi: "100.000 người truy cập cùng lúc, website có sập không?". Bối cảnh là một đợt Flash Sale lúc 12 giờ trưa. Video đi từ vấn đề một server quá tải đến kiến trúc AWS chịu được lưu lượng lớn.

## Các bước chính và prompt tiêu biểu

1. Chọn giọng đọc cho bản TikTok.
   > "Đồng ý, dùng vibi giọng đọc ..."
2. Cho agent chạy tiếp từng bước của pipeline.
   > "tiep tuc"
3. Bỏ qua phần quay màn hình CloudWatch thật, dùng hình minh họa thay thế.
   > "Bỏ qua Quay màn hình CloudWatch thật, tiep tuc"

## Những lần sửa quan trọng

- Review layout từ snapshot v1 dẫn đến quy tắc riêng cho video này: mọi thành phần nằm trong vùng x 0 đến 918 và y 288 đến 1440, khối nội dung căn quanh y 860, logo và chữ không bị che.

## Bài học

- Trên khung dọc, đặt vùng an toàn ngay từ đầu giúp giảm số lần sửa layout.
- Chỉ dùng logo chính thức của AWS. Không tự vẽ hay mô phỏng logo.
