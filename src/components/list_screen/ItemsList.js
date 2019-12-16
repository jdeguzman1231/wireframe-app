import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class ItemsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Rendering itemsList");
        console.log("hi");
        let select = this.props.selectControl;
        let currentDiv;
        let controlArray = this.props.controls;




        return (
            <div>
                {controlArray && controlArray.map(function(control) {
                    let name = control.name;
                    if (name == "container") {
                        currentDiv = "container_object_editable" 
                    }
                    else if (name == "label") {
                        currentDiv = "label_object_editable"
                    }
                    else if (name == "button") {
                        currentDiv = "button_object_editable"
                    }
                    else if (name == "textfield") {
                        currentDiv = "textfield_object_editable"
                    }
                
                    return (
                        <div className = {currentDiv} onClick = {select.bind(this, control)} ></div>
                    );
                }
                    
                    )}
        </div>
        );
        
    
        

}
}

        


const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'todoLists' },
//     ]),
// )
export default (ItemsList);
