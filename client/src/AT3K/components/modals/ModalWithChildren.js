import React from 'react';
import SkyLight from 'react-skylight';

class Modal extends React.Component {

    render() {
        const { title, children, Button } = this.props;

        // Depending on whether the Button prop was passed, render Contents of children
        return (
            <>
                <section onClick={() => this.simpleDialog.show()}>
                    <Button />
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
                        style={{
                            position: "absolute",
                            zIndex: "100000"
                        }}
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
