import {makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({ //shows all the parts of the styles for any post on the site
    appBar: {
        borderRadius: 100,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '15px',
      },
}));