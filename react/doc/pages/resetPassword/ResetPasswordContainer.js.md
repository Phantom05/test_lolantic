# ResetPasswordContainer.js

+ ***startTimer()***

```js
/**
   * Timer 모듈
   * config
   * @param {*} timer time string ex)"03:00" 
   * @param {*} interval * int 
   * @param {*} setValue * setState // timer에 따른 상태값을 관리할 수 있도록 상태관리 권한부여- useImmer사용 
   *            
   */
  const startTimer = (config) => {
    console.log("timer");
    const {
      timer,
      interval,
      setValue
    } = config;

    const start = moment(timer, "mm:ss").valueOf();
    let duration = moment.duration(start, 'milliseconds');

    class Timer{
      constructor(duration, interval, setValue){
        
        this.duration = duration;
        this.interval = interval;
        this.viewTime = '';
        this.timeIns = null;
      }

      // timer 시작
      start(){
        const _self = this;
        setValue(draft => {
          draft.timer.active = true;
          draft.timer.overTime = false;
        });
        this.timeIns = setInterval(function(){
          _self.duration = moment.duration(_self.duration - _self.interval, 'milliseconds');
          _self.viewTime = `${moment(_self.duration._milliseconds).format('mm:ss')}`;
          
          if(!_self.duration.minutes() && !_self.duration.seconds()){
            _self.viewTime = '';
            clearInterval(_self.timeIns);
            setValue(draft => {
              draft.timer.viewTime = draft.timer.setTime;
              draft.timer.active = false;
              draft.timer.overTime = true;
            });
          }
          setValue(draft => {
            draft.timer.viewTime = _self.viewTime;

          });
        }, this.interval);
      }

      // timer 가져오기
      viewTime(){
        console.log("view time", this.viewTime);
        return this.viewTime;
      }

      // timer Interval instance 가져오기
      getIns(){
        return this.timeIns;
      }

      // timer 종료
      end(){
        console.log("timer clear");
        clearInterval(this.timeIns);
        setValue(draft => {
          draft.timer.viewTime = draft.timer.setTime;
          draft.timer.active = false;
        });
      }
    }
    const _Timer = new Timer(duration, interval, setValue);
    return _Timer;
  }
```

+ ***handleSubmit()***

```js
// click 이벤트 관리
const handleSubmit = useCallback(({type, name, email, password, inputAuthCode, checkPassword}) => {
    if(type === 'sendEmail'){
      if(regEmail(email)){
        const verifyForm = {
          email: email
        }

        AUTH_RESET_VERIFY_EMAIL_SAGAS(verifyForm);
        setValid(draft => {
          draft.modal.current = name;
          draft.timer.overTime = false;
          draft.timer.viewTime = valid.timer.setTime;
          draft.check.validEmail = true;
        });
        
      }else{
        setValid(draft => {
          draft.check.email = false;
          draft.modal.current = 'failEmail';
          draft.check.validEmail = false;
        });
      }
    }else if(type === 'authCode'){
      const verifyForm = {
        email: email,
        verifyCode: inputAuthCode
      }
      if(!valid.timer.overTime){
        AUTH_VERIFY_CODE_SAGAS(verifyForm);
        // console.log(`autCodeSucc: ${authCode.success} - inputAuthCode: ${inputAuthCode}`);
        setValid(draft => {
          draft.modal.current = name;
        });
      }else{
        openModal('timeOut');
      }

    }else if(type === 'confirm'){
      // console.log("confirm");

      if(regEmail(email) && regPassword(password)) {
        setValid(draft => {
          draft.check.email = true;
          draft.check.password = true;
        });
        
        if(password === checkPassword){
          setValid(draft => {
            draft.check.checkPassword = true;
          });
        }else{
          setValid(draft => {
            draft.check.checkPassword = false;
          });
        }

        // console.log('if')
        setValid(draft => {
          draft.resetValue.email = email;
          draft.resetValue.newPass = password;
          draft.modal.current = name;
          draft.check.attempt =  draft.check.attempt+1
        });
        
      } else {
        // console.log("fail");
        setValid(draft => {
          draft.check.email = false;
          draft.check.password = false;
        });
      }
    }
  },[]);
```
+ ***openModal()***

```js
// modal 관리
const openModal = useCallback(value => {
    if(value === 'email'){
      setValid(draft => {
        draft.modal.email = !draft.modal.email;
      });
    }
    if(value === 'verifyCode'){
      setValid(draft => {
        draft.modal.verifyCode = !draft.modal.verifyCode;
      });
    }
    if(value === 'success'){
      setValid(draft=>{
        draft.modal.success = !draft.modal.success;
      })
    }
    if(value === 'failEmail'){
      setValid(draft=>{
        draft.modal.failEmail = !draft.modal.failEmail;
        draft.modal.current = 'failEmail';
      })
    }
    if(value === 'failCode'){
      setValid(draft=>{
        draft.modal.failCode = !draft.modal.failCode;
        draft.modal.current = 'failCode';
      })
    }
    if(value === 'failReset'){
      setValid(draft=>{
        draft.modal.failReset = !draft.modal.failReset;
        draft.modal.current = 'failReset';
      })
    }
    if(value === 'noneEmail'){
      setValid(draft=>{
        draft.modal.noneEmail = !draft.modal.noneEmail;
        draft.modal.current = 'noneEmail';
      })
    }
    if(value === 'timeOut'){
      setValid(draft =>{
        draft.modal.timeOut = !draft.modal.timeOut;
        draft.modal.current = 'timeOut';
      })
    }
  },[]);
```