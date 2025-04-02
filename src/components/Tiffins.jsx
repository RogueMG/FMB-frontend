import React from "react"
import "../styles/Tiffin.css"

function Tiffin({tiffin, onDelete}) {

    const formattedDate = new Date(tiffin.last_updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Use false for 24-hour format
      });

    return <div className="tiffin-container">
        <p className="tiffin-tiffin_number">{tiffin.tiffin_number}</p>
        <p className="tiffin-tiffin_mohalla">{tiffin.tiffin_mohalla}</p>
        <p className="tiffin-payment_status">{tiffin.payment_status ? "Paid" : "Not Paid"}</p>
        <p className="tiffin-last_updated">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(tiffin.id)}>
            Delete
        </button>

    </div>
}

export default Tiffin