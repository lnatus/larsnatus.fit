const { $ } = window

$(document).ready(() => {
  const tp =  new LNF.Components.TrainingsPlaner()
  const np = new LNF.Components.NutritionPlaner()

  tp.init()
  np.init()

  $('#js-lnf-app-trainingsplaner-run').click(()=>{
    tp.run()
  })

  $('#js-lnf-app-nutritionplaner-run').click(()=>{
    np.run()
  })


  var $inputInfoEmail = $('#inputInfoEmail')
  var $btnInfoEmail = $('#btnInfoEmail')
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  $inputInfoEmail.keyup(function() {
    if(emailRegex.test($inputInfoEmail.val())) {
      $btnInfoEmail.removeAttr('disabled')
    } else {
      $btnInfoEmail.attr('disabled', 'disabled')
    }
  });
})
