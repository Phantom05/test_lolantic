# ResetPasswordForm.js

+ ***iconPasswordVisible()***

```js
// input type password <=> txt 로 변경시 아이콘 변경
const iconPasswordVisible = value => { 
      return values[value].show
    ? <Visibility className={classes.eyeIcon} />
    : <VisibilityOff className={classes.eyeIcon} />
}
```

+ ***handleChange()***

```js
// change 이벤트 값 관리
const handleChange = useCallback(prop => e => {
    const inputType = (prop === 'remember' || prop === 'auto') ? 'checked' : 'value';
    const targetValue = e.target[inputType];
    setValues(draft => {
      if(['email','password','checkPassword','verifyCode'].indexOf(prop) !== -1){
        draft[prop].value = targetValue;
      }else{
        draft[prop] = targetValue;
      }
    });
  },[]);
```

+ ***handleClick()***

```js
// click 이벤트 관리
const handleClick = useCallback((config) =>{
    const {type,value} = config;
    // console.log(config);
    if(type === 'sendVerifyCode'){
      if(value === `email`){
        setValues(draft=>{
          draft.email.regEmail = false;
        });
        if(regEmail(emailVal)){
          setValues(draft=>{
            draft.email.regEmail = true;
          });
          
          onSubmit({type:"sendEmail", email: emailVal, name: 'email'});
        }
        
        // console.log(emailVal);
      }
      if(value === `verifyCode`){
        // console.log("verifyCode", verifyCode);
        onSubmit({type:"authCode", email: emailVal, inputAuthCode: verifyCode.value, name: 'verifyCode'});
      }
    }else if(type === 'eyeIcon'){
      setValues(draft => {
        draft[value].show = !draft[value].show;
      });
    }
  },[emailVal, verifyCode]);
```

+ ***handleSubmit()***

```js
// submit 버튼 클릭 이벤트 관리
const handleSubmit = _.debounce(useCallback(() => {
    if(passwordVal === checkPasswordVal){
      if(regPassword(passwordVal)){
        setValues(draft => {
          draft.password.regPassword = true;
          draft.checkPassword.regPassword = true;
        });
        if(regEmail(emailVal)){
          setValues(draft => {
            draft.email.regEmail = true;
          });
          onSubmit({type:"confirm", name: 'success', email: emailVal, password: passwordVal, checkPassword: checkPasswordVal});
        }else{
          setValues(draft => {
            draft.email.regEmail = false;
          });
        }

      }else{
        setValues(draft => {
          draft.password.regPassword = false;
          draft.checkPassword.regPassword = null;
        });
        if(regEmail(emailVal)){
          setValues(draft => {
            draft.email.regEmail = true;
          });
        }else{
          setValues(draft => {
            draft.email.regEmail = false;
          });
        }
      }
    }else{
      setValues(draft => {
        draft.checkPassword.regPassword = false;
      });
    }
  },[passwordVal, checkPasswordVal, emailVal]),200);
```