# TabBar.js

+ ***handleChange()***
```js
// tab change func
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
    if(newValue){
      handleClick({type: 'viewModify', view: 'false'})();
    }
  },[]);
```

+ ***routeHistoryTab()***
```js
// 각 탭에 해당하는 route history 추가
const routeHistoryTab = value => {
    if(value === 0){
      return routeHistory('');
    }else if(value === 1){
      return routeHistory('mypartner');
    }else if(value === 2){
      return routeHistory('option');
    }
  }
```