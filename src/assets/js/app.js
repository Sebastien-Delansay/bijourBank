console.log("Bijour Bank !");
//vidage du localstorage
localStorage.clear();

//récupération du formulaire dans une variable
const operationForm = document.getElementById("operationForm");

let solde = 0;

operationForm.addEventListener("submit", (event) => {
  //empêche le rechargement auto de la page
  event.preventDefault();

  // fonction qui prépare l'affichage du html
  function GetRow(titre, montant, description, operator) {
    let percent = (montant / solde) * 100;
    percent = percent.toFixed(2);
    let credit = `<div class="operation credit">
            <div class="grid-x grid-padding-x align-middle">
              <div class="cell shrink">
                <div class="picto">
                  <img src="./assets/images/sac-dargent.png" alt="credit" />
                </div>
              </div>
              <div class="cell auto">
                <div>
                  <h2>${titre}</h2>
                  <small>${description}</small>
                </div>
              </div>
              <div class="cell small-3 text-right">
                <div>
                  <p class="count">${montant} €</p>
                  <small>${percent} %</small>
                </div>
              </div>
            </div>
          </div>
        
    `;

    let debit = `<div class="operation debit">
    <div class="grid-x grid-padding-x align-middle">
      <div class="cell shrink">
        <div class="picto">
          <img src="./assets/images/depenses.png" alt="dedit" />
        </div>
      </div>
      <div class="cell auto">
        <div>
          <h2>${titre}</h2>
          <small>${description}</small>
        </div>
      </div>
      <div class="cell small-3 text-right">
        <div>
          <p class="count">${montant} €</p>
          <small>${percent} %</small>
        </div>
      </div>
    </div>
  </div>`;

    if (operator == "debit") {
      return debit;
    } else {
      return credit;
    }
  }

  //création de l'objet qui contient les données du formulaire
  const formData = new FormData(operationForm);
  const dataInsert = {};

  formData.forEach((value, key) => {
    console.log(value, key);
    dataInsert[key] = value;
  });

  //vide les champs du formulaire
  operationForm.reset();

  //déclare les values dans des variables
  let operator = dataInsert.operator;
  let titre = dataInsert.titre;
  let desc = dataInsert.desc;
  let montant = dataInsert.montant;

  //calcule le nouveau solde
  if (operator == "debit") {
    solde = solde - parseInt(dataInsert.montant);
  } else {
    solde = solde + parseInt(dataInsert.montant);
  }

  //modifie l'affichage du solde
  document.getElementById("solde").innerHTML = solde + " €";

  if (solde >= 1000){
    document.getElementById("good").innerHTML = "Tranquille";
  }
  if (solde < 1000){
    document.getElementById("good").innerHTML = "Va falloir faire attention";
  }
  if (solde <= 0){
    document.getElementById("good").innerHTML = "Là ça craint";
  }

  //cherche les données
  let currentDatas = JSON.parse(localStorage.getItem("donnees"));
  //aucune données
  if (currentDatas === null) {
    //ajout des premier données, un tableau pour pouvoir stocker plusieurs données
    let storageArray = [dataInsert];
    currentDatas = storageArray;
    localStorage.setItem("donnees", JSON.stringify(storageArray));
  } else {
    if (Array.isArray(currentDatas)) {
      //on ajoute des données dans le tableau puis on ajoute le tableau au localstorage
      currentDatas.push(dataInsert);
      localStorage.setItem("donnees", JSON.stringify(currentDatas));
    }
  }

  //construction de chaque ligne à partir des données.
  let rows = "";
  currentDatas
    .slice()
    .reverse()
    .forEach(
      (element) =>
        (rows += GetRow(
          element.titre,
          element.montant,
          element.desc,
          element.operator
        ))
    );
    
    //insertion du html 
  document.getElementById("grid").innerHTML = rows;
});

/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});
