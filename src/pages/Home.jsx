import { useState, useEffect } from "react";
import api from "../api";
import Tiffin from "../components/Tiffins"
import "../styles/Home.css"


function Home() {
    const [tiffins, setTiffins] = useState([]);
    const [tiffin_number, setNumber] = useState("");
    const [tiffin_mohalla, setMohalla] = useState("");
    const [payment_status, setPaymentStatus] = useState("");

    useEffect(() => {
        getTiffins();
    }, []);

    const getTiffins = () => {
        api
            .get("/api/tiffins/")
            .then((res) => res.data)
            .then((data) => {
                setTiffins(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteTiffin = (id) => {
        api
            .delete(`/api/tiffins/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Tiffin deleted!");
                else alert("Failed to delete tiffin");
                getTiffins();
            })
            .catch((error) => alert(error));
    };

    const createTiffin = (e) => {
        e.preventDefault();
        api
            .post("/api/tiffins/", { tiffin_number, tiffin_mohalla, payment_status })
            .then((res) => {
                if (res.status === 201) alert("Tiffin created!");
                else alert("Failed to make Tiffin");
                getTiffins();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Tiffins</h2>
                {tiffins.map((tiffin) => ( <Tiffin tiffin={tiffin} onDelete={deleteTiffin} key={tiffin.id}/>
            ))}
            </div>
            <h2>Create a Tiffin</h2>
            <form onSubmit={createTiffin}>
                <label htmlFor="tiffin_number">Number:</label>
                <br />
                <input
                    type="text"
                    id="tiffin_number"
                    name="tiffin_number"
                    required
                    onChange={(e) => setNumber(e.target.value)}
                    value={tiffin_number}
                />
                <label htmlFor="tiffin_mohalla">Mohalla:</label>
                <br />
                <textarea
                    id="tiffin_mohalla"
                    name="tiffin_mohalla"
                    required
                    value={tiffin_mohalla}
                    onChange={(e) => setMohalla(e.target.value)}
                ></textarea>
                <br />
                <label className="tiffin-payment_status">Payment Status:</label>
                <br />
                <input
                    type="checkbox"
                    id="payment_status"
                    name="payment_status"
                    checked={payment_status}
                    className="large-checkbox"
                    onChange={(e) => setPaymentStatus(e.target.checked)}
                />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
        
    );
}

export default Home;

