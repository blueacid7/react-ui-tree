/**
*
* CustomTextField
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

export const styles = {
  root: {
    // background: '#fafafa',
    border: 'solid 1px #f0f0f0',
    borderRadius: 2,
    fontSize: 14,
    width: '100%',
  },
  input: {
    padding: 10,
    '&:focus': {
      borderRadius: 2,
      borderColor: '#02ADFF',
      boxShadow: `0 0 0 0.1rem #02ADFF`,
    },
  },
  inputLabel: {
    // fontSize: 12,
    top: -3,
  },
  error: {
    borderColor: '#f73547',
    backgroundColor: '#ffebed',
  },
  errorText: {
    color: '#f73547',
  },
};

export const styles2 = {
  root: {
    // background: '#fafafa',
    border: 'solid 1px #f0f0f0',
    borderRadius: 2,
    fontSize: 14,
    // width: '100%',
  },
  input: {
    width: 50,
    padding: 10,
    '&:focus': {
      borderRadius: 2,
      borderColor: '#02ADFF',
      boxShadow: `0 0 0 0.1rem #02ADFF`,
    },
  },
  inputLabel: {
    // fontSize: 12,
    top: -3,
  },
  error: {
    borderColor: '#f73547',
    backgroundColor: '#ffebed',
  },
  errorText: {
    color: '#f73547',
  },
};

function CustomTextField(props) {
  const { classes, type, ...rest } = props;
  return (
    <React.Fragment>
      {/* <InputLabel shrink htmlFor="bootstrap-input" className={classes.inputLabel}>*/}
      {/* {props.label}*/}
      {/* </InputLabel>*/}
      <Input
        type={type}
        onChange={(event) => {
          if (props.index !== undefined || props.cardIndex !== undefined) {
            props.handleChange(event, props.index, props.cardIndex);
          } else {
            props.handleChange(event);
          }
        }}
        id={props.id ? props.id : 'full-width'}
        classes={{ root: classes.root, input: classes.input, error: classes.error }}
        disabled={props.disable}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        disableUnderline
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            props.keyPress();
            ev.preventDefault();
          }
          if (ev.key === '.' && props.creditCycleDays) {
            // ev.key.replace(".","");
            ev.preventDefault();
          }
        }}
        {...rest}
      />
      {!props.disable && props.error && <div style={{ color: 'red', fontSize: '0.8em' }}>{props.customError}</div>}
    </React.Fragment>
  );
}

CustomTextField.propTypes = {
  classes: PropTypes.any,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
  onFocus: PropTypes.func,
  type: PropTypes.string,
  keyPress: PropTypes.func,
  creditCycleDays: PropTypes.bool,
};

const SmallCustomTextField = withStyles(styles2)(CustomTextField);
export { SmallCustomTextField };
export default withStyles(styles)(CustomTextField);

CustomTextField.propTypes = {
  index: PropTypes.any,
  type: PropTypes.any,
  keyPress: PropTypes.any,
  value: PropTypes.any,
  label: PropTypes.any,
  creditCycleDays: PropTypes.any,
  disable: PropTypes.any,
  handleChange: PropTypes.any,
  placeholder: PropTypes.any,
  onFocus: PropTypes.any,
  cardIndex: PropTypes.any,
  id: PropTypes.any,
  error: PropTypes.any,
  customError: PropTypes.any,
};
