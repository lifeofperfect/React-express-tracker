import React from 'react';
import PropTypes from 'prop-types';
import "../index.css"
import Button from './Button';

const Header = ({title, buttonClick, showAdd}) => {
    
    return (
        <div>
            <header className="header">
                {/* <h1 style={headingStyle}>{title}</h1> */}
                <h1>{title}</h1>
                <Button 
                    text={showAdd? "Close": "Open"} 
                    color={showAdd? "red": "green"} 
                    buttonClick={buttonClick}
                    showAdd={showAdd}
                    />
            </header>
        </div>
    )
}

Header.defaultProps={
    title: "Tracker app default"
}

Header.propTypes={
    title: PropTypes.string.isRequired
}

// const headingStyle={
//     color: 'red',
//     backgroundColor:"green"
// }

export default Header
