import FootCard from "./FootCard.jsx";
import "./footprint.css"
export default function FootPrint(){
    return (
        <div id="mot">
        <h2 id="FootP">Our Footprint</h2>
        <p id="exp">The expanse of our bussiness and customer reach</p>
        <br></br>  <br></br>
        <div id="box1">
        <div id="up">
            <FootCard dis1="16.Mn +" dis2="Lifetime Transacted Users"/>
            <FootCard dis1="15.6k +" dis2="Instagram Followers"/>
            <FootCard dis1="40 Mn +" dis2="Customers visited"/>
            <FootCard dis1="30y +" dis2="Experiece"/>


        </div >

        <div id="dow">
        <FootCard dis1="3k" dis2="Our Hotel Patners"/>
        <FootCard dis1="1 Mn +" dis2="Reviews"/>
        <FootCard dis1="5k +" dis2="Cities Covered"/>
        <FootCard dis1="2k +" dis2="Positive Tweets"/>

        </div>

        </div>
        </div>
    );
}