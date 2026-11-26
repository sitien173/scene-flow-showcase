# scene-flow showcase

Website trưng bày video cộng đồng làm bằng [scene-flow](https://github.com/sitien173/scene-flow). Mỗi dự án có video, tóm tắt prompt, kịch bản, storyboard, feedback và mã nguồn `parts/` để người khác tham khảo.

Site là bản static export của Next.js, deploy lên GitHub Pages. Bài gửi đến qua pull request. Video không nằm trong git: người gửi đính kèm video vào một Release trên fork của mình, và workflow deploy chép video sang R2 sau khi merge.

## Gửi dự án

Cần có: `git`, [GitHub CLI](https://cli.github.com) đã `gh auth login`, Python 3.10 trở lên, `ffmpeg`.

1. Fork và clone repo này:

   ```sh
   gh repo fork <owner>/scene-flow-showcase --clone
   cd scene-flow-showcase
   ```

2. Đóng gói dự án đã render. Lệnh lấy bản render mới nhất trong `renders/`; chọn file khác bằng `--video`:

   ```sh
   python3 tools/share.py pack <thư-mục-dự-án> --slug <ten-video> --title "Tên video" --author "Tên bạn hoặc kênh"
   ```

   Lệnh chỉ ghi vào `projects/<ten-video>/` và thư mục tạm. Lệnh không gửi gì lên mạng. Nếu tìm thấy thứ trông giống khóa API, lệnh dừng và không ghi gì.

3. Viết `projects/<ten-video>/PROMPTS.md`. Lệnh sau in các prompt bạn đã gõ trong Claude Code cho dự án này:

   ```sh
   python3 tools/share.py prompts <thư-mục-dự-án> > /tmp/prompts.md
   ```

   Rồi nhờ agent tóm tắt, ví dụ:

   > Đọc /tmp/prompts.md và viết projects/<ten-video>/PROMPTS.md theo mẫu đang có trong file: ý tưởng ban đầu, các bước chính kèm vài prompt tiêu biểu trong khối trích dẫn, những lần sửa quan trọng và lý do, bài học. Chỉ giữ prompt của video này. Bỏ tên người, email, đường dẫn máy, khóa API và mọi thông tin riêng tư. Xóa dòng TODO.

4. Đọc lại mọi file trong `projects/<ten-video>/`. Các dòng `check:` mà lệnh `pack` in ra chỉ ra email hoặc đường dẫn máy cần xem lại. Muốn xem trước trang web thì chạy `pnpm install && pnpm dev`.

5. Gửi:

   ```sh
   python3 tools/share.py submit <ten-video>
   ```

   Lệnh hỏi xác nhận rồi mới tạo Release chứa video trên fork của bạn, đẩy nhánh `share/<ten-video>` và mở pull request.

## Những gì được chia sẻ

| File trên site  | Lấy từ dự án                                                                                       | Bắt buộc |
| --------------- | -------------------------------------------------------------------------------------------------- | -------- |
| `project.json`  | `meta.json` cho theme, bản render cho định dạng và thời lượng, tham số của `pack` cho phần còn lại | có       |
| `SCRIPT.md`     | `SCRIPT.md`                                                                                        | có       |
| `PROMPTS.md`    | bạn hoặc agent viết                                                                                | có       |
| `poster.webp`   | khung hình giây thứ 1 của bản render; đổi bằng `--poster-at`                                       | có       |
| `STORYBOARD.md` | `STORYBOARD.md`                                                                                    | không    |
| `FEEDBACK.md`   | mục "Feedback for this video" trong `CLAUDE.md`                                                    | không    |
| `source/`       | `look.json`, `meta.json`, `cues.json`, `parts/`, `vignettes/`                                      | không    |

`pack` không bao giờ chép giọng thu âm, `assets/`, `research/`, `.env`, transcript gốc hay các bản render khác. Bản build của site từ chối mọi file nằm ngoài danh sách trên.

## Duyệt bài

CI build site với bài mới, tải video từ Release, rồi kiểm tra kích thước, sha256 và codec. Người duyệt kiểm tra thêm:

- `PROMPTS.md` và `FEEDBACK.md` không có thông tin riêng tư.
- Video và kịch bản phù hợp để đăng công khai; người gửi có quyền với hình, nhạc và giọng đọc trong video.
- Pull request chỉ thay đổi `projects/<slug>/`.

## Cài đặt cho maintainer

1. Settings → Pages → Source: GitHub Actions.
2. Để phát video từ R2 thay vì từ Release, tạo bucket R2 có custom domain công khai, rồi đặt:
   - Variables: `MEDIA_HOST` là tên miền, ví dụ `media.example.com`; `R2_BUCKET` là tên bucket.
   - Secrets: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` có quyền ghi R2.

   Khi chưa có `MEDIA_HOST`, site phát video thẳng từ URL Release trên fork của người gửi. Video sẽ mất nếu người gửi xóa fork hoặc Release.

## Phát triển

```sh
pnpm install
pnpm dev                                        # đọc projects/
PROJECTS_DIR=tests/fixtures/projects pnpm dev   # dùng dự án mẫu
pnpm lint && pnpm test && pnpm build
```

Quy tắc của một dự án nằm trong `lib/projects.ts`: danh sách file cho phép, giới hạn dung lượng và schema của `project.json`. Danh sách file cho phép phải khớp với `SOURCE` trong `tools/share.py`.
