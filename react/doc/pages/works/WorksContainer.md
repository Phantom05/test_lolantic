# WorksContainer

```js
import React,{useEffect} from 'react';
import { WorksCardListPanel } from 'components/common/panel';
import {storage} from 'lib/library';
import {
  LISTING_WORKS_SEARCH_SAGAS,
  INFO_WORKS_APP_DATA_UPLOAD_SAGAS,
  INFO_CASE_COMPLETE_SAGAS,
  INFO_WORKS_DIRECT_FILE_UPLOAD,
  INFO_WORKS_CASE_UPDATE_SAGAS
} from 'store/actions';


const WorkContainer = React.memo(function WorkContainer() {
  useEffect(()=>{
    return ()=>{
      LISTING_WORKS_SEARCH_SAGAS.init();
      INFO_WORKS_APP_DATA_UPLOAD_SAGAS.init()
      INFO_CASE_COMPLETE_SAGAS.init();
      INFO_WORKS_DIRECT_FILE_UPLOAD.init();
      INFO_WORKS_CASE_UPDATE_SAGAS.init();
      storage.remove('worksCurrentCode');
    }
  },[]);
 
  return (
    <>
      <WorksCardListPanel />
    </>
  );
});


export default WorkContainer;
```

