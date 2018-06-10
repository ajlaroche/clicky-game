import React from "react";
import "../styles/mainbody.css";
import "../styles/Header.css";
import "../styles/jumbotron.css";
import "../styles/Footer.css"


const images = [
    { id: 1, name: "kitty", source: "./images/image1.png", clicked: false },
    { id: 2, name: "piggy", source: "./images/image2.png", clicked: false },
    { id: 3, name: "lion", source: "./images/image3.png", clicked: false },
    { id: 4, name: "sunflower", source: "./images/image4.png", clicked: false },
    { id: 5, name: "bull", source: "./images/image5.png", clicked: false },
    { id: 6, name: "deer", source: "./images/image6.png", clicked: false },
    { id: 7, name: "girl", source: "./images/image7.png", clicked: false },
    { id: 8, name: "bee", source: "./images/image8.png", clicked: false },
    { id: 9, name: "monkey", source: "./images/image9.png", clicked: false },
    { id: 10, name: "ducky", source: "./images/image10.png", clicked: false },
    { id: 11, name: "shoosh", source: "./images/image11.png", clicked: false },
    { id: 12, name: "smile", source: "./images/image12.png", clicked: false }
];

class MainBody extends React.Component {

    state = {
        clickedImages: [],
        score: 0,
        topscore: 0,
        randomImage: shuffle(images)
    };

    userClick = (selectedImage) => {


        const found = images.find((element) => {
            return element.id === selectedImage.id;
        });

        //If image has already been clicked, reset all clicked properties to false and score to zero
        if (found.clicked) {
            console.log("You've already clicked this image");
            this.state.clickedImages.forEach((element) => {
                let temp = images.find((item) => {
                    return item.id === element;
                });
                temp.clicked = false;
            });

            this.setState(
                {
                    randomImage: shuffle(images),
                    score: 0,
                    clickedImages: []  //clear array that was keeping track of clicked images
                }, () => {
                    console.log(this.state.clickedImages);
                    console.log(this.state.score, this.state.topscore);
                }
            );

        } else {
            found.clicked = true;  //if images has not already been clicked, set clicked property to true

            console.log(found);

            if (this.state.score === this.state.topscore) {
                this.setState(
                    {
                        randomImage: shuffle(images),
                        score: this.state.score + 1,
                        topscore: this.state.topscore + 1,
                        clickedImages: [...this.state.clickedImages, found.id]  //similar to push method for adding element to array
                    }, () => {
                        console.log(this.state.clickedImages);
                        console.log(this.state.score, this.state.topscore);
                    });
            } else {
                this.setState(
                    {
                        randomImage: shuffle(images),
                        score: this.state.score + 1,
                        clickedImages: [...this.state.clickedImages, found.id]
                    }, () => {
                        console.log(this.state.clickedImages);
                        console.log(this.state.score, this.state.topscore);
                    });
            };
        };
    };

    render() {
        return (
            <div>
                <header className="navbar header">
                    <ul className="nav">
                        <li className="nav-item">
                            <h1>Clicky Game</h1>
                        </li>
                        <li className="nav-item">
                            <h1>Click an Image to Begin!</h1>
                        </li>
                        <li className="nav-item">
                            <h1>Score: {this.state.score} | Top Score: {this.state.topscore}</h1>
                        </li>
                    </ul>
                </header>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Clicky Game!</h1>
                        <p className="lead">Click on an image to earn points, but don't click on any more than once!</p>
                    </div>
                </div>
                <div className="container">

                    <div className="row">
                        {this.state.randomImage.map((item) => (
                            <div className="col-3">
                                <img src={item.source} alt={item.name} data-id={item.id} className="img-thumbnail shadow p-3 mb-5 bg-light rounded" onClick={() => this.userClick(item)} />
                            </div>
                        ))}
                    </div>

                </div>
                <footer className="footer">
                    <span className="footerText"><img className="footerImage" src="./favicon.ico" alt="React Icon"/>   Clicky Game</span>
                </footer>
            </div >
        )
    };
};


//Function shuffles the array using the Fisher-Yates algorithm
function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;

};



export default MainBody;