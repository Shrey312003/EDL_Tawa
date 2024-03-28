import { useFormik } from 'formik';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';

//styling
const CreateStyles = () => {
    return {
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            margin: 'auto',
            maxWidth: '400px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '5px',
            backgroundColor: '#ffffff',
            marginTop: '30px'
        },
        inputField: {
            marginBottom: '8px',
            width: '100%',
        },
        loginButton: {
            padding: '10px 0',
            marginBottom: '10px',
        },
        link: {
            textDecoration: 'none',
            margin: '5px 0',
        },
        checkboxLabel: {
            alignSelf: 'flex-start',
            margin: '0 0 20px 0',
        },   
    }
}


const Create = () => {
    
    const navigate = useNavigate();

    const onSubmit = async (values,actions) => {
        console.log(values);

        try{
            const Temp = [0,values.Temp1,values.Temp2,values.Temp3];
            const time = [0,values.time1,values.time2,values.time3];

            const db_val = {
                title: values.title,
                Temp: Temp,
                time: time
            }

            const db = getFirestore();
            const colRef = collection(db,"profiles");

            const response = await addDoc(colRef,db_val);

            console.log(response);
            
            console.log("Modal Created");
            actions.resetForm();
            
            navigate("/profile");

        }
        catch(error){
            console.log(error);
        }
        
        
        // try{
        //     console.log(values);
        //     const response = await axios.post(baseURL,values);
            
        //     console.log(response);
        //     console.log("Modal Created");
        //     navigate("/")
        //     actions.resetForm();
            
        // }catch(error){
        //     console.log(error);
        // }
    }
    
    const styles = CreateStyles();

    //formik initilizations for form control 
    const {
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        isSubmitting,
        handleSubmit,
    } = useFormik({
        initialValues: {
            title: '',
            Temp1: null,
            Temp2: null,
            Temp3: null,
            time1: null,
            time2: null,
            time3: null,
        },
        onSubmit
    });
    

    return ( 
        <Box sx={styles.formContainer}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Create Profile
            </Typography>
            <form id="form_id" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    label="Title"
                    variant="outlined"
                    name="title"
                    type="text"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={errors.title && touched.title}
                />
                <TextField
                    label="Preheat Temperature"
                    variant="outlined"
                    name="Temp1"
                    type="number"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Temp1}
                    error={errors.Temp1 && touched.Temp1}
                />

                <TextField
                    label="Soak Temperature"
                    variant="outlined"
                    name="Temp2"
                    type="number"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Temp2}
                    error={errors.Temp2 && touched.Temp2}
                />
                <TextField
                    label="Peak Temperature"
                    variant="outlined"
                    name="Temp3"
                    type="number"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Temp3}
                    error={errors.Temp3 && touched.Temp3}
                />
                <TextField
                    label="Preheat time"
                    variant="outlined"
                    name="time1"
                    type="number"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.time1}
                    error={errors.time1 && touched.time1}
                />
                <TextField
                    label="Soak Time"
                    variant="outlined"
                    name="time2"
                    type="number"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.time2}
                    error={errors.time2 && touched.time2}
                />
                <TextField
                    label="Peak time"
                    variant="outlined"
                    name="time3"
                    type="number"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.time3}
                    error={errors.time3 && touched.time3}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={styles.loginButton}
                    disabled={isSubmitting}
                    type="submit" // This should be 'submit' to trigger Formik's handleSubmit
                >
                    Create
                </Button>
                
            </form>
        </Box>
    );
}
 
export default Create ;