import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Autosave } from '@ckeditor/ckeditor5-autosave';
import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import {
	DataFilter,
	DataSchema,
	GeneralHtmlSupport,
	HtmlComment
} from '@ckeditor/ckeditor5-html-support';
import {
	AutoImage,
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload
} from '@ckeditor/ckeditor5-image';
import { AutoLink, Link } from '@ckeditor/ckeditor5-link';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { SpecialCharacters } from '@ckeditor/ckeditor5-special-characters';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Alignment,
		AutoImage,
		AutoLink,
		Autoformat,
		Autosave,
		BlockQuote,
		Bold,
		DataFilter,
		DataSchema,
		Essentials,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		GeneralHtmlSupport,
		Heading,
		Highlight,
		HorizontalLine,
		HtmlComment,
		HtmlEmbed,
		Image,
		ImageCaption,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Italic,
		Link,
		Mention,
		Paragraph,
		SimpleUploadAdapter,
		SpecialCharacters,
		Strikethrough,
		Underline,
		Undo
	];

	public static override defaultConfig: EditorConfig = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'alignment',
				'|',
				'specialCharacters',
				'fontColor',
				'fontBackgroundColor',
				'fontSize',
				'fontFamily',
				'highlight',
				'|',
				'imageUpload',
				'blockQuote',
				'undo',
				'redo',
				'|',
				'link',
				'htmlEmbed'
			]
		},
		language: 'ko',
		image: {
			toolbar: [
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'|',
				'toggleImageCaption',
				'imageTextAlternative'
			]
		},
		placeholder: '내용을 입력하세요.',
		simpleUpload: {
			uploadUrl: "http://localhost:8080/api/image/upload",
			withCredentials: true,
		},
	};
}

export default Editor;
