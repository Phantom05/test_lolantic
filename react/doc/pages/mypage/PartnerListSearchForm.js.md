# PartnerListSearchForm.js

+ ***handleChange()***

```js
const handleChange = useCallback((value) => e => {
    const targetValue = e.target.value;
    // 고유번호, 업체명 셀렉
    if (value === 'searchCheckbox') {
      setValues(draft => {
        draft.searchCheckbox.value = targetValue;
      })
    }
  },[setValues]);
```

+ ***handleModal()***

```js
// 모달 dim 클릭 관리, info 모달 관리
  const handleModal = useCallback(config => {
    const {
      type,
      value
    } = config;
    if(type === 'modalGetInfo'){
      // console.log("modal get info", value);
      setValues(draft => {
        draft.clickModal = true;
      });
      const conf = {
        userCode: value,
      }
      INFO_INFORMATION_SAGAS(conf);
    }else if(type === 'dim'){
      setValues(draft => {
        draft.partnerModal = false;
        draft.clickModal = false;
      });
    }
  },[setValues]);
```

+ ***handleClick***

```js
// 클릭 이벤트 관리
  const handleClick = useCallback(config => e => {
    const { type } = config;
    if (type === 'selected') {
      if (e.component === "PartnersList") {
        // console.log("SDFSDFSDFSDF", e);
        setValues(draft => {
          draft.companySelected = e;
        })
      }
    }

    if (type === 'change') {
      props.onSubmit && props.onSubmit(values);
    }
  },[values.companySelected]);
```

+ ***onSubmit***

```js
// Partners List Search Submit
  const onSubmit = useCallback((config) => {
    let searchConfig = {
      // userCode: "20Jan31-0000",
    userCode: authReducer.signIn.profile.userCode,
      page: 1,
      codeType : 1,
      type : config.selectedType,
      keyword : config.keyword,
      first:true
    }
    // console.log("DEBUG @@@@", searchConfig);
    infinoteRef.current.el.scrollTo(0,0);
    if(props.option === 'my'){
      LISTING_MY_PARTNERS_SAGAS(searchConfig);
    }else{
      searchConfig.codeType = values.searchCheckbox.value;
      LISTING_PARTNERS_SEARCH_SAGAS(searchConfig);
      setValues(draft => {
        draft.viewPartnerList = true;
      })
    }
  },[props.option, values.searchCheckbox]);
```