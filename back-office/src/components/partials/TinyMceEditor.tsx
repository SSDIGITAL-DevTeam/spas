import { JSX } from "react";
import { Editor, IAllProps } from "@tinymce/tinymce-react";

export default function TinyMceEditor(props: IAllProps): JSX.Element {
  return (
    <Editor
      apiKey={"hm18uevth18hvt5w813bfoup4hmy5wlosl1swwdtfjyb5g4u"}
      init={{
        branding: false,
        min_height: 640,
      }}
      plugins={[
        "advlist",
        "autolink",
        "lists",
        "link",
        "image",
        "charmap",
        "preview",
        "anchor",
        "searchreplace",
        "visualblocks",
        "fullscreen",
        "insertdatetime",
        "media",
        "table",
      ]}
      {...props}
    />
  );
}
