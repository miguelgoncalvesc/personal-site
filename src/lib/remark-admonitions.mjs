import { visit } from "unist-util-visit";

// GitHub-style callouts: "> [!Note] Optional title" becomes a styled aside.
export function remarkAdmonitions() {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const first = node.children[0];
      const text = first?.type === "paragraph" ? first.children[0] : null;
      if (!text || text.type !== "text") return;
      const match = text.value.match(/^\[!(\w+)\][ \t]*([^\n]*)\n?/);
      if (!match) return;

      const kind = match[1].toLowerCase();
      const title = match[2].trim() || match[1];
      text.value = text.value.slice(match[0].length);
      if (!text.value) first.children.shift();
      if (first.children.length === 0) node.children.shift();

      node.children.unshift({
        type: "paragraph",
        data: { hProperties: { className: ["admonition-title"] } },
        children: [{ type: "text", value: title }],
      });
      node.data = { hName: "aside", hProperties: { className: ["admonition", `admonition-${kind}`] } };
    });
  };
}
