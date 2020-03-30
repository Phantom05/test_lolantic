import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { withTranslation  } from "react-i18next";
import i18next from 'i18next';

/**
 * <T.Text 
 *  lang={'jp'}
 * >message.hello</T.Text>
 * lang을 주면 강제로 변환할수도 있음.reducer에 영향 받지 않음.
 * @param {*} props 
 * // Actions.base_language_change('ko')
 */
function Text(props) {
  const { text, children , i18n,t,convert,lang} = props; 
  const { base:baseReducer } = useSelector(state=>state);

  useEffect(()=>{
    i18n.changeLanguage(baseReducer.language)
  },[baseReducer.language]);

  let content = text || children;

  if(lang){
    content = i18next.getFixedT(lang)(content);
  }

  return (
    <>
      {convert === false? content : t(content)}
    </>
  );
}



export const T={
  Text:withTranslation()(Text),
}