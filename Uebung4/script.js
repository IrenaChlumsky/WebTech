document.getElementById("Registrieren").addEventListener("click",function(){
const vorname = document.getElementById("Vorname").value;
  const nachname = document.getElementById("Nachname").value;
  const email = document.getElementById("E-mail").value;
  const ip = document.getElementById("IPadresse").value;

  let ausgabe = "Eingegebene Werte:\n";
  ausgabe += `Vorname: ${vorname}\n`;
  ausgabe += `Nachname: ${nachname}\n`;
  ausgabe += `E-Mail: ${email}\n`;
  ausgabe += `IP-Adresse: ${ip}`;

  const Ausgabe = document.getElementById("ausgabe");
   Ausgabe.innerHTML=`
   <li class = "list-group-item">Vorname: ${vorname}</li>
   <li class = "list-group-item">Nachname: ${nachname}</li>
   <li class = "list-group-item">E-mail: ${email}</li>
   <li class = "list-group-item">IPadresse: ${ip}</li>
   `;
});
document.getElementById("Abbrechen").addEventListener("click", function () {
  document.getElementById("Vorname").value = "";
  document.getElementById("Nachname").value = "";
  document.getElementById("E-mail").value = "";
  document.getElementById("IPadresse").value = "";
  document.getElementById("ausgabe").innerHTML = ""; 
});



document.getElementById("Registrieren").addEventListener("click", function () {
  const form = document.getElementById("meinFormular");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

});
