



// function LoginForm(config) {
//   // {
//   //   url:`https://localhost.com:8080/login`,
//   //   method:'post',
//   // }

//   return function({data}){
//     const [value,setValue] = setState({});
//     const axiosConf={
//       ...config,
//       data
//     }
//     await axios(axiosConf);
//     setValue(data);

//     return (
//       <div>
//         {value}
//       </div>
//     );
//   }
// }






// export const withRequest = (url) => (WrappedComponent) => {
//   return class extends Component {
//     state = {
//       data: null
//     }
//     async initialize() {
//       try {
//         const response = await axios.get(url);
//         this.setState({
//           data: response.data
//         });
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     componentDidMount() {
//       this.initialize();
//     }

//     render() {
//       const { data } = this.state;
//       return (
//         <WrappedComponent {...this.props} data={data} />
//       )
//     }
//   }
// }
