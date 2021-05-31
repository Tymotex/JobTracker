import React from 'react';
import SkyLight from 'react-skylight';
import {
    Button
} from '../buttons';

class Modal extends React.Component {
    render() {
        const { title="", children, buttonText="" } = this.props;

        // Depending on whether the Button prop was passed, render Contents of children
        return (
            <>
                <section onClick={() => this.simpleDialog.show()}>
                    <Button>{buttonText}</Button>
                </section>
                <div 
                    style={{
                        // Force render on top of all elements 
                        position: "absolute",    
                        zIndex: "10000"
                    }}
                >
                    <SkyLight 
                        hideOnOverlayClicked 
                        ref={ref => this.simpleDialog = ref} 
                        title={title}
                        transitionDuration={250}
                        showOverlay={true}
                    >
                        {children}
                    </SkyLight>
                </div>
            </>
        )
    }
};

Modal.displayName = 'Modal';

export default Modal;
