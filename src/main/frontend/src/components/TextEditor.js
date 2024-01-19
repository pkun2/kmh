import  Editor  from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';


const TextEditor = ({setContent}) => {
    const edrtorConfiguration = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'|',
				'fontBackgroundColor',
				'fontColor',
				'fontFamily',
				'fontSize',
				'|',
				'imageUpload',
				'mediaEmbed',
				'link',
				'insertTable',
				'findAndReplace',
				'undo',
				'redo'
			]
		},
		language: 'ko',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		placeholder: '내용을 입력하세요.',
		simpleUpload: {
			uploadUrl: "http://localhost:8080/api/image/upload",
			withCredentials: true,
		},
    };

    return (
        <CKEditor 
        editor={Editor}
        config={edrtorConfiguration}
        onChange={(event, editor) => {
            setContent(editor.getData()); // 에디터 작성 내용 저장 
        }}
        />
    )
}

export default TextEditor;