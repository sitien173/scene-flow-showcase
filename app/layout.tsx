import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "scene-flow showcase",
    template: "%s · scene-flow showcase",
  },
  description:
    "Video cộng đồng làm bằng scene-flow, kèm prompt, kịch bản, storyboard và mã nguồn để tham khảo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
            <Link href="/" className="font-semibold tracking-tight">
              scene-flow showcase
            </Link>
            {process.env.REPO_URL && (
              <a
                href={`${process.env.REPO_URL}#gửi-dự-án`}
                className="text-sm text-dim hover:text-ink"
              >
                Gửi dự án
              </a>
            )}
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">{children}</main>
      </body>
    </html>
  );
}
