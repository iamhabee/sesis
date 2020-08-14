import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#000",
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container justify="space-between" spacing={5}>
          <Grid item xs={6} sm={4} md={6}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              className="text-white p-10"
              spacing={2} >
                Cubevest Cooperative is a Nigerian pioneer Non Interest Fintech company duly registered with the Corporate Affairs Commissions and also a registered Cooperative under the Nigerian Cooperatives Societies with the goal of driving the financial inclusion of individuals who do not have access to financial services, provision of interest free credit facilities to members, promoting savings culture and encouraging ethical investment.
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={6}>
          <Grid
              container
              direction="column"
              justify="flex-end"
              spacing={2} >
            <Typography variant="h6" className="p-10 text-white" marked="left" gutterBottom>
            Suite 522, Fifth Floor,
            The Kings Plaza Opposite NAF Conference Center,
            Kado, FCT, Abuja
            </Typography>
            </Grid>
          </Grid>
          {/* <Grid item>
            <Typography variant="caption">
              
            </Typography>
          </Grid> */}
        </Grid>
      </Container>
    </Typography>
  );
}