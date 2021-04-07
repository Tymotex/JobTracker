import React from 'react';
import SkyLight from 'react-skylight';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <section onClick={() => this.simpleDialog.show()}>
                    {this.props.children}
                </section>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Hi, I'm a simple modal">
                    Hello, I dont have any callback.
                </SkyLight>
            </div>
        )
    }
}

Modal.displayName = 'Modal';

export default Modal;
