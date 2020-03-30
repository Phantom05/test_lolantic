import React  from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import 'react-quill/dist/quill.snow.css';
import {color,font} from 'styles/__utils';
import {PlainEditor} from 'components/common/editor';

function MemoContainer(props){
  return (
    <Styled.CaseMemo>
      <PlainEditor
        {...props}
      />
    </Styled.CaseMemo>
  )
}

export default MemoContainer;

const Styled = {
  CaseMemo: styled.div`
  & {
    width: 100%;
    word-break:break-all;
    border:1px solid #ececec;
    .jodit_container,.jodit_container .jodit_workplace{
      min-height:auto;
    }
    .jodit_workplace,.jodit_statusbar{
      border:0 !important;
    }
    .jodit_statusbar{
      background:#f5f5f5;
    }
    .public-DraftEditor-content{
      padding:10px;
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
  }
  `
}


// class MemoContainer extends React.Component {
//   constructor(props) {
//     super(props)
//     this.handleChange = this.handleChange.bind(this)
//     this.quillRef = null;      // Quill instance
//     this.reactQuillRef = null;
//     this.state = { editorHtml: '' };
//   }
//   componentDidMount() {
//     this.attachQuillRefs();
//     this.setState({
//       editorHtml:this.props.content
//     })
//   }
//   componentDidUpdate() {
//     this.attachQuillRefs()
//   }

//   attachQuillRefs = () => {
//     if (typeof this.reactQuillRef.getEditor !== 'function') return;
//     this.quillRef = this.reactQuillRef.getEditor();
//   }
//   handleChange(html) {
//     var limit = MAX_LENGTH;
//     var quill = this.quillRef;
//     quill.on('text-change', function (delta, old, source) {
//       if (quill.getLength() > limit) {
//         quill.deleteText(limit, quill.getLength());
//       }
//     });
//     this.setState({ editorHtml: html });
//     const rmCharactorHtml = html.replace(/\$&amp;/g,'');
//     this.props.onChange({data:rmCharactorHtml});
//   }

  
//   handleBlur(state){
//     console.log(state);
//     console.log(this.props);
//     const rmCharactorHtml = state.replace(/\$&amp;/g,'');
//     this.props.onChange({data:rmCharactorHtml});
//   }
//   render() {
//     return <Styled.CaseMemo>
//      <ReactQuill
//         ref={(el) => { this.reactQuillRef = el }}
//         theme="snow"
//         onChange={_.throttle(this.handleChange,500)}
//         onBlur={()=>this.handleBlur(this.state.editorHtml)}
//         value={this.state.editorHtml}
//       />
//     </Styled.CaseMemo>
//   }
// }


// NOTE: jodit editor
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
//     // "disablePlugins": "size,search,enter",
//     // "minHeight":'120px',
//     // placeholder: 'Memo..',
//     limitChars:MAX_LENGTH
// 	}
  

//   useEffect(()=>{
//     const rmCharactorHtml = content.replace(/\$&amp;/g,'');
//     onBlur && onBlur({data:rmCharactorHtml})
//   },[content]);

//   useEffect(()=>{
//     setContent(propContent);
//   },[propContent]);


//   console.log(content);
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
//         onChange={false}
//       />
//   </Styled.CaseMemo>
//   )
// }





// NOTE: Draft-js
// const CaseMemoState={
//   editorState: EditorState.createEmpty()
// }
// function MemoContainer(props){
//   const {content,onChange,onBlur} = props;
//   const [values,setValues] = useImmer(CaseMemoState);

//   const _getLengthOfSelectedText = () => {
//     const currentSelection = values.editorState.getSelection();
//     const isCollapsed = currentSelection.isCollapsed();

//     let length = 0;

//     if (!isCollapsed) {
//       const currentContent = values.editorState.getCurrentContent();
//       const startKey = currentSelection.getStartKey();
//       const endKey = currentSelection.getEndKey();
//       const startBlock = currentContent.getBlockForKey(startKey);
//       const isStartAndEndBlockAreTheSame = startKey === endKey;
//       const startBlockTextLength = startBlock.getLength();
//       const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
//       const endSelectedTextLength = currentSelection.getEndOffset();
//       const keyAfterEnd = currentContent.getKeyAfter(endKey);

//       if (isStartAndEndBlockAreTheSame) {
//         length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
//       } else {
//         let currentKey = startKey;

//         while (currentKey && currentKey !== keyAfterEnd) {
//           if (currentKey === startKey) {
//             length += startSelectedTextLength + 1;
//           } else if (currentKey === endKey) {
//             length += endSelectedTextLength;
//           } else {
//             length += currentContent.getBlockForKey(currentKey).getLength() + 1;
//           }

//           currentKey = currentContent.getKeyAfter(currentKey);
//         };
//       }
//     }
//     return length;
//   }

//   const _handleBeforeInput = () => {
//     const currentContent = values.editorState.getCurrentContent();
//     const currentContentLength = currentContent.getPlainText('').length;
//     const selectedTextLength = _getLengthOfSelectedText();


//     if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
//       console.log('you can type max ten characters');

//       return 'handled';
//     }
//   }

//   const _handlePastedText = (pastedText) => {
//     const currentContent = values.editorState.getCurrentContent();
//     const currentContentLength = currentContent.getPlainText('').length;
//     const selectedTextLength = _getLengthOfSelectedText();

//     if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
//       console.log('you can type max ten characters');
//       return 'handled';
//     }
//   }

//   const _handleChange = (editorState) => {
//     setValues(draft=>{
//       draft.editorState = editorState;
//       draft.editorContentHtml = stateToHTML(editorState.getCurrentContent());
//     });

//     // onChange && onChange({data:stateToHTML(editorState.getCurrentContent())});

//   }

//   useEffect(()=>{
//     let contentState = stateFromHTML(content);
//     let convertContentState = EditorState.createWithContent(contentState);
//     setValues(draft=>{
//       draft.editorState = convertContentState
//     });
//   },[content]);

//   const _handleBlur = (config) =>{
//     // const currentContent = values.editorState.getCurrentContent();
//     // const currentContentWord = currentContent.getPlainText('');
//     const convertHtml = values.editorContentHtml;
//     const rmCharactorHtml = convertHtml.replace(/\$&amp;/g,'');
//     // onBlur && onBlur({data:rmCharactorHtml});
//     console.log(config.target,'config');
//     onBlur && onBlur({data:convertHtml});
//   }

//   return (
//   <Styled.CaseMemo >
//     <Editor
//       className="editor"
//       placeholder=""
//       editorState={values.editorState}
//       handleBeforeInput={_handleBeforeInput}
//       handlePastedText={_handlePastedText}
//       onChange={_handleChange}
//       onBlur={_handleBlur}
//     />
//   </Styled.CaseMemo>
//   )
// }



// const CaseMemo = React.memo(function CaseMemo(props) {
//   const { content, onChange,onBlur,disabled } = props;
//   const [values,setValues] = useImmer(CaseMemoState);

//   console.log(content,'content');



//   // const handleChange = config=>{
//   //   console.log(config.target.value);


//   //   console.log(config.target.value.length);
//   //   if(config.target.value.length >10){
//   //     return;
//   //   }

//   //   onChange({data:config.target.value})
//   // }

//   // useEffect(()=>{
//   //   console.log(values.content);
//   //   // onChange({data:config.target.value})

//   // },[values.content])


//   if(content.length > 10){
//     // return <input  value={content} onChange={onChange && onChange({data:content})} />
//     return <input 
//         type="text" 
//         value={content} 
//         onChange={handleChange} 
//       />
//   }
//   return (
//     <Styled.CaseMemo>
//       <CKEditor
//         className="hello"
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
//           console.log('Blur.', editor);
//           onBlur && onBlur({ event, editor, data })
//         }}
//         onFocus={(event, editor) => {
//           console.log('Focus.', editor);
//         }}
//       />
//     </Styled.CaseMemo>
//   );
// });



// export default CaseMemo;

