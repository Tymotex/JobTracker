import React from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';

// AT3K imports
import { menuItems } from '../../AT3K/layouts';
import { AT3KLayout } from '../../AT3K/layouts';

// context
import { useLayoutState } from '../../context/LayoutContext';

const TopNavItems = menuItems.TopNavItems;

const Layout = ({ history, children, htmlTitle }) => {
    var classes = useStyles();

    // global
    var layoutState = useLayoutState();

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{htmlTitle}</title>
            </Helmet>
            <Header history={history} title={'employ.me'}>
                <TopNavItems />
            </Header>
            <Sidebar />
            <div
                className={classnames(classes.content, {
                    [classes.contentShift]: layoutState.isSidebarOpened,
                })}
            >
                <div className={classes.fakeToolbar} />
                <AT3KLayout>{children}</AT3KLayout>
            </div>
        </div>
    );
};

Layout.propTypes = {
    htmlTitle: PropTypes.string,
};

Layout.defaultProps = {
    htmlTitle: 'employ.me',
};

export default withRouter(Layout);
