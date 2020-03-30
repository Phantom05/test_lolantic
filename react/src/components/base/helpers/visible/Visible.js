import React from 'react';
import _ from 'lodash';

/**
 * <Visible
    show={[isModifyMode, isSenderCase]}
    orShow={isCreateType}
    failure={<HtmlConverter>{info.senderMemo}</HtmlConverter>}
    success={
      <CaseMemo content={info.senderMemo || ""} onChange={handleChange('sender')} />}/>
 * @param {*} props 
 */
function Visible(props) {
  const {show = [],children, success,failure,orShow} = props;
  const bool = _.every(_.flattenDeep([show]));
  
  if(!bool && !orShow) return <>{failure}</>;
  return (
    <>
      {success}
      {children}
    </>
  );
}

export default Visible;


// if(!show.every(item=>item)) return <>{failure}</>;