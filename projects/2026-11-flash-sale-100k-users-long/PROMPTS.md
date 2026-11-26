# Prompt đã dùng

## Ý tưởng ban đầu

Bản YouTube khoảng 11 phút của "100.000 người truy cập cùng lúc, website có sập không?". Tác giả viết sẵn kịch bản 11 chương, mỗi chương có chỉ dẫn hình ảnh: một server quá tải, CloudFront và S3, ALB trước EC2 trên hai AZ, Auto Scaling với CloudWatch, ElastiCache trước database, SQS với worker và Dead Letter Queue, load testing và Scheduled Scaling, rồi một đường sáng đi theo một đơn hàng qua toàn bộ kiến trúc.

## Các bước chính và prompt tiêu biểu

1. Dán kịch bản 11 chương kèm yêu cầu: hiện logo của mọi công cụ được nhắc tới, dùng ảnh thật có ghi nguồn, giữ chữ trên màn hình ở mức tối thiểu, độ dài 10:45 đến 11:30, theme cleanui, khung 16:9.
2. Đổi giọng đọc giữa chừng.
   > "Xin lỗi, tôi vừa quyết định lại, tôi muốn chọn giọng đọc Vieneu-TTS, giọng đọc Hải Đăng"
3. Giữ nguyên thuật ngữ tiếng Anh khi đọc.
   > "Không cần Phiên âm cho VieNeu-TTS, sử dụng thuật ngữ tiếng anh"
4. Tạo giọng trên Colab, ASR, căn thời gian, storyboard, dựng cảnh cleanui 16:9 theo từng chương, kiểm tra, render.
   > "ok rồi, không cần, chạy luôn"

## Những lần sửa quan trọng

- Giọng đọc chuyển từ Vibi sang VieNeu-TTS giọng Hải Đăng.
- Bỏ bảng phiên âm, để VieNeu-TTS đọc thuật ngữ tiếng Anh như viết.
- Logo AWS lấy từ bộ AWS Architecture Icons chính thức.

## Bài học

- Colab có thể ngắt giữa chừng khi tạo giọng dài. Tạo giọng theo từng câu hoặc từng chương, lưu cache để chạy tiếp được.
- ASR cần khớp từ 90% trở lên. Nếu model small chưa đạt thì chạy lại bằng model medium. Câu tiếng Anh ngắn như end card có thể bị ASR bỏ sót, khi đó đặt từ bằng tay theo khoảng lặng.
- Chỉ dùng logo chính thức của AWS. Không tự vẽ hay mô phỏng logo.
- Trang tải bộ icon của AWS dựng link bằng JavaScript, nên cần trình duyệt để lấy link tải.
