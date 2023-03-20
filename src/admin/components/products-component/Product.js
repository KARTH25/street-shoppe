import React, { useEffect, useState, useRef } from "react";
import { Storage } from "../../../firebaseConfig";
import { useDispatch } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { notifierSliceActions } from "../../../store/notifierSlice";
import { baseApiCallService } from "../../../services/baseApiCallService";
import { useSelector } from "react-redux";
import { productGridConstants } from "../../constants/ProductGridConstants";
import UiGrid from "../../../grid/components/Grid";
import Swal from 'sweetalert2';
import './Product.css';
import $ from 'jquery';

function Product(){

    // dispatch constant
    const dispatch = useDispatch();

    // Form validator initial values
    const formValidators = { 
        productName : { type : '', validator : (value) => { return value !== " " && value.length > 0 }, errorMessage : 'Name cannot be empty' }, 
        quantity : { type : '', validator : (value) => { return (value !== " " && value.length > 0) }, errorMessage : 'Quantity cannot be empty' }, 
        price : { type : '', validator : (value) => { return (value !== "", value > 0) }, errorMessage : 'Price cannot be empty' }, 
        tag : { type : '', validator : (value) => { return (value !== "", value.length > 0)}, errorMessage : 'Please select categories' }, 
        image : { type : '', validator : (value) => { return (value !== "", value.length > 0)}, errorMessage : 'Please select product image' } 
    }

    // State related vars

    // State to hold productList data for grid
    const [productList, setProductList] = useState([]); 
    // state to initialize form validators
    const [formValidator, setFormValidator] = useState(formValidators); 
    // state to get and set selected rows initialized with null
    const [selectedRows, setSelectedRows] = useState(null); 
    // state to get and set the progress bar related configs on uploading image
    const [progressBarConfigs, setProgressBarConfigs] = useState({ showProgressBar : false, progress : 0 }); 
    // state to get and set image name after uploading to storage
    const [imageName, setImageName] = useState('');
    // state to get and set action type
    const [actionType, setActionType] = useState('Add');
    // state to clear all selected Rows
    const [clearAllRows, setClearAllRows] = useState(false);
    
    // ref to get and set form data
    const formDataRef = useRef({ productName : '', quantity : '', price : ''});
    
    // Selector to get product categories that were stored initially on load
    const productCategories = useSelector(state => state.uiConfigs.uiConfigs.categories);


    // Method to get selected rows
    const getSelectedRows = (rows) => {
        setSelectedRows(rows);
        setClearAllRows(false);
    }

    // Method to validate form fields 
    const formValidationHandler = (field, value) => {
        // Assigning with default value
        const validation = formValidator;

        let formattedValue;
        
        // If type is Add and field value is tag using jquery to fetch the selected product categories value for validating the field
        if(actionType === 'Add' && field === 'tag'){
            formattedValue = [];
            $('input[name="productCategories"]:checked').each(function() {
                formattedValue.push(this.value);
            });
        }
        // Else for other fields setting the value set using Ref
        else{
            formattedValue = value;
        }

        // based on the field name validating the value using corresponding field validator function and set success or error based on validator function return value
        validation[field] = (validation[field].validator(formattedValue)? { ...validation[field], type : 'success' } : { ...validation[field], type : 'error' });

        // setting the updated field validation
        setFormValidator({...validation});
    }

    // Method to set validation type 
    const setValidationType = (type, all=false) => {
        let validation = {};

        Object.keys(formValidator).forEach(field => {
            if(all === false){
                (formValidator[field].type === '')?  validation[field] = { ...formValidator[field], type: type } : validation[field] = { ...formValidator[field] }
            }
            else if(all === true){
                validation[field] = { ...formValidator[field], type: type };
            }    
        })

        setFormValidator({...validation});
    }

    // Method to open modal on Add and Edit operations
    const openModal = (type) => {
        // Performing reset on pre modal open
        resetFormValues(type,'pre');
        
        // Field to initialized with value during modal open
        const fields = ['productName','quantity','price'];
        // Field to be set with initial validations during modal open
        const validationFields = ['productName','quantity','price','image','tag'];

        // If type is add setting all the fields with empty value during modal open
        if(type === 'Add'){
            fields.forEach((field) => formDataRef.current[field].value = "");
        }
        // If type is edit setting all the field with the corresponding attribute value of selected rows
        else if(type === 'Edit'){
            fields.forEach((field) => formDataRef.current[field].value = selectedRows[field]);

            // setting initial validation over field during pre filled modal opened with edit
            validationFields.forEach((field) => {
                formValidationHandler(field, selectedRows[field]);
            })
        }

        // Opening Modal with assigned values based on Add or Edit action
        document.getElementById('modalButton').click();

        // Performing reset on post modal open
        resetFormValues(actionType, 'post')
    }

    // Method to reset form Values during Add and Edit opertaions during pre and post modal open
    const resetFormValues = (actionType, state) => {
        // On pre modal open
        if(state === 'pre'){
            // setting action type
            setActionType(actionType);
            // initializing progress with initial values
            setProgressBarConfigs({ showProgressBar : false, progress : 0 });
            // setting formValidators validators to initial values using setValidationType method
            setValidationType('', true);
        }
        // On post modal open
        else if(state === 'post'){
            //By default for add and edit clearing if any previous selected values is present
            $.each(productCategories, function(i, val){
                $("input[value='" + val + "']").prop('checked', false);
            });

            // If actionType is Edit setting the values to be checked based on the tags in selected row
            if(actionType === 'Edit'){
                $.each(selectedRows['tag'], function(i, val){
                    $("input[value='" + val + "']").prop('checked',true);
                });

                // setting image name if action type is edit from selected rows value
                setImageName(selectedRows['image']);
            }

            // Clearing the image field value if any value set previously
            $('#image-field').val('');
        }
    }

    // Method to save the add and edit product data
    const addOrEditProduct = () => {
        // Initializing a value attribute
        let value = {};
        // Initializing a categories array
        let categories = [];

        // Validating if any error in fields
        if(!(Object.keys(formValidator).map((val) => formValidator[val].type).every((val) => val === "success" ))){
            setValidationType('error')
            return
        }

        // If no error assigning all values from formDataRef to value
        Object.keys(formDataRef.current).forEach((key) => {
            value[key] = formDataRef.current[key].value;
        })

        // Getting selected categories
        $('input[name="productCategories"]:checked').each(function() {
            categories.push(this.value);
        });

        // Assiging categories
        value['tag'] = categories;
        // Assiging image name
        value['image'] = imageName;
        // Assiging username
        value['updatedBy'] = "Karthick";
        // Assigning sellername
        value['sellerName'] = "Street Shoppe";
        
        // Closing modal after getting all infromation
        document.getElementById('modalButton').click();
        // Assiging url based on actionType
        let url = ((actionType === 'Add')? '/api/data/streetshoppe/products.json' : `/api/data/streetshoppe/products/${selectedRows['id']}.json`);
        // Assiging baseApiCallService Method based on actionType
        let method = ((actionType === 'Add')? baseApiCallService.post(url, value) : baseApiCallService.put(url, value))

        // Calling API
        method.then(res => {
            if(res.status === 200 && res.data){
                // displaying alert based on actionType
                dispatch(notifierSliceActions.alertInfo({ alertInfo : {showAlert : true, message : `Product ${actionType.toLowerCase()}ed successfully !`, type : 'success'} }));
                //Clearing all selected Rows
                setClearAllRows(true);
                // Fetching the updated product list
                getProductList();
            }
        })
    }

    // Method to delete product
    const deleteProduct = () => { 
        
        Swal.fire({
            title : 'Confirmation',
            text : 'Please confirm removing this product',
            showConfirmButton : true,
            showCancelButton : true,
            confirmButtonText : 'Remove',
            cancelButtonColor : 'Cancel',
            confirmButtonColor : 'black',
        }).then((confirm) => {
            if(confirm.isConfirmed){
                // Calling API to delete product
                baseApiCallService.delete(`/api/data/streetshoppe/products/${selectedRows['id']}.json`).then(res => {
                    if(res.status === 200){
                        // displaying alert based on actionType
                        dispatch(notifierSliceActions.alertInfo({ alertInfo : {showAlert : true, message : `Product deleted successfully !`, type : 'success'} }));
                        // Clearing all rows
                        setClearAllRows(true);
                        // Fetching the updated product list
                        getProductList();
                    }
                })
            }
        })
    }

    const fileUploadHandler = (event) => {

        let validation = formValidator;

        validation['image'] = { ...formValidator['image'], type : 'success' };

        setFormValidator({ ...validation });

        setProgressBarConfigs({ showProgressBar : true, progress : 10 });

        const storageRef = ref(Storage, `/files/${formDataRef.current.productName.value}`);

        const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);

        uploadTask.on("state_changed",(snapshot) => {

            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
                // update progress
                setProgressBarConfigs({ showProgressBar : true, progress : percent });
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImageName(url);
                    setProgressBarConfigs({ showProgressBar : false, progress : 100 });
                });
            }
        );
    }

    const getProductList = () => {
        baseApiCallService.get('/api/data/streetshoppe/products.json').then(res => {
            if(res.status === 200 && res.data){
                let products = [];
                Object.keys(res.data).forEach((key) => {
                   let formattedData = res.data[key];
                   formattedData['id'] = key;
                   products.push(formattedData);  
                })

                setProductList([...products])
            }
        })
    }

    useEffect(() => {
        getProductList();
    },[]);



    return (
        <div className="container-fluid street_shoppe_bg">

            <button type="button" id="modalButton" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{actionType} Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="productName" className="form-label" id="productName">Name</label>
                                    <input type="text" className="form-control" name="productName" placeholder="Enter Product Name" onKeyUp={() => formValidationHandler('productName',formDataRef.current['productName'].value)} ref = {ref => formDataRef.current.productName = ref}/>
                                    { (formValidator['productName']['type'] === 'error') && (<div className="mt-2 text-danger">{formValidator['productName']['errorMessage']}</div>) } 
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="categories" className="form-label" id="categories">Categories</label>
                                    {
                                        productCategories.map((categories) => (
                                            <div class="form-check" key={categories}>
                                                <input type="checkbox" class="form-check-input" id="productCategories" name="productCategories" value={categories} onChange={() => formValidationHandler('tag','')}/>
                                                <label className="form-check-label" htmlFor="productCategories" name="productCategories">{categories}</label>
                                            </div>
                                        ))
                                    }
                                    { (formValidator['tag']['type'] === 'error') && (<div className="mt-2 text-danger">{formValidator['tag']['errorMessage']}</div>) }
                                </div>
                                

                                <div className="form-group mt-3">
                                    <label htmlFor="productPrice" className="form-label" id="productPrice">Price</label>
                                    <input type="text" className="form-control" name="productPrice" placeholder="Enter Product Price" onKeyUp={() => formValidationHandler('price',formDataRef.current['price'].value)} ref = {ref => formDataRef.current.price = ref}/>
                                    { (formValidator['price']['type'] === 'error') && (<div className="mt-2 text-danger">{formValidator['price']['errorMessage']}</div>) }
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="productQuantity" className="form-label" id="productQuantity">Quantity</label>
                                    <input type="text" className="form-control" name="productQuantity" placeholder="Enter Product Quantity" onKeyUp={() => formValidationHandler('quantity',formDataRef.current['quantity'].value)} ref = {ref => formDataRef.current.quantity = ref}/>
                                    { (formValidator['quantity']['type'] === 'error') && (<div className="mt-2 text-danger">{formValidator['quantity']['errorMessage']}</div>) }
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="productImage" className="form-label" id="productImage">Image</label>
                                    <input type="file" className="form-control" name="productImage" id="image-field" placeholder="Upload Product Image" onChange={fileUploadHandler} defaultValue={imageName}/>
                                    {
                                        (progressBarConfigs.showProgressBar === true) && (
                                            <div className="progress m-2">
                                                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ "width": progressBarConfigs.progress + '%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        )
                                    }
                                    { (formValidator['image']['type'] === 'error') && (<div className="mt-2 text-danger">{formValidator['image']['errorMessage']}</div>) }
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={addOrEditProduct}>{actionType}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-6">
                    <div>
                        <button className="btn btn-md btn-success m-1" onClick={() => openModal('Add')}>Add</button>
                        <button className="btn btn-md btn-warning m-1" onClick={() => openModal('Edit')} disabled={selectedRows === null}>Edit</button>
                        <button className="btn btn-md btn-danger m-1" onClick={deleteProduct} disabled={selectedRows === null}>Delete</button>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <UiGrid selectedRows={getSelectedRows} data={productList} gridMetaData={productGridConstants} deselectAll={clearAllRows}></UiGrid>
                </div>
            </div>
        </div>
    )
}

export default Product;