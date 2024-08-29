/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./editor-toolbar";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "tiptap-extension-font-size";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

const Tiptap = ({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Underline,
      FontSize,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc min-h-[200px] w-full rounded-bl-md placeholder:text-muted-foreground rounded-br-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 focus-visble:outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor?.getHTML());
    },
    onSelectionUpdate({ editor }) {
      // The selection has changed.
      console.table(editor.getAttributes("textStyles"));
    },
  });

  React.useEffect(() => {
    if (editor?.isEmpty && value !== "<p></p>") {
      editor.commands.setContent(value ?? "");
    }
  }, [value]);

  if (editor == null) {
    return null;
  }

  return (
    <div className="flex min-h-[250px] flex-col justify-stretch">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
