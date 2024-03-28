import { useEffect, useState } from "react";
import {getFirestore,collection, getDocs} from "firebase/firestore";
import { useDispatch } from "react-redux";
import dataSlice from "../store/dataSlice";

const useFetch = (collect) => {

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetch = async () => {
            try{
                const db = getFirestore();
                const colRef = collection(db,collect);

                const snapshot = await getDocs(colRef);
                const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                dispatch(dataSlice.actions.setProfiles(items));
                setData(items);
                setLoading(false);
                setError(null);
            }

            catch(error){
                console.log(error);
                setError(error);
                setLoading(false);
            }
            
        }

        fetch();
    },[])

    return {data,loading,error};
}
 
export default useFetch;