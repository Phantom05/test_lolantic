import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { PlainTable } from 'components/common/table';
import { PlainSlider } from 'components/common/slider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';


const mainSearchKmMars = [
  {
    value: 1,
    label: '1km',
  },
  {
    value: 3,
    label: '3km',
  },
  {
    value: 5,
    label: '5km',

  },
  {
    value: 7,
    label: '7km',
  },
  {
    value: 10,
    label: '10km',
  },
  {
    value: 13,
    label: '13km',
  },
  {
    value: 15,
    label: '15km',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
      // width: '25ch',
    },
  },
}));



function AnalysisContainer(props) {
  const classes = useStyles();

  const handleChange = config => {

  }
  const handleDelete = config => {

  }

  return (
    <Styled.AnalysisContainer>
      <Grid container>
        <Grid item xs={6}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="주소 입력" className="analysis__input" />
          </form>
          <div>거리</div>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel value="1km" control={<Radio color="primary" />} label="1km" />
            <FormControlLabel value="3km" control={<Radio color="primary" />} label="3km" />
            <FormControlLabel value="5km" control={<Radio color="primary" />} label="5km" />
            <FormControlLabel value="10km" control={<Radio color="primary" />} label="10km" />
            <FormControlLabel value="15km" control={<Radio color="primary" />} label="15km" />
          </RadioGroup>

          <div>
            <div>종류</div>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="아파트"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="빌라"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="원룸"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="오피스텔/도시형생활주택"
            />
          </div>
          <div>
            <div>면적(공급면적)</div>
            <div>
              +5
            </div>
          </div>
          <div>
            <div>옵션</div>
            <div>층</div>
            <div>방</div>
            <div>욕실</div>
            <div>방향</div>
          </div>
          <Button variant="contained" color="primary">분석시작</Button>
          <Button variant="contained" color="primary">분석취소</Button>
        </Grid>
        <Grid item xs={6}>
          <img src="https://t1.daumcdn.net/cfile/tistory/2636C73D568B80CF2F" alt="" width="100%" />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={6}>
          비교된 건물 리스트
          <PlainTable />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel value="1km" control={<Radio color="primary" />} label="1km" />
          <FormControlLabel value="3km" control={<Radio color="primary" />} label="3km" />
          <FormControlLabel value="5km" control={<Radio color="primary" />} label="5km" />
          <FormControlLabel value="10km" control={<Radio color="primary" />} label="10km" />
          <FormControlLabel value="15km" control={<Radio color="primary" />} label="15km" />

          <Chip
            // avatar={<Avatar>M</Avatar>}
            label={`매물 찜하기`}
            clickable
            color="primary"
            deleteIcon={<FavoriteIcon />}
            onDelete={handleDelete}
          />
          <div>
            <img src="https://www.ipman.co.kr/mapapp001/images/sam/%EC%A4%91%EB%B6%84%EB%A5%98%EA%B7%B8%EB%9E%98%ED%94%841_1.png" alt="" width="100%" />
          </div>
          <div>
            주변 편의시설 <br />
            편의점 ok <br />
            버스정류장 <br />
            커피숍 ok <br />
            마트 ok <br />
            헬스장 ok <br />
            역까지 거리 <br />
            역세권 <br />
          </div>
          <div>
            <Chip
              // avatar={<Avatar>M</Avatar>}
              label={`구매 적합`}
              clickable
              color="primary"
              deleteIcon={<DoneIcon />}
              onDelete={handleDelete}
            />
            <Chip
              // avatar={<Avatar>M</Avatar>}
              label={`편의 시설 양호 `}
              clickable
              color="primary"
              deleteIcon={<DoneIcon />}
              onDelete={handleDelete}
            />
            <Button variant="contained">등기부등본</Button>
            <Button variant="contained">건출물대장</Button>
            <Button variant="contained">토지대장</Button>

          </div>
        </Grid>
      </Grid>
    </Styled.AnalysisContainer>
  );
}

export default AnalysisContainer;

const Styled = {
  AnalysisContainer: styled.div`
    &{
      .analysis__input{
        width:90%;
        
      }
      label + .MuiInput-formControl{
        margin-top:25px;
        width:100%;
      }
    }
  `
}