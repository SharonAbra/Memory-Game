// import { connect } from 'react-redux';
// import { setCategory } from '../redux/actions.js'
// import Header from './Header';
// import MemoryGrid from "./MemoryGrid";
// import Finish from './Finish';
// import { useParams } from 'react-router';
// import { useEffect } from 'react';

// const MultiRoom = ({categoryFunc}) => {
//   const { category } = useParams();
//   console.log(category)

//   useEffect(() => {
//     categoryFunc(category);
//   }, [])

//           return (
//         <> 
//             <Header/>
//             <MemoryGrid category={category}/>
//             <Finish/>
//         </>
//       )
//     }

  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       categoryFunc: (category) => dispatch(setCategory(category))
//     }
//   }
//     export default connect(null, mapDispatchToProps)(MultiRoom);