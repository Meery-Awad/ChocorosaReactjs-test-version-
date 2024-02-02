import { lazy, useEffect, useState } from "react";

import './profile.css'
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/bootstrap.css';
import DropDown from "../../dropdown/dropDown";
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { MenuItem, Select, FormControl } from '@material-ui/core';
import axios from "axios";


const Profile = () => {
    const state = useSelector((state) => state.data);

    const { setShowCartList, setProfileSelectOrder, setCartListFromWhereOpen, userList, setUserList, CurrentUserId, } = useBetween(state.useShareState);


    const columns = [
        { title: 'Order id', field: '_id' },
        { title: 'Name', field: 'userName' },
        { title: 'Date', field: 'date' },
        { title: 'Price', field: 'total', sort: true },

        {
            title: 'Details',
            field: 'details',
            render: (rowData) => (
                <button onClick={() => handleCellClick(rowData)} className="detailsBTN">
                    Details
                </button>
            ),
        },
        {
            title: 'Status',
            field: 'status',
            render: (rowData) => (
                <FormControl >
                    <Select
                        value={rowData.status}
                        onChange={(e) => handleStatusChange(rowData, e.target.value)}
                        className="selectRow"
                        style={{ color: 'green', border: 'none' }}
                    >
                        <MenuItem value="Received" >received</MenuItem>
                        <MenuItem value="In preparation">in preparation</MenuItem>
                        <MenuItem value="Under delivery" >under delivery</MenuItem>
                        <MenuItem value="Done" >done</MenuItem>
                    </Select>
                </FormControl>
            ),
        },

    ];

    const headers = {

        'Content-Type': 'multipart/form-data',
    };

    const handleStatusChange = (rowData, value) => {
        const user = [...userList];
        var lazy = false;

        const formData = new FormData();

        userList.map((item, i) => {

            if (rowData.userId == item._id) {
                formData.append('_iduser', item._id);
                item.userPackage.map((item1, i1) => {
                    if (rowData._id == item1._id) {
                        lazy = true;

                        user[i].userPackage[i1].status = value;
                        formData.append('status', value);
                        formData.append('_iditem', item1._id);


                        axios.post("http://localhost:5000/updateUserStatus", formData, { headers }).then(() => {


                            console.log('success')

                        }).catch((err) => {
                            console.log(err)

                        })
                        setUserList(user);
                    }

                })



            }

        })
        if (lazy == false) {
            userList[0].userPackage.map((item, i) => {
                if (rowData._id == item._id) {

                    user[0].userPackage[i].status = value;
                    setUserList(user);
                }

            })
        }


        rowData.status = value

    }

    const defaultMaterialTheme = createTheme();


    useEffect(() => {
        window.scrollTo(0, 0)


    }, [])
    const handleCellClick = (rowData) => {
        // Access the row ID from rowData

        setShowCartList(true); setProfileSelectOrder(rowData); setCartListFromWhereOpen('Profile')



    }
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectionChange = (rows) => {

        const idRows = rows.map((row) => row._id);

        setSelectedRows(idRows)



    };
    const handleDelete = () => {
        // Implement logic to delete selected rows from your data source
        // For example, filter out the selected rows from your original data

        const updatedData = userList[CurrentUserId].userPackage.filter((row) => { return !selectedRows.includes(row._id) });
        // Update the data source with the modified data
        const user = [...userList];
        const formData = new FormData();

        user[CurrentUserId].userPackage = updatedData;

        formData.append('userId', userList[CurrentUserId]._id);

        formData.append('DeleteArray', JSON.stringify(updatedData));

        axios.post("http://localhost:5000/updateUser", formData, { headers }).then(() => {

            console.log('success')

        }).catch((err) => {
            console.log(err)

        })


        setUserList(user);

        // Clear the selected rows state
        setSelectedRows([]);
    }
    useEffect(() => {

        console.log(userList)
        //    console.log(CurrentUserId)

    }, [userList.length, userList])

    return (
        <>
            <div className="Profile">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />


                <div className="MaterialTable">
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <MaterialTable
                            title='Orderds'
                            columns={columns}
                            data={userList[CurrentUserId].userPackage}
                            options={{
                                selection: true,

                            }}
                            onSelectionChange={handleSelectionChange}
                            actions={[
                                {
                                    tooltip: 'Delete Selected Rows',
                                    icon: 'delete',
                                    onClick: handleDelete,
                                },
                            ]}

                        />
                    </ThemeProvider>
                </div>


            </div>


        </>



    );
}

export default Profile;