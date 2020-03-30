# ModalWorkSpaceChange.js

+ ***handleChange()***

```js
// modal input 값 update 관리
const handleChange = e => {
    const event = e.target.value;
    setValue(draft => {
      draft.workSpace = event;
    });
  }
```