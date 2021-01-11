import React from 'react'
import classes from "./Order.module.css"

const LeaseCal = (props) => {
    let style = props.style;
    let plan = props.plan;
    let quantity = props.quantity;
    let period = props.period;
    let creditScore = props.creditScore;
    let carValue = props.carValue;
    let errors = props.errors;
    let leasePrice;

    const calcValue = (style, carValue) => {
        if(style === "BUS") {
            carValue += 3000;
        }
        else if(style === "SUV") {
            carValue += 2500;
        }
        else if(style === "VAN") {
            carValue += 2000;
        }
        else if(style === "TRUCK") {
            carValue += 1500;
        }
        else {
            return (
                <div>
                    We Do not have that Style of vehicle
                </div>
            );
        }
        return carValue;
    }

    const CalLeasePlan = (style, plan, quantity, period, creditScore, carValue) => {
        const carWorth = calcValue(style, carValue);
        leasePrice = carWorth / 60;
        if (creditScore >= 500 && period > 0 && quantity > 0 && plan != null) {
            if (plan === "Monthly") {
                leasePrice *= period * quantity;
            } else if (plan === "Weekly") {
                leasePrice *= period * quantity / 4.0;
            } else if (plan === "Daily") {
                leasePrice *= period * quantity / 30.0;
            } else if (plan === "Hourly") {
                leasePrice *= period * quantity / 720.0;
            }else if (plan === "" || plan === " ") {
                return (
                    <div className={classes.error_feedback}>
                        Select a Plan
                    </div>
                );
            }

        } else if(creditScore < 500 || creditScore == null){
            return (
                <div className={classes.error_feedback}>
                    Your Credit Score is too Low
                </div>
            );
        }
        else if(period < 0 || period == null){
            return (
                <div className={classes.error_feedback}>
                    Enter A valid Period
                </div>
            );
        }
        else if(quantity < 0 || quantity == null){
            return (
                <div className={classes.error_feedback}>
                    The quantity entered is invalid
                </div>
            );
        }
        else {
            return (
                <div className={classes.error_feedback}>
                    You Entered an invalid Input
                </div>
            );
        }
        return leasePrice.toFixed(2);
    }
    return (
        <div className={classes.summary}>
           <div> Style : {style}</div> 
           <div>Value: {carValue}</div>
           <div>Plan: {plan}</div> 
           <div>Quantity: {quantity}</div> 
           <div>Period: {period}</div> 
         <div>Lease Price :   <strong>{CalLeasePlan(style, plan, quantity, period, creditScore, carValue)}</strong></div>
         <div><p>{errors}</p></div>
        </div>
    )
}

export default LeaseCal;