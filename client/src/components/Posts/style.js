import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({ //styles for the post title
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  toolbar: theme.mixins.toolbar,
}));