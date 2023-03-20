import React, { useEffect } from "react";
import $ from 'jquery';

function UiGrid(props){

    const getSelectedRows = (e,rows) => {
        // if checkbox is selected setting the row data
        if(e.target.checked === true)
         props.selectedRows(rows);
        // if checkbox is unchecked setting the selected rows as null
        else
         props.selectedRows(null);
    }

    useEffect(() => {
        $('input[name="check"]').on('change', function () {
            $('input[name="check"]').not(this).prop('checked', false);
        });
    },[props.data]);

    useEffect(() => {
        if(props.deselectAll === true){
            // Clear the selected row
            $("input[name='check']:checked").prop('checked', false);
            // Setting selected row to null
            props.selectedRows(null);
        }
    },[props.deselectAll]);

    return (
        <div className="card">
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            {
                                props.gridMetaData.map((col) => (
                                     <th scope="col" key={col.name}>{col.name}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.data.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <input type="checkbox" name="check" onChange={(e) => getSelectedRows(e, product)} value={product} />
                                    </td>
                                    {
                                        props.gridMetaData.map((col) => (
                                            <td key={col.id}>{product[col.id]}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default UiGrid;