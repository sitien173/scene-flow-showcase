# scene-flow showcase

Website trưng bày video cộng đồng làm bằng [scene-flow](https://github.com/sitien173/scene-flow). Mỗi dự án có video, tóm tắt prompt, kịch bản, storyboard, feedback, bài học và mã nguồn `parts/` để người khác tham khảo. Trang chủ chia video ngang 16:9 và video dọc 9:16 thành hai mục riêng. Mỗi phần trên trang dự án có nút sao chép và tải về dạng Markdown.

Site là bản static export của Next.js, deploy lên GitHub Pages. Bài gửi đến qua pull request. Video không nằm trong git: người gửi đính kèm video vào một Release trên fork của mình, và workflow deploy chép video sang R2 sau khi merge.

## Gửi dự án

Cần có: `git`, [GitHub CLI](https://cli.github.com) đã `gh auth login`, Python 3.10 trở lên, `ffmpeg`.

1. Fork và clone repo này:

   ```sh
   gh repo fork sitien173/scene-flow-showcase --clone
   cd scene-flow-showcase
   ```

2. Đóng gói dự án đã render. Lệnh lấy bản render mới nhất trong `renders/`; chọn file khác bằng `--video`:

   ```sh
   python3 tools/share.py pack <thư-mục-dự-án> --slug <ten-video> --title "Tên video" --author "Tên bạn hoặc kênh"
   ```

   Lệnh chỉ ghi vào `projects/<ten-video>/` và thư mục tạm. Lệnh không gửi gì lên mạng. Nếu tìm thấy thứ trông giống khóa API, lệnh dừng và không ghi gì.

3. Viết `projects/<ten-video>/PROMPTS.md` và `projects/<ten-video>/LESSONS.md`. Lệnh sau in các prompt bạn đã gõ trong Claude Code cho dự án này:

   ```sh
   python3 tools/share.py prompts <thư-mục-dự-án> > /tmp/prompts.md
   ```

   Rồi nhờ agent tóm tắt, ví dụ:

   > Đọc /tmp/prompts.md và viết projects/<ten-video>/PROMPTS.md theo mẫu đang có trong file: ý tưởng ban đầu, các bước chính kèm vài prompt tiêu biểu trong khối trích dẫn, những lần sửa quan trọng và lý do. Chỉ giữ prompt của video này. Rồi đọc thêm projects/<ten-video>/FEEDBACK.md nếu có và viết projects/<ten-video>/LESSONS.md theo mẫu trong file: mỗi bài học một dòng, câu mệnh lệnh, kèm lý do. Bỏ tên người, email, đường dẫn máy, khóa API và mọi thông tin riêng tư. Xóa dòng TODO trong cả hai file.

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
| `LESSONS.md`    | bạn hoặc agent viết; mục Hiệu quả, Tránh, Gợi ý cho agent lần sau                                  | có       |
| `poster.webp`   | khung hình giây thứ 1 của bản render; đổi bằng `--poster-at`                                       | có       |
| `STORYBOARD.md` | `STORYBOARD.md`                                                                                    | không    |
| `FEEDBACK.md`   | mục "Feedback for this video" trong `CLAUDE.md`                                                    | không    |
| `source/`       | `look.json`, `meta.json`, `cues.json`, `parts/`, `vignettes/`                                      | không    |

`pack` không bao giờ chép giọng thu âm, `assets/`, `research/`, `.env`, transcript gốc hay các bản render khác. Bản build của site từ chối mọi file nằm ngoài danh sách trên.

## Duyệt bài

CI build site với bài mới, tải video từ Release, rồi kiểm tra kích thước, sha256 và codec. Người duyệt kiểm tra thêm:

- `PROMPTS.md`, `LESSONS.md` và `FEEDBACK.md` không có thông tin riêng tư.
- Video và kịch bản phù hợp để đăng công khai; người gửi có quyền với hình, nhạc và giọng đọc trong video.
- Pull request chỉ thay đổi `projects/<slug>/`.

## Bài học cho agent

Mỗi dự án có `LESSONS.md` do người gửi viết. Agent làm video sau đọc bài học ở:

- `/llms.txt`: văn bản thuần, gồm bản tổng hợp và bài học từng dự án.
- `/lessons.json`: cùng dữ liệu dạng JSON, có `slug`, `theme`, `format` để lọc.
- `/lessons/`: trang cho người đọc.
- `lessons/DIGEST.md` trong repo.

Workflow `lessons.yml` chạy khi một `LESSONS.md` được merge vào `main`, hoặc khi chạy tay. Workflow gửi mọi `LESSONS.md` đến một API tương thích OpenAI để gộp bài trùng, chia theo theme và khung hình, nêu mâu thuẫn và đề xuất cải thiện. Kết quả ghi vào `lessons/DIGEST.md` và mở pull request `bot/lessons-digest`. Người duyệt đọc lại trước khi merge, vì AI có thể viết sai. Workflow chỉ gửi nội dung đã merge công khai trong `projects/`.

## Cài đặt cho maintainer

1. Settings → Pages → Source: GitHub Actions.
2. Để phát video từ R2 thay vì từ Release, tạo bucket R2 có custom domain công khai, rồi đặt:
   - Variables: `MEDIA_HOST` là tên miền, ví dụ `media.example.com`; `R2_BUCKET` là tên bucket.
   - Secrets: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` có quyền ghi R2.

   Khi chưa có `MEDIA_HOST`, site phát video thẳng từ URL Release trên fork của người gửi. Video sẽ mất nếu người gửi xóa fork hoặc Release.
3. Để bật bản tổng hợp bài học bằng AI, đặt:
   - Variables: `LLM_BASE_URL` là gốc API tương thích OpenAI, ví dụ `https://api.openai.com/v1`; `LLM_MODEL` là tên model của nhà cung cấp đó.
   - Secret: `LLM_API_KEY`.
   - Settings → Actions → General: bật "Allow GitHub Actions to create and approve pull requests".

   Khi chưa có `LLM_MODEL`, workflow bỏ qua. Mỗi lần chạy tốn phí theo nhà cung cấp. Pull request do `GITHUB_TOKEN` mở không tự chạy CI; site vẫn build lại khi merge.

## Giấy phép

- Mã nguồn của site và `tools/`: [MIT](LICENSE).
- Nội dung trong `projects/` và video đính kèm: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Mỗi bài gửi xác nhận điều này trong pull request. Tác giả giữ bản quyền; người dùng lại phải ghi tên tác giả.
- Tài sản bên thứ ba trong video, như nhạc, font hay logo, theo giấy phép riêng của chúng.

## Phát triển

```sh
pnpm install
pnpm dev                                        # đọc projects/
PROJECTS_DIR=tests/fixtures/projects pnpm dev   # dùng dự án mẫu
LLM_BASE_URL=... LLM_MODEL=... LLM_API_KEY=... node scripts/digest-lessons.mjs   # thử bản tổng hợp
pnpm lint && pnpm test && pnpm build
```

Quy tắc của một dự án nằm trong `lib/projects.ts`: danh sách file cho phép, giới hạn dung lượng và schema của `project.json`. Danh sách file cho phép phải khớp với `SOURCE` trong `tools/share.py`.
