var txtAltura = document.getElementById('txtAltura').focus()
var resImc = document.getElementById('resImc')
var resLeg = document.getElementById('resLeg')

function calcular() {
  var txtAltura = document.getElementById('txtAltura')
  var txtPeso = document.getElementById('txtPeso')
  var altura = Number(txtAltura.value.replace(',','.')) //aceita a vírgula e ponto no input
  var peso = Number(txtPeso.value.replace(',','.'))

  if (txtAltura.value.length == 0 || txtPeso.value.length == 0) {
    alert('[ERRO] Informe ALTURA e PESO para calcular')
    txtAltura.focus()
  } else {
      if (altura % 1 === 0){
        var imc = peso / ((altura/100) * (altura/100))
        var resposta = imc.toFixed(1)
        resImc.innerText = resposta
        /* Se o usuário não digitar a vírgula na altura, converte para um número com vírgula. Senão, segue o fluxo normal */
      } else {
          var imc = peso / (altura * altura)
          var resposta = imc.toFixed(1)
          resImc.innerText = resposta
        }    
          if (resposta >= 40) {
            resLeg.innerText = 'Obesidade Grau III'
          } else if (resposta >= 35) {
            resLeg.innerText = 'Obesidade Grau II'
          } else if (resposta >= 30){
            resLeg.innerText = 'Obesidade Grau I'
          } else if (resposta >= 25) {
            resLeg.innerText = 'Sobrepeso'
          } else if (resposta >= 18.5) {
            resLeg.innerText = 'Peso Ideal' 
          } else {
            resLeg.innerText = 'Abaixo do Peso'
          }
  }
}

function limpar() {
  var txtAltura = document.getElementById('txtAltura').value = ''
  var txtPeso = document.getElementById('txtPeso').value = '' 
  var focus = document.getElementById('txtAltura').focus()
  resImc.innerText = ''
  resLeg.innerText = ''

}





