# MyPageContainer.js

+ ***handleSubmit()***
```js
const handleSubmit = useCallback(value =>config=>{
    // 파트너 변경 요청 이벤트 발생시 정보를 container에 가져옴
    if(value === 'changePartner'){
      const changeInfo = config.companySelected;
      setValues(draft=>{
        draft.partner.title =changeInfo.company;
        draft.partner.id = changeInfo.value;
      });
    }
  },[]);
```


+ ***handleClick()***
```js
 // 클릭 이벤트 관리
  const handleClick = useCallback(config => e=>{
    
    const {
      type,
      option,
      value,
      view
    } = config;
    
    const searchConf = {
      userCode: userCode,
      keyword: '',
      codeType: 1,
      type: 0,
      page: 1,
      first: true,
    }
    // mypage에서 수정 페이지 이동을 관리하는 이벤트
    if(type==='viewModify'){
      if(view){
        setValues(draft => {
          draft.viewModify = view ==='true' ? true : false;
          draft.modal.update = false;
          draft.modal.current = null;
        });
      }else{
        setValues(draft => {
        draft.viewModify = !values.viewModify;
          draft.modal.update = false;
          draft.modal.current = null;
        })
      }
    }
    
    //  파트너 리스트 요청 클릭 이벤트
    if(type==='getPartner'){
      LISTING_PARTNERS_SEARCH_SAGAS(searchConf);
    }

    // 내 파트너 리스트 요청 클릭 이벤트
    if(type==='getMyPartner'){
      LISTING_MY_PARTNERS_SAGAS(searchConf);
    }

    // 파트너 추가 요청 클릭 이벤트
    if(type==='addPartner'){
      let payload;
      if(value){
        payload = {
          userCode: userCode,
          partnerCode: value,
        }
        
        // 기본 파트너 설정 요청시
        if(option === 'default'){
          LISTING_PARTNERS_MY_DEFAULT_ADD_SAGAS(payload);
        }else{
          // 파트너 추가 요청시
          LISTING_PARTNERS_MY_ADD_SAGAS(payload);
        }
      }else{
        // console.log("Do to select partner list");
      }
      
    }

    if(type==='passwordChange'){
      openModal('passwordChange');
    }

    // 파트너 삭제 요청 클릭 이벤트
    if(type==='deletePartner'){
      let payload;
      if(value){
        payload = {
          userCode: userCode,
          partnerCode: value
        }
        // 파트너 삭제 요청시
        LISTING_PARTNERS_MY_DELETE_SAGAS(payload);
      }else{
        // console.log("Do to select partner list");
      }
    }
  },[values.viewModify]);
```

+ ***onChange()***

```js
 // 국가, 지역 선택 이벤트 관리
  const onChange = useCallback((config) => {
    const { type, value } = config;
    //국가 선택시 해당 국가의 지역 정보 요청
    if (type === 'country') {
      LISTING_LOCATION_SAGAS(value);
      setValues(draft => {
        draft.country.current = value;
        draft.city.current ="";
      })
    }
    if (type === 'city') {
      setValues(draft => {
        draft.city.current = value;
      })
    }
  },[]);
  ```

+ ***openModal()*** - **모달 팝업을 관리**

+ ***routeHistory()***
```js
// route history 추가
const routeHistory = page => {
  props.history.push(`/mypage/${page}`);
}
```