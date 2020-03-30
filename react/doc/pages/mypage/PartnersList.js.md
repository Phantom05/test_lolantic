# PartnersList.js

+ ***handleClick()***
```js
// list 선택 관리
  const handleClick = useCallback(config => e => {
    const {type} = config;
    if (type === 'selected') {
      const result={
        component:`PartnersList`,
        value:e.key
      }
      Object.assign(result,config,e);
      props.onClick && props.onClick(result);
    }
  },[]);
```
