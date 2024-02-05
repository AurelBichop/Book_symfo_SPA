import 'bootstrap/dist/css/bootstrap.min.css';
import {h, render} from 'preact';
import {Router, Link} from "preact-router";
import Home from './pages/home';
import Conference from './pages/conference';
import {useEffect, useState} from "preact/hooks";
import {findConferences} from "./api/api";

function App() {

    const [conferences, setConferences] = useState(null);

    useEffect(() => {
            findConferences().then((conferences) => setConferences(conferences));
        }, []);

    if (conferences === null) {
        return <div className="text-center pt-5">Loading...</div>;
    }


    return (
        <div>
            <header className="header">
                <nav className="navbar navbar-light bg-light">
                    <div className="container">
                        {conferences.map((conference) => (
                            <Link className="nav-conference" href={'/conference/'+conference.slug}>
                                    {conference.city} {conference.year}
                            </Link>
                        ))}
                    </div>
                </nav>
            </header>

            <Router>
                <Home path="/" conferences={conferences} />
                <Conference path="/conference/:slug" conferences={conferences} />
            </Router>
        </div>
    )
}

render(<App />, document.getElementById('app'));