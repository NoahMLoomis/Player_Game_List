const card = document.querySelector("#mainDiv");
let chkBoxes = document.querySelector("#playedGames");
const filter = document.querySelector("#filter");
const leaderBoard = document.querySelector("#leaderboard");
const errorDump = document.querySelector("#errorDump");
let fNameForm = document.querySelector('#fName');
let lNameForm = document.querySelector('#lName');
let emailForm = document.querySelector('#email');
let winsForm = document.querySelector('#winsForm');
let lossesForm = document.querySelector('#lossesForm');

const gameNames = [];
const gameTypes = [];
let topId;
let idArr;
let boardGames = [];
let cardGames = [];
let otherGames = [];
let strategyGames = [];

//Setting current date
let currDate = new Date();
let year = currDate.getFullYear();
let day = "" + currDate.getDate();
let month = "" + (currDate.getMonth() + 1);
if (month.length < 2)
    month = "0" + month;
if (day.length < 2)
    day = "0" + day;
let dateStr = `${year}/${month}/${day}`;
document.querySelector('#enrolled').value = dateStr;

document.querySelector("#none").checked = true;


function getPlayers(gameType) {
    card.innerHTML = "";
    errorDump.innerHTML = "";
    idArr = [];
    let winRates = [];

    if (document.querySelector("#none").checked) {
        gameType = "none";
    }
    else if (document.querySelector("#other").checked) {
        gameType = otherGames
    } else
        if (document.querySelector("#strategy").checked) {
            gameType = strategyGames
        } else if (document.querySelector("#board").checked) {
            gameType = boardGames
        } else if (document.querySelector("#card").checked) {
            gameType = cardGames
        }


    fetch("../files/players.json", {
        method: "get"
    }).then((resp) => {
        return resp.json();
    }).then((data) => {


        data.sort((a, b) => a.last_name.localeCompare(b.last_name));

        data.sort((a, b) => a.last_name === b.last_name ? a.first_name.localeCompare(b.first_name) : null);


        let playerObj = data.filter(d => {

            let fName = d.first_name;
            let lName = d.last_name
            let uName = d.username;
            let email = d.email;
            let enrolled = d.enrolled;
            let avatar = d.avatar;
            let id = d.id;
            let wins = d.wins;
            let losses = d.losses;
            let winRate = (wins / (wins + losses)).toFixed(3);
            let gamesPlayed = d.games_played;
            let gamesStr = "";
            idArr.push(id);
            winRates.push({
                "player": uName,
                "winRate": winRate,
                "id": id
            })


            if (gamesPlayed.length > 1) {
                for (let i = 0; i < gamesPlayed.length; i++) {
                    gamesStr += gamesPlayed[i].game + ": " + gamesPlayed[i].date + "<br> ";

                }
            } else {
                gamesStr += gamesPlayed.game + ": " + gamesPlayed.date;
            }
            if (gamesPlayed.length > 1) {
                for (let i = 0; i < gamesPlayed.length; i++) {
                    if (gameType !== "none") {
                        for (let j = 0; j < gameType.length; j++) {
                            if (gamesPlayed[i].game === gameType[j]) {
                                card.innerHTML += `
                            <article>
                            <img src=${avatar} alt="avatar logo"/> 
                        
        
                        <h3 class="card-name">${fName} ${lName} <br/>(id# ${id})</h3>
                        <p class="card-username">Username: ${uName}</p>
                        <p class="card-email">Email: ${email}</p>
                        <div class="card-dropdown> 
                            <p class="card-games">Games played, date: <br/>${gamesStr}</p>
                            <p class="card-enrolled">Enrolled: ${enrolled}
                            <p class="card-winsLosses"><button type="button" class="btn btn-success btn-sm addWin" id="addWin${id}">+</button> Wins: <span id="winNum${id}">${wins}</span</br>
                            <button type="button" class="btn btn-danger btn-sm" id="addLoss${id}">+</button > Loss: <span id="lossNum${id}">${losses}</span></p>
                            
                        <div>
        
                    </article>
                    `
                                return {
                                    id: id,
                                    first_name: fName,
                                    last_name: lName,
                                    username: uName,
                                    email: email,
                                    enrolled: dateStr,
                                    avatar: `https://robohash.org/${uName}.bmp?size=60x60&set=set1`,
                                    wins: parseInt(wins),
                                    losses: parseInt(losses),
                                    games_played: gamesPlayed
                                }


                            }
                        }
                    } else {
                        card.innerHTML += `
                        <article>
                        <img src=${avatar} alt="avatar logo"/> 
                    
    
                    <h3 class="card-name">${fName} ${lName} <br/>(id# ${id})</h3>
                    <p class="card-username">Username: ${uName}</p>
                    <p class="card-email">Email: ${email}</p>
                    <div class="card-dropdown> 
                        <p class="card-games">Games played, date: <br/>${gamesStr}</p>
                        <p class="card-enrolled">Enrolled: ${enrolled}
                        <p class="card-winsLosses"><button type="button" class="btn btn-success btn-sm addWin" id="addWin${id}">+</button> Wins: <span id="winNum${id}">${wins}</span</br>
                        <button type="button" class="btn btn-danger btn-sm" id="addLoss${id}">+</button > Loss: <span id="lossNum${id}">${losses}</span></p>
                        
                    <div>
    
                </article>
                `
                        return {
                            id: id,
                            first_name: fName,
                            last_name: lName,
                            username: uName,
                            email: email,
                            enrolled: dateStr,
                            avatar: `https://robohash.org/${uName}.bmp?size=60x60&set=set1`,
                            wins: parseInt(wins),
                            losses: parseInt(losses),
                            games_played: gamesPlayed
                        }
                    }
                }
            }
            else {
                if (gameType !== "none") {
                    if (gamesPlayed.game === gameType) {
                        card.innerHTML += `
                                    <article>
                                            <img src=${avatar} alt="avatar logo"/> 
                                        
                        
                                        <h3 class="card-name">${fName} ${lName} <br/>(id# ${id})</h3>
                                        <p class="card-username">Username: ${uName}</p>
                                        <p class="card-email">Email: ${email}</p>
                                        <div class="card-dropdown> 
                                            <p class="card-games">Games played, date: <br/>${gamesStr}</p>
                                            <p class="card-enrolled">Enrolled: ${enrolled}
                                            <p class="card-winsLosses"><button type="button" class="btn btn-success btn-sm addWin" id="addWin${id}">+</button> Wins: <span id="winNum${id}">${wins}</span</br>
                                            <button type="button" class="btn btn-danger btn-sm" id="addLoss${id}">+</button > Loss: <span id="lossNum${id}">${losses}</span></p>
                                            
                                        <div>
                        
                                    </article>
                                    `
                        return {
                            id: id,
                            first_name: fName,
                            last_name: lName,
                            username: uName,
                            email: email,
                            enrolled: dateStr,
                            avatar: `https://robohash.org/${uName}.bmp?size=60x60&set=set1`,
                            wins: parseInt(wins),
                            losses: parseInt(losses),
                            games_played: gamesPlayed
                        }


                    }

                } else {
                    card.innerHTML += `
                            <article>
                            <img src=${avatar} alt="avatar logo"/> 
                        
        
                        <h3 class="card-name">${fName} ${lName} <br/>(id# ${id})</h3>
                        <p class="card-username">Username: ${uName}</p>
                        <p class="card-email">Email: ${email}</p>
                        <div class="card-dropdown> 
                            <p class="card-games">Games played, date: <br/>${gamesStr}</p>
                            <p class="card-enrolled">Enrolled: ${enrolled}
                            <p class="card-winsLosses"><button type="button" class="btn btn-success btn-sm addWin" id="addWin${id}">+</button> Wins: <span id="winNum${id}">${wins}</span</br>
                            <button type="button" class="btn btn-danger btn-sm" id="addLoss${id}">+</button > Loss: <span id="lossNum${id}">${losses}</span></p>
                            
                        <div>
        
                    </article>
                    `
                    return {
                        id: id,
                        first_name: fName,
                        last_name: lName,
                        username: uName,
                        email: email,
                        enrolled: dateStr,
                        avatar: `https://robohash.org/${uName}.bmp?size=60x60&set=set1`,
                        wins: parseInt(wins),
                        losses: parseInt(losses),
                        games_played: gamesPlayed
                    }
                }

            }

        })

        return (playerObj);
    }).then((obj) => {
        leaderBoard.innerHTML = `
            <th>Ranking</th>
            <th>Username</th>
            <th>Win rate</th>`;

        //Sorting and Making leaderboards
        winRates.sort((a, b) => {
            return a.winRate - b.winRate
        });

        let ranking = 0;
        for (let i = winRates.length - 1; i >= 0; i--) {
            ranking++;
            leaderBoard.innerHTML += `
                <td>${ranking}</td>
                <td class="tablePlayer">${winRates[i].player}(id#${winRates[i].id})</td>
                <td class="tableWinRates"> ${winRates[i].winRate}</td>
                `
        }

        //Adding event listeners to each + and - button, having it call updateCount.php when clicked
        obj.forEach(each => {
            document.querySelector(`#addWin${each.id}`).addEventListener('click', () => {
                each.wins = parseInt(each.wins + 1);
                fetch("../php/updateCount.php", {
                    method: 'post',
                    body: JSON.stringify({
                        id: each.id,
                        first_name: each.fName,
                        last_name: each.lName,
                        username: each.uName,
                        email: each.email,
                        enrolled: each.dateStr,
                        avatar: `https://robohash.org/${each.uName}.bmp?size=60x60&set=set1`,
                        wins: parseInt(each.wins),
                        losses: parseInt(each.losses),
                        games_played: each.gamesPlayed
                    })
                }).then(resp => {
                    return resp.text()
                }).then(getPlayers)
                    .catch(e => alert("Error adding wins"));
            })

            document.querySelector(`#addLoss${each.id}`).addEventListener('click', () => {
                each.losses = parseInt(each.losses + 1);
                fetch("../php/updateCount.php", {
                    method: 'post',
                    body: JSON.stringify({
                        id: each.id,
                        first_name: each.fName,
                        last_name: each.lName,
                        username: each.uName,
                        email: each.email,
                        enrolled: each.dateStr,
                        avatar: `https://robohash.org/${each.uName}.bmp?size=60x60&set=set1`,
                        wins: parseInt(each.wins),
                        losses: parseInt(each.losses),
                        games_played: each.gamesPlayed
                    })
                }).then(resp => {
                    return resp.text()
                }).then(getPlayers)
                    .catch(e => errorDump.innerHTML += (`<div>Error adding losses ${e}`));
            })

        })
    }).catch(e => errorDump.innerHTML += `<div>Caught error passing obj ${e}</div>`);
}

function generateUsername() {
    let username = document.querySelector("#username");
    username.value = fNameForm.value.charAt(0).toLowerCase() + lNameForm.value.toLowerCase();
}

fNameForm.addEventListener('keyup', generateUsername);
lNameForm.addEventListener('keyup', generateUsername);


// --------------Adding Player-------------------//


function addPlayer() {
    //TODO form error checking, e.preventDefault if not valid to prevent form from posting
    let fName = document.querySelector('#fName').value;
    let lName = document.querySelector('#lName').value;
    let email = document.querySelector('#email').value;
    let wins = document.querySelector('#winsForm').value;
    let losses = document.querySelector('#lossesForm').value;
    let newGamesPlayed;
    let checkedGames = [];

    gameNames.forEach(each => {
        if (document.querySelector(`#${each}`).checked) {
            checkedGames.push({
                "game": document.querySelector(`#${each}`).value,
                "date": dateStr
            });
        }
    })

    if (checkedGames.length > 1) {
        newGamesPlayed = [];
        checkedGames.forEach(each => {
            newGamesPlayed.push({
                "game": each.game,
                "date": each.date
            })
        })
    } else {
        newGamesPlayed = {
            "game": checkedGames[0].game,
            "date": checkedGames[0].date
        }
    }

    let uName = document.querySelector("#username").value;



    topId = Math.max(...idArr) + 1;



    fetch("../php/addPlayer.php", {
        method: "post",
        body: JSON.stringify({
            id: parseInt(topId),
            first_name: fName,
            last_name: lName,
            username: uName,
            email: email,
            enrolled: dateStr,
            avatar: `https://robohash.org/${uName}.bmp?size=60x60&set=set1`,
            wins: parseInt(wins),
            losses: parseInt(losses),
            games_played: newGamesPlayed
        })
    }).then(resp => {
        return resp.text();
    }).catch(e => { errorDump.innerHTML += `Request for addPlayer failed  ${e}` })

}




// --------------Fetching Games-------------------//
function getGames() {
    let uniqueGameTypes = [];

    fetch("../files/games.json", { method: 'get' })
        .then(resp => {
            return (resp.json());
        }).then(data => {

            data.map(d => {
                let id = d.id;
                let game = d.game;
                let type = d.type;

                type === "board" ? boardGames.push(game) : null;
                type === "strategy" ? strategyGames.push(game) : null;
                type === "card" ? cardGames.push(game) : null;
                type === "other" ? otherGames.push(game) : null;

                gameTypes.push(type);
                gameNames.push(game);
                uniqueGameTypes = [...new Set(gameTypes)];
                chkBoxes.innerHTML +=
                    `   
                <label for="${game}">${game}</label>
                <input class="typeGames" type="checkbox" id="${game}" name="${game}" value="${game}">
             `
            })
            return data;
        }).then(() => {

            uniqueGameTypes.forEach((gameType) => {
                filter.innerHTML += `
            
                <label for="${gameType}">${gameType}</label>
                <input class="games" type="radio" id="${gameType}" name="games" value="${gameType}">
            
            `

            })



            uniqueGameTypes.push("none");
            document.querySelector("#none").checked = true;

            uniqueGameTypes.forEach((type) => {
                document.querySelector(`#${type}`).addEventListener('click', (e) => {
                    if (e.target.checked) {
                        getPlayers(type);
                    }
                })
            })



        }).catch((e) => {
            errorDump.innerHTML += `Error adding player ${e}`;
        });

}


function clearForm() {
    document.querySelector('#fName').value = "";
    document.querySelector('#lName').value = "";
    document.querySelector('#email').value = "";
    document.querySelector("#username").value = "";
    document.querySelector("#winsForm").value = "";
    document.querySelector("#lossesForm").value = "";
    gameNames.forEach(each => {
        document.querySelector(`#${each}`).checked = false;
    })
}


function validateForm() {
    let fName = document.querySelector('#fName').value;
    let lName = document.querySelector('#lName').value;
    let email = document.querySelector('#email').value;
    let wins = parseInt(document.querySelector("#winsForm").value);
    let losses = parseInt(document.querySelector("#lossesForm").value);
    let enrolled = document.querySelector("#enrolled").value;
    let username = document.querySelector("#username").value;
    let fNameErr = document.querySelector('#fNameErr');
    let lNameErr = document.querySelector('#lNameErr');
    let emailErr = document.querySelector('#emailErr');
    let winsLossesErr = document.querySelector("#winsLossesFormErr");
    let enrolledErr = document.querySelector("#enrolledErr");
    let usernameErr = document.querySelector("#usernameErr");

    let fNameValid;
    let lNameValid;
    let emailValid;
    let winsValid;
    let gamesPlayedValid;
    let enrolledValid;
    let usernameValid;

    let gamesPlayedErr = document.querySelector("#gamesPlayedErr");

    let isGamesPlayedArr = [];

    //CHECKBOX VALIDATION
    //Determining if a checkbox is checked, if not, length of isGamesPlayerdArr will be < 1
    gameNames.forEach(each => {
        let singleChk = document.querySelector(`#${each}`);
        singleChk.checked ? isGamesPlayedArr.push(singleChk) : null;
    });

    if (fName.length < 1) {
        fNameErr.innerHTML = "Please enter a first name"
        fNameValid = false;
    } else {
        fNameValid = true;
        fNameErr.innerHTML = "";
    }

    if (lName.length < 1) {
        lNameErr.innerHTML = "Please enter a last name"
        lNameValid = false;
    } else {
        lNameValid = true;
        lNameErr.innerHTML = "";
    }

    if (email.length < 1) {
        emailErr.innerHTML = "Please enter a email"
        emailValid = false;
    } else {
        emailValid = true;
        emailErr.innerHTML = ""
    }


    if ((wins.length < 1) || (losses.length < 1)) {
        winsLossesErr.innerHTML = "Please enter valid int's for wins and losses";
        winsValid = false;
    } else {

        winsLossesErr.innerHTML = "";

        if (!Number.isInteger(wins) || wins < 0 || !Number.isInteger(losses) || losses < 0) {
            winsLossesErr.innerHTML = ("Please enter round numbers greater than or equals to 0")
            winsValid = false;
        } else {
            winsLossesErr.innerHTML = "";
            winsValid = true;
        }
    }

    if (enrolled.length < 1) {
        enrolledErr.innerHTML = "Please enter a valid enrolment date";
        enrolledValid = false;
    } else {
        enrolledErr.innerHTML = ""
        enrolledValid = true;
    }

    if (isGamesPlayedArr.length < 1) {
        gamesPlayedErr.innerHTML = "Please check at least one game";
        gamesPlayedValid = false;
    } else {
        gamesPlayedErr.innerHTML = "";
        gamesPlayedValid = true;
    }

    if (username.length < 1) {
        usernameValid = false;
        usernameErr.innerHTML = "Please enter a valid username";
    } else {
        usernameErr.innerHTML = "";
        usernameValid = true;
    }

    if (fNameValid && lNameValid && winsValid && gamesPlayedValid && emailValid && enrolledValid && usernameValid)
        return true;
    else {
        return false;
    }
}


document.querySelector("#addPlayer").addEventListener('click', () => {
    document.querySelector("#formDiv").hidden = !document.querySelector("#formDiv").hidden
})

document.querySelector("#generatePlayer").addEventListener('click', () => {
    if (validateForm()) {
        addPlayer();
        getPlayers();
        clearForm();
        document.querySelector("#formDiv").hidden = !document.querySelector("#formDiv").hidden
    }
});

window.addEventListener('load', () => {
    getPlayers();
    getGames();
});


//This refreshes the page every 10 seconds, but it looks bad and flashes on screen.

// window.addEventListener('load', () => {
//     setInterval(getPlayers, 10000);
// });