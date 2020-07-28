import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState(props.profile);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ValidatorForm
        onSubmit={props.handleSubmit}
        onError={errors => null}>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                name="first_name"
                onChange={handleChange}
                required
                value={props.profile.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                name="last_name"
                onChange={handleChange}
                required
                value={props.profile.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={props.profile.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                name="phone_no"
                onChange={handleChange}
                type="number"
                value={props.profile.phone_no}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            style={{color:"#fff"}}
            type="submit"
          >
            Update Profile
          </Button>
        </CardActions>
      </ValidatorForm>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
