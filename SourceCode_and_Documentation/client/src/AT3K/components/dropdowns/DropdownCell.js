import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

class DropdownCell extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: props.value }

    this.ref = React.createRef()
    this.onChange = this.onChange.bind(this)
    console.log(this.props)
  }

  getValue() {
    return { [this.props.column.key]: this.state.value }
  }

  getInputNode() {
    return this.ref
  }

  onChange(_, value) {
    alert(value);
    this.props.onRowChange();
    // This will close the dropdown as soon as an option is selected
    // this.props.onCommit()
  }

  render() {
    return (
      <Autocomplete
        ref={this.ref}
        autoHighlight
        value={this.state.value}
        options={['application', 'resume', 'interview', 'final']}
        getOptionLabel={s => s}
        getOptionDisabled={s => this.state.value === s}
        onChange={this.onChange}
        renderInput={params => (
            <TextField
                {...params}
                size='small'
                fullWidth
            />
        )}
      />
    )
  }
}

DropdownCell.propTypes = {
  value: PropTypes.any,
  onCommit: PropTypes.func
}

export default DropdownCell;
