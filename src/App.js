import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Form from "./components/Admin/Form";
import ViewOne from "./components/Admin/ViewOne";
import AdminComponent from "./components/Admin/AdminComponent";
import About from "./components/Customer/About";
import Home from "./components/Customer/Home";


function App() {
    return (
        <div>
            <Router>
                <Route exact path="/form" component={Form}/>
                <Route exact path="/view" component={ViewOne}/>
                <Route exact path="/admin" component={AdminComponent}/>
                <Route path="/about" component={About}/>
                <Route exact path="/" component={Home}/>
            </Router>
        </div>
    );
}

export default App;
