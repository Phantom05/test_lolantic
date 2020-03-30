# Mypartners.js

+ ***changeCont()***

```js
  // 파트너 등록 (업체목록, 추가등록) tab 변경 이벤트 관리
  const changeCont = useCallback(e => {
    console.log("handle change");
    const eventValue = e.target.value;
    setValues(draft => {
      draft.isPartner = eventValue;
      draft.myPartnerPage = false;
    });
  },[values.isPartner, values.myPartnerPage]);
```

+ ***selectCompany()***

```js
// 파트너 리스트 클릭 이벤트 관리
  const selectCompany = useCallback(value => {
    setValues(draft => {
      draft.selectCompany = value;
    });
  },[values.selectCompany]);
```