import React from 'react';
import renderHTML from 'react-render-html';
 
function HtmlConverter(props){
  const {children,convert}  = props;
  let text = children;
  if(convert){
    // console.log(convert);
    const curTag = convert[0];
    const convertTag = convert[1];
    let replaceTag ;
    // console.log(children);

    const targetTag = new RegExp(`(<${curTag}>)(.+?)(<\/${curTag}>)`,'g') ;
    
    if(convertTag === 'br'){
      replaceTag = `$2<${convertTag}/>`
    }else if (convertTag === '\n'){
      replaceTag = `$2${convertTag}`
    }else{
      replaceTag = `<${convertTag}>$2</${convertTag}>`
    }
    text =  children.replace(targetTag, replaceTag)
  }
  return <>{ children && renderHTML(text) }</>;
}

export default HtmlConverter;