import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    TextField,
    Button,
    Grid
} from '@material-ui/core';

import styles from './Modal.module.scss';


const Option = (props) => {
	const style = {
		display: 'flex'
	}


	return (
		<div style={style}> 
			<input type="checkbox" />
			<label>{props.text}</label>
		</div>
	);
}


const ReportModal = () => {

	const windowStyle = {
		width: '500px',
	    backgroundColor: '#fafafa',
	    border: '2px solid black',
	    boxShadow: '2px 2px 2px',
	    position: 'fixed',
	    left: '35%',
	    top: '30%',
	    padding: '30px',
	}

	const btnStyle = {
		position: 'absolute',
		right: '30px',
		border: '1px solid black',
	}

	const btnHover = {
		cursor: 'pointer'
	}

	const textareaStyle = {
		width: '100%',
		height: '100px',
	}

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Report this job
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
            	
                <Fade in={open}>
                	
                    <div style={windowStyle}>
                    	<Button style={btnStyle} onClick={handleClose}>
			                X
			            </Button>
                    	<h2 className={styles.title} id="transition-modal-title">Choose a Problem: </h2>
                    	<form>
                    		<Option text="It's offensive and/or discriminatory" />
                    		<Option text="Asking for money or seems like a fake job" />
                    		<Option text="Incorrect company, location, or details" />
                    		<Option text="I think it's trying to sell something unrelated to the job" />
                    		<Option text="Other" />
                    	</form>
                    	<h2>Describe your problem below:</h2>
                    	<textarea style={textareaStyle}></textarea>


                    </div>
                </Fade>
            </Modal>
        </div>
    );


}


export default ReportModal;