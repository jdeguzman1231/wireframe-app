import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { Link } from 'react-router-dom';

import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {SketchPicker} from 'react-color';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        controls: [],
        height: 450,
        width: 450,
        currentControl: '',
    }

    sortCriteria = 'none';;            
    changedTime = false;

    setName = (newName) => {
       
    }
    updateTime = () => {
        console.log("updating time")
        let fireStore = getFirestore();
        fireStore.collection('wireframes').doc(this.props.todoList.id).update({ time: Date.now() })
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        const fireStore = getFirestore();
        let dbitem = fireStore.collection('wireframes').doc(this.props.todoList.id);
        dbitem.update({ [target.id]: target.value });
    }

    addContainer = () => {
        let new_container = {
            key: 0,
            id: 0,
            name: "container",
            x_position: 0,
            y_position: 0,
            text_value: "",
            font_size: 14,
            background_color: "white",
            border_color: "black", 
            border_thickness: 2, 
            border_radius: 2
        }
        let updated = this.state.controls;
        updated.push(new_container);
        for (let i = 0; i<updated.length; i++) {
            updated[i].key = i;
            updated[i].id = i;
        }
        this.setState({controls: updated});
        console.log(this.state.controls);
    }

    addLabel = () => {
        let new_label = {
            key: 0,
            id: 0,
            name: "label",
            x_position: 0,
            y_position: 0,
            text_value: "",
            font_size: 14,
            background_color: "white",
            border_color: "black", 
            border_thickness: 2, 
            border_radius: 2
        }
        let updated = this.state.controls;
        updated.push(new_label);
        for (let i = 0; i<updated.length; i++) {
            updated[i].key = i;
            updated[i].id = i;
        }
        this.setState({controls: updated});
        console.log(this.state.controls);
    }

    addButton = () => {
        let new_button = {
            key: 0,
            id: 0,
            name: "button",
            x_position: 0,
            y_position: 0,
            text_value: "",
            font_size: 14,
            background_color: "white",
            border_color: "black", 
            border_thickness: 2, 
            border_radius: 2
        }
        let updated = this.state.controls;
        updated.push(new_button);
        for (let i = 0; i<updated.length; i++) {
            updated[i].key = i;
            updated[i].id = i;
        }
        this.setState({controls: updated});
        console.log(this.state.controls);
    }
    

    addTextfield = () => {
        let new_textfield = {
            key: 0,
            id: 0,
            name: "textfield",
            x_position: 0,
            y_position: 0,
            text_value: "",
            font_size: 14,
            background_color: "white",
            border_color: "black", 
            border_thickness: 2, 
            border_radius: 2
        }
        let updated = this.state.controls;
        updated.push(new_textfield);
        for (let i = 0; i<updated.length; i++) {
            updated[i].key = i;
            updated[i].id = i;
        }
        this.setState({controls: updated});
        console.log(this.state.controls);
    }

    deleteList = () => {
        let fireStore = getFirestore();
        fireStore.collection('wireframes').doc(this.props.todoList.id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

        this.props.history.goBack();
    }

    sortList = (criteria) => {
        console.log("Sorting by: ", this.sortCriteria);
        let newItems = this.generateItemsInSortedOrder(criteria);
        for (let i = 0; i < newItems.length; i++) {
            newItems[i].key = i;
            newItems[i].id = i;
        }

        let firestore = getFirestore();
        firestore.collection("wireframes").doc(this.props.todoList.id).update({ items: newItems });
    }

    selectControl = (control, e) => {
        e.stopPropagation();
        let x  = control; 
        if (this.state.currentControl === x) {
            this.setState({currentControl: ''});
        }
        else{
            console.log(this.state.currentControl);
            this.setState({currentControl: control});
            console.log(this.state.currentControl);
        }
    }

    getBorderThickness = () => {
        if(this.state.currentControl !== ''){
            let x = document.getElementById("border_thickness_input").value;
            this.state.currentControl.border_thickness = x;
            console.log("border thickness");
        }
    }

    setBorderThickness = () => {
        // let x = document.getElementById("border_thickness_input");
        // this.state.currentControl.style.border_thickness = x;
    }

    setNewProperties = () => {
        this.setBorderThickness();
    }



    render() {
        const auth = this.props.auth;
        let todoList = this.props.todoList;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if (!todoList)
            return <React.Fragment />

        if (!this.changedTime) {
            this.changedTime = true;
            this.updateTime();
        }

        return (
            <div className="row grey lighten-2">
                <div className = "col s3 left_component">
                    <div className = "row grey toolbar">
                        <div className = "col">
                            <div className = "row">
                                <div className = "btn zoom_in col">+</div>
                                <div className = "btn zoom_out col">-</div>
                                <div className = "btn save col" onClick = {this.handleChange()}>Save</div>
                                <Link to="/" className = "btn close col ">Close</Link>
                            </div>
                        </div>
                    </div>
                    <div className = "container_control center-align">
                        <div className = "container_object center-align" onClick = {this.addContainer}></div> 
                        <div className = "container_word center-align">Container</div>
                    </div>
                    <div className = "label_control center-align">
                        <div className = "label_object center-align" onClick = {this.addLabel}>Prompt For Input:</div>
                        <div className = "label_word center-align">Label</div>
                    </div>
                    <div className = "button_control">
                        <div className = "button_object" onClick = {this.addButton}>
                            Submit
                        </div>
                        <div className = "button_word center-align">Button</div>
                    </div>
                    <div className = "textfield_control">
                        <div className = "textfield_object" onClick = {this.addTextfield}>
                            Input
                        </div>
                        <div className = "textfield_word center-align">Textfield</div>
                    </div>
                </div>
                <div className = "col s6 middle_component">
                    <div className = "row">
                        {/* <div className = "col s12"> */}
                            <div id = "workspace_div" className = "default_container center-align" style = {default_container_style} >
                                    <ItemsList controls = {this.state.controls} selectControl = {this.selectControl}/>
                            </div>
                        {/* </div> */}
                    </div>
                    <div className = "row">
                        <div className = " workspace_dimensions_container center-align">
                                <div className = "row center-align">Workspace Dimensions</div>
                                <div className = "row">
                                    <input value = {this.state.height} type = "text" className = "col s2 push-s5 center-align workspace-dimension" id = "workspace_height"
                                    contenteditable = "true" onChange = {() => {this.getWorkspaceHeight()}} />
                                    <label for = "workspace_height">Height</label>

                                </div>
                                <div className = "row">
                                    <input value = {this.state.width} type = "text" className = "col s2 push-s5 center-align workspace-dimension"  id = "workspace_width" 
                                    contenteditable = "true" onChange = {() => {this.getWorkspaceWidth()}}/>
                                    <label for = "workspace_width">Width</label>
                                </div>
                                <div className = "row" >
                                    <div className = "btn col s2 push-s5 center-align" onClick = {() => this.setWorkspaceDimensions()}>
                                        Update
                                    </div>

                                </div>
                        </div>
                    </div>
                </div>
                <div className = "col s3 right_component">
                    <div className = "row center-align">Properties</div>
                    <div className = "row center-align">temp for changing text value</div>
                    <div className = "row center-align font_container">
                        <div className = "col s6">Font Size: </div>
                        <input value = {this.state.currentControl.font_size} type = "text" className = "col s2 white lighten-2 font_size_input"/>
                    </div>
                    <div className = "row center-align background_container">
                        <div className = "col">Background: </div>
                        <div className = "col">
                            <SketchPicker color = {"FFFFFF"}></SketchPicker>
                        </div>
                    </div>
                    <div className = "row center-align border_color_container">
                        <div className = "col">Border Color: </div>
                        <div className = "col">
                            <SketchPicker color = {"FFFFFF"}></SketchPicker>
                        </div>
                    </div>
                    <div className = "row center-align border_thickness_container">
                        <div className = "col">Border Thickness: </div>
                        <input
                        value = {this.state.currentControl.border_thickness} type = "text" className = "col s2 white lighten-2 border_thickness_input"
                        onChange = {this.getBorderThickness()} id = "border_thickness_input"/>
                    </div>
                    <div className = "row center-align border_radius_container">
                        <div className = "col">Border Radius: </div>
                        <input value = {this.state.currentControl.border_radius} type = "text" className = "col s2 white lighten-2 border_radius_input"/>
                    </div>
                    <div className = "row center-align">
                        <div className = "btn" onClick = {this.setNewProperties()}>Update Properties</div>
                    </div>
                </div>
            </div>
        );
    }

    getWorkspaceHeight(){
        this.setState ({height: document.getElementById("workspace_height").value});
    }

    getWorkspaceWidth = () => {
        this.setState ({width: document.getElementById("workspace_width").value});
    }

    setWorkspaceHeight = () => {
        this.setState ({height: document.getElementById("workspace_height").value});
        console.log(this.state.height);
        console.log(document.getElementById("workspace_div").style.height);
        let temp = this.state.height + "px"
        document.getElementById("workspace_div").style.height = temp;
        console.log(document.getElementById("workspace_div").style.height);
    }

    setWorkspaceWidth = () => {
        this.setState ({width: document.getElementById("workspace_width").value})
        console.log(this.state.width);
        console.log(document.getElementById("workspace_div").style.width);
        let temp = this.state.width + "px"
        document.getElementById("workspace_div").style.width = temp;
        console.log(document.getElementById("workspace_div").style.width);
    }

    setWorkspaceDimensions = () => {
        this.setWorkspaceHeight();
        this.setWorkspaceWidth();
    }
}

const SORT_BY_TASK_INCREASING = 'sort_by_task_increasing';
const SORT_BY_TASK_DECREASING = 'sort_by_task_decreasing';
const SORT_BY_DUE_DATE_INCREASING = 'sort_by_due_date_increasing';
const SORT_BY_DUE_DATE_DECREASING = 'sort_by_due_date_decreasing';
const SORT_BY_STATUS_INCREASING = 'sort_by_status_increasing';
const SORT_BY_STATUS_DECREASING = 'sort_by_status_decreasing';

const default_container_style = {
    height: '450px',
    width: '450px',
    backgroundColor: 'white',
    margin: '30px auto auto',
    borderStyle: 'solid',
    borderColor: 'black',
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

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { wireframes } = state.firestore.data;
    const todoList = wireframes ? wireframes[id] : null;
    if (todoList)
        todoList.id = id;

    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes' },
    ]),
)(ListScreen);