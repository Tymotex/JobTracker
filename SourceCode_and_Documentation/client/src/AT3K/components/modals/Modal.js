import React from 'react';
import SkyLight from 'react-skylight';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, children, Contents } = this.props;
        return (
            <div>
                <section onClick={() => this.simpleDialog.show()}>
                    {children}
                </section>
                <SkyLight 
                    hideOnOverlayClicked 
                    ref={ref => this.simpleDialog = ref} 
                    title={title}
                >
                    <Contents />
                </SkyLight>
            </div>
        )
    }
}

Modal.displayName = 'Modal';

export default Modal;
