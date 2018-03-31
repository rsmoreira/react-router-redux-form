import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/*
    redux-form
        reduxForm 
            It is similar to a Connector, however it will help our component to connect directly 
            to the Redux Store, that means, to the reducer we have configured at ../reducers/index.js.
*/
import { Field, reduxForm } from 'redux-form';


class PostsNew extends Component {
    renderField(field) {

        // Added a validation to just show the className has-danger if the user
        // has already touched the field and the field has an error.
        const className = `form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : '' }`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
    }

    render () {
        /*
            Here we're telling to reduxForm what it needs to 'check' when it is 
            executing the Handle Submit.
        */
        const { handleSubmit } = this.props;

        return (

            /*
                form onSubmit
                    It is a form function to enable submits into the form. 
                    This function, its contents, will be executed when the user
                    clicks on Submit button.
            
                handleSubmit
                    It will run the objects wired by the reduxForm to this component, 
                    and if it is everything ok, it will continue calling the method 
                    passed by parameter (this.onSubmit.bind(this)). 
                    Take a look that we are wiring two objects to this component through
                    reduxForm: validate and form. 
                    So, reduxForm will execute our validate function. 

                    >>> handleSubmite won't submit anything, it just a particular part of 
                    reduxForm submit action. <<<
                
                this.onSubmit.bind(this) 
                    It is our particular method executed when the user clicks on the 
                    Submit button. It is called by handleSubmit, as we have wrote.

            */

            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <Field
                    label="Title"
                    name="title"
                    component={ this.renderField }
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={ this.renderField }
                />
                <Field
                    label="Post Cotent"
                    name="content"
                    component={ this.renderField }
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
            </form>
        );
    }
}

/*
    Validation function structure. 
    It must an object (errors), and if it has any value, redux form will consider this form invalid.
    Note that is needed to use the same Field Name, found into our render/form component. 

*/
function validate(values) {
    const errors = {};

    // validate values
    if (!values.title) {
        errors.title = "Enter a title!";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }

    if (!values.content) {
        errors.content = "Enter some content!";
    }

    return errors;
}


/*
    reduxForm({...}) - it wires our component to the formReducer, configured 
    into our ../reducers/index.js
*/
export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(PostsNew);