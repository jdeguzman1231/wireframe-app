import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';


class HomeScreen extends Component {
    handleNewWireframe = () => {
        let newWireframeData = {
            name: 'Unnamed wireframe',
            owner: 'Unknown owner',
            items: [],
            time: Date.now(),
        }
        const fireStore = getFirestore();
        let newList = fireStore.collection("todoLists").doc();
        newList.set(newWireframeData);

        this.props.history.push({
            pathname: "todoList/" + newList.id,
            key: newList.id,
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="z-depth-2" style={{
                backgroundColor: "#55435f", paddingBottom: '70px', borderRadius: '0 0 10px 10px',
                backgroundImage: 'linear-gradient(to bottom, #7F5A95, #473850)'
            }}>
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m4">
                            <TodoListLinks />
                        </div>

                        <div className="col s8">
                            <div className="banner">
                                Wireframer&trade;
                        </div>

                            <div style={{ paddingTop: '15px' }} className="home_new_list_container center-align">
                                {/* {<button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>} */}
                                <a onClick={this.handleNewWireframe} className="waves-effect waves-light btn-large red accent-2 hoverable rounded">
                                    <i className="material-icons right">library_add</i>Create a New Wireframe
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <Modal id="modal1" header="Delete List?" actions={
                        <div className="grey lighten-2">
                            <Button className="red accent-2" tooltip="The list will not be retrievable." tooltipOptions={{ position: 'top' }}
                                onClick={this.deleteList} modal="close">Yes</Button><span>  </span>
                            <Button className="purple lighten-2" modal="close">No</Button>
                        </div>}>
                        <p><b>Are you sure you want to delete this list?</b></p>
                    </Modal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists', orderBy: ["time", "desc"] },
    ]),
)(HomeScreen);