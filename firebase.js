import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyADtKUw7p-vDdhSyFWJDjJn_U9yx3OFdwI",
    authDomain: "todolist-21d4c.firebaseapp.com",
    projectId: "todolist-21d4c",
    storageBucket: "todolist-21d4c.appspot.com",
    messagingSenderId: "661013334527",
    appId: "1:661013334527:web:fea4591b2fe785665abfca"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const saveTask = async (description, state) => {
    const docRef = await addDoc(collection(db, "tasks"), {
        description : description,
        state : state
    });
}

export const getAllTasks = () => getDocs(collection(db, "tasks"));

export const onGetAllTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = id => deleteDoc(doc(db,'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);
