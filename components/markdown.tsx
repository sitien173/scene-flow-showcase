import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Raw HTML in the markdown is escaped, because no rehype-raw plugin is loaded.
export function Markdown({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
