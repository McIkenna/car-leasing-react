import React from 'react'

const LeasingCalculation = () => {
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
        if (creditScore >= 500) {
            if (plan === "Monthly") {
                leasePrice *= period * quantity;
            } else if (plan === "Weekly") {
                leasePrice *= period * quantity / 4.0;
            } else if (plan === "Daily") {
                leasePrice *= period * quantity / 30.0;
            } else if (plan === "Hourly") {
                leasePrice *= period * quantity / 720.0;
            }

        } else if(creditScore == null){
            return (
            <div>
                    Please enter your Credit record
                </div>
            )
        }
        else {
            return (
                <div>
                    Your Credit Score is insufficient
                </div>
            );
        }
        return leasePrice;
    }
}

export default LeasingCalculation