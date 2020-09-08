import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class portalComp extends React.Component {
    static propTypes= {value: PropTypes.string.isRequired}
    render() {
        return ReactDOM.createPortal(
                <div className="row" style={{ background: "blue", width: "50%", height:"50%" }}>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 " style={{ paddingLeft: "70px", paddingTop:"10px"}} >
        <h2 style={{color: "white",textShadow : "1px 1px 2px red, 0 0 25px yellow, 0 0 5px black"}}>E-Learning {this.props.value}</h2>
                    </div>
    
            </div>, document.getElementById("Portal-root")
        )
    }
}
