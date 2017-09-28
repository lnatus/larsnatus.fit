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
})
