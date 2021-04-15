import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
    root: {
        background: "#232526",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to right, #212325, #232526)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #313335, #232526)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
        // background: "#16222A",  /* fallback for old browsers */
        // background: "-webkit-linear-gradient(to right, #3A6073, #16222A)",  /* Chrome 10-25, Safari 5.1-6 */
        // background: "linear-gradient(to right, #3A6073, #16222A)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
    "text-transform": "none",
    borderRadius: "15px",
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

function ClassNames(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children || 'class names'}
    </Button>
  );
}

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);