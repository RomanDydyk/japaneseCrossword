import './Game.css';
import {useEffect, useState} from "react";

const template = 
   [0,0,1,0,0,
    0,1,1,0,0,
    1,0,0,1,0,
    1,0,0,1,0,
    1,1,1,1,1];

export function Game() {
    const [color, setColor] = useState("black");
    const [heart, setHeart] = useState(3);

    useEffect(() =>{
        setTimeout(() => {
            if(heart === 0){
                alert("you lose, hahaha");
                document.location.reload();
            }
        }, "100")
    }, [heart]);

    const listItem = template.map((element, index) =>(
        <div className = "cell" key={index} id={index} onClick={() => Draw(index, color)}></div>
    ));

    function drawHeart() {
        let mass = []
        for(let i = 0; i < +heart; i++){
            mass.push(<div className='heart'>&#9829;</div>);
        }
        return mass;
    }
    
    function changeSelectedColor(color){
        setColor(color);
        if(color === "black"){
            document.getElementById('black_pick').classList.add('selected');
            document.getElementById('white_pick').classList.remove('selected');
        }
        else{
            document.getElementById('white_pick').classList.add('selected');
            document.getElementById('black_pick').classList.remove('selected');
        }
    }

    function Draw(cellIndex, color){
        const element = document.getElementById(cellIndex);
        if(!element.classList.contains("black") && !element.classList.contains("white") ){
            let number = color === "black" ? +1 : +0;
            if(template[+cellIndex] === number){
                element.classList.add(`${color}`);
            }
            else{
                setHeart(heart - 1);
                if(template[+cellIndex] === 1){
                    element.classList.add("black");
                    element.classList.add("missed");

                }
                else{
                    element.classList.add("white");
                    element.classList.add("missed");
                }

            }
        }
    }


    function getHorizontalList() {
        const horizontalinfoList = [];
        for(let j = 0; j < 3; j++){
            for(let i = 0; i < 5; i++){
                    horizontalinfoList.push(<div className='info_cell'>{calcColumn(i)[j]}</div>);
            }
        }
        return horizontalinfoList;
    }

    function getVerticalList() {
        const verticalinfoList = [];
            for(let i = 0; i < 5; i++){
            for(let j = 0; j < 3; j++){
            verticalinfoList.push(<div className='info_cell'>{calcRow(i)[j]}</div>)
            }
            }
        return verticalinfoList;
    }

    function calcColumn(col) {
        let mass = [];
        let count = 0;
        template.forEach((element, index) =>{
            if(index % 5 === col){
                if(element === 1){
                    count ++;
                    if(template[index + 5] !== 1){
                        mass.push(count);
                        count = 0;
                    }
                }
            }
        })
        return mass;
    }

    function calcRow(row) {
        let mass = [];
        let count = 0;
        template.forEach((element, index) =>{
            if((row * 5) <= index && (row * 5 + 5 - 1) > index){
                if(element === 1){
                    count ++;
                    if(template[index + 1] !== 1){
                        mass.push(count);
                        count = 0;
                    }
                }
            }
            else if (index === (row * 5 + 5 - 1)){
                if(element === 1){
                    count ++;
                    mass.push(count);
                }
            }
        })
        return mass;
    }

    function drawAll() {
        template.forEach((element,index) =>{
            if(element === 0){
                document.getElementById(index).classList.add("white");
            }
        })
    }

    function calcCountOfBlack() {
        let count = 0;
        template.forEach((element) =>{
            if(element === 1){
                count++;
            }
        })
        return count
    }

    function ifWin(){
        console.log("chek")
        if(document.getElementsByClassName("black").length === calcCountOfBlack()){
            drawAll();
        }
    }

    return(
        <>
        <div className="field">
            <div className='hearts'>{drawHeart()}</div>
            <div className="vertical_info">{getHorizontalList()}</div>
            <div className="horizontal_info">{getVerticalList()}</div>
            <div className="main" onClick={() => ifWin()}>{listItem}</div>
        </div>
        <div className='picker'>
            <div id='black_pick' className='selected' onClick={() => changeSelectedColor("black")}>black</div>
            <div id='white_pick' onClick={() => changeSelectedColor("white")}>white</div>
        </div>
        </>
    );
}
