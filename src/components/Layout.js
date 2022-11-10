import React from 'react';

function Layout({children}) {
    return (
        <div className="App">
            <div className="header"></div>
            <div className="main">
                <div className="container">
                    {children}
                </div>
            </div>
            <div className="footer">&copy; 2022 Learn with SOURAV</div>
        </div>
    );
}

export default Layout;