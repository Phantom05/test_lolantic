# PartnersListItem.js

+ ***handleClick()***
```js
// props로 내려받은 list click 함수를 사용
const handleClick = () => {
    props.onClick && props.onClick({ ...props,key: props.id })
  }
```

+ ***handleInnerClick()***
```js
// radio 클릭 이벤트만 관리
  const handleInnerClick = useCallback(e =>{
    // e.stopPropagation();
    props.onClick && props.onClick({ ...props,key: props.id, selectOption: 'onlySelect' })
  },[]);
```

+ ***innerModal()***

```js
// list 클릭시 Info modal 이벤트 관리
const innerModal = () => {
      // onlyselect가 없을 때 modal도 같이 발생
      if(props.selectOption !=='onlySelect'){
      props.handleModal && props.handleModal({type: 'modalGetInfo', value: props.id});
    }
  }
```