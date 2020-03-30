# OptionContainer.js

+ ***handleClick()***

```js
// 클릭 이벤트 관리
  const handleClick = useCallback(config => e => {
    const {
      type,
    } = config;

    // 작업 경로 변경 버튼 클릭시 변경 모달 활성화
    if(type === 'workspaceModal'){
      openModal('workSpace');
    }

    // 작업 경로 변경 완료 버튼 클릭시
    if(type === 'updateWorkSpace'){
      // console.log("update workspace");
      // workSpace 모달 재요청으로 모달이 닫아짐
      openModal('workSpace');
      // e 에는 target value가 들어있음. 
      // WORKSPACE_SET_SAGAS();
    }
    // 싱크 버튼 클릭시
    if(type === 'sync'){
      // console.log("sync");
      // CASE_SYNC_SAGAS();
    }
  },[]);
```

+ ***openModal()***

```js
// 옵션 컨테이너 모달 관리
  const openModal = useCallback(value => {
    // console.log("open modal", value);
    if(value === 'workSpace'){
      setValue(draft => {
        draft.modal.workSpace = !draft.modal.workSpace;
        draft.modal.current = 'workSpace';
      })
    }
  },[]);
```