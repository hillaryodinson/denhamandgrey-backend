/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Redo,
  Type,
  Underline,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditorToolbar({ editor }: { editor: Editor }) {
  if (!editor) {
    return null;
  }

  const execCmd = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
  ) => {
    e?.preventDefault();
    return editor.chain().focus();
  };

  const setHeadingLevel = (value: string) => {
    if (value !== "p") {
      type Level = 1 | 2 | 3 | 4 | 5 | 6;
      const level = Number(value) as Level;
      execCmd().unsetFontSize().run();
      return execCmd().setHeading({ level: level }).run();
    }

    return execCmd().setParagraph().run();
  };

  const setFontSize = (value: string) => {
    return execCmd().setFontSize(value).run();
  };

  return (
    <div className="flex w-full items-start justify-between gap-5 rounded-tl-md rounded-tr-md border px-3 py-2">
      <div className="flex h-[20px] w-full flex-wrap items-center justify-start gap-1 lg:w-10/12">
        <button
          onClick={(e) => execCmd(e).focus().undo().run()}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground":
              editor.isActive("undo"),
          })}
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => execCmd(e).focus().redo().run()}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground":
              editor.isActive("redo"),
          })}
        >
          <Redo className="h-4 w-4" />
        </button>
        <Separator orientation="vertical" className="mx-1 bg-slate-300" />
        <button
          onClick={(e) => execCmd(e).toggleBold().run()}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground":
              editor.isActive("bold"),
          })}
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => execCmd(e).toggleItalic().run()}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground":
              editor.isActive("italic"),
          })}
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => execCmd(e).toggleUnderline().run()}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground":
              editor.isActive("underline"),
          })}
        >
          <Underline className="h-4 w-4" />
        </button>
        <Separator orientation="vertical" className="mx-1 bg-slate-300" />

        {/* Heading */}
        <HeadingControl onChange={(val) => setHeadingLevel(val)} />
        <FontSizeControl
          onChange={(val) => setFontSize(val)}
          value={editor.getAttributes("fontSize").fontSize}
        />
        <Separator orientation="vertical" className="mx-1 bg-slate-300" />
        {/* Left Align */}
        <button
          onClick={(e) => {
            if (editor.isActive({ textAlign: "left" })) {
              execCmd(e).unsetTextAlign().run();
            } else {
              execCmd(e).setTextAlign("left").run();
            }
          }}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground": editor.isActive({
              textAlign: "left",
            }),
          })}
        >
          <AlignLeft className="h-4 w-4" />
        </button>

        {/* Center Justified */}
        <button
          onClick={(e) => {
            if (editor.isActive({ textAlign: "center" })) {
              execCmd(e).unsetTextAlign().run();
            } else {
              execCmd(e).setTextAlign("center").run();
            }
          }}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground": editor.isActive({
              textAlign: "center",
            }),
          })}
        >
          <AlignCenter className="h-4 w-4" />
        </button>

        {/* Right Justified */}
        <button
          onClick={(e) => {
            if (editor.isActive({ textAlign: "right" })) {
              execCmd(e).unsetTextAlign().run();
            } else {
              execCmd(e).setTextAlign("right").run();
            }
          }}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground": editor.isActive({
              textAlign: "right",
            }),
          })}
        >
          <AlignRight className="h-4 w-4" />
        </button>

        {/* Align Justified */}
        <button
          onClick={(e) => {
            if (editor.isActive({ textAlign: "justify" })) {
              execCmd(e).unsetTextAlign().run();
            } else {
              execCmd(e).setTextAlign("justify").run();
            }
          }}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground": editor.isActive({
              textAlign: "justify",
            }),
          })}
        >
          <AlignJustify className="h-4 w-4" />
        </button>
        <Separator orientation="vertical" className="mx-1 bg-slate-300" />
        <button
          onClick={(e) => {
            execCmd(e).toggleBulletList().run();
          }}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground":
              editor.isActive("bulletList"),
          })}
        >
          <List className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            execCmd(e).toggleOrderedList().run();
          }}
          className={cn("px-1 py-1", {
            "rounded-sm bg-muted text-muted-foreground":
              editor.isActive("orderedList"),
          })}
        >
          <ListOrdered className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default EditorToolbar;

const HeadingControl = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between gap-1">
        <Heading className="h-4 w-4" />
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[100px]">
        <DropdownMenuLabel>Headings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => onChange("p")}>
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            <span>Normal</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onChange("1")}>
          <div className="flex items-center gap-2">
            <Heading1 className="h-5 w-5" />
            <span>Heading 1</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onChange("2")}>
          <div className="flex items-center gap-2">
            <Heading2 className="h-5 w-5" />
            <span>Heading 2</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onChange("3")}>
          <div className="flex items-center gap-2">
            <Heading3 className="h-5 w-5" />
            <span>Heading 3</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeControl = ({
  value = "12pt",
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Select onValueChange={(val) => onChange(val)} defaultValue={value}>
      <SelectTrigger className="order-transparent flex h-[20px] w-[80px] items-center justify-between gap-1 rounded-sm border-none focus:border-transparent focus:ring-0 focus-visible:outline-none">
        <SelectValue placeholder={`${value}`} />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: (20 - 8) / 2 + 1 }).map((_, index) => (
          <SelectItem
            value={`${index * 2 + 8}pt`}
            key={index}
          >{`${index * 2 + 8}pt`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
