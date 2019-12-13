import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {SketchPicker} from 'react-color';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    sortCriteria = 'none';;         oo    
    changedTime = false;

    updateTime = () => {
        console.log("updating time")
        let fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({ time: Date.now() })
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        const fireStore = getFirestore();
        let dbitem = fireStore.collection('todoLists').doc(this.props.todoList.id);
        dbitem.update({ [target.id]: target.value });
    }

    addItem = () => {
        console.log("Adding a new item");
        this.props.history.push({
            pathname: this.props.todoList.id + "/item/" + this.props.todoList.items.length,
        });
    }

    deleteList = () => {
        let fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

        this.props.history.goBack();
    }

    sortByDescription = () => {
        if (this.sortCriteria !== SORT_BY_TASK_INCREASING)
            this.sortCriteria = SORT_BY_TASK_INCREASING
        else
            this.sortCriteria = SORT_BY_TASK_DECREASING;
        this.sortList(this.sortCriteria);
    }

    sortByDueDate = () => {
        if (this.sortCriteria !== SORT_BY_DUE_DATE_INCREASING)
            this.sortCriteria = SORT_BY_DUE_DATE_INCREASING;
        else
            this.sortCriteria = SORT_BY_DUE_DATE_DECREASING;
        this.sortList(this.sortCriteria);
    }

    sortByCompleted = () => {
        if (this.sortCriteria !== SORT_BY_STATUS_INCREASING)
            this.sortCriteria = SORT_BY_STATUS_INCREASING;
        else
            this.sortCriteria = SORT_BY_STATUS_DECREASING;
        this.sortList(this.sortCriteria);
    }

    sortList = (criteria) => {
        console.log("Sorting by: ", this.sortCriteria);
        let newItems = this.generateItemsInSortedOrder(criteria);
        for (let i = 0; i < newItems.length; i++) {
            newItems[i].key = i;
            newItems[i].id = i;
        }

        let firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.id).update({ items: newItems });
    }

    generateItemsInSortedOrder = (criteria) => {
        let newItems = Object.assign([], this.props.todoList.items);
        newItems.sort(function (a, b) {
            if (criteria === SORT_BY_TASK_INCREASING)
                return a.description.localeCompare(b.description);
            else if (criteria === SORT_BY_TASK_DECREASING)
                return b.description.localeCompare(a.description);
            else if (criteria === SORT_BY_DUE_DATE_INCREASING)
                return a.due_date.localeCompare(b.due_date);
            else if (criteria === SORT_BY_DUE_DATE_DECREASING)
                return b.due_date.localeCompare(a.due_date);
            else if (criteria === SORT_BY_STATUS_INCREASING)
                return ("" + a.completed).localeCompare("" + b.completed);
            else
                return ("" + b.completed).localeCompare("" + a.completed);
        });
        return newItems;
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
                                <div className = "btn save col">Save</div>
                                <div className = "btn close col">Close</div>
                            </div>
                        </div>
                    </div>
                    <div className = "container_control center-align">
                        <div className = "container_object center-align"></div> 
                        <div className = "container_word center-align">Container</div>
                    </div>
                    <div className = "label_control center-align">
                        <div className = "label_object center-align">Prompt For Input:</div>
                        <div className = "label_word center-align">Label</div>
                    </div>
                    <div className = "button_control">
                        <div className = "button_object">
                            Submit
                        </div>
                        <div className = "button_word center-align">Button</div>
                    </div>
                    <div className = "textfield_control">
                        <div className = "textfield_object">
                            Input
                        </div>
                        <div className = "textfield_word center-align">Textfield</div>
                    </div>
                </div>
                <div className = "col s6 middle_component">
                    <div className = "row">
                        <div className = "col s12">
                            <div className = "default_container center-align">
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "col s3 right_component">
                    <div className = "row center-align">Properties</div>
                    <div className = "row center-align">temp for changing text value</div>
                    <div className = "row center-align font_container">
                        <div className = "col s6">Font Size: </div>
                        <input type = "text" className = "col s2 white lighten-2 font_size_input"/>
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
                    </div>
                    <div className = "row center-align border_radius_container">
                        <div className = "col">Border Radius: </div>
                    </div>
                </div>
            </div>
        );
    }
}

const SORT_BY_TASK_INCREASING = 'sort_by_task_increasing';
const SORT_BY_TASK_DECREASING = 'sort_by_task_decreasing';
const SORT_BY_DUE_DATE_INCREASING = 'sort_by_due_date_increasing';
const SORT_BY_DUE_DATE_DECREASING = 'sort_by_due_date_decreasing';
const SORT_BY_STATUS_INCREASING = 'sort_by_status_increasing';
const SORT_BY_STATUS_DECREASING = 'sort_by_status_decreasing';

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
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
        { collection: 'todoLists' },
    ]),
)(ListScreen);