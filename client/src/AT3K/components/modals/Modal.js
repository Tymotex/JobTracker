import React from 'react';
import SkyLight from 'react-skylight';

class Modal extends React.Component {
    render() {
        const { title, children, Contents } = this.props;
        return (
            <>
                <section onClick={() => this.simpleDialog.show()}>
                    {children}
                </section>
                <div 
                    style={{
                        position: "absolute",    // Force render on top of all elements 
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
                        <Contents />
                    </SkyLight>
                </div>
            </>
        )
    }
}

Modal.displayName = 'Modal';

export default Modal;
