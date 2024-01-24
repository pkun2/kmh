import  Editor  from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '../pages/write/ckeditor.css';

const TextEditor = ({setContent}) => {
    const edrtorConfiguration = {
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