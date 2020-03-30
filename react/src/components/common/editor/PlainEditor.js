import React, {useRef,useEffect} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useImmer} from 'use-immer';
import {color,font} from 'styles/__utils';


/**
 * <PlainEditor 
    maxLength={5000}
    height={300}
    onBlur={(value)=>handleBlur({type:currentType,value})} 
    content={values.modal.value} 
  />
 */

const MemoState={
  editorHtml:"",
  wordCount :0
}

function MemoContainer(props){
  const [values,setValues] = useImmer(MemoState);
  const {content,onBlur,height,wordCount,maxLength} = props;
  const reactQuillRef = useRef(null);
  const MAX_LENGTH = maxLength || 5000;

  useEffect(()=>{
    if(reactQuillRef.current){
      reactQuillRef.current.editor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        let ops = []
        delta.ops.forEach(op => {
          if (op.insert && typeof op.insert === 'string') {
            ops.push({
              insert: op.insert
            })
          }
        })
        delta.ops = ops;
        return delta;
      });

      const quill = reactQuillRef.current.getEditor();
      setValues(draft=>{
        draft.editorHtml = content;
        draft.wordCount = quill.getText().trim().length;
      });
    }
  },[reactQuillRef]);

  

  const handleChange = _.throttle((html) => {
    var limit = MAX_LENGTH;
    var quill = reactQuillRef.current.getEditor();
    quill.on('text-change', function (delta, old, source) {
      if (quill.getLength() >= limit) {
        quill.deleteText(limit, quill.getLength());
      }
    });
    setValues(draft=>{
      draft.editorHtml = html;
      draft.wordCount = quill.getText().length -1;
    });
    // quill.scrollingContainer.scrollTop = 5
  },100)

  const handleBlur = ()=>{
    const rmCharactorHtml = values.editorHtml.replace(/\$&amp;/g,'');
    onBlur && onBlur({data:rmCharactorHtml});
  }


  return (
    <Styled.CaseMemo height={height}>
      <div onBlur={handleBlur}>
      <ReactQuill
          ref={reactQuillRef}
          theme="snow"
          onChange={handleChange}
          value={values.editorHtml}
          placeholder='Type Something...'
        />
      {wordCount !== false &&
      <div className="wordCount">{ values.wordCount }/ {MAX_LENGTH}</div>
      }
      </div>
    </Styled.CaseMemo>
  )
}

const Styled = {
  CaseMemo: styled.div`
  & {
    width: 100%;
    word-break:break-all;
    .jodit_container,.jodit_container .jodit_workplace{
      min-height:auto;
    }
    .jodit_workplace,.jodit_statusbar{
      border:0 !important;
    }
    .jodit_statusbar{
      background:#f7f7f7;
    }
    .jodit_wysiwyg,.ql-container.ql-snow{
      /* padding:10px; */
      border:0;
      ${({height})=> height && `height:${height}px !important`};
    }
    .ql-container.ql-snow{
      border:0;
    }
    .ql-toolbar{
      display: none
    }
    .wordCount{
      text-align:right;
      padding:5px;
      padding-right:10px;
      background:#fafafa;
      ${font(12,color.gray_text)};
    }
    .ql-editor.ql-blank::before{
      font-style:normal;
      color:#bbbbbb;
    }
    
  }
  `


// function MemoContainer(props){
//   const {onBlur, onChange, content:propContent} = props;
// 	const editor = useRef(null)
// 	const [content, setContent] = useState('')
	
// 	const config = {
//     readonly: false,
//     "toolbar": false,
//     "spellcheck": false,
//     "allowResizeY": false,
//     // "showCharsCounter": false,
//     "showWordsCounter": false,
//     "showXPathInStatusbar": false,
//     "askBeforePasteHTML": false,
//     "askBeforePasteFromWord": false,
//     "defaultActionOnPaste": "insert_clear_html",
//     "disablePlugins": "size,search,enter",
//     // "minHeight":'120px',
//     // limitWords:MAX_LENGTH,
//     limitChars:MAX_LENGTH
//     // limitHTML:MAX_LENGTH
// 	}
  

//   useEffect(()=>{
//     const rmCharactorHtml = content.replace(/\$&amp;/g,'');
//     onBlur && onBlur({data:rmCharactorHtml})
//   },[content]);

//   useEffect(()=>{
//     setContent(propContent);
//   },[propContent]);

//   return (
//   <Styled.CaseMemo >
//       <JoditEditor
//         className="editor"
//         placeHolder="Memo"
//         ref={editor}
//         value={content}
//         config={config}
//         tabIndex={1} // tabIndex of textarea
//         // onBlur={newContent => setContent(newContent)}
//         onBlur={newContent => setContent(newContent)} 
//         // onChange={newContent => setContent(newContent)}
//       />
//   </Styled.CaseMemo>
//   )
// }


}


// const Styled = {
//   PlainEditor: styled.div`
//       width: 100%;
//     .PlainEditor{
//       border:0;
//       height:300px;
//       border:1px solid red
//     }
//     .ck.ck-editor__main>.ck-editor__editable{
//       border:0;
//     }
//     .ck.ck-editor{
//       width:100%;
//     }
//     .ck.ck-editor__top.ck-reset_all{
//       display:none;
//     }
//     .ck.ck-content.ck-editor__editable.ck-editor__editable_inline,.ck-focused{
//       border:0 !important;
//       box-shadow:none;
//       ${prop=> prop.height && `height:${prop.height}px`};
//       border:1px solid red;
//     }
//   `
// }

export default MemoContainer


// import React from 'react';
// import styled from 'styled-components';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


// const editorConfiguration = {
//   toolbar: [],
//   width: '100%',
//   border:0,
// };

// function PlainEditor(props) {
//   const { content, onChange,onBlur,disabled, height } = props;
//   console.log(content,'content PlainEditor');
//   return (
//     <Styled.PlainEditor height={height}>
//       <CKEditor
//         className="PlainEditor"
//         disabled={disabled}
//         editor={ClassicEditor}
//         config={editorConfiguration}
//         data={content}

//         onChange={(event, editor) => {
//           const data = editor.getData();
//           onChange && onChange({ event, editor, data })
//         }}
//         onBlur={(event, editor) => {
//           const data = editor.getData();
//           onBlur && onBlur({ event, editor, data })
//           // console.log('Blur.', editor);
//         }}
//         onFocus={(event, editor) => {
//           // console.log('Focus.', editor);
//         }}
//       />
//     </Styled.PlainEditor>
//   );
// }

// export default PlainEditor;

