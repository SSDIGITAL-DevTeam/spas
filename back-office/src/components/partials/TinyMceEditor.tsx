import { JSX } from "react";
import { Editor, IAllProps } from "@tinymce/tinymce-react";

export default function TinyMceEditor(props: IAllProps): JSX.Element {
	return (
		<Editor
			init={{
				branding: false,
				min_height: 640,
			}}
			plugins={[
				"a11ychecker",
				"advlist",
				"advcode",
				"advtable",
				"autolink",
				"checklist",
				"export",
				"lists",
				"link",
				"image",
				"charmap",
				"preview",
				"anchor",
				"searchreplace",
				"visualblocks",
				"powerpaste",
				"fullscreen",
				"formatpainter",
				"insertdatetime",
				"media",
				"table",
			]}
			{...props}
		/>
	);
}
