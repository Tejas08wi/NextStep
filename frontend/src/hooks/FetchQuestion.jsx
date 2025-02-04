import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data from "../database/data";
import * as Action from '../redux/question_reducer';

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });
useEffect(() => {
setGetData(prev => ({...prev, isLoading: true}));
(async () => {
try {
let question = await data;
if (question.length > 0) { 
    setGetData(prev => ({...prev, isLoading: false}));
    setGetData(prev => ({...prev, apiData: question}));
    dispatch(Action.startExamAction({question: question}));   
} 
else throw new Error("No Question Available");
} catch (error) {
setGetData(prev => ({...prev, isLoading: false}));
setGetData(prev => ({...prev, serverError: error}));
}
})();
},[dispatch]);
return [getData, setGetData];
}
export default useFetchQuestion;