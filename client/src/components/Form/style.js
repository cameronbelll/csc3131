import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '95%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  toolbar: theme.mixins.toolbar,
}));