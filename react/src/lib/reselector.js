import { createSelector } from 'reselect'
import _ from 'lodash';
import moment from 'moment';

const getItems = state => state;

export const makeQuerySelector = createSelector(
  getItems,
  items => {
    let query =``;
    _.forOwn(items,(value,key)=>{
      const isNull = ["",undefined,null]
      if(isNull.indexOf(value) !== -1){
        value =''
      }
      query += `&${key}=${value}`
    });
    return query.substr(1);
  }
)


export const workListSelector = createSelector(
  getItems,
  items => {
    const addStrDueDateArr = _.map(items,item=>{
      item.strDueDate = moment.unix(item.enrollDate).format('YYYY-MM-DD');
      return item;
    });
    const dueDateGroup = _.groupBy(addStrDueDateArr,'strDueDate');
    const newList = _.map(dueDateGroup,(item,key)=>({duedate:key,list:item}));
    return newList;
  }
);

export const loopSelector = createSelector(
  getItems,
  items => {
    return items.map(item=>item);
  }
);


