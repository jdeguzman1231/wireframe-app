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
        let currentDiv = null;
        let controlArray = this.props.controls;




        return (
            <div>
                {controlArray && controlArray.map(function(control) {
                    let name = control.name;
                    if (name == "container") {
                        return <div style = {container_object_editable} onClick = {select.bind(this, control)}></div>
                    }
                    else if (name == "label") {
                        return <div style = {label_object_editable} onClick = {select.bind(this, control)}>Prompt for label</div>
                    }
                    else if (name == "button") {
                        return <div style = {button_object_editable} onClick = {select.bind(this, control)}>Submit</div>
                    }
                    else if (name == "textfield") {
                        return <div style = {textfield_object_editable} onClick = {select.bind(this, control)}>Input</div>
                    }
                
                    return (
                        <div style = {currentDiv} onClick = {select.bind(this, control)} ></div>
                    );
                }
                    
                    )}
        </div>
        );
        
    
        

}
}

        


// const mapStateToProps = (state, ownProps) => {
//     const todoList = ownProps.todoList;
//     return {
//         todoList,
//         auth: state.firebase.auth,
//     };

//     const { id } = ownProps.match.params;
//     const { wireframes } = state.firestore.data;
//     const wireframe = wireframes ? wireframes[id] : null;
//     if (wireframe)
//         wireframe.id = id;

//     return {
//         wireframe,
//         auth: state.firebase.auth,
//     };
// };

const textfield_object_editable = {
    width: '200px',
    height: '30px',
    background: 'white',
    textAlign: 'left',
    borderColor: '#111111',
    borderWidth: '2px',
    borderStyle: 'solid',
    position: 'absolute',
    fontSize: 14,
  };

  const button_object_editable = {
    width: '200px',
    height: '30px',
    background: 'whitesmoke',
    textAlign: 'left',
    borderColor: '#111111',
    borderWidth: '2px',
    borderStyle: 'solid',
    position: 'absolute',
    fontSize: 14,
  };

  const container_object_editable = {
    width: '100px',
    height: '50px',
    background: 'white',
    textAlign: 'left',
    borderColor: '#111111',
    borderWidth: '2px',
    borderStyle: 'solid',
    position: 'absolute',
    fontSize: 14,
  };

  const label_object_editable = {
      width: '200px',
      height: '30px',
      textAlign: 'left', 
      position: 'absolute',
      borderColor: 'white',
      borderStyle: 'solid',
      borderWidth: '2px',
      fontSize: 14
  }




  const empty_control = {
    name: "",
    x_position: 0,
    y_position: 0,
    text_value: "",
    font_size: 14,
    background_color: "white",
    border_color: "black", 
    border_thickness: 2, 
    border_radius: 2
}


// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'todoLists' },
//     ]),
// )
export default (ItemsList);
