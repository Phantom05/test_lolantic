# AlertContainer.js

+ ***closeModal()***

```js
// 모달 닫기
  const closeModal = useCallback(() => {
    // console.log("close modal");
    setValues(draft => {
      draft.modal.current = null;
      draft.modal.open = false;
    });
  },[]);
```

+ ***handleCheck()***

```js
// 체크박스 전체, 싱글 선택 관리
  const handleCheck = useCallback(config => e => {
    const {
      type
    } = config;
    const targetCheck = e.target.checked;
    const targetValue = e.target.value;

    if (type === 'all') {
      setValues(draft => {
        draft.allCheckBox = !draft.allCheckBox;
      });

      list.forEach(i => {
        const { eventLogIdx } = i;
        setValues(draft => {
          draft.checkEventId[eventLogIdx] = targetCheck ? true : false;
        });
      });
    }
    if (type === 'single') {
      setValues(draft => {
        draft.checkEventId[targetValue] = targetCheck;
      });
    }

  },[list]);
```

+ ***handleClick***

```js
// 클릭 이벤트 관리
  const handleClick = useCallback(config => e => {
    const {
      type,
      partnerCode,
      caseCode
    } = config;

    const targetValue = e.target.value;
    setValues(draft => {
      draft.allCheckBox = false;
    });
    // 메세지 삭제
    if (type === 'delete') {
      let deletArry = [];
      Object.keys(values.checkEventId).forEach(i => {
        if (values.checkEventId[i] === true) {
          return deletArry.push(i);
        }
      });
      MESSAGE_LIST_DELETE_SAGAS({ userCode: userCode, eventLogIdxArr: deletArry });
    }

    // 메세지 읽기
    if (type === 'read') {
      let readArray = [];
      Object.keys(values.checkEventId).forEach(i => {
        if (values.checkEventId[i] === true) {
          return readArray.push(i);
        }
      });
      MESSAGE_LIST_READ_SAGAS({ userCode: userCode, eventLogIdxArr: readArray });
    }

    // 요청 메세지 수락
    if (type === 'accept') {
      // console.log("accept", partnerCode);
      MESSAGE_UPDATE_SAGAS({ userCode: userCode, partnerCode: partnerCode, state: 1 });
      setValues(draft => {
        draft.modal.current = 'accept';
      });
    }

    // 요청 메세지 거절
    if (type === 'deny') {
      // console.log("deny", partnerCode);
      MESSAGE_UPDATE_SAGAS({ userCode: userCode, partnerCode: partnerCode, state: 2 });
      setValues(draft => {
        draft.modal.current = 'deny';
      });
    }

    // 메세지 리스트 리프레쉬
    if (type === 'refresh') {
      MESSAGE_LIST_SAGAS(messageConf);
    }

    // 링크 메세지 클릭시 works로 이동
    if (type === 'link') {
      const worksSearchConf = {
        userCode: userCode,
        page: 1,
        sort: 5,
        search: caseCode,
        filter:{
          "stage":[0],
          "type":["sender", "receiver"],
          "hidden":[]
        },
        first:false,
        isLoad:true
      }
      console.log("LINK CONF", worksSearchConf);
      setValues(draft => {
        draft.caseCode = caseCode;
      });
      LISTING_WORKS_SEARCH_SAGAS(worksSearchConf);
    }
  },[values.checkEventId]);
```

