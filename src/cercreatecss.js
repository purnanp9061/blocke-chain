import { makeStyles } from '@mui/styles';

const useStyle=makeStyles((theme)=>({
  myStyles:{
    color:'white',
    fontSize:'18px',
  },
  con:{
    width:'250px',
    margin:'auto'
  },
  but:{
    color:'white',
    fontSize:'18px',
    padding:'5px',
    backgroundColor:'green',
    border:'solid 1px white',
    borderRadius:'5px',
    marginRight:'10px',
  },
  but1:{
    color:'green',
    fontSize:'18px',
    padding:'5px',
    backgroundColor:'white',
    border:'solid 1px white',
    borderRadius:'5px',
  }
}))
export default useStyle;