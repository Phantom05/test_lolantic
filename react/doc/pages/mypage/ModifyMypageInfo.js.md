# ModifyMypageInfo.js

+ ***selectFunc()***
```js
/**
 * CountrySelector 컴포넌트
 * @param {*} param0 object{select: input value 값, type: select 요소 종류}
 */
const selectFunc = useCallback(({select, type}) => {
        // console.log("input", select, type);

        if(type === "country"){
            setValues(draft => {
                draft.country.current = select;
                draft.city.precedeData = select;
                draft.city.active = true;
                draft.city.current = '';
            });
        }
        if(type === "city"){
            setValues(draft => {
                draft.city.current = select;
            });
        }
    },[]);
```

+ ***handleDateChange()***
```js
// date picker 값을 받아옴.
    const handleDateChange = useCallback(date => {
        const moDate = moment(date).unix();
        setValues(draft => {
            draft.issueLicence = moDate;
        })
    }, []);
```


+ ***handleChange()***
```js
// 체크박스 혹은 인풋박스 이벤트 관리
    const handleChange = useCallback(prop => e => {
        const inputType = (prop === 'type') ? 'checked' : 'value';
        const targetValue = e.target[inputType];
        const targetKey = e.target.value;
        let targetFile= null;

        // 이미지 파일 선택시
        if(prop==='profile'){
            targetFile = e.target.files;
        }
        setValues(draft => {
          if (['profile'].indexOf(prop) !== -1) {
              if(prop==='profile'){
                  if(targetFile.lenght > 0){
                    
                  }else{
                      // 이미지 파일형식일때 데이터 가져오기
                    if(targetFile[0].type.startsWith('image/')){
                        draft[prop].name = targetFile[0].name;
                        draft[prop].value = targetFile[0];
                        draft[prop].fileExtension = true;
                        
                    }else{
                        draft[prop].name = '';
                        draft[prop].value = null;
                        draft[prop].fileExtension = false;
                    }
                  }
              }
          } else if(prop==='type'){
                draft[prop][targetKey] = targetValue;
            }else {
                draft[prop] = targetValue;
            }
        });
      },[]);
```

+ ***onSubmit()***
```js
// 수정하기 버튼 클릭 이벤트
      const onSubmit = _.debounce((value, countryData, cityData) => {
        // console.log('submit');
        const {
            profile: {value : profileValue},
            isPublicCheck,
            type,
            storeName,
            manager,
            person,
            phone,
            address,
            licence,
            issueLicence
        } = value;
        
        const activeCountry = value.country.current !== "";
        const activeCity = value.city.current !== "";
        const reqArea = activeCountry && activeCity;
        
        const isAllTrue = [
        activeCountry,
        reqArea];

        // 데이터 확인
        if(isAllTrue.every(x => x)){
            const dataConfig = {
                "jsonType"  : "update.req.json" ,
                "userCode"  : userCode,
                "open"      : isPublicCheck,
                "type"      : type,
                "company"   : storeName,
                "manager"   : manager,
                // "name"      : person,
                "phone"     : phone,
                "countryId": value.country.current,
                "statesId" : value.city.current,
                "address"  : address,
                "licenseData": type.milling? {
                    "licenseCode": licence? licence : "",
                    "licenseDate": issueLicence? moment.unix(issueLicence).format("YYYY-MM-DD") : ""
                } : null
            }
            
            // 이미지 파일 있으면 파일 전송요청
            if(profileValue){
                CHANGE_PROFILE_SAGAS({file: profileValue, userCode: userCode});
            }
            INFO_INFORMATION_UPDATE_SAGAS(dataConfig);
            // handleModify();
        }else{
            openModal('needData');
        }
      }, 200);
```

+ ***handleClick()***

```js
// 버튼 클릭 이벤트 관리
    const handleClick = useCallback((config) => e => {
        const { type, value } = config;
        if (type === 'selected'){
            if (value === 'country') {
                setValues(draft => {
                draft.city.active = true;
                });
            }
            onChange({
                type: value,
                value: e.target.value
            })
        }else if (type === 'submit'){
        onSubmit(values);
        
        }else if (type === 'preventDefault'){
        e.preventDefault();
        // 이미지 파일 정보 삭제
        }else if(type === 'fileDelete'){
            console.log("DELETE", values.profile.value);
            setValues(draft => {
                draft[value].name = '';
                draft[value].value = null;
            });
        }else if(type === 'cancel'){
            
        }
    },[values]);
```