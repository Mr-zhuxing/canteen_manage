document.addEventListener('DOMContentLoaded', function () {
  var jiedan = document.querySelector('#receiptId');
  var aFinishOrder = document.querySelector('#aFinishOrder')
  jiedan.addEventListener('click', function (e) {
    if (e.target.nodeName == 'A') {
      console.log(e.target)
      if(e.target.innerText == "接单"){
        axios({
          method: 'get',
          url: 'http://127.0.0.1:3001/admin/order/receipt?ID=' + e.target.querySelector('p').innerText
        }).then((response) => {
          if (response.status == 200) {
            e.target.innerText = '已接单';
            e.target.classList.add('disabled');
          }
          console.log(response)
        })
      }else if(e.target.innerText == "完成"){
        axios({
          method: 'get',
          url: 'http://127.0.0.1:3001/admin/order/finishOrder?ID=' + e.target.querySelector('p').innerText
        }).then((response) => {
          if (response.status == 200) {
            e.target.innerText = '已完成';
            e.target.classList.add('disabled');
          }
          console.log(response)
        })
      }
      
    }
  }, false)

})
